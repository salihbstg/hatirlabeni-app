package com.hatirlabeni.userservice.dtos.address;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CreateAddressRequest(

        @NotBlank
        String title,

        @NotBlank
        String city,

        @NotBlank
        String district,

        @NotBlank
        String neighborhood,

        @NotBlank
        @Pattern(regexp = "\\d{5}", message = "Posta kodu 5 haneli olmalıdır")
        String postalCode,

        @NotBlank
        String addressLine

) {
}
