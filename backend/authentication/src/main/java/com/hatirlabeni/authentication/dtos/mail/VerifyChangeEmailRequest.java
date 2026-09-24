package com.hatirlabeni.authentication.dtos.mail;

import jakarta.validation.constraints.NotBlank;

public record VerifyChangeEmailRequest(
        @NotBlank String token
){
}
