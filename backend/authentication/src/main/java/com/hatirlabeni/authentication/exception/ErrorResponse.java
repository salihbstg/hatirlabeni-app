package com.hatirlabeni.authentication.exception;

import java.time.LocalDateTime;
import java.util.List;

public record ErrorResponse(
        LocalDateTime timestamp,
        int status,
        List<String> message
) {
}
