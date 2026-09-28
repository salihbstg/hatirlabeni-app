package com.hatirlabeni.productservice.service.impl;

import com.hatirlabeni.productservice.dtos.category.CategoryResponse;
import com.hatirlabeni.productservice.dtos.category.CreateCategoryRequest;
import com.hatirlabeni.productservice.entity.Category;
import com.hatirlabeni.productservice.exception.category.CategoryConflictException;
import com.hatirlabeni.productservice.mapper.CategoryMapper;
import com.hatirlabeni.productservice.repository.CategoryRepository;
import com.hatirlabeni.productservice.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    private List<CategoryResponse> toCategoryResponseList(List<Category> categoryList) {
        List<CategoryResponse> categoryResponseList = new ArrayList<>();

        for (Category category : categoryList) {

            String parentName = null;

            if (category.getParentUuid() != null) {
                Category parentCategory =
                        categoryRepository.findByCategoryUuid(category.getParentUuid());

                parentName = parentCategory.getCategoryName();
            }

            CategoryResponse categoryResponse = new CategoryResponse(
                    category.getCategoryUuid(),
                    category.getCategoryName(),
                    category.getParentUuid(),
                    parentName
            );

            categoryResponseList.add(categoryResponse);
        }

        return categoryResponseList;
    }

    @Override
    public void createCategory(CreateCategoryRequest createCategoryRequest) {
        if (categoryRepository.existsByCategoryNameAndParentUuid(
                createCategoryRequest.categoryName(),
                createCategoryRequest.parentUuid()
        )) {
            throw new CategoryConflictException("Bu kategori zaten mevcut.");
        }
        categoryRepository.save(categoryMapper.toEntity(createCategoryRequest));
    }

    @Override
    public List<CategoryResponse> gelAllCategories() {
        List<Category> categoryList = categoryRepository.findAll();
        return toCategoryResponseList(categoryList);
    }

    @Override
    public List<CategoryResponse> getParentCategories() {
        List<Category> categoryList = categoryRepository.findByParentUuidIsNull();
        return toCategoryResponseList(categoryList);
    }

    @Override
    public List<CategoryResponse> getChildCategoriesByParent(UUID parentUuid) {
        List<Category> categoryList = categoryRepository.findByParentUuid(parentUuid);
        return toCategoryResponseList(categoryList);
    }

    @Override
    public List<CategoryResponse> getChildrenCategories() {
        List<Category> categoryList = categoryRepository.findByParentUuidIsNotNull();
        return toCategoryResponseList(categoryList);
    }
}
