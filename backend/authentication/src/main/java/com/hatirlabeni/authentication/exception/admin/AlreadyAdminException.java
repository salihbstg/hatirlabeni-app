package com.hatirlabeni.authentication.exception;

public class AlreadyAdminException extends RuntimeException {
    public AlreadyAdminException() {
        super("Kullanıcı rolü zaten 'ADMIN'");
    }
}
