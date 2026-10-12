package com.hatirlabeni.productservice.controller;

import com.hatirlabeni.productservice.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products/categories")
public class CategoryController {
    private final CategoryService categoryService;


}
