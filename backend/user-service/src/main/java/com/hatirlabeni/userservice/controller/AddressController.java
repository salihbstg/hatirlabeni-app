package com.hatirlabeni.userservice.controller.address;

import com.hatirlabeni.userservice.dtos.address.AddressResponse;
import com.hatirlabeni.userservice.dtos.address.CreateAddressRequest;
import com.hatirlabeni.userservice.dtos.address.UpdateAddressRequest;
import com.hatirlabeni.userservice.service.address.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/address")
public class AddressController {
    private final AddressService addressService;
    @PostMapping
    ResponseEntity<AddressResponse> createAddress(@Valid @RequestBody CreateAddressRequest createAddressRequest) {
        return ResponseEntity.ok(addressService.createAddress(createAddressRequest));
    }
    @GetMapping
    ResponseEntity<List<AddressResponse>> getAllAddresses() {
        return ResponseEntity.ok(addressService.getAllAddresses());
    }
    @DeleteMapping
    ResponseEntity<Void> deleteAddress(@RequestParam Long addressId) {
        addressService.deleteAddress(addressId);
        return ResponseEntity.noContent().build();
    }
    @PutMapping
    ResponseEntity<AddressResponse> updateAddress(@Valid @RequestBody UpdateAddressRequest updateAddressRequest, @RequestParam Long addressId) {
        return addressService.updateAddress(updateAddressRequest,addressId);
    }
}
