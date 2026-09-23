package com.hatirlabeni.authentication.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;

public record GoogleRegisterRequest(
        @NotBlank
        String firstName,

        @NotBlank
        String lastName,

        @NotBlank
        String username,

        @NotBlank
        @Pattern(regexp = "^[0-9]{11}$")
        String telephone,

        @NotBlank
        @Pattern(regexp = "^[0-9]{11}$")
        String identityNumber,

        @NotNull
        LocalDate birthday
) {
}
