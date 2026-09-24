package com.hatirlabeni.userservice.controller;

import com.hatirlabeni.userservice.dtos.user.UpdateUserRequest;
import com.hatirlabeni.userservice.dtos.user.UserProfileResponse;
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
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users/admin")
@RequiredArgsConstructor
@Tag(
        name = "Admin User Management",
        description = "Admin kullanıcı yönetimi işlemleri"
)
public class AdminUserController {

    private final UserService userService;

    @DeleteMapping("/{uuid}")
    @PreAuthorize("hasRole('ROOT')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(
            summary = "Kullanıcı sil",
            description = "UUID bilgisi verilen kullanıcıyı siler. Bu işlem ROOT yetkisi gerektirir."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Kullanıcı başarıyla silindi."),
            @ApiResponse(responseCode = "401", description = "Kullanıcının kimliği doğrulanamadı.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Bu işlem için ROOT yetkisi gereklidir.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Kullanıcı bulunamadı.", content = @Content)
    })
    public ResponseEntity<Void> deleteUser(
            @Parameter(description = "Silinecek kullanıcının UUID'si", required = true)
            @PathVariable UUID uuid
    ) {
        userService.deleteUser(uuid);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/email")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(
            summary = "Email ile kullanıcı bul",
            description = "Email adresine göre kullanıcı bilgilerini getirir."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Kullanıcı başarıyla bulundu."),
            @ApiResponse(responseCode = "401", description = "Kullanıcının kimliği doğrulanamadı.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Bu işlem için ADMIN yetkisi gereklidir.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Kullanıcı bulunamadı.", content = @Content)
    })
    public ResponseEntity<UserProfileResponse> getUserByEmail(
            @Parameter(description = "Kullanıcının email adresi", required = true)
            @RequestParam String email
    ) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @GetMapping("/national-id/{nationalId}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(
            summary = "T.C. kimlik numarası ile kullanıcı bul",
            description = "T.C. kimlik numarasına göre kullanıcı bilgilerini getirir."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Kullanıcı başarıyla bulundu."),
            @ApiResponse(responseCode = "401", description = "Kullanıcının kimliği doğrulanamadı.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Bu işlem için ADMIN yetkisi gereklidir.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Kullanıcı bulunamadı.", content = @Content)
    })
    public ResponseEntity<UserProfileResponse> getUserByNationalId(
            @Parameter(description = "Kullanıcının 11 haneli T.C. kimlik numarası", required = true)
            @PathVariable String nationalId
    ) {
        return ResponseEntity.ok(userService.getUserByNationalId(nationalId));
    }

    @GetMapping("/phone/{phoneNumber}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(
            summary = "Telefon numarası ile kullanıcı bul",
            description = "Telefon numarasına göre kullanıcı bilgilerini getirir."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Kullanıcı başarıyla bulundu."),
            @ApiResponse(responseCode = "401", description = "Kullanıcının kimliği doğrulanamadı.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Bu işlem için ADMIN yetkisi gereklidir.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Kullanıcı bulunamadı.", content = @Content)
    })
    public ResponseEntity<UserProfileResponse> getUserByPhoneNumber(
            @Parameter(description = "Kullanıcının telefon numarası", required = true)
            @PathVariable String phoneNumber
    ) {
        return ResponseEntity.ok(userService.getUserByPhoneNumber(phoneNumber));
    }

    @GetMapping("/{uuid}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(
            summary = "UUID ile kullanıcı bul",
            description = "UUID bilgisine göre kullanıcı bilgilerini getirir."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Kullanıcı başarıyla bulundu."),
            @ApiResponse(responseCode = "401", description = "Kullanıcının kimliği doğrulanamadı.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Bu işlem için ADMIN yetkisi gereklidir.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Kullanıcı bulunamadı.", content = @Content)
    })
    public ResponseEntity<UserProfileResponse> getUserByUuid(
            @Parameter(description = "Kullanıcının UUID'si", required = true)
            @PathVariable UUID uuid
    ) {
        return ResponseEntity.ok(userService.getUserByUuid(uuid));
    }

    @PutMapping("/{uuid}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(
            summary = "Kullanıcı bilgilerini güncelle",
            description = "UUID bilgisi verilen kullanıcının bilgilerini admin yetkisiyle günceller."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Kullanıcı bilgileri başarıyla güncellendi."),
            @ApiResponse(responseCode = "400", description = "Gönderilen bilgiler geçersiz.", content = @Content),
            @ApiResponse(responseCode = "401", description = "Kullanıcının kimliği doğrulanamadı.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Bu işlem için ADMIN yetkisi gereklidir.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Kullanıcı bulunamadı.", content = @Content),
            @ApiResponse(responseCode = "409", description = "Güncellenmek istenen bilgiler başka bir kullanıcıya ait.", content = @Content),
            @ApiResponse(responseCode = "500", description = "Sunucu tarafında beklenmeyen bir hata oluştu.", content = @Content)
    })
    public ResponseEntity<UserProfileResponse> updateUser(
            @Parameter(description = "Güncellenecek kullanıcının UUID'si", required = true)
            @PathVariable UUID uuid,
            @Valid @RequestBody UpdateUserRequest request
    ) {
        return ResponseEntity.ok(
                userService.updateUserByUUIDForAdmin(uuid, request)
        );
    }

    @PutMapping("/{uuid}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(
            summary = "Kullanıcının aktiflik durumunu değiştir",
            description = "UUID bilgisi verilen kullanıcının aktiflik durumunu tersine çevirir."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Kullanıcının aktiflik durumu başarıyla değiştirildi."),
            @ApiResponse(responseCode = "401", description = "Kullanıcının kimliği doğrulanamadı.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Bu işlem için ADMIN yetkisi gereklidir.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Kullanıcı bulunamadı.", content = @Content),
            @ApiResponse(responseCode = "500", description = "Sunucu tarafında beklenmeyen bir hata oluştu.", content = @Content)
    })
    public ResponseEntity<UserProfileResponse> changeUserStatus(
            @Parameter(description = "Aktiflik durumu değiştirilecek kullanıcının UUID'si", required = true)
            @PathVariable UUID uuid
    ) {
        return ResponseEntity.ok(userService.changeUserStatus(uuid));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(
            summary = "Kullanıcıları listele",
            description = "Arama kriterine ve sayfalama parametrelerine göre kullanıcıları listeler."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Kullanıcı listesi başarıyla getirildi."),
            @ApiResponse(responseCode = "401", description = "Kullanıcının kimliği doğrulanamadı.", content = @Content),
            @ApiResponse(responseCode = "403", description = "Bu işlem için ADMIN yetkisi gereklidir.", content = @Content)
    })
    public Page<UserProfileResponse> getUsers(
            @Parameter(description = "Kullanıcı bilgileri üzerinde aranacak metin")
            @RequestParam(required = false) String search,

            @ParameterObject Pageable pageable
    ) {
        return userService.getAllUsers(search, pageable);
    }
}