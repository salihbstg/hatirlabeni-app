package com.hatirlabeni.productservice.mapper;

import com.hatirlabeni.productservice.dtos.product.CreateProductRequest;
import com.hatirlabeni.productservice.dtos.product.ProductResponse;
import com.hatirlabeni.productservice.entity.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toEntity(CreateProductRequest createProductRequest);
    ProductResponse toResponse(Product product);
}
