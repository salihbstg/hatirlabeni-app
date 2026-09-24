package com.hatirlabeni.authentication.controller;

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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admins")
@Tag(
        name = "Admin Management",
        description = "ROOT yetkisine sahip kullanıcıların ADMIN rolünü yönetmesini sağlayan endpoint'ler."
)
public class AdminManagementController {

    private final AuthService authService;

    @Operation(
            summary = "Kullanıcıya ADMIN rolü ver",
            description = "Belirtilen UUID'ye sahip kullanıcının rolünü ADMIN olarak günceller. " +
                    "Bu işlem yalnızca ROOT yetkisine sahip kullanıcılar tarafından gerçekleştirilebilir."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "Kullanıcının rolü başarıyla ADMIN olarak güncellendi."
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Kullanıcının kimliği doğrulanamadı."
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Bu işlem için ROOT yetkisi gereklidir."
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Belirtilen UUID'ye sahip kullanıcı bulunamadı."
            )
    })
    @PostMapping("/{uuid}")
    @PreAuthorize("hasRole('ROOT')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Void> makeAdminByUUID(
            @Parameter(
                    description = "ADMIN rolü verilecek kullanıcının UUID'si.",
                    required = true
            )
            @PathVariable UUID uuid
    ) {
        authService.makeAdmin(uuid);

        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Kullanıcının ADMIN rolünü kaldır",
            description = "Belirtilen UUID'ye sahip kullanıcının ADMIN rolünü kaldırarak USER rolüne dönüştürür. " +
                    "Bu işlem yalnızca ROOT yetkisine sahip kullanıcılar tarafından gerçekleştirilebilir."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "Kullanıcının ADMIN rolü başarıyla kaldırıldı."
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Kullanıcının kimliği doğrulanamadı."
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Bu işlem için ROOT yetkisi gereklidir."
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Belirtilen UUID'ye sahip kullanıcı bulunamadı."
            )
    })
    @DeleteMapping("/{uuid}")
    @PreAuthorize("hasRole('ROOT')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Void> deleteAdminByUUID(
            @Parameter(
                    description = "ADMIN rolü kaldırılacak kullanıcının UUID'si.",
                    required = true
            )
            @PathVariable UUID uuid
    ) {
        authService.makeUser(uuid);

        return ResponseEntity.noContent().build();
    }
}