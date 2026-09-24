package com.hatirlabeni.authentication.dtos.register;

import jakarta.validation.constraints.NotBlank;

public record ResetPasswordRequest(
        @NotBlank
        String newPassword,
        @NotBlank
        String token
){
}
