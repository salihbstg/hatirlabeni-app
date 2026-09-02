package com.hatirlabeni.userservice.exception;

import java.time.LocalDateTime;
import java.util.List;

public record CustomErrorResponse(
        LocalDateTime timestamp,
        int status,
        List<String> message
) {
}
