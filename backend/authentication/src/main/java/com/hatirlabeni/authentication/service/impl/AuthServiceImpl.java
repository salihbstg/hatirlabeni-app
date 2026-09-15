package com.hatirlabeni.authentication.service.impl;

import com.hatirlabeni.authentication.dtos.*;
import com.hatirlabeni.authentication.entity.AuthUser;
import com.hatirlabeni.authentication.entity.PasswordResetToken;
import com.hatirlabeni.authentication.enums.Role;
import com.hatirlabeni.authentication.exception.*;
import com.hatirlabeni.authentication.feign.UserServiceFeign;
import com.hatirlabeni.authentication.repository.AuthUserRepository;
import com.hatirlabeni.authentication.repository.PasswordResetTokenRepository;
import com.hatirlabeni.authentication.security.JwtService;
import com.hatirlabeni.authentication.security.SecurityConfig;
import com.hatirlabeni.authentication.service.interfaces.AuthService;
import feign.FeignException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HexFormat;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final SecurityConfig securityConfig;
    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    private final AuthUserRepository authUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserServiceFeign userServiceFeign;
    private final ObjectMapper objectMapper;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final MailService mailService;


    private UserResponse createUserOnUserService(CreateUserRequest request) {
        try {
            return userServiceFeign.createUser(request);
        } catch (FeignException.Conflict e) {
            throw new UserAlreadyExistsException(extractMessage(e));
        } catch (FeignException e) {
            throw new UserServiceException("User service error.", e);
        }
    }

    private List<String> extractMessage(FeignException e) {
        try {
            JsonNode jsonNode = objectMapper.readTree(e.contentUTF8());
            return objectMapper.convertValue(
                    jsonNode.get("message"),
                    new TypeReference<List<String>>() {
                    }
            );
        } catch (Exception exception) {
            throw new UserServiceException(
                    "Failed to parse user service error.",
                    exception
            );
        }
    }

    private AuthUser findAuthUser(UUID uuid) {
        return authUserRepository.findByUuid(uuid)
                .orElseThrow(() ->
                        new UserNotFoundException("Kullanıcı bulunamadı.")
                );
    }

    private AuthUser findAuthUser(String username, String email) {
        return authUserRepository.findByUsernameOrEmail(username, email).orElseThrow(() ->
                new InvalidCredentialsException("Giriş bilgileri hatalı.")
        );
    }

    private AuthUserResponse toAuthUserResponse(AuthUser authUser) {
        return new AuthUserResponse(
                authUser.getUuid(),
                authUser.getUsername(),
                authUser.getEmail(),
                authUser.getRole()
        );
    }

    private AuthUser buildAuthUser(RegisterRequest registerRequest) {
        AuthUser authUser = new AuthUser();
        authUser.setUuid(UUID.randomUUID());
        authUser.setEmail(registerRequest.email());
        authUser.setPassword(passwordEncoder.encode(registerRequest.password()));
        authUser.setRole(Role.USER);
        authUser.setUsername(registerRequest.username());
        return authUser;
    }

    private CreateUserRequest buildCreateUserRequest(AuthUser authUser, RegisterRequest registerRequest) {
        return new CreateUserRequest(
                authUser.getUuid(),
                registerRequest.firstName(),
                registerRequest.lastName(),
                registerRequest.nationalId(),
                registerRequest.telephone(),
                registerRequest.birthday()
        );
    }

    private void userIsActive(String token, UUID uuid) {
        if (!userServiceFeign.isActive(
                "Bearer " + token,
                uuid
        )) {
            throw new UserNotActiveException();
        }
    }

    private String generateResetToken() {
        SecureRandom secureRandom = new SecureRandom();

        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);

        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(bytes);
    }

    private String hashResetPasswordToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));

            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public RegisterResponse register(RegisterRequest registerRequest) {

        AuthUser authUser = buildAuthUser(registerRequest);

        authUserRepository.save(authUser);

        UserResponse userResponse = createUserOnUserService(buildCreateUserRequest(authUser, registerRequest));

        return new RegisterResponse(
                toAuthUserResponse(authUser),
                userResponse
        );

    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {

        AuthUser authUser = findAuthUser(loginRequest.identifier(), loginRequest.identifier());

        if (!passwordEncoder.matches(loginRequest.password(), authUser.getPassword())) {
            throw new InvalidCredentialsException("Giriş bilgileri hatalı!");
        }
        String token = jwtService.generateToken(authUser);

        userIsActive(token, authUser.getUuid());

        return new LoginResponse(
                token,
                jwtService.generateRefreshToken(authUser),
                "Bearer"
        );
    }

    @Override
    public AuthUserResponse getByUuid(UUID uuid) {
        AuthUser authUser = findAuthUser(uuid);
        return toAuthUserResponse(authUser);
    }

    @Override
    public AuthUserResponse getByUsername(String username) {
        AuthUser authUser = authUserRepository.findByUsername(username).orElseThrow(() ->
                new UserNotFoundException("Kullanıcı bulunamadı.")
        );
        return toAuthUserResponse(authUser);
    }

    @Override
    public LoginResponse refresh(String token) {
        String tokenType = jwtService.extractTokenType(token);
        if (!"refresh".equals(tokenType)) {
            throw new InvalidTokenException("Invalid refresh token");
        }
        String username = jwtService.extractUsername(token);
        AuthUser authUser = authUserRepository.findByUsername(username)
                .orElseThrow(() -> new InvalidTokenException("Invalid refresh token"));

        String accessToken = jwtService.generateToken(authUser);
        String newRefreshToken = jwtService.generateRefreshToken(authUser);

        userIsActive(accessToken, authUser.getUuid());

        return new LoginResponse(
                accessToken,
                newRefreshToken,
                "Bearer"
        );
    }

    @Override
    public void deleteAuthUser(UUID uuid) {
        AuthUser user = findAuthUser(uuid);
        authUserRepository.delete(user);
    }

    @Override
    public AuthUserResponse getUuidByEmail(String email) {
        AuthUser user = authUserRepository.findByEmail(email).orElseThrow(() ->
                new UserNotFoundException("Kullanıcı bulunamadı")
        );
        return new AuthUserResponse(
                user.getUuid(),
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );
    }

    @Override
    public void makeAdmin(UUID uuid) {
        AuthUser user = findAuthUser(uuid);
        if (user.getRole() == Role.ROOT) {
            throw new RootIsImmutableException();
        }
        if (user.getRole() == Role.ADMIN) {
            throw new AlreadyAdminException();
        }
        user.setRole(Role.ADMIN);
        authUserRepository.save(user);
    }

    @Override
    public void makeUser(UUID uuid) {
        AuthUser user = findAuthUser(uuid);
        if (user.getRole() == Role.ROOT) {
            throw new RootIsImmutableException();
        }
        if (user.getRole() == Role.USER) {
            throw new AlreadyUserException();
        }
        user.setRole(Role.USER);
        authUserRepository.save(user);
    }

    @Override
    public void forgotPassword(ForgotPasswordRequest forgotPasswordRequest) {
        AuthUser user = authUserRepository.findByUsernameOrEmail(
                        forgotPasswordRequest.identifier(),
                        forgotPasswordRequest.identifier())
                .orElseThrow(() -> new UserNotFoundException("Kullanıcı bulunamadı"));
        String token = generateResetToken();
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setUserUUID(user.getUuid());
        passwordResetToken.setTokenHash(hashResetPasswordToken(token));
        passwordResetTokenRepository.save(passwordResetToken);

        String resetLink = frontendUrl + "/reset-password?token=" + token;
        mailService.sendSimpleMail(user.getEmail(), "Şifre Sıfırlama", "Şifrenizi sıfırlamak için aşağıdaki bağlantıyı kullanın.\n\n" + resetLink);
    }

    @Override
    @Transactional
    public void resetPassword(ResetPasswordRequest resetPasswordRequest) {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByTokenHash(hashResetPasswordToken(resetPasswordRequest.token())).orElseThrow(() ->
                new InvalidPasswordResetTokenException("Geçersiz veya bulunamayan şifre sıfırlama tokenı")
        );
        if (passwordResetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new ExpiredPasswordResetTokenException("Şifre sıfırlama bağlantısının süresi dolmuş. Lütfen işlemi yeniden başlatınız.");
        }
        if (passwordResetToken.getUsedAt() != null) {
            throw new InvalidPasswordResetTokenException("Bu şifre sıfırlama bağlantısı daha önce kullanılmış.");
        }
        AuthUser authUser=authUserRepository.findByUuid(passwordResetToken.getUserUUID()).orElseThrow(()-> new UserNotFoundException("Kullanıcı bulunamadı"));
        authUser.setPassword(passwordEncoder.encode(resetPasswordRequest.newPassword()));
        authUserRepository.save(authUser);
        passwordResetToken.setUsedAt(LocalDateTime.now());
        passwordResetTokenRepository.save(passwordResetToken);
    }
}
