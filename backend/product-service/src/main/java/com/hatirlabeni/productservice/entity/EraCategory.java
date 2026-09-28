package com.hatirlabeni.productservice.entity;

import com.hatirlabeni.productservice.enums.Era;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "era_categories",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"era", "category_uuid"})
        })
public class EraCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Era era;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_uuid", nullable = false)
    private Category category;
}
