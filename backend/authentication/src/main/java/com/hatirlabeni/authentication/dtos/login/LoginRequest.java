package com.hatirlabeni.authentication.dtos.login;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "Kullanıcı adı veya e-posta boş olamaz.")
        String identifier,

        @NotBlank(message = "Şifre boş olamaz.")
        String password
) {
}
