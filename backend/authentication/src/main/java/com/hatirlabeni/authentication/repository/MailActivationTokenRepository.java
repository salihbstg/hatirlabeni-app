package com.hatirlabeni.authentication.repository;

import com.hatirlabeni.authentication.entity.MailActivationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MailActivationTokenRepository extends JpaRepository<MailActivationToken,Long> {
    Optional<MailActivationToken> findByTokenHash(String hashedToken);

    void deleteByUserUUID(UUID userUUID);
}
