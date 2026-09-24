package com.hatirlabeni.authentication.dtos.google;

public record GoogleRegisterInfoResponse(
        String firstName,
        String lastName,
        String email
) {
}
