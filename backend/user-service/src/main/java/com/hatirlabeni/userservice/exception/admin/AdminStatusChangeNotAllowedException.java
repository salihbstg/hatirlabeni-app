package com.hatirlabeni.userservice.exception.admin;

public class AdminStatusChangeNotAllowedException extends RuntimeException {
    public AdminStatusChangeNotAllowedException() {
        super("Admin deaktif edilemez.");
    }
}
