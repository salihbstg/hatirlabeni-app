package com.hatirlabeni.authentication.dtos;

public record GoogleRegisterInfoResponse(
        String firstName,
        String lastName,
        String email
) {
}
