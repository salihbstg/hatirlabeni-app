package com.hatirlabeni.productservice.repository;

import com.hatirlabeni.productservice.entity.EraCategory;
import com.hatirlabeni.productservice.enums.Era;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EraCategoryRepository extends JpaRepository<EraCategory, Long> {
    List<EraCategory> findByEra(Era era);
}
