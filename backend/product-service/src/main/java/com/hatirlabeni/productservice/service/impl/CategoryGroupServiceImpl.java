package com.hatirlabeni.productservice.service.impl;

import com.hatirlabeni.productservice.dtos.categorygroup.CategoryGroupResponse;
import com.hatirlabeni.productservice.dtos.categorygroup.CreateCategoryGroupRequest;
import com.hatirlabeni.productservice.entity.CategoryGroup;
import com.hatirlabeni.productservice.exception.category.CategoryNotFoundException;
import com.hatirlabeni.productservice.mapper.CategoryGroupMapper;
import com.hatirlabeni.productservice.repository.CategoryGroupRepository;
import com.hatirlabeni.productservice.service.CategoryGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryGroupServiceImpl implements CategoryGroupService {

    private final CategoryGroupRepository categoryGroupRepository;
    private final CategoryGroupMapper categoryGroupMapper;

    @Override
    public void createCategoryGroup(CreateCategoryGroupRequest createCategoryGroupRequest) {
        categoryGroupRepository.save(
                categoryGroupMapper.toCategoryGroup(createCategoryGroupRequest)
        );
    }

    @Override
    public CategoryGroupResponse getCategoryGroupById(Long id) {
        CategoryGroup categoryGroup =
                categoryGroupRepository.findById(id)
                        .orElseThrow(() -> new CategoryNotFoundException("Kategori gurubu bulunamadı."));

        return categoryGroupMapper.toResponse(categoryGroup);
    }

    @Override
    public List<CategoryGroupResponse> getAllCategoryGroups() {
        List<CategoryGroup> categoryGroupList =
                categoryGroupRepository.findAll();

        return categoryGroupMapper.categoryGroupResponseList(categoryGroupList);
    }

    @Override
    public void deleteCategoryGroupById(Long id) {

        CategoryGroup categoryGroup =
                categoryGroupRepository.findById(id)
                        .orElseThrow(() -> new CategoryNotFoundException("Kategori grubu bulunamadı"));

        categoryGroupRepository.delete(categoryGroup);
    }
}
