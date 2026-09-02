package com.hatirlabeni.authentication.exception;

public class AlreadyUserException extends RuntimeException {
    public AlreadyUserException() {
        super("Kullanıcı rolü zaten 'USER'");
    }
}
