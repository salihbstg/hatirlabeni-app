package com.hatirlabeni.productservice.service;

import com.hatirlabeni.productservice.dtos.category.CategoryResponse;
import com.hatirlabeni.productservice.dtos.category.CreateCategoryRequest;
import com.hatirlabeni.productservice.dtos.category.UpdateCategoryRequest;
import jakarta.validation.Valid;
import org.jspecify.annotations.Nullable;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    void createCategory(@Valid CreateCategoryRequest createCategoryRequest);

    List<CategoryResponse> getParentCategories();

    List<CategoryResponse> getChildCategoriesByParent(UUID parentUuid);

    List<CategoryResponse> getChildrenCategories();

    List<CategoryResponse> gelAllCategories();

    CategoryResponse updateCategory(UUID categoryUuid, UpdateCategoryRequest updateCategoryRequest);

    void deleteCategory(UUID categoryUuid);

}
