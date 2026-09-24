package com.hatirlabeni.userservice.dtos;

import java.util.UUID;

public record CustomUserDetails(
        UUID uuid,
        String username
) {
}
