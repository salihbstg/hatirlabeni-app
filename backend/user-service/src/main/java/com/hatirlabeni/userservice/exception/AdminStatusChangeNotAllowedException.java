package com.hatirlabeni.userservice.exception;

public class AdminStatusChangeNotAllowedException extends RuntimeException {
    public AdminStatusChangeNotAllowedException() {
        super("Admin deaktif edilemez.");
    }
}
