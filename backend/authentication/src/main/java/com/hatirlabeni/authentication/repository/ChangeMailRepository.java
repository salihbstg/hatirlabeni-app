package com.hatirlabeni.authentication.repository;

import com.hatirlabeni.authentication.entity.ChangeMailToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChangeMailRepository extends JpaRepository<ChangeMailToken,Long> {
    Optional<ChangeMailToken> findByTokenHash(String hashedToken);
}
