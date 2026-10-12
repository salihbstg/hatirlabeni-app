package com.hatirlabeni.productservice.exception.category;

public class ParentCategoryNotFoundException extends RuntimeException {
    public ParentCategoryNotFoundException(String message) {
        super(message);
    }
}
