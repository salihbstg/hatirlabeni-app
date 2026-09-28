package com.hatirlabeni.productservice.service;

import com.hatirlabeni.productservice.dtos.category.CategoryResponse;
import com.hatirlabeni.productservice.dtos.eracategory.CreateEraCategoryRequest;
import com.hatirlabeni.productservice.dtos.eracategory.EraCategoryResponse;
import com.hatirlabeni.productservice.enums.Era;
import jakarta.validation.Valid;
import org.jspecify.annotations.Nullable;

import java.util.List;

public interface EraCategoryService {
    List<EraCategoryResponse> getCategoriesByEra(Era era);
    void createEraCategory(@Valid CreateEraCategoryRequest request);

    void deleteEraCategory(Long eraCategoryId);
}
