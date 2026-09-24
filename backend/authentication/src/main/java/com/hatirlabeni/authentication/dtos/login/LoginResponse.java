package com.hatirlabeni.authentication.dtos.login;

public record LoginResponse(
        String accessToken,
        String tokenType
) {
}
