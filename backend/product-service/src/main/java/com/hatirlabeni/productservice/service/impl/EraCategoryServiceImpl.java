package com.hatirlabeni.productservice.service.impl;

import com.hatirlabeni.productservice.dtos.category.CategoryResponse;
import com.hatirlabeni.productservice.dtos.eracategory.CreateEraCategoryRequest;
import com.hatirlabeni.productservice.dtos.eracategory.EraCategoryResponse;
import com.hatirlabeni.productservice.entity.Category;
import com.hatirlabeni.productservice.entity.EraCategory;
import com.hatirlabeni.productservice.enums.Era;
import com.hatirlabeni.productservice.exception.category.CategoryNotFoundException;
import com.hatirlabeni.productservice.exception.category.EraCategoryNotFoundException;
import com.hatirlabeni.productservice.exception.category.ParentCategoryNotAllowedException;
import com.hatirlabeni.productservice.mapper.CategoryMapper;
import com.hatirlabeni.productservice.repository.CategoryRepository;
import com.hatirlabeni.productservice.repository.EraCategoryRepository;
import com.hatirlabeni.productservice.service.EraCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EraCategoryServiceImpl implements EraCategoryService {

    private final EraCategoryRepository eraCategoryRepository;
    private final CategoryMapper categoryMapper;
    private final CategoryRepository categoryRepository;

    @Override
    public List<EraCategoryResponse> getCategoriesByEra(Era era) {
        List<EraCategory> eraCategories = eraCategoryRepository.findByEra(era);
        List<EraCategoryResponse> eraCategoryResponses = new ArrayList<>();
        for (EraCategory eraCategory : eraCategories) {
            eraCategoryResponses.add(new EraCategoryResponse(
                    eraCategory.getId(),
                    eraCategory.getEra(),
                    categoryMapper.toResponse(eraCategory.getCategory())
            ));
        }
        return eraCategoryResponses;
    }

    @Override
    public void createEraCategory(CreateEraCategoryRequest request) {
        Category category = categoryRepository.findByCategoryUuid(request.categoryUuid()).orElseThrow(CategoryNotFoundException::new);
        if(category.getParentUuid()!=null){
            throw new ParentCategoryNotAllowedException("Alt kategoriler dönemlerin altında bulunamaz.");
        }
        EraCategory eraCategory = new EraCategory();
        eraCategory.setCategory(category);
        eraCategory.setEra(request.era());
        eraCategoryRepository.save(eraCategory);
    }

    @Override
    public void deleteEraCategory(Long eraCategoryId) {
        EraCategory eraCategory=eraCategoryRepository.findById(eraCategoryId).orElseThrow(EraCategoryNotFoundException::new);
        eraCategoryRepository.delete(eraCategory);
    }
}
