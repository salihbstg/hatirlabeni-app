package com.hatirlabeni.userservice.dtos.feign;

import com.hatirlabeni.userservice.enums.Role;

import java.util.UUID;

public record AuthUserResponse(
        UUID uuid,
        String username,
        String email,
        Role role
) {
}
