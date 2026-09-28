package com.hatirlabeni.productservice.service.impl;

import com.hatirlabeni.productservice.dtos.product.CreateProductRequest;
import com.hatirlabeni.productservice.dtos.product.ProductResponse;
import com.hatirlabeni.productservice.service.ProductService;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {
    @Override
    public ProductResponse createProduct(CreateProductRequest createProductRequest) {
        return null;
    }
}
