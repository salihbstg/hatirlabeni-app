package com.hatirlabeni.authentication.security;

import com.hatirlabeni.authentication.entity.AuthUser;
import com.hatirlabeni.authentication.enums.AuthProvider;
import com.hatirlabeni.authentication.repository.AuthUserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final AuthUserRepository authUserRepository;
    private final JwtService jwtService;
    private final JwtCookieService jwtCookieService;

    @Value("${FRONTEND_URL}")
    private String frontendURL;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        OAuth2User oAuth2User =
                (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");

        if (email == null || email.isBlank()) {
            response.sendRedirect(
                    frontendURL + "/login?error=google_email_missing"
            );
            return;
        }

        Optional<AuthUser> optionalAuthUser =
                authUserRepository.findByEmail(email);

        // Mevcut Google kullanıcısı
        if (optionalAuthUser.isPresent()) {

            AuthUser authUser = optionalAuthUser.get();

            if (authUser.getAuthProvider() == AuthProvider.GOOGLE) {

                String refreshToken =
                        jwtService.generateRefreshToken(authUser);

                ResponseCookie refreshCookie =
                        jwtCookieService.createRefreshTokenCookie(refreshToken);

                response.addHeader(
                        HttpHeaders.SET_COOKIE,
                        refreshCookie.toString()
                );

                response.sendRedirect(
                        frontendURL + "/?googleLogin=success"
                );
                return;
            }

            // Kullanıcı daha önce LOCAL hesabıyla kayıt olmuş
            response.sendRedirect(
                    frontendURL + "/login?error=local_account"
            );
            return;
        }

        // Yeni Google kullanıcısı: kayıt ekranına yönlendir
        HttpSession session = request.getSession(true);

        session.removeAttribute("googleEmail");
        session.removeAttribute("googleFirstName");
        session.removeAttribute("googleLastName");

        session.setAttribute("googleEmail", email);
        session.setAttribute("googleFirstName", firstName);
        session.setAttribute("googleLastName", lastName);

        response.sendRedirect(
                frontendURL + "/google-register"
        );
    }
}