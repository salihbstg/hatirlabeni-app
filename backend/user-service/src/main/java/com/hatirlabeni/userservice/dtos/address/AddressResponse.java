package com.hatirlabeni.userservice.dtos.address;

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
