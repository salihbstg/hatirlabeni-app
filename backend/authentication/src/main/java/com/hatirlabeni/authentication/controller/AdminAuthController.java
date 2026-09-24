package com.hatirlabeni.authentication.controller;

import com.hatirlabeni.authentication.dtos.user.AuthUserResponse;
import com.hatirlabeni.authentication.feign.UserServiceFeign;
import com.hatirlabeni.authentication.service.interfaces.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth/users/admin")
@Tag(
        name = "Admin Authentication Management",
        description = "Admin kullanıcı kimlik doğrulama ve yönetim işlemleri"
)
public class AdminAuthController {

    private final UserServiceFeign userServiceFeign;
    private final AuthService authService;

    @Operation(
            summary = "Kullanıcıyı sil",
            description = "Belirtilen UUID'ye sahip kullanıcının User Service ve Authentication Service kayıtlarını siler."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "Kullanıcı kayıtları başarıyla silindi."
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Kimlik doğrulaması başarısız veya erişim token'ı geçersiz."
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Bu işlem için ADMIN yetkisi gereklidir."
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Belirtilen UUID'ye sahip kullanıcı bulunamadı."
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Sunucu tarafında beklenmeyen bir hata oluştu."
            )
    })
    @DeleteMapping("/{uuid}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Void> deleteUser(
            @Parameter(
                    description = "Silinecek kullanıcının UUID değeri",
                    required = true
            )
            @PathVariable UUID uuid
    ) {
        userServiceFeign.deleteUser(uuid);
        authService.deleteAuthUser(uuid);

        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "E-posta adresinden kullanıcı bilgilerini getir",
            description = "Belirtilen e-posta adresine sahip kullanıcının Auth Service üzerindeki UUID ve kimlik bilgilerini getirir."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Kullanıcı bilgileri başarıyla getirildi."
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Kimlik doğrulaması başarısız veya erişim token'ı geçersiz."
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Bu işlem için ADMIN yetkisi gereklidir."
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Belirtilen e-posta adresine sahip kullanıcı bulunamadı."
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Sunucu tarafında beklenmeyen bir hata oluştu."
            )
    })
    @GetMapping("/email")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<AuthUserResponse> getAuthUserByEmail(
            @Parameter(
                    description = "Aranacak kullanıcının e-posta adresi",
                    required = true
            )
            @RequestParam("email") String email
    ) {
        return ResponseEntity.ok(authService.getUuidByEmail(email));
    }
}