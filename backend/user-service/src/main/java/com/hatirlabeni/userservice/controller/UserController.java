package com.hatirlabeni.userservice.controller;

import com.hatirlabeni.userservice.dtos.CreateUserRequest;
import com.hatirlabeni.userservice.dtos.UpdateUserRequest;
import com.hatirlabeni.userservice.dtos.UserProfileResponse;
import com.hatirlabeni.userservice.dtos.UserResponse;
import com.hatirlabeni.userservice.service.interfaces.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
@Tag(
        name = "User Management",
        description = "Kullanıcı profil ve hesap işlemleri"
)
public class UserController {

    private final UserService userService;

    @Operation(
            summary = "Yeni kullanıcı oluştur",
            description = "Verilen bilgiler doğrultusunda yeni bir kullanıcı oluşturur."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "Kullanıcı başarıyla oluşturuldu."
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Gönderilen bilgiler geçersiz."
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "Kullanıcı zaten mevcut."
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Sunucu tarafında beklenmeyen bir hata oluştu."
            )
    })
    @PostMapping
    ResponseEntity<UserResponse> createUser(
            @Valid @RequestBody CreateUserRequest createUserRequest
    ) {
        return ResponseEntity
                .created(URI.create(""))
                .body(userService.createUser(createUserRequest));
    }

    @Operation(
            summary = "Kendi profilimi getir",
            description = "Kimliği doğrulanmış kullanıcının kendi profil bilgilerini getirir."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Kullanıcı profili başarıyla getirildi."
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Kullanıcının kimliği doğrulanamadı."
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Kullanıcı bulunamadı."
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Sunucu tarafında beklenmeyen bir hata oluştu."
            )
    })
    @GetMapping("/me")
    @SecurityRequirement(name = "bearerAuth")
    ResponseEntity<UserProfileResponse> getMe() {
        return ResponseEntity.ok(userService.getMe());
    }

    @Operation(
            summary = "Kendi profilimi güncelle",
            description = "Kimliği doğrulanmış kullanıcının profil bilgilerini günceller."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Kullanıcı bilgileri başarıyla güncellendi."
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Gönderilen bilgiler geçersiz."
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Kullanıcının kimliği doğrulanamadı."
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Kullanıcı bulunamadı."
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "Güncellenmek istenen bilgiler başka bir kullanıcıya ait."
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Sunucu tarafında beklenmeyen bir hata oluştu."
            )
    })
    @PutMapping("/me")
    @SecurityRequirement(name = "bearerAuth")
    ResponseEntity<UserProfileResponse> updateMe(
            @Valid @RequestBody UpdateUserRequest updateUserRequest
    ) {
        return ResponseEntity.ok(
                userService.updateUser(updateUserRequest)
        );
    }

    @Operation(
            summary = "Kullanıcının aktiflik durumunu kontrol et",
            description = "UUID bilgisi verilen kullanıcının aktif olup olmadığını kontrol eder. Bu endpoint kimlik doğrulaması gerektirir ve Auth Service tarafından kullanılmaktadır."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Kullanıcının aktiflik durumu başarıyla kontrol edildi."
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Kullanıcının kimliği doğrulanamadı."
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Bu işlem için gerekli yetki bulunmuyor."
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Kullanıcı bulunamadı."
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Sunucu tarafında beklenmeyen bir hata oluştu."
            )
    })
    @GetMapping("/isActive/{uuid}")
    @SecurityRequirement(name = "bearerAuth")
    ResponseEntity<Boolean> isActive(
            @Parameter(
                    description = "Aktiflik durumu kontrol edilecek kullanıcının UUID'si",
                    required = true
            )
            @PathVariable(name = "uuid") UUID uuid,

            @Parameter(
                    description = "Bearer JWT access token",
                    required = true
            )
            @RequestHeader("Authorization") String token
    ) {
        return ResponseEntity.ok(userService.isActive(uuid));
    }
}