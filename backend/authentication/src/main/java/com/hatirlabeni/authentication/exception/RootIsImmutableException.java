package com.hatirlabeni.authentication.exception;

public class RootIsImmutableException extends RuntimeException {
    public RootIsImmutableException() {
        super("ROOT rolü değiştirilemez.");
    }
}
