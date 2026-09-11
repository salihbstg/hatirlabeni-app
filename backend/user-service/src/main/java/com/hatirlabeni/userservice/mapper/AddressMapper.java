package com.hatirlabeni.userservice.mapper;
import com.hatirlabeni.userservice.dtos.address.AddressResponse;
import com.hatirlabeni.userservice.dtos.address.CreateAddressRequest;
import com.hatirlabeni.userservice.dtos.address.UpdateAddressRequest;
import com.hatirlabeni.userservice.entity.Address;
import org.mapstruct.*;


@Mapper(componentModel = "spring")
public interface AddressMapper {
    @Mapping(target = "userUUID",ignore = true)
    Address toEntity(CreateAddressRequest createAddressRequest);
    AddressResponse toResponse(Address address);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userUUID", ignore = true)
    @BeanMapping(
            nullValuePropertyMappingStrategy =
                    NullValuePropertyMappingStrategy.IGNORE
    )
    void updateAddress(
            @MappingTarget Address address,
            UpdateAddressRequest updateAddressRequest
    );
}
