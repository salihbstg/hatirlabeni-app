package com.hatirlabeni.productservice.repository;

import com.hatirlabeni.productservice.entity.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByParentUuidIsNull();

    List<Category> findByParentUuid(UUID parentUuid);

    List<Category> findByParentUuidIsNotNull();

    Optional<Category> findByCategoryUuid(UUID uuid);

    boolean existsByCategoryNameAndParentUuid(String categoryName, UUID uuid);
}
