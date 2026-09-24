package com.hatirlabeni.authentication.dtos;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "Kullanıcı adı veya e-posta boş olamaz.")
        String identifier,

        @NotBlank(message = "Şifre boş olamaz.")
        String password
) {
}
