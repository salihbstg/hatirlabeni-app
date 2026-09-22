package com.hatirlabeni.authentication.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class JwtCookieService {

    private static final String REFRESH_COOKIE_NAME = "refreshToken";
    private static final String REFRESH_COOKIE_PATH = "/api/v1/auth";

    @Value("${REFRESH_EXPIRATION}")
    private long refreshExpiration;

    @Value("${COOKIE_SECURE}")
    private boolean cookieSecure;


    // Refresh token cookie oluştur
    public ResponseCookie createRefreshTokenCookie(String refreshToken) {

        return ResponseCookie.from(REFRESH_COOKIE_NAME, refreshToken)
                .httpOnly(true)
                .secure(cookieSecure)
                .sameSite("Lax")
                .path(REFRESH_COOKIE_PATH)
                .maxAge(Duration.ofMillis(refreshExpiration * 24 * 7))
                .build();
    }


    // Refresh token cookie sil
    public void clearRefreshTokenCookie(HttpServletResponse response) {

        ResponseCookie cookie = ResponseCookie
                .from(REFRESH_COOKIE_NAME, "")
                .httpOnly(true)
                .secure(cookieSecure)
                .sameSite("Lax")
                .path(REFRESH_COOKIE_PATH)
                .maxAge(Duration.ZERO)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }
}