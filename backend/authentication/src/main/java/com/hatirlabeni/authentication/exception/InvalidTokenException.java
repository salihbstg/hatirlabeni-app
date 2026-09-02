package com.hatirlabeni.authentication.exception;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(String invalidRefreshToken) {
    }
}
