package com.hatirlabeni.productservice.controller;

import com.hatirlabeni.productservice.dtos.category.CategoryResponse;
import com.hatirlabeni.productservice.dtos.eracategory.CreateEraCategoryRequest;
import com.hatirlabeni.productservice.dtos.eracategory.EraCategoryResponse;
import com.hatirlabeni.productservice.enums.Era;
import com.hatirlabeni.productservice.service.EraCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products/categories/era-categories")
public class EraCategoryController {

    private final EraCategoryService eraCategoryService;

    @GetMapping("/{era}")
    public ResponseEntity<List<EraCategoryResponse>> getCategoriesByEra(@PathVariable("era") Era era) {
        return ResponseEntity.ok(eraCategoryService.getCategoriesByEra(era));
    }

    @PostMapping
    public ResponseEntity<Void> createEraCategory(
            @Valid @RequestBody CreateEraCategoryRequest request
    ) {
        eraCategoryService.createEraCategory(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{eraCategoryId}")
    public ResponseEntity<Void> deleteEraCategory(@PathVariable("eraCategoryId") Long eraCategoryId) {
        eraCategoryService.deleteEraCategory(eraCategoryId);
        return ResponseEntity.noContent().build();
    }
}
