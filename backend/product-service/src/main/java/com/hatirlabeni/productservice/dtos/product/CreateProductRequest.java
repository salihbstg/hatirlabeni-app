package com.hatirlabeni.productservice.dtos.product;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.UUID;

public record CreateProductRequest(

        @NotBlank(message = "Ürün adı boş bırakılamaz")
        @Size(min = 2, max = 150, message = "Ürün adı 2-150 karakter arasında olmalıdır")
        String productName,

        @NotBlank(message = "Ürün açıklaması boş bırakılamaz")
        @Size(min = 10, max = 2000, message = "Ürün açıklaması 10-2000 karakter arasında olmalıdır")
        String productDescription,

        @NotNull(message = "Ürün fiyatı boş bırakılamaz")
        @DecimalMin(value = "0.01", message = "Ürün fiyatı 0'dan büyük olmalıdır")
        BigDecimal productPrice,

        @NotNull(message = "Stok miktarı boş bırakılamaz")
        @Min(value = 0, message = "Stok miktarı 0'dan küçük olamaz")
        Integer stockQuantity,

        @NotNull(message = "Ürün kategorisi seçilmelidir")
        UUID productCategoryUuid
) {
}
