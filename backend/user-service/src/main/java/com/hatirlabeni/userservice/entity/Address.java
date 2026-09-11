package com.hatirlabeni.userservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private UUID userUUID;
    @NotNull
    private String title;
    @NotNull
    private String city;
    @NotNull
    private String district;
    @NotNull
    private String neighborhood;
    @NotNull
    private String postalCode;
    @NotNull
    private String addressLine;
}
