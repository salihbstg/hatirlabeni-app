package com.hatirlabeni.productservice.repository;

import com.hatirlabeni.productservice.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
}
