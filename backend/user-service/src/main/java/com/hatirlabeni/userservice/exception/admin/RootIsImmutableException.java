package com.hatirlabeni.userservice.exception.admin;

public class RootIsImmutableException extends RuntimeException {
    public RootIsImmutableException() {
        super("Root rolünde değişiklik yapılamaz.");
    }
}
