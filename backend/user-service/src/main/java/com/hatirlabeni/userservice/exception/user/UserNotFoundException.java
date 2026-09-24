package com.hatirlabeni.userservice.exception.user;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {
        super("Kullanıcı bulunamadı.");
    }
}
