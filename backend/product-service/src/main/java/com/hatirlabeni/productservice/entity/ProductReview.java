package com.hatirlabeni.productservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Setter
@Getter
@Table(name = "product_reviews")
public class ProductReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private UUID reviewUuid;

    @Column(nullable = false)
    private UUID productUuid;

    @Column(nullable = false)
    private UUID userUUID;

    @Column(nullable = false)
    private Integer rating;

    private String comment;
}
