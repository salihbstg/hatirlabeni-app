package com.hatirlabeni.productservice.service;

import com.hatirlabeni.productservice.dtos.product.CreateProductRequest;
import com.hatirlabeni.productservice.dtos.product.ProductResponse;
import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    public ProductResponse createProduct(CreateProductRequest createProductRequest);

    Page<ProductResponse> getAllProducts(Pageable pageable);
}
