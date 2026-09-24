package com.hatirlabeni.authentication.dtos.entity;

import com.hatirlabeni.authentication.enums.Role;

import java.util.UUID;

public record AuthUserResponse(
        UUID uuid,
        String username,
        String email,
        Role role
) {
}
