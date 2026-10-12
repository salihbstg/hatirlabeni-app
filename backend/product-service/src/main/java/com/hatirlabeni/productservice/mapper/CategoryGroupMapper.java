package com.hatirlabeni.productservice.mapper;

import com.hatirlabeni.productservice.dtos.categorygroup.CategoryGroupResponse;
import com.hatirlabeni.productservice.dtos.categorygroup.CreateCategoryGroupRequest;
import com.hatirlabeni.productservice.entity.CategoryGroup;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryGroupMapper {
    @Mapping(target = "id",ignore = true)
    CategoryGroup toCategoryGroup(CreateCategoryGroupRequest createCategoryGroupRequest);
    CategoryGroupResponse toResponse(CategoryGroup categoryGroup);
    List<CategoryGroupResponse> categoryGroupResponseList(List<CategoryGroup> categoryGroupList);
}
