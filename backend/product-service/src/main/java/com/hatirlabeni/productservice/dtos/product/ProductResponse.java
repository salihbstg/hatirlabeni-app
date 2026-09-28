package com.hatirlabeni.productservice.dtos.product;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record ProductResponse(
        UUID productUuid,
        String productName,
        String productDescription,
        BigDecimal productPrice,
        Integer stockQuantity,
        UUID productCategoryUuid,
        Double averageRating,
        Long reviewCount,
        Boolean isActive,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
