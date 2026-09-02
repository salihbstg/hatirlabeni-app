package com.hatirlabeni.userservice.dtos;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record CreateUserRequest(
        UUID uuid,
        @NotNull String firstName,
        @NotNull String lastName,
        @NotNull String nationalId,
        @NotNull String telephone,
        @NotNull String city,
        @NotNull String address,
        @NotNull LocalDate birthday
) {
}
