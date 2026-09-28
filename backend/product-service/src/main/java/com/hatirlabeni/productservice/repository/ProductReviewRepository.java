package com.hatirlabeni.productservice.repository;

import com.hatirlabeni.productservice.entity.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {
}
