package com.hatirlabeni.productservice.controller;

import com.hatirlabeni.productservice.dtos.categorygroup.CategoryGroupResponse;
import com.hatirlabeni.productservice.dtos.categorygroup.CreateCategoryGroupRequest;
import com.hatirlabeni.productservice.service.CategoryGroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products/categories/category-groups")
public class CategoryGroupController {

    private final CategoryGroupService categoryGroupService;

    @PostMapping
    public ResponseEntity<Void> createCategoryGroup(@Valid @RequestBody CreateCategoryGroupRequest createCategoryGroupRequest) {
        categoryGroupService.createCategoryGroup(createCategoryGroupRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryGroupResponse> getCategoryGroup(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(categoryGroupService.getCategoryGroupById(id));
    }

    @GetMapping
    public ResponseEntity<List<CategoryGroupResponse>> getCategoryGroups() {
        return ResponseEntity.ok(categoryGroupService.getAllCategoryGroups());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoryGroup(@PathVariable(name = "id") Long id) {
        categoryGroupService.deleteCategoryGroupById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
