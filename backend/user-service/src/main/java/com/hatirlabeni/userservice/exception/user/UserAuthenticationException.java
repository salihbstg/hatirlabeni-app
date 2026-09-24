package com.hatirlabeni.userservice.exception.user;

public class UserAuthenticationException extends RuntimeException {
    public UserAuthenticationException() {
        super("Kullanıcı doğrulaması yapılamadı.");
    }
}
