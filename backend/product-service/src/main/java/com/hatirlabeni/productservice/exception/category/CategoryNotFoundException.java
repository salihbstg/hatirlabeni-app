package com.hatirlabeni.productservice.exception.category;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException() {
        super("Kategori bulunamadı.");
    }
}
