package com.hatirlabeni.productservice.dtos.eracategory;

import com.hatirlabeni.productservice.enums.Era;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CreateEraCategoryRequest(
        @NotNull(message = "Dönem boş olamaz.")
        Era era,

        @NotNull(message = "Kategori UUID boş olamaz.")
        UUID categoryUuid
) {
}
