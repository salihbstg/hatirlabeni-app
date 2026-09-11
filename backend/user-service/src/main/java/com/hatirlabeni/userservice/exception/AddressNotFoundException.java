package com.hatirlabeni.userservice.exception;

public class AddressNotFoundException extends RuntimeException {
    public AddressNotFoundException() {
        super("Adres bulunamadı.");
    }
}
