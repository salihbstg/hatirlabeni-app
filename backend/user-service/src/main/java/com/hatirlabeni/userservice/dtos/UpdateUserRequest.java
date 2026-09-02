package com.hatirlabeni.userservice.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;

public record UpdateUserRequest(
        @Pattern(
                regexp = "^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$",
                message = "Ad yalnızca harflerden oluşmalıdır."
        )
        String firstName,

        @Pattern(
                regexp = "^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$",
                message = "Soyad yalnızca harflerden oluşmalıdır."
        )
        String lastName,

        @Pattern(
                regexp = "^[0-9]{11}$",
                message = "T.C. kimlik numarası 11 haneli olmalıdır."
        )
        String nationalId,

        @Pattern(
                regexp = "^[0-9]{10,11}$",
                message = "Telefon numarası 10 veya 11 haneli olmalıdır."
        )
        String telephone,

        @Pattern(
                regexp = "^[a-zA-ZçÇğĞıİöÖşŞüÜ\\s]+$",
                message = "Şehir yalnızca harflerden oluşmalıdır."
        )
        String city,

        String address,

        LocalDate birthday
) {
}

