package com.hatirlabeni.userservice.mapper;

import com.hatirlabeni.userservice.dtos.address.AddressResponse;
import com.hatirlabeni.userservice.dtos.address.CreateAddressRequest;
import com.hatirlabeni.userservice.entity.Address;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    @Mapping(target = "userUUID",ignore = true)
    Address toEntity(CreateAddressRequest createAddressRequest);
    AddressResponse toResponse(Address address);
}
