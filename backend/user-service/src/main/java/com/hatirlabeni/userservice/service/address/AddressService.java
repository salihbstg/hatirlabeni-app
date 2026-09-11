package com.hatirlabeni.userservice.service.address;

import com.hatirlabeni.userservice.dtos.address.AddressResponse;
import com.hatirlabeni.userservice.dtos.address.CreateAddressRequest;
import com.hatirlabeni.userservice.entity.Address;
import com.hatirlabeni.userservice.mapper.AddressMapper;
import com.hatirlabeni.userservice.repository.AddressRepository;
import com.hatirlabeni.userservice.security.SecurityContextHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressService {
    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;
    private final SecurityContextHelper securityContextHelper;
    public AddressResponse createAddress(CreateAddressRequest createAddressRequest) {
        Address address = addressMapper.toEntity(createAddressRequest);
        address.setUserUUID(securityContextHelper.getCurrentUser().uuid());
        return addressMapper.toResponse(addressRepository.save(address));
    }
}
