package com.hatirlabeni.authentication.exception.user;

public class AlreadyUserException extends RuntimeException {
    public AlreadyUserException() {
        super("Kullanıcı rolü zaten 'USER'");
    }
}
