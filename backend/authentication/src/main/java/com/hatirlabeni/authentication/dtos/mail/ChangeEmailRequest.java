package com.hatirlabeni.authentication.dtos.mail;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ChangeEmailRequest(
        @NotBlank @Email String newEmail,
        @NotBlank String password
) {
}