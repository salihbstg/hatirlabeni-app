package com.hatirlabeni.authentication.exception;

public class MailActivationTokenNotFoundException extends RuntimeException {
    public MailActivationTokenNotFoundException(){
        super("Mail aktivasyon tokeni bulunamadı.");
    }
}
