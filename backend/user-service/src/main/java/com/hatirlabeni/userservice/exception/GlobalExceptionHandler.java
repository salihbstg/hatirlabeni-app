package com.hatirlabeni.userservice.exception;

import com.hatirlabeni.userservice.exception.address.AddressNotFoundException;
import com.hatirlabeni.userservice.exception.admin.RootIsImmutableException;
import com.hatirlabeni.userservice.exception.user.DuplicateUserException;
import com.hatirlabeni.userservice.exception.user.UserAuthenticationException;
import com.hatirlabeni.userservice.exception.user.UserNotFoundException;
import org.hibernate.exception.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log =
            LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // Kullanıcı ve adres bulunamama hataları

    @ExceptionHandler(UserNotFoundException.class)
    ResponseEntity<CustomErrorResponse> handleUserNotFound(
            UserNotFoundException e
    ) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(AddressNotFoundException.class)
    ResponseEntity<CustomErrorResponse> handleAddressNotFound(
            AddressNotFoundException e
    ) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
    }

    // Kimlik doğrulama ve yetkilendirme hataları

    @ExceptionHandler(UserAuthenticationException.class)
    ResponseEntity<CustomErrorResponse> handleUserAuthentication(
            UserAuthenticationException e
    ) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, e.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    ResponseEntity<CustomErrorResponse> handleAccessDenied(
            AccessDeniedException e
    ) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || authentication instanceof AnonymousAuthenticationToken) {

            return buildErrorResponse(
                    HttpStatus.UNAUTHORIZED,
                    "Kimlik doğrulaması gerekli."
            );
        }

        return buildErrorResponse(
                HttpStatus.FORBIDDEN,
                "Bu işlem için yetkiniz yok."
        );
    }

    @ExceptionHandler(RootIsImmutableException.class)
    ResponseEntity<CustomErrorResponse> handleRootIsImmutable(
            RootIsImmutableException e
    ) {
        return buildErrorResponse(HttpStatus.FORBIDDEN, e.getMessage());
    }

    // Kayıt ve validasyon hataları

    @ExceptionHandler(DuplicateUserException.class)
    ResponseEntity<CustomErrorResponse> handleDuplicateUser(
            DuplicateUserException e
    ) {
        return buildErrorResponse(HttpStatus.CONFLICT, e.getMessage());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    ResponseEntity<CustomErrorResponse> handleDataIntegrityViolation(
            DataIntegrityViolationException e
    ) {
        String constraintName = getConstraintName(e);

        String errorMessage = switch (
                constraintName != null ? constraintName : ""
                ) {
            case "uk_users_telephone" ->
                    "Telefon numarası zaten kayıtlı.";

            case "uk_users_national_id" ->
                    "T.C. kimlik numarası zaten kayıtlı.";

            case "uk_users_uuid" ->
                    "Kullanıcı UUID değeri zaten kayıtlı, lütfen yeniden deneyiniz.";

            default ->
                    "Sistemde kayıtlı olan bilgiler nedeniyle işlem gerçekleştirilemedi, lütfen bilgilerinizi kontrol ederek yeniden deneyiniz.";
        };

        return buildErrorResponse(HttpStatus.CONFLICT, errorMessage);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<CustomErrorResponse> handleMethodArgumentNotValid(
            MethodArgumentNotValidException e
    ) {
        List<String> errors = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList();

        return buildErrorResponse(HttpStatus.BAD_REQUEST, errors);
    }

    // Beklenmeyen hatalar

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomErrorResponse> handleUnexpectedException(
            Exception e
    ) {
        log.error("Beklenmeyen bir hata oluştu.", e);

        return buildErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Beklenmeyen bir hata oluştu."
        );
    }

    // Ortak yardımcı metotlar

    private String getConstraintName(Throwable exception) {
        Throwable current = exception;

        while (current != null) {
            if (current instanceof ConstraintViolationException ex) {
                return ex.getConstraintName();
            }

            current = current.getCause();
        }

        return null;
    }

    private ResponseEntity<CustomErrorResponse> buildErrorResponse(
            HttpStatus status,
            String message
    ) {
        return buildErrorResponse(status, List.of(message));
    }

    private ResponseEntity<CustomErrorResponse> buildErrorResponse(
            HttpStatus status,
            List<String> errors
    ) {
        CustomErrorResponse errorResponse = new CustomErrorResponse(
                LocalDateTime.now(),
                status.value(),
                errors
        );

        return ResponseEntity.status(status).body(errorResponse);
    }
}