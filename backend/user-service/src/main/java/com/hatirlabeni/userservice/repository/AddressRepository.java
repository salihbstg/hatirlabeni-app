package com.hatirlabeni.userservice.repository;

import com.hatirlabeni.userservice.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAddressesByUserUUID(UUID uuid);
}
