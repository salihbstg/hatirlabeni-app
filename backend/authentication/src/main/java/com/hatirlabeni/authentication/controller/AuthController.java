package com.hatirlabeni.authentication.controller;

import com.hatirlabeni.authentication.dtos.mail.VerifyChangeEmailRequest;
import com.hatirlabeni.authentication.dtos.user.AuthUserResponse;
import com.hatirlabeni.authentication.dtos.login.LoginRequest;
import com.hatirlabeni.authentication.dtos.login.LoginResponse;
import com.hatirlabeni.authentication.dtos.login.LoginResult;
import com.hatirlabeni.authentication.dtos.mail.ChangeEmailRequest;
import com.hatirlabeni.authentication.dtos.mail.VerifyMailRequest;
import com.hatirlabeni.authentication.dtos.password.ChangePasswordRequest;
import com.hatirlabeni.authentication.dtos.password.ForgotPasswordRequest;
import com.hatirlabeni.authentication.dtos.register.RegisterRequest;
import com.hatirlabeni.authentication.dtos.register.RegisterResponse;
import com.hatirlabeni.authentication.dtos.register.ResetPasswordRequest;
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
        description = "Kullanıcı kimlik doğrulama, oturum, şifre ve e-posta işlemlerini yöneten endpoint'ler."
)
public class AuthController {

    private final AuthService authService;
    private final JwtCookieService jwtCookieService;

    // ==================================================
    // Registration & Login
    // ==================================================

    @Operation(
            summary = "Yeni kullanıcı kaydı oluştur",
            description = "Verilen bilgiler doğrultusunda yeni bir kullanıcı hesabı oluşturur."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Kullanıcı başarıyla kaydedildi."),
            @ApiResponse(responseCode = "400", description = "Gönderilen bilgiler geçersiz."),
            @ApiResponse(responseCode = "409", description = "Kullanıcı adı veya e-posta adresi zaten mevcut."),
            @ApiResponse(responseCode = "500", description = "Sunucu tarafında beklenmeyen bir hata oluştu.")
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
            description = "Kullanıcı adı veya e-posta adresi ve şifre ile kimlik doğrulaması yapar. " +
                    "Access token response body'de, refresh token ise HttpOnly Cookie olarak döndürülür."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Giriş başarılı."),
            @ApiResponse(responseCode = "400", description = "Gönderilen bilgiler geçersiz."),
            @ApiResponse(responseCode = "401", description = "Kullanıcı adı/e-posta veya şifre hatalı."),
            @ApiResponse(responseCode = "403", description = "Kullanıcı hesabı aktif değil."),
            @ApiResponse(responseCode = "500", description = "Sunucu tarafında beklenmeyen bir hata oluştu.")
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

    // ==================================================
    // Session Management
    // ==================================================

    @Operation(
            summary = "Access token yenile",
            description = "Refresh token Cookie'sini kullanarak yeni bir access token ve refresh token oluşturur. " +
                    "Yeni refresh token HttpOnly Cookie olarak döndürülür."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Token'lar başarıyla yenilendi."),
            @ApiResponse(responseCode = "401", description = "Refresh token eksik, geçersiz veya süresi dolmuş."),
            @ApiResponse(responseCode = "403", description = "Kullanıcı hesabı aktif değil."),
            @ApiResponse(responseCode = "500", description = "Sunucu tarafında beklenmeyen bir hata oluştu.")
    })
    @PostMapping("/refresh")
    public ResponseEntity<LoginResponse> refresh(
            @Parameter(
                    description = "Tarayıcı tarafından Cookie üzerinden gönderilen refresh token.",
                    required = false
            )
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

    @Operation(
            summary = "Kullanıcı oturumunu kapat",
            description = "Refresh token Cookie'sini temizleyerek istemcideki refresh token oturumunu sonlandırır."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Oturum başarıyla kapatıldı.")
    })
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {

        jwtCookieService.clearRefreshTokenCookie(response);

        return ResponseEntity.noContent().build();
    }

    // ==================================================
    // Password Management
    // ==================================================

    @Operation(
            summary = "Şifre sıfırlama bağlantısı gönder",
            description = "Verilen e-posta veya kullanıcı bilgisine göre şifre sıfırlama sürecini başlatır."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Şifre sıfırlama işlemi başlatıldı."),
            @ApiResponse(responseCode = "400", description = "Gönderilen bilgiler geçersiz.")
    })
    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest forgotPasswordRequest
    ) {
        authService.forgotPassword(forgotPasswordRequest);

        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Şifreyi sıfırla",
            description = "Geçerli şifre sıfırlama token'ı ve yeni şifre ile kullanıcının şifresini günceller."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Şifre başarıyla sıfırlandı."),
            @ApiResponse(responseCode = "400", description = "Token veya şifre bilgisi geçersiz."),
            @ApiResponse(responseCode = "404", description = "Şifre sıfırlama token'ı bulunamadı.")
    })
    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(
            @Valid @RequestBody ResetPasswordRequest resetPasswordRequest
    ) {
        authService.resetPassword(resetPasswordRequest);

        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Kullanıcı şifresini değiştir",
            description = "Bearer token ile kimliği doğrulanan kullanıcının şifresini günceller."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Şifre başarıyla değiştirildi."),
            @ApiResponse(responseCode = "400", description = "Authorization başlığı veya istek bilgileri geçersiz."),
            @ApiResponse(responseCode = "401", description = "Token geçersiz veya süresi dolmuş."),
            @ApiResponse(responseCode = "403", description = "Kullanıcının mevcut şifresi hatalı veya işlem yetkisiz.")
    })
    @PatchMapping("/change-password")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Void> changePassword(
            @Parameter(
                    description = "Bearer access token.",
                    required = true
            )
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody ChangePasswordRequest changePasswordRequest
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build();
        }

        String token = authHeader.substring(7);

        authService.changePassword(token, changePasswordRequest);

        return ResponseEntity.ok().build();
    }

    // ==================================================
    // Email Activation
    // ==================================================

    @Operation(
            summary = "E-posta aktivasyon bağlantısı gönder",
            description = "Kimliği doğrulanmış kullanıcı için e-posta aktivasyon token'ı oluşturur ve aktivasyon bağlantısını gönderir."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Aktivasyon bağlantısı gönderildi."),
            @ApiResponse(responseCode = "401", description = "Kullanıcının kimliği doğrulanamadı.")
    })
    @PostMapping("/mail-activation")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Void> createAndSendActivationToken() {

        authService.createAndSendActivationToken();

        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "E-posta adresini doğrula",
            description = "E-posta aktivasyon token'ını doğrular ve aktivasyon işlemini tamamlar."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "E-posta adresi başarıyla doğrulandı."),
            @ApiResponse(responseCode = "400", description = "Aktivasyon token'ı geçersiz veya süresi dolmuş.")
    })
    @PostMapping("/mail-verify")
    public ResponseEntity<Void> verifyMail(
            @Valid @RequestBody VerifyMailRequest verifyMailRequest
    ) {
        authService.verifyAndConsumeActivationToken(verifyMailRequest);

        return ResponseEntity.noContent().build();
    }

    // ==================================================
    // Change Email
    // ==================================================

    @Operation(
            summary = "E-posta değiştirme bağlantısı gönder",
            description = "Yeni e-posta adresi için doğrulama token'ı oluşturur ve doğrulama bağlantısını gönderir."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "E-posta değiştirme bağlantısı gönderildi."),
            @ApiResponse(responseCode = "400", description = "İstek bilgileri geçersiz."),
            @ApiResponse(responseCode = "401", description = "Kullanıcının kimliği doğrulanamadı."),
            @ApiResponse(responseCode = "409", description = "E-posta adresi zaten kullanımda.")
    })
    @PostMapping("/change-email")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Void> createAndSendChangeEmailToken(
            @Valid @RequestBody ChangeEmailRequest changeEmailRequest
    ) {
        authService.createAndSendChangeEmailToken(changeEmailRequest);

        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "E-posta değiştirme işlemini doğrula",
            description = "E-posta değiştirme token'ını doğrulayarak kayıtlı e-posta adresini günceller."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "E-posta adresi başarıyla değiştirildi."),
            @ApiResponse(responseCode = "400", description = "Doğrulama token'ı geçersiz veya süresi dolmuş.")
    })
    @PostMapping("/verify-change-email")
    public ResponseEntity<Void> verifyChangeEmailToken(
            @Valid @RequestBody VerifyChangeEmailRequest verifyChangeEmailRequest
    ) {
        authService.verifyAndConsumeChangeEmailToken(verifyChangeEmailRequest);

        return ResponseEntity.noContent().build();
    }

    // ==================================================
    // User Information
    // ==================================================

    @Operation(
            summary = "UUID ile kullanıcı bilgilerini getir",
            description = "Verilen UUID'ye ait kullanıcı kimlik ve rol bilgilerini döndürür."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Kullanıcı başarıyla bulundu."),
            @ApiResponse(responseCode = "401", description = "Kullanıcının kimliği doğrulanamadı."),
            @ApiResponse(responseCode = "404", description = "Belirtilen UUID'ye sahip kullanıcı bulunamadı."),
            @ApiResponse(responseCode = "500", description = "Sunucu tarafında beklenmeyen bir hata oluştu.")
    })
    @GetMapping("/users/uuid/{uuid}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<AuthUserResponse> getByUuid(
            @Parameter(
                    description = "Bilgileri getirilecek kullanıcının UUID'si.",
                    required = true
            )
            @PathVariable UUID uuid
    ) {
        return ResponseEntity.ok(authService.getByUuid(uuid));
    }
}