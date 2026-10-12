package com.hatirlabeni.productservice.service.impl;

import com.hatirlabeni.productservice.repository.CategoryRepository;
import com.hatirlabeni.productservice.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;



}
