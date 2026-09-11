package com.hatirlabeni.userservice.dtos.address;

public record UpdateAddressRequest(
        String title,

        String city,

        String district,

        String neighborhood,

        String postalCode,

        String addressLine
) {

}
