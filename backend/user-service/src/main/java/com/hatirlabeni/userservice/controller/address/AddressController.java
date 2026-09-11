package com.hatirlabeni.userservice.controller.address;

import com.hatirlabeni.userservice.dtos.address.AddressResponse;
import com.hatirlabeni.userservice.dtos.address.CreateAddressRequest;
import com.hatirlabeni.userservice.service.address.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/address")
public class AddressController {
    private final AddressService addressService;
    @PostMapping
    ResponseEntity<AddressResponse> createAddress(@RequestBody CreateAddressRequest createAddressRequest) {
        return ResponseEntity.ok(addressService.createAddress(createAddressRequest));
    }
}
