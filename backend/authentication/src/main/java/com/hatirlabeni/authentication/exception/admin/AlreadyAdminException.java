package com.hatirlabeni.authentication.exception.admin;

public class AlreadyAdminException extends RuntimeException {
    public AlreadyAdminException() {
        super("Kullanıcı rolü zaten 'ADMIN'");
    }
}
