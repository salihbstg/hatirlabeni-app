package com.hatirlabeni.authentication.repository;

import com.hatirlabeni.authentication.entity.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface AuthUserRepository extends JpaRepository<AuthUser, Long> {
    Optional<AuthUser> findByUsernameOrEmail(String username, String email);
    Optional<AuthUser> findByUsername(String username);
    Optional <AuthUser> findByUuid(UUID uuid);
    boolean existsByUsername(String username);
    Optional<AuthUser> findByEmail(String email);
}
