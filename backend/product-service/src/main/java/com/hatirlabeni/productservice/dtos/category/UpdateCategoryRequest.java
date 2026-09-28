package com.hatirlabeni.productservice.dtos.category;

import java.util.UUID;

public record UpdateCategoryRequest(
        String categoryName,
        UUID parentUuid
) {
}
