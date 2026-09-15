package com.hatirlabeni.authentication.dtos;

import jakarta.validation.constraints.NotBlank;

public record ResetPasswordRequest(
        @NotBlank
        String newPassword,
        @NotBlank
        String token
){
}
