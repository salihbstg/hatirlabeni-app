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
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admins")
@Tag(
        name = "Admin Management",
        description = "ROOT yetkisiyle kullanıcıların ADMIN rolü yönetimi"
)
public class AdminManagementController {

    private final AuthService authService;

    @Operation(
            summary = "Kullanıcıyı admin yap",
            description = "UUID bilgisi verilen kullanıcıya ADMIN rolü verir. Bu işlem yalnızca ROOT yetkisine sahip kullanıcılar tarafından gerçekleştirilebilir."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "Kullanıcı başarıyla ADMIN yapıldı."
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
                    description = "Kullanıcı bulunamadı."
            )
    })
    @PostMapping("/{uuid}")
    @PreAuthorize("hasRole('ROOT')")
    @SecurityRequirement(name = "bearerAuth")
    ResponseEntity<Void> makeAdminByUUID(
            @Parameter(
                    description = "ADMIN yapılacak kullanıcının UUID'si",
                    required = true
            )
            @PathVariable("uuid") UUID uuid
    ) {
        authService.makeAdmin(uuid);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Admin yetkisini kaldır",
            description = "UUID bilgisi verilen kullanıcının ADMIN rolünü kaldırarak USER rolüne dönüştürür. Bu işlem yalnızca ROOT yetkisine sahip kullanıcılar tarafından gerçekleştirilebilir."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "Kullanıcının ADMIN yetkisi başarıyla kaldırıldı."
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
                    description = "Kullanıcı bulunamadı."
            )
    })
    @DeleteMapping("/{uuid}")
    @PreAuthorize("hasRole('ROOT')")
    @SecurityRequirement(name = "bearerAuth")
    ResponseEntity<Void> deleteAdminByUUID(
            @Parameter(
                    description = "ADMIN yetkisi kaldırılacak kullanıcının UUID'si",
                    required = true
            )
            @PathVariable("uuid") UUID uuid
    ) {
        authService.makeUser(uuid);
        return ResponseEntity.noContent().build();
    }
}