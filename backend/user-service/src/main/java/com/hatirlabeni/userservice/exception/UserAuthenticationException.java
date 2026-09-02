package com.hatirlabeni.userservice.exception;

public class UserAuthenticationException extends RuntimeException {
    public UserAuthenticationException() {
        super("Kullanıcı doğrulaması yapılamadı.");
    }
}
