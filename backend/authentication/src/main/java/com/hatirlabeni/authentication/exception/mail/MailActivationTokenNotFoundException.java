package com.hatirlabeni.authentication.exception.mail;

public class MailActivationTokenNotFoundException extends RuntimeException {
    public MailActivationTokenNotFoundException(){
        super("Mail aktivasyon tokeni bulunamadı.");
    }
}
