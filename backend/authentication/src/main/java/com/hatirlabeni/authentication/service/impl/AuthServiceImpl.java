package com.hatirlabeni.authentication.service.impl;

import com.hatirlabeni.authentication.dtos.*;
import com.hatirlabeni.authentication.entity.AuthUser;
import com.hatirlabeni.authentication.entity.MailActivationToken;
import com.hatirlabeni.authentication.entity.PasswordResetToken;
import com.hatirlabeni.authentication.enums.AuthProvider;
import com.hatirlabeni.authentication.enums.Role;
import com.hatirlabeni.authentication.exception.*;
import com.hatirlabeni.authentication.feign.UserServiceFeign;
import com.hatirlabeni.authentication.repository.AuthUserRepository;
import com.hatirlabeni.authentication.repository.MailActivationTokenRepository;
import com.hatirlabeni.authentication.repository.PasswordResetTokenRepository;
import com.hatirlabeni.authentication.security.JwtCookieService;
import com.hatirlabeni.authentication.security.JwtService;
import com.hatirlabeni.authentication.security.SecurityConfig;
import com.hatirlabeni.authentication.service.interfaces.AuthService;
import feign.FeignException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final MailActivationTokenRepository mailActivationTokenRepository;
    private final JwtCookieService jwtCookieService;

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

    private String generateToken() {
        SecureRandom secureRandom = new SecureRandom();

        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);

        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(bytes);
    }

    private String hashToken(String token) {
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
    public LoginResult login(LoginRequest loginRequest) {

        AuthUser authUser = findAuthUser(loginRequest.identifier(), loginRequest.identifier());

        if (!passwordEncoder.matches(loginRequest.password(), authUser.getPassword())) {
            throw new InvalidCredentialsException("Giriş bilgileri hatalı!");
        }
        String token = jwtService.generateToken(authUser);
        String refreshToken= jwtService.generateRefreshToken(authUser);
        userIsActive(token, authUser.getUuid());

        LoginResponse loginResponse=new LoginResponse(
                token,
                "Bearer"
        );
        return new LoginResult(
                loginResponse,
                refreshToken
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
    public LoginResult refresh(String token) {

        String tokenType = jwtService.extractTokenType(token);

        if (!"refresh".equals(tokenType)) {
            throw new InvalidTokenException("Invalid refresh token");
        }

        String username = jwtService.extractUsername(token);

        AuthUser authUser = authUserRepository.findByUsername(username)
                .orElseThrow(() ->
                        new InvalidTokenException("Invalid refresh token")
                );

        String accessToken = jwtService.generateToken(authUser);
        String newRefreshToken = jwtService.generateRefreshToken(authUser);

        userIsActive(accessToken, authUser.getUuid());

        LoginResponse loginResponse = new LoginResponse(
                accessToken,
                "Bearer"
        );

        return new LoginResult(loginResponse, newRefreshToken);
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
        String token = generateToken();
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setUserUUID(user.getUuid());
        passwordResetToken.setTokenHash(hashToken(token));
        passwordResetTokenRepository.save(passwordResetToken);

        String resetLink = frontendUrl + "/reset-password?token=" + token;
        mailService.sendSimpleMail(user.getEmail(), "Şifre Sıfırlama", "Şifrenizi sıfırlamak için aşağıdaki bağlantıyı kullanın.\n\n" + resetLink);
    }

    @Override
    @Transactional
    public void resetPassword(ResetPasswordRequest resetPasswordRequest) {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByTokenHash(hashToken(resetPasswordRequest.token())).orElseThrow(() ->
                new InvalidPasswordResetTokenException("Geçersiz veya bulunamayan şifre sıfırlama tokenı")
        );
        if (passwordResetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new ExpiredPasswordResetTokenException("Şifre sıfırlama bağlantısının süresi dolmuş. Lütfen işlemi yeniden başlatınız.");
        }
        if (passwordResetToken.getUsedAt() != null) {
            throw new InvalidPasswordResetTokenException("Bu şifre sıfırlama bağlantısı daha önce kullanılmış.");
        }
        AuthUser authUser = authUserRepository.findByUuid(passwordResetToken.getUserUUID()).orElseThrow(() -> new UserNotFoundException("Kullanıcı bulunamadı"));
        authUser.setPassword(passwordEncoder.encode(resetPasswordRequest.newPassword()));
        authUserRepository.save(authUser);
        passwordResetToken.setUsedAt(LocalDateTime.now());
        passwordResetTokenRepository.save(passwordResetToken);
    }

    @Override
    @Transactional
    public void createAndSendActivationToken() {

        // 1. Mevcut oturumun Authentication bilgisini al.
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        // 2. Kullanıcının gerçekten giriş yapmış olduğunu doğrula.
        if (authentication == null
                || !authentication.isAuthenticated()
                || authentication.getName() == null
                || authentication.getName().isBlank()
                || "anonymousUser".equals(authentication.getName())) {

            throw new UserNotFoundException("Kullanıcı doğrulanamadı.");
        }

        // 3. JWT üzerinden gelen kullanıcı adını veya email'i al.
        String identifier = authentication.getName();

        // 4. Kullanıcıyı username veya email üzerinden bul.
        AuthUser user = authUserRepository
                .findByUsernameOrEmail(identifier, identifier)
                .orElseThrow(() ->
                        new UserNotFoundException("Kullanıcı bulunamadı.")
                );

        // 5. Kullanıcının maili zaten aktif mi kontrol et.
        if (userServiceFeign.mailIsActive(user.getUuid())) {
            throw new MailAlreadyActivatedException();
        }

        // 6. Kullanıcı için aktivasyon token'ı oluştur.
        String token = generateToken();

        // 7. Aktivasyon linkini oluştur.
        String activationLink =
                frontendUrl + "/activation?token=" + token;

        // 8. Token kaydını oluştur.
        MailActivationToken activationToken = new MailActivationToken();

        activationToken.setTokenHash(hashToken(token));
        activationToken.setUserUUID(user.getUuid());

        mailActivationTokenRepository.save(activationToken);

        // 9. Aktivasyon mailini gönder.
        mailService.sendSimpleMail(
                user.getEmail(),
                "Mail adresi doğrulama",
                "Mail adresinizi doğrulamak için aşağıdaki bağlantıya tıklayınız.\n\n"
                        + activationLink
        );
    }

    @Override
    @Transactional
    public void verifyAndConsumeActivationToken(VerifyMailRequest verifyMailRequest) {

        String hashedToken = hashToken(verifyMailRequest.token());

        MailActivationToken mailActivationToken = mailActivationTokenRepository.findByTokenHash(hashedToken).orElseThrow(MailActivationTokenNotFoundException::new);
        if (mailActivationToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            mailActivationTokenRepository.deleteByUserUUID(mailActivationToken.getUserUUID());
            throw new ExpiredPasswordResetTokenException("Token süresi dolmuştur, lütfen işlemi yeniden başlatınız.");
        }
        userServiceFeign.mailActivation(mailActivationToken.getUserUUID());
        mailActivationTokenRepository.deleteByUserUUID(mailActivationToken.getUserUUID());
    }

    @Override
    public LoginResponse registerWithGoogle(GoogleRegisterRequest request, String email) {

        // 1. Google e-postası daha önce kayıt edilmiş mi?
        if (authUserRepository.findByEmail(email).isPresent()) {
            throw new IllegalStateException(
                    "Bu e-posta adresi zaten kayıtlı."
            );
        }

        // 2. Kullanıcı adı daha önce alınmış mı?
        if (authUserRepository.existsByUsername(request.username())) {
            throw new IllegalStateException(
                    "Bu kullanıcı adı zaten kullanılıyor."
            );
        }

        // 3. Google kullanıcısı için rastgele, girişte kullanılmayacak parola oluştur.
        byte[] randomBytes = new byte[32];
        new SecureRandom().nextBytes(randomBytes);

        String randomPassword = Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(randomBytes);

        // 4. AuthUser oluştur.
        AuthUser authUser = new AuthUser();

        authUser.setUuid(java.util.UUID.randomUUID());
        authUser.setUsername(request.username());
        authUser.setEmail(email);
        authUser.setPassword(passwordEncoder.encode(randomPassword));
        authUser.setRole(Role.USER);
        authUser.setAuthProvider(AuthProvider.GOOGLE);

        // 5. Authentication DB'ye kaydet.

        AuthUser savedAuthUser = authUserRepository.save(authUser);

        // 6. User Service üzerinde kullanıcı profilini oluştur.
        userServiceFeign.createUser(
                new CreateUserRequest(
                        savedAuthUser.getUuid(),
                        request.firstName(),
                        request.lastName(),
                        request.identityNumber(),
                        request.telephone(),
                        request.birthday()
                )
        );

        // 7. JWT tokenlarını oluştur.
        String accessToken = jwtService.generateToken(savedAuthUser);
        String refreshToken = jwtService.generateRefreshToken(savedAuthUser);

        // 8. Refresh token cookie'sini oluştur.
        jwtCookieService.createRefreshTokenCookie(refreshToken);

        // 9. LoginResponse döndür.
        return new LoginResponse(
                accessToken,
                "Bearer"
        );
    }

    @Override
    public void changePassword(String token,ChangePasswordRequest changePasswordRequest) {
        String username=jwtService.extractUsername(token);
        AuthUser authUser=authUserRepository.findByUsername(username).orElseThrow(()->new UserNotFoundException("Kullanıcı bulunamadı"));
        if(!passwordEncoder.matches(changePasswordRequest.currentPassword(),authUser.getPassword())){
            throw new BadCredentialsException("Mevcut şifreniz hatalı.");
        }
        authUser.setPassword(passwordEncoder.encode(changePasswordRequest.newPassword()));
        authUserRepository.save(authUser);
    }
}
