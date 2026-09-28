package com.hatirlabeni.productservice.controller;

import com.hatirlabeni.productservice.dtos.product.CreateProductRequest;
import com.hatirlabeni.productservice.dtos.product.ProductResponse;
import com.hatirlabeni.productservice.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {
    private final ProductService productService;

    @PostMapping
    private ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody CreateProductRequest createProductRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(createProductRequest));
    }

    @GetMapping
    private ResponseEntity<Page<ProductResponse>> getProducts(Pageable pageable){
        return ResponseEntity.ok(productService.getAllProducts(pageable));
    }
}
