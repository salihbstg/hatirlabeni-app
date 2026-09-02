package com.hatirlabeni.authentication.controller;

import com.hatirlabeni.authentication.dtos.AuthUserResponse;
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
import org.springframework.web.bind.annotation.*;

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
            description = "UUID bilgisi verilen kullanıcının authentication ve kullanıcı kayıtlarını siler."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "Kullanıcı başarıyla silindi."
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Kullanıcının kimliği doğrulanamadı."
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Bu işlem için ADMIN yetkisi gereklidir."
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
    @DeleteMapping("/{uuid}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Void> deleteUser(
            @Parameter(
                    description = "Silinecek kullanıcının UUID'si",
                    required = true
            )
            @PathVariable("uuid") UUID uuid
    ) {
        userServiceFeign.deleteUser(uuid);
        authService.deleteAuthUser(uuid);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Email adresinden kullanıcı UUID'sini getir",
            description = "Verilen email adresine ait kullanıcının UUID bilgisini getirir."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Kullanıcı UUID'si başarıyla getirildi."
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Kullanıcının kimliği doğrulanamadı."
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Bu işlem için ADMIN yetkisi gereklidir."
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Email adresine ait kullanıcı bulunamadı."
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
                    description = "Kullanıcının email adresi",
                    required = true
            )
            @RequestParam("email") String email
    ) {
        return ResponseEntity.ok(authService.getUuidByEmail(email));
    }
}