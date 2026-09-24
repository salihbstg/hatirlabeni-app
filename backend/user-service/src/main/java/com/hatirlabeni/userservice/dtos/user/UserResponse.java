package com.hatirlabeni.userservice.dtos.user;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record UserResponse(
        Long id,
        UUID uuid,
        String firstName,
        String lastName,
        String nationalId,
        String telephone,
        String city,
        LocalDate birthday,
        Boolean active,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        boolean mailActivation
) {
}
