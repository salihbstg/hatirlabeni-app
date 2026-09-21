package com.hatirlabeni.authentication.dtos;

public record LoginResponse(
        String accessToken,
        String tokenType
) {
}
