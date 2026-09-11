package com.hatirlabeni.userservice.dtos.address;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.util.UUID;

public record AddressResponse(
        Long id,

        UUID userUUID,

        String title,

        String city,

        String district,

        String neighborhood,

        String postalCode,

        String addressLine
) {
}
