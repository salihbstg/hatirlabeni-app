package com.hatirlabeni.productservice.exception.category;

public class EraCategoryNotFoundException extends RuntimeException {
    public EraCategoryNotFoundException() {
        super("Döneme ait bir kategori bulunamadı.");
    }
}
