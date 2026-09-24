package com.hatirlabeni.userservice.controller;

import com.hatirlabeni.userservice.dtos.address.AddressResponse;
import com.hatirlabeni.userservice.dtos.address.CreateAddressRequest;
import com.hatirlabeni.userservice.dtos.address.UpdateAddressRequest;
import com.hatirlabeni.userservice.service.address.AddressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/address")
@Tag(name = "Address", description = "User address management endpoints")
public class AddressController {

    private final AddressService addressService;

    @PostMapping
    @Operation(
            summary = "Create address",
            description = "Creates a new address for the authenticated user."
    )
    public ResponseEntity<AddressResponse> createAddress(
            @Valid @RequestBody CreateAddressRequest request
    ) {
        return ResponseEntity.ok(addressService.createAddress(request));
    }

    @GetMapping
    @Operation(
            summary = "Get all addresses",
            description = "Retrieves all addresses belonging to the authenticated user."
    )
    public ResponseEntity<List<AddressResponse>> getAllAddresses() {
        return ResponseEntity.ok(addressService.getAllAddresses());
    }

    @DeleteMapping
    @Operation(
            summary = "Delete address",
            description = "Deletes an address by its ID."
    )
    public ResponseEntity<Void> deleteAddress(
            @RequestParam Long addressId
    ) {
        addressService.deleteAddress(addressId);

        return ResponseEntity.noContent().build();
    }

    @PutMapping
    @Operation(
            summary = "Update address",
            description = "Updates an existing address by its ID."
    )
    public ResponseEntity<AddressResponse> updateAddress(
            @Valid @RequestBody UpdateAddressRequest request,
            @RequestParam Long addressId
    ) {
        return ResponseEntity.ok(addressService.updateAddress(request, addressId));
    }
}