package com.hatirlabeni.productservice.service.impl;

import com.hatirlabeni.productservice.mapper.ProductMapper;
import com.hatirlabeni.productservice.repository.ProductRepository;
import com.hatirlabeni.productservice.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

}
