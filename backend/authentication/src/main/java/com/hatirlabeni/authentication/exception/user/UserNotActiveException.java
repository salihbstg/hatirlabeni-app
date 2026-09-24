package com.hatirlabeni.authentication.exception;

public class UserNotActiveException extends RuntimeException {
    public UserNotActiveException() {
        super("Kullanıcı yasaklanmıştır.");
    }
}
