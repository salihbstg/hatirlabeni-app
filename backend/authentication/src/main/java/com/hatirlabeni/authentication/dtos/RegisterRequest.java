package com.hatirlabeni.authentication.dtos;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record RegisterRequest
        (
                @NotBlank(message = "Kullanıcı adı boş olamaz.")
                @Pattern(
                        regexp = "^[a-zA-Z0-9._]{3,20}$",
                        message = "Kullanıcı adı 3-20 karakter arasında olmalı ve sadece harf, rakam, nokta (.) ve alt çizgi (_) içerebilir."
                )
                String username,

                @NotBlank(message = "E-posta adresi boş olamaz.")
                @Email(message = "Geçerli bir e-posta adresi giriniz.")
                String email,

                @NotBlank(message = "Şifre boş olamaz.")
                @Pattern(
                        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.#_\\-])[A-Za-z\\d@$!%*?&.#_\\-]{8,}$",
                        message = "Şifre en az 8 karakter olmalı ve en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir."
                )
                String password,

                @NotBlank(message = "Ad boş olamaz.")
                @Size(max = 50, message = "Ad en fazla 50 karakter olabilir.")
                String firstName,

                @NotBlank(message = "Soyad boş olamaz.")
                @Size(max = 50, message = "Soyad en fazla 50 karakter olabilir.")
                String lastName,

                @NotBlank(message = "T.C. kimlik numarası boş olamaz.")
                @Pattern(
                        regexp = "^[0-9]{11}$",
                        message = "T.C. kimlik numarası 11 haneli olmalıdır."
                )
                String nationalId,

                @NotBlank(message = "Telefon numarası boş olamaz.")
                @Pattern(
                        regexp = "^(\\+90|0)?5[0-9]{9}$",
                        message = "Geçerli bir telefon numarası giriniz."
                )
                String telephone,

                @NotBlank(message = "Şehir boş olamaz.")
                @Size(max = 50, message = "Şehir en fazla 50 karakter olabilir.")
                String city,

                @NotBlank(message = "Adres boş olamaz.")
                @Size(max = 250, message = "Adres en fazla 250 karakter olabilir.")
                String address,

                @NotNull(message = "Doğum tarihi boş olamaz.")
                @Past(message = "Doğum tarihi geçmiş bir tarih olmalıdır.")
                LocalDate birthday
)
{}
