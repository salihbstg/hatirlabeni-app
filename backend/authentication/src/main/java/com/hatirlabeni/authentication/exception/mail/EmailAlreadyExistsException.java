package com.hatirlabeni.authentication.exception.mail;

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException() {
        super("Mail adresi zaten kayıtlı");
    }
}
