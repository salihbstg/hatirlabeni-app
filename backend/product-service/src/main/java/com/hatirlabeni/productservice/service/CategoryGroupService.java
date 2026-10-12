package com.hatirlabeni.productservice.service;

import com.hatirlabeni.productservice.dtos.categorygroup.CategoryGroupResponse;
import com.hatirlabeni.productservice.dtos.categorygroup.CreateCategoryGroupRequest;
import jakarta.validation.Valid;
import org.jspecify.annotations.Nullable;

import java.util.List;

public interface CategoryGroupService {
    void createCategoryGroup(@Valid CreateCategoryGroupRequest createCategoryGroupRequest);

    CategoryGroupResponse getCategoryGroupById(Long id);

    List<CategoryGroupResponse> getAllCategoryGroups();

    void deleteCategoryGroupById(Long id);
}
