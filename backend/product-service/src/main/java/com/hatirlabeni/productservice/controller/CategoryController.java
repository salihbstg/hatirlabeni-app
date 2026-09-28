package com.hatirlabeni.productservice.controller;

import com.hatirlabeni.productservice.dtos.category.CategoryResponse;
import com.hatirlabeni.productservice.dtos.category.CreateCategoryRequest;
import com.hatirlabeni.productservice.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Void> createCategory(@Valid @RequestBody CreateCategoryRequest createCategoryRequest) {
        categoryService.createCategory(createCategoryRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return ResponseEntity.ok(categoryService.gelAllCategories());
    }

    @GetMapping("/parents")
    public ResponseEntity<List<CategoryResponse>> getParentCategoriesR(){
        return ResponseEntity.ok(categoryService.getParentCategories());
    }
    @GetMapping("/{parent-uuid}/children")
    public ResponseEntity<List<CategoryResponse>> getChildrenCategoriesR(@PathVariable(name = "parent-uuid") UUID parentUuid){
        return ResponseEntity.ok(categoryService.getChildCategoriesByParent(parentUuid));
    }
    @GetMapping("/children")
    public ResponseEntity<List<CategoryResponse>> getChildrenCategories(){
        return ResponseEntity.ok(categoryService.getChildrenCategories());
    }
}
