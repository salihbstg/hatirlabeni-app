package com.hatirlabeni.userservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_users_uuid",
                        columnNames = "uuid"
                ),
                @UniqueConstraint(
                        name = "uk_users_national_id",
                        columnNames = "national_id"
                ),
                @UniqueConstraint(
                        name = "uk_users_telephone",
                        columnNames = "telephone"
                )
        }
)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    private UUID uuid;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String nationalId;

    @Column(nullable = false)
    private String telephone;

    @Column(nullable = false)
    private LocalDate birthday;

    @Column(nullable = false)
    private boolean active;

    private boolean mailActivation;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.mailActivation = false;
        this.active = true;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}