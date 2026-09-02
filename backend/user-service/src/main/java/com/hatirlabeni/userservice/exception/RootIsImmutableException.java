package com.hatirlabeni.userservice.exception;

public class RootIsImmutableException extends RuntimeException {
    public RootIsImmutableException() {
        super("Root rolünde değişiklik yapılamaz.");
    }
}
