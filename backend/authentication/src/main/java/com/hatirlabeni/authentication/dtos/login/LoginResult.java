package com.hatirlabeni.authentication.dtos.login;

public record LoginResult(
        LoginResponse loginResponse,
        String refreshToken
) {
}
