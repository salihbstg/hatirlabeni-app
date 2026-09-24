package com.hatirlabeni.authentication.dtos;

import jakarta.validation.constraints.NotBlank;

public record ForgotPasswordRequest(
        @NotBlank
        String identifier
) {
}
