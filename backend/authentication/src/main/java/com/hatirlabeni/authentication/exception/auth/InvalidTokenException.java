package com.hatirlabeni.authentication.exception.auth;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(String invalidRefreshToken) {
    }
}
