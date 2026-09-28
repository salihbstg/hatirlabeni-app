package com.hatirlabeni.productservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@Table(
        name = "categories",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_category_name_parent",
                        columnNames = {"category_name", "parent_uuid"}
                )
        }
)
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private UUID categoryUuid;

    @Column(nullable = false,unique = true)
    private String categoryName;

    private UUID parentUuid;

    @PrePersist
    protected void onCreate() {
        this.categoryUuid = UUID.randomUUID();
    }

}
