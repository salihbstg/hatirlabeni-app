package com.hatirlabeni.authentication.exception.admin;

public class RootIsImmutableException extends RuntimeException {
    public RootIsImmutableException() {
        super("ROOT rolü değiştirilemez.");
    }
}
