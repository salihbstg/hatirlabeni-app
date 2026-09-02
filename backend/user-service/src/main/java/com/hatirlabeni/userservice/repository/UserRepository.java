package com.hatirlabeni.userservice.repository;

import com.hatirlabeni.userservice.entity.User;
import jakarta.validation.constraints.Pattern;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUuid(UUID uuid);

    boolean existsByNationalIdAndIdNot(String s, Long id);

    boolean existsByTelephoneAndIdNot(String s, Long id);

    Optional<User> findByTelephone(String phoneNumber);

    Optional<User> findByNationalId(String nationalId);

    @Query("""
    SELECT u FROM User u
    WHERE LOWER(u.firstName) LIKE LOWER(CONCAT('%', :search, '%'))
       OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :search, '%'))
       OR LOWER(u.telephone) LIKE LOWER(CONCAT('%', :search, '%'))
""")
    Page<User> searchUsers(
            @Param("search") String search,
            Pageable pageable
    );
}
