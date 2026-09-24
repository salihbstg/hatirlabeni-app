package com.hatirlabeni.userservice.service.address;

import com.hatirlabeni.userservice.dtos.address.AddressResponse;
import com.hatirlabeni.userservice.dtos.address.CreateAddressRequest;
import com.hatirlabeni.userservice.dtos.address.UpdateAddressRequest;
import com.hatirlabeni.userservice.entity.Address;
import com.hatirlabeni.userservice.entity.User;
import com.hatirlabeni.userservice.exception.address.AddressNotFoundException;
import com.hatirlabeni.userservice.exception.user.UserNotFoundException;
import com.hatirlabeni.userservice.mapper.AddressMapper;
import com.hatirlabeni.userservice.repository.AddressRepository;
import com.hatirlabeni.userservice.repository.UserRepository;
import com.hatirlabeni.userservice.security.SecurityContextHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;
    private final SecurityContextHelper securityContextHelper;
    private final UserRepository userRepository;

    // Adres oluşturma

    public AddressResponse createAddress(CreateAddressRequest request) {
        Address address = addressMapper.toEntity(request);
        address.setUserUUID(getCurrentUserUUID());

        Address savedAddress = addressRepository.save(address);

        return addressMapper.toResponse(savedAddress);
    }

    // Kullanıcının adreslerini listeleme

    public List<AddressResponse> getAllAddresses() {
        List<Address> addresses =
                addressRepository.findAddressesByUserUUID(getCurrentUserUUID());

        return addresses.stream()
                .map(addressMapper::toResponse)
                .toList();
    }

    // Adres güncelleme

    public AddressResponse updateAddress(
            UpdateAddressRequest request,
            Long addressId
    ) {
        Address address = getAddressForCurrentUser(addressId);

        addressMapper.updateAddress(address, request);

        Address updatedAddress = addressRepository.save(address);

        return addressMapper.toResponse(updatedAddress);
    }

    // Adres silme

    public void deleteAddress(Long addressId) {
        Address address = getAddressForCurrentUser(addressId);

        addressRepository.delete(address);
    }

    // Yardımcı metotlar

    private UUID getCurrentUserUUID() {
        return securityContextHelper.getCurrentUser().uuid();
    }

    private Address getAddressForCurrentUser(Long addressId) {
        User user = userRepository.findByUuid(getCurrentUserUUID())
                .orElseThrow(UserNotFoundException::new);

        Address address = addressRepository.findById(addressId)
                .orElseThrow(AddressNotFoundException::new);

        if (!address.getUserUUID().equals(user.getUuid())) {
            throw new AddressNotFoundException();
        }

        return address;
    }
}