package com.hatirlabeni.userservice.controller;

import com.hatirlabeni.userservice.dtos.user.CreateUserRequest;
import com.hatirlabeni.userservice.dtos.user.UpdateUserRequest;
import com.hatirlabeni.userservice.dtos.user.UserProfileResponse;
import com.hatirlabeni.userservice.dtos.user.UserResponse;
import com.hatirlabeni.userservice.service.interfaces.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
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
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(
        name = "User Management",
        description = "Kullanıcı profil ve hesap işlemleri"
)
public class UserController {

    private final UserService userService;

    // Kullanıcı oluşturma

    @PostMapping("/create-root")
    @Operation(
            summary = "Root kullanıcı oluştur",
            description = "Root kullanıcı hesabı oluşturur."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Root kullanıcı başarıyla oluşturuldu."),
            @ApiResponse(responseCode = "400", description = "Gönderilen bilgiler geçersiz.", content = @Content),
            @ApiResponse(responseCode = "409", description = "Kullanıcı zaten mevcut.", content = @Content)
    })
    public ResponseEntity<Void> createRoot(
            @Valid @RequestBody CreateUserRequest request
    ) {
        userService.createRoot(request);

        return ResponseEntity.noContent().build();
    }

    @PostMapping
    @Operation(
            summary = "Yeni kullanıcı oluştur",
            description = "Verilen bilgiler doğrultusunda yeni bir kullanıcı oluşturur."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Kullanıcı başarıyla oluşturuldu."),
            @ApiResponse(responseCode = "400", description = "Gönderilen bilgiler geçersiz.", content = @Content),
            @ApiResponse(responseCode = "409", description = "Kullanıcı zaten mevcut.", content = @Content),
            @ApiResponse(responseCode = "500", description = "Sunucu tarafında beklenmeyen bir hata oluştu.", content = @Content)
    })
    public ResponseEntity<UserResponse> createUser(
            @Valid @RequestBody CreateUserRequest request
    ) {
        return ResponseEntity
                .created(URI.create(""))
                .body(userService.createUser(request));
    }

    // Kullanıcı profil işlemleri

    @GetMapping("/me")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(
            summary = "Kendi profilimi getir",
            description = "Kimliği doğrulanmış kullanıcının kendi profil bilgilerini getirir."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Kullanıcı profili başarıyla getirildi."),
            @ApiResponse(responseCode = "401", description = "Kullanıcının kimliği doğrulanamadı.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Kullanıcı bulunamadı.", content = @Content)
    })
    public ResponseEntity<UserProfileResponse> getMe() {
        return ResponseEntity.ok(userService.getMe());
    }

    @PutMapping("/me")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(
            summary = "Kendi profilimi güncelle",
            description = "Kimliği doğrulanmış kullanıcının profil bilgilerini günceller."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Kullanıcı bilgileri başarıyla güncellendi."),
            @ApiResponse(responseCode = "400", description = "Gönderilen bilgiler geçersiz.", content = @Content),
            @ApiResponse(responseCode = "401", description = "Kullanıcının kimliği doğrulanamadı.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Kullanıcı bulunamadı.", content = @Content),
            @ApiResponse(responseCode = "409", description = "Güncellenmek istenen bilgiler başka bir kullanıcıya ait.", content = @Content)
    })
    public ResponseEntity<UserProfileResponse> updateMe(
            @Valid @RequestBody UpdateUserRequest request
    ) {
        return ResponseEntity.ok(userService.updateUser(request));
    }

    // Hesap durumu kontrolleri

    @GetMapping("/isActive/{uuid}")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(
            summary = "Kullanıcının aktiflik durumunu kontrol et",
            description = "UUID bilgisi verilen kullanıcının aktif olup olmadığını kontrol eder. Auth Service tarafından kullanılmaktadır."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Kullanıcının aktiflik durumu başarıyla kontrol edildi."),
            @ApiResponse(responseCode = "401", description = "Kullanıcının kimliği doğrulanamadı.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Bu işlem için gerekli yetki bulunmuyor.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Kullanıcı bulunamadı.", content = @Content)
    })
    public ResponseEntity<Boolean> isActive(
            @Parameter(
                    description = "Aktiflik durumu kontrol edilecek kullanıcının UUID'si",
                    required = true
            )
            @PathVariable UUID uuid,

            @Parameter(
                    description = "Bearer JWT access token",
                    required = true
            )
            @RequestHeader("Authorization") String token
    ) {
        return ResponseEntity.ok(userService.isActive(uuid));
    }

    // Mail aktivasyonu

    @PostMapping("/mail-activation/{uuid}")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(
            summary = "Kullanıcının mail adresini aktifleştir",
            description = "UUID bilgisi verilen kullanıcının mail aktivasyonunu gerçekleştirir."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Mail aktivasyonu başarıyla tamamlandı."),
            @ApiResponse(responseCode = "401", description = "Kullanıcının kimliği doğrulanamadı.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Kullanıcı bulunamadı.", content = @Content)
    })
    public ResponseEntity<Void> mailActivation(
            @Parameter(description = "Mail aktivasyonu yapılacak kullanıcının UUID'si", required = true)
            @PathVariable UUID uuid
    ) {
        userService.mailActivation(uuid);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/mail-is-active/{uuid}")
    @Operation(
            summary = "Mail aktivasyon durumunu kontrol et",
            description = "UUID bilgisi verilen kullanıcının mail adresinin aktifleştirilip aktifleştirilmediğini kontrol eder."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Mail aktivasyon durumu başarıyla getirildi."),
            @ApiResponse(responseCode = "404", description = "Kullanıcı bulunamadı.", content = @Content)
    })
    public ResponseEntity<Boolean> mailIsActive(
            @Parameter(description = "Mail aktivasyon durumu kontrol edilecek kullanıcının UUID'si", required = true)
            @PathVariable UUID uuid
    ) {
        return ResponseEntity.ok(userService.mailIsActive(uuid));
    }
}