package com.hatirlabeni.productservice.service.impl;

import com.hatirlabeni.productservice.dtos.product.CreateProductRequest;
import com.hatirlabeni.productservice.dtos.product.ProductResponse;
import com.hatirlabeni.productservice.entity.Product;
import com.hatirlabeni.productservice.mapper.ProductMapper;
import com.hatirlabeni.productservice.repository.ProductRepository;
import com.hatirlabeni.productservice.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    @Override
    public ProductResponse createProduct(CreateProductRequest createProductRequest) {
        Product product=productRepository.save(productMapper.toEntity(createProductRequest));
        return productMapper.toResponse(product);
    }

    @Override
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable).map(productMapper::toResponse);
    }
}
