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
                        name = "uk_category_name_group",
                        columnNames = {"category_name", "category_group_id"}
                )
        }
)
public class Category {

    @Id
    @Column(nullable = false, unique = true)
    private UUID categoryUuid;

    @Column(nullable = false)
    private String categoryName;

    @Column(nullable = false)
    private Long categoryGroupId;

    @PrePersist
    protected void onCreate() {
        this.categoryUuid = UUID.randomUUID();
    }

}
