package com.hatirlabeni.userservice.dtos.address;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateAddressRequest(

        @Size(max = 50, message = "Adres başlığı en fazla 50 karakter olabilir.")
        @Pattern(regexp = ".*\\S.*", message = "Adres başlığı boş olamaz.")
        String title,

        @Size(max = 100, message = "Şehir adı en fazla 100 karakter olabilir.")
        @Pattern(regexp = ".*\\S.*", message = "Şehir adı boş olamaz.")
        String city,

        @Size(max = 100, message = "İlçe adı en fazla 100 karakter olabilir.")
        @Pattern(regexp = ".*\\S.*", message = "İlçe adı boş olamaz.")
        String district,

        @Size(max = 100, message = "Mahalle adı en fazla 100 karakter olabilir.")
        @Pattern(regexp = ".*\\S.*", message = "Mahalle adı boş olamaz.")
        String neighborhood,

        @Pattern(
                regexp = "\\d{5}",
                message = "Posta kodu 5 haneli olmalıdır."
        )
        String postalCode,

        @Size(max = 500, message = "Adres satırı en fazla 500 karakter olabilir.")
        @Pattern(regexp = ".*\\S.*", message = "Adres satırı boş olamaz.")
        String addressLine
) {

}
