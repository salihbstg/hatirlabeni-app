package com.hatirlabeni.authentication.exception.auth;

public class InvalidPasswordException extends RuntimeException {
    public InvalidPasswordException() {
        super("İletilen şifre hatalıdır.");
    }
}
