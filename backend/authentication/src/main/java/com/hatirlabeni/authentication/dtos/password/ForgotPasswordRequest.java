package com.hatirlabeni.authentication.dtos.password;

import jakarta.validation.constraints.NotBlank;

public record ForgotPasswordRequest(
        @NotBlank
        String identifier
) {
}
