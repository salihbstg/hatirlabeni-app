package com.hatirlabeni.authentication.exception.user;

public class UserNotActiveException extends RuntimeException {
    public UserNotActiveException() {
        super("Kullanıcı yasaklanmıştır.");
    }
}
