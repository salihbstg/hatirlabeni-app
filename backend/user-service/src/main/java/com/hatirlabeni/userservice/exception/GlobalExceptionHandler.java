package com.hatirlabeni.userservice.exception;

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
import java.util.ArrayList;
import java.util.List;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    ResponseEntity<CustomErrorResponse> dataIntegrityViolationException(
            DataIntegrityViolationException e
    ) {

        String message = e.getMessage();

        List<String> errors = new ArrayList<>();

        if (message != null && message.contains("Key (telephone)")) {
            errors.add("Telefon numarası zaten kayıtlı.");
        }

        if (message != null && message.contains("Key (national_id)")) {
            errors.add("T.C. kimlik numarası zaten kayıtlı.");
        }

        if (errors.isEmpty()) {
            errors.add("Kullanıcı bilgileri zaten kayıtlı.");
        }

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new CustomErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.CONFLICT.value(),
                        errors
                ));
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
        List<String> errors=e.getBindingResult()
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

    @ExceptionHandler(AdminStatusChangeNotAllowedException.class)
    ResponseEntity<CustomErrorResponse> adminIsImmutableException(AdminStatusChangeNotAllowedException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new CustomErrorResponse(
                LocalDateTime.now(),
                HttpStatus.FORBIDDEN.value(),
                List.of(e.getMessage())
        ));
    }
}
