package com.hatirlabeni.authentication.exception.mail;

public class ChangeMailTokenNotFoundException extends RuntimeException{
    public ChangeMailTokenNotFoundException() {
        super("İletilen token geçersizdir.");
    }
}
