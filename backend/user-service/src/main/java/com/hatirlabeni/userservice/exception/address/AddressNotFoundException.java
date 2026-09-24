package com.hatirlabeni.userservice.exception.address;

public class AddressNotFoundException extends RuntimeException {
    public AddressNotFoundException() {
        super("Adres bulunamadı.");
    }
}
