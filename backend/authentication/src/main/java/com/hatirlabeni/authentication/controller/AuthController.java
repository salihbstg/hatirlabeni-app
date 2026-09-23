package com.hatirlabeni.authentication.controller;

import com.hatirlabeni.authentication.dtos.*;
import com.hatirlabeni.authentication.security.JwtCookieService;
import com.hatirlabeni.authentication.service.interfaces.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(
        name = "Authentication",
        description = "Kullanıcı kimlik doğrulama ve hesap işlemleri"
)
public class AuthController {

    private final AuthService authService;
    private final JwtCookieService jwtCookieService;

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
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest registerRequest
    ) {
        RegisterResponse response = authService.register(registerRequest);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @Operation(
            summary = "Kullanıcı girişi yap",
            description = "Kullanıcı adı veya email ve şifre ile kimlik doğrulaması yapar. " +
                    "Access token response body'de, refresh token ise HttpOnly Cookie olarak döndürülür."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Giriş başarılı. Access token response body'de, refresh token HttpOnly Cookie olarak döndürülür."
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
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest loginRequest
    ) {
        LoginResult loginResult = authService.login(loginRequest);

        ResponseCookie refreshCookie =
                jwtCookieService.createRefreshTokenCookie(
                        loginResult.refreshToken()
                );

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(loginResult.loginResponse());
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
    public ResponseEntity<LoginResponse> refresh(
            @CookieValue(
                    value = "refreshToken",
                    required = false
            )
            String refreshToken
    ) {
        if (refreshToken == null || refreshToken.isBlank()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        LoginResult loginResult = authService.refresh(refreshToken);

        ResponseCookie refreshCookie =
                jwtCookieService.createRefreshTokenCookie(
                        loginResult.refreshToken()
                );

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(loginResult.loginResponse());
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {

        jwtCookieService.clearRefreshTokenCookie(response);
        return ResponseEntity.noContent().build();
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
            @PathVariable UUID uuid
    ) {
        return ResponseEntity.ok(authService.getByUuid(uuid));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest forgotPasswordRequest
    ) {
        authService.forgotPassword(forgotPasswordRequest);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(
            @Valid @RequestBody ResetPasswordRequest resetPasswordRequest
    ) {
        authService.resetPassword(resetPasswordRequest);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/mail-activation")
    public ResponseEntity<Void> createAndSendActivationToken() {
        authService.createAndSendActivationToken();

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/mail-verify")
    public ResponseEntity<Void> verifyMail(
            @Valid @RequestBody VerifyMailRequest verifyMailRequest
    ) {
        authService.verifyAndConsumeActivationToken(verifyMailRequest);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestHeader("Authorization") String authHeader,@Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build();
        }
        String token = authHeader.substring(7);
        authService.changePassword(token, changePasswordRequest);
        return ResponseEntity.ok().build();
    }
}