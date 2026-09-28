package com.hatirlabeni.productservice.service;

import com.hatirlabeni.productservice.dtos.product.CreateProductRequest;
import com.hatirlabeni.productservice.dtos.product.ProductResponse;

public interface ProductService {
    public ProductResponse createProduct(CreateProductRequest createProductRequest);
}
