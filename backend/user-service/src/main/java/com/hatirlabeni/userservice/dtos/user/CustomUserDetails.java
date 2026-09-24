package com.hatirlabeni.userservice.dtos.user;

import java.util.UUID;

public record CustomUserDetails(
        UUID uuid,
        String username
) {
}
