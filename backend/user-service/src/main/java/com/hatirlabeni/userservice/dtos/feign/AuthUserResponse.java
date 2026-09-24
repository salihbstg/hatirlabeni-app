package com.hatirlabeni.userservice.dtos;

import java.util.UUID;

public record AuthUserResponse(
        UUID uuid,
        String username,
        String email,
        Role role
) {
}
