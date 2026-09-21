package com.hatirlabeni.userservice.service.address;

import com.hatirlabeni.userservice.dtos.address.AddressResponse;
import com.hatirlabeni.userservice.dtos.address.CreateAddressRequest;
import com.hatirlabeni.userservice.dtos.address.UpdateAddressRequest;
import com.hatirlabeni.userservice.entity.Address;
import com.hatirlabeni.userservice.entity.User;
import com.hatirlabeni.userservice.exception.AddressNotFoundException;
import com.hatirlabeni.userservice.exception.UserNotFoundException;
import com.hatirlabeni.userservice.mapper.AddressMapper;
import com.hatirlabeni.userservice.repository.AddressRepository;
import com.hatirlabeni.userservice.repository.UserRepository;
import com.hatirlabeni.userservice.security.SecurityContextHelper;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AddressService {
    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;
    private final SecurityContextHelper securityContextHelper;
    private final UserRepository userRepository;

    private UUID getUUIDFromToken() {
        return securityContextHelper.getCurrentUser().uuid();
    }
    public AddressResponse createAddress(CreateAddressRequest createAddressRequest) {
        Address address = addressMapper.toEntity(createAddressRequest);
        address.setUserUUID(securityContextHelper.getCurrentUser().uuid());
        return addressMapper.toResponse(addressRepository.save(address));
    }

    public List<AddressResponse> getAllAddresses() {
        UUID uuid = securityContextHelper.getCurrentUser().uuid();
        List<Address> addresses = addressRepository.findAddressesByUserUUID(uuid);
        List<AddressResponse> addressResponses = new ArrayList<>();
        addresses.forEach(address -> addressResponses.add(addressMapper.toResponse(address)));
        return addressResponses;
    }

    public void deleteAddress(Long addressId) {
        User user = userRepository.findByUuid(getUUIDFromToken()).orElseThrow(UserNotFoundException::new);
        Address address = addressRepository.findById(addressId).orElseThrow(AddressNotFoundException::new);
        if(!address.getUserUUID().equals(user.getUuid())) {
            throw new AddressNotFoundException();
        }
        addressRepository.deleteById(addressId);
    }

    public ResponseEntity<AddressResponse> updateAddress(UpdateAddressRequest updateAddressRequest, Long addressId) {
        User user = userRepository.findByUuid(getUUIDFromToken()).orElseThrow(UserNotFoundException::new);
        Address address = addressRepository.findById(addressId).orElseThrow(AddressNotFoundException::new);
        if(!address.getUserUUID().equals(user.getUuid())) {
            throw new AddressNotFoundException();
        }
        addressMapper.updateAddress(address,updateAddressRequest);
        return ResponseEntity.ok(addressMapper.toResponse(addressRepository.save(address)));
    }
}
