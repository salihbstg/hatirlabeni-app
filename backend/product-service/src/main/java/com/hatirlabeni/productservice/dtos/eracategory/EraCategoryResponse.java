package com.hatirlabeni.productservice.dtos.eracategory;

import com.hatirlabeni.productservice.dtos.category.CategoryResponse;
import com.hatirlabeni.productservice.enums.Era;


public record EraCategoryResponse(
        Long eraCategoryUuid,
        Era era,
        CategoryResponse category
) {
}