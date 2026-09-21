package com.hatirlabeni.userservice.exception;

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

    @ExceptionHandler(DataIntegrityViolationException.class)
    ResponseEntity<CustomErrorResponse> dataIntegrityViolationException(
            DataIntegrityViolationException e
    ) {

        String constraintName = getConstraintName(e);

        String errorMessage = switch (
                constraintName != null ? constraintName : ""
                ) {
            case "uk_users_telephone" -> "Telefon numarası zaten kayıtlı.";

            case "uk_users_national_id" -> "T.C. kimlik numarası zaten kayıtlı.";

            case "uk_users_uuid" -> "Kullanıcı UUID değeri zaten kayıtlı.";

            default -> "Veri bütünlüğü ihlali nedeniyle işlem gerçekleştirilemedi.";
        };

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new CustomErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.CONFLICT.value(),
                        List.of(errorMessage)
                ));
    }

    private String getConstraintName(Throwable exception) {

        Throwable current = exception;

        while (current != null) {

            if (current instanceof
                    org.hibernate.exception.ConstraintViolationException ex) {
                return ex.getConstraintName();
            }

            current = current.getCause();
        }

        return null;
    }

    @ExceptionHandler(UserNotFoundException.class)
    ResponseEntity<CustomErrorResponse> userNotFoundException(UserNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomErrorResponse(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                List.of(e.getMessage())
        ));
    }

    @ExceptionHandler(UserAuthenticationException.class)
    ResponseEntity<CustomErrorResponse> userAuthenticationException(UserAuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new CustomErrorResponse(
                LocalDateTime.now(),
                HttpStatus.UNAUTHORIZED.value(),
                List.of(e.getMessage())
        ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<CustomErrorResponse> methodArgumentNotValidException(MethodArgumentNotValidException e) {
        List<String> errors = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new CustomErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                errors
        ));
    }

    @ExceptionHandler(DuplicateUserException.class)
    ResponseEntity<CustomErrorResponse> duplicateUserException(DuplicateUserException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new CustomErrorResponse(
                LocalDateTime.now(),
                HttpStatus.CONFLICT.value(),
                List.of(e.getMessage())
        ));
    }

    @ExceptionHandler(AccessDeniedException.class)
    ResponseEntity<CustomErrorResponse> accessDeniedException(
            AccessDeniedException e
    ) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || authentication instanceof AnonymousAuthenticationToken) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new CustomErrorResponse(
                            LocalDateTime.now(),
                            HttpStatus.UNAUTHORIZED.value(),
                            List.of("Kimlik doğrulaması gerekli.")
                    ));
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new CustomErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.FORBIDDEN.value(),
                        List.of("Bu işlem için yetkiniz yok.")
                ));
    }

    @ExceptionHandler(RootIsImmutableException.class)
    ResponseEntity<CustomErrorResponse> rootIsImmutableException(RootIsImmutableException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new CustomErrorResponse(
                LocalDateTime.now(),
                HttpStatus.FORBIDDEN.value(),
                List.of(e.getMessage())
        ));
    }

    @ExceptionHandler(AddressNotFoundException.class)
    ResponseEntity<CustomErrorResponse> addressNotFoundException(AddressNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomErrorResponse(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                List.of(e.getMessage())
        ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomErrorResponse> handleUnexpectedException(
            Exception e
    ) {
        log.error("Beklenmeyen bir hata oluştu.", e);

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new CustomErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        List.of("Beklenmeyen bir hata oluştu.")
                ));
    }
}
