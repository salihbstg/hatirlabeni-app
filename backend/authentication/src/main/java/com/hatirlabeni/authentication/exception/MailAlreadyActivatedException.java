package com.hatirlabeni.authentication.exception;

public class MailAlreadyActivatedException extends RuntimeException {
    public MailAlreadyActivatedException(){
        super("Mail aktivasyonu daha önce yapılmış. ");
    }
}
