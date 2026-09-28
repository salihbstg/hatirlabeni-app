package com.hatirlabeni.productservice.dtos.category;

import java.util.UUID;

public record CategoryResponse(
        UUID categoryUuid,
        String categoryName,
        UUID parentUuid,
        String parentName
) {
}
