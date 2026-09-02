package com.hatirlabeni.authentication.dtos;

import java.time.LocalDate;
import java.util.UUID;

public record CreateUserRequest(
        UUID uuid,
        String firstName,
        String lastName,
        String nationalId,
        String telephone,
        String city,
        String address,
        LocalDate birthday
) {
}
