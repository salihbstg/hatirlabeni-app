package com.hatirlabeni.authentication.exception;

import lombok.Getter;

import java.util.List;

@Getter
public class UserAlreadyExistsException extends RuntimeException{
    private final List<String> messages;

    public UserAlreadyExistsException(List<String> messages) {
        this.messages = messages;
    }


}
