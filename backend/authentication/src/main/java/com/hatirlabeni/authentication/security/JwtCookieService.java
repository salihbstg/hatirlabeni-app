package com.hatirlabeni.authentication.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class JwtCookieService {

    @Value("${REFRESH_EXPIRATION}")
    private long refreshExpiration;

    private static final String REFRESH_COOKIE_NAME = "refreshToken";

    public ResponseCookie createRefreshTokenCookie(String refreshToken) {

        return ResponseCookie.from(REFRESH_COOKIE_NAME, refreshToken)
                .httpOnly(true)
                .secure(false) // Local geliştirme ortamı
                .sameSite("Lax")
                .path("/api/v1/auth")
                .maxAge(Duration.ofMillis(refreshExpiration*24*7))
                .build();
    }

    public ResponseCookie clearRefreshTokenCookie() {

        return ResponseCookie.from(REFRESH_COOKIE_NAME, "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/api/v1/auth")
                .maxAge(Duration.ZERO)
                .build();
    }
}