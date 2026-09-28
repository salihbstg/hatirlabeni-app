package com.hatirlabeni.productservice.exception;

import com.hatirlabeni.productservice.exception.category.CategoryConflictException;
import com.hatirlabeni.productservice.exception.category.CategoryNotFoundException;
import com.hatirlabeni.productservice.exception.category.EraCategoryNotFoundException;
import com.hatirlabeni.productservice.exception.category.ParentCategoryNotAllowedException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CategoryConflictException.class)
    ResponseEntity<ErrorResponse> categoryConflictExceptionHandler(
            CategoryConflictException ex
    ) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(CategoryNotFoundException.class)
    ResponseEntity<ErrorResponse> categoryNotFoundExceptionHandler(
            CategoryNotFoundException ex
    ) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ParentCategoryNotAllowedException.class)
    ResponseEntity<ErrorResponse> parentCategoryNotAllowedExceptionHandler(
            ParentCategoryNotAllowedException ex
    ) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EraCategoryNotFoundException.class)
    ResponseEntity<ErrorResponse> eraCategoryNotFoundExceptionHandler(
            EraCategoryNotFoundException ex
    ) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    ResponseEntity<ErrorResponse> dataIntegrityViolationExceptionHandler(
            DataIntegrityViolationException ex
    ) {
        return buildErrorResponse(
                "Veri bütünlüğü ihlal edildi. Gönderilen veri mevcut kayıtlarla çakışıyor veya geçersiz.",
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ValidationErrorResponse> methodArgumentNotValidExceptionHandler(
            MethodArgumentNotValidException ex
    ) {
        Map<String, String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        FieldError::getDefaultMessage,
                        (existing, replacement) -> existing
                ));

        return ResponseEntity.badRequest().body(
                new ValidationErrorResponse(
                        "Geçersiz istek.",
                        HttpStatus.BAD_REQUEST.value(),
                        errors,
                        LocalDateTime.now()
                )
        );
    }

    private ResponseEntity<ErrorResponse> buildErrorResponse(
            String message,
            HttpStatus status
    ) {
        return ResponseEntity.status(status).body(
                new ErrorResponse(
                        message,
                        status.value(),
                        LocalDateTime.now()
                )
        );
    }
}