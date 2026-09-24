package com.hatirlabeni.authentication.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(
        @NotBlank(message = "Mevcut şifre boş bırakılamaz.")
        String currentPassword,

        @NotBlank(message = "Yeni şifre boş bırakılamaz.")
        @Size(
                min = 8,
                max = 64,
                message = "Yeni şifre 8 ile 64 karakter arasında olmalıdır."
        )
        String newPassword
) {
}
