package com.hatirlabeni.productservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "sub_categories",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_sub_category_name_category",
                        columnNames = {"sub_category_name", "category_id"}
                )
        }
)
public class SubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String subCategoryName;

    @Column(nullable = false)
    private Long categoryId;
}
