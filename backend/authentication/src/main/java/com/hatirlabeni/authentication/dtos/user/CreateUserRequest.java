package com.hatirlabeni.authentication.dtos.user;

import java.time.LocalDate;
import java.util.UUID;

public record CreateUserRequest(
        UUID uuid,
        String firstName,
        String lastName,
        String nationalId,
        String telephone,
        LocalDate birthday
) {
}
