package com.hatirlabeni.productservice.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record ValidationErrorResponse(
        String message,
        int status,
        Map<String,String> errors,
        LocalDateTime timestamp
) {
}
