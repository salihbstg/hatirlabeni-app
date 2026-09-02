package com.hatirlabeni.authentication.controller;

import com.hatirlabeni.authentication.dtos.*;
import com.hatirlabeni.authentication.service.interfaces.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@Tag(
        name = "Authentication",
        description = "Kullanıcı kimlik doğrulama ve hesap işlemleri"
)
public class AuthController {

    private final AuthService authService;

    @Operation(
            summary = "Yeni kullanıcı kaydı oluştur",
            description = "Verilen bilgiler doğrultusunda yeni bir kullanıcı hesabı oluşturur."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "Kullanıcı başarıyla kaydedildi."
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Gönderilen bilgiler geçersiz."
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "Kullanıcı adı veya email adresi zaten mevcut."
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Sunucu tarafında beklenmeyen bir hata oluştu."
            )
    })
    @PostMapping("/register")
    ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest registerRequest
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(authService.register(registerRequest));
    }

    @Operation(
            summary = "Kullanıcı girişi yap",
            description = "Kullanıcı adı veya email ve şifre ile kimlik doğrulaması yapar ve JWT access token döndürür."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Giriş başarılı."
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Gönderilen bilgiler geçersiz."
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Kullanıcı adı/email veya şifre hatalı."
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Kullanıcı hesabı aktif değil."
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Sunucu tarafında beklenmeyen bir hata oluştu."
            )
    })
    @PostMapping("/login")
    ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest loginRequest
    ) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @Operation(
            summary = "Access token yenile",
            description = "Geçerli bir refresh token kullanarak yeni bir access token oluşturur."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Access token başarıyla yenilendi."
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Refresh token bilgisi geçersiz."
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Refresh token geçersiz veya süresi dolmuş."
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Kullanıcı hesabı aktif değil."
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Sunucu tarafında beklenmeyen bir hata oluştu."
            )
    })
    @PostMapping("/refresh")
    ResponseEntity<LoginResponse> refresh(
            @Valid @RequestBody RefreshTokenRequest refreshTokenRequest
    ) {
        return ResponseEntity.ok(authService.refresh(refreshTokenRequest));
    }

    @Operation(
            summary = "UUID ile kullanıcı getir",
            description = "Verilen UUID bilgisine ait kullanıcıyı getirir."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Kullanıcı başarıyla bulundu."
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Kullanıcının kimliği doğrulanamadı."
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "UUID bilgisine ait kullanıcı bulunamadı."
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Sunucu tarafında beklenmeyen bir hata oluştu."
            )
    })
    @GetMapping("/users/uuid/{uuid}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<AuthUserResponse> getByUuid(
            @Parameter(
                    description = "Kullanıcının UUID'si",
                    required = true
            )
            @PathVariable("uuid") UUID uuid
    ) {
        return ResponseEntity.ok(authService.getByUuid(uuid));
    }
}