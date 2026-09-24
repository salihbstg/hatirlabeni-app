package com.hatirlabeni.userservice.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {
        super("Kullanıcı bulunamadı.");
    }
}
