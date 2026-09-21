package com.hatirlabeni.authentication.dtos;

public record LoginResult(
        LoginResponse loginResponse,
        String refreshToken
) {
}
