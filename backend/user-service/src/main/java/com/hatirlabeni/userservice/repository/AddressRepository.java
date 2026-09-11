package com.hatirlabeni.userservice.repository;

import com.hatirlabeni.userservice.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
