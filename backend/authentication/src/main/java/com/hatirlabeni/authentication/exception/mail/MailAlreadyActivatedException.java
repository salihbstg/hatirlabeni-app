package com.hatirlabeni.authentication.exception.mail;

public class MailAlreadyActivatedException extends RuntimeException {
    public MailAlreadyActivatedException(){
        super("Mail aktivasyonu daha önce yapılmış. ");
    }
}
