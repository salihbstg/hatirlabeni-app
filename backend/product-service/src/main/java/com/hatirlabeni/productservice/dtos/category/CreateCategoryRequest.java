package com.hatirlabeni.productservice.dtos.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record CreateCategoryRequest(
        @NotBlank(message = "Kategori adı boş bırakılamaz")
        @Size(min = 2, max = 100, message = "Kategori adı 2-100 karakter arasında olmalıdır")
        String categoryName,

        UUID parentUuid
) {
}
