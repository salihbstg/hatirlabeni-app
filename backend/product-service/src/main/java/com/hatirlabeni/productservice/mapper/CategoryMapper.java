package com.hatirlabeni.productservice.mapper;

import com.hatirlabeni.productservice.dtos.category.CategoryResponse;
import com.hatirlabeni.productservice.dtos.category.CreateCategoryRequest;
import com.hatirlabeni.productservice.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toEntity(CreateCategoryRequest createCategoryRequest);
    CategoryResponse toResponse(Category category);
}
