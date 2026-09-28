package com.hatirlabeni.productservice.exception.category;

public class ParentCategoryNotAllowedException extends RuntimeException {
    public ParentCategoryNotAllowedException(String message) {
        super(message);
    }
}
