package com.hatirlabeni.authentication.dtos;

public record RegisterResponse(
        AuthUserResponse authUserResponse,
        UserResponse userResponse
) {
}
