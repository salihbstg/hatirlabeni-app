package com.hatirlabeni.authentication.exception.admin;

public class AlreadyUserException extends RuntimeException {
    public AlreadyUserException() {
        super("Kullanıcı rolü zaten 'USER'");
    }
}
