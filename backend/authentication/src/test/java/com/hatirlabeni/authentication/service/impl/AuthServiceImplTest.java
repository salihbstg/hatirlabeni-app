package com.hatirlabeni.authentication.service.impl;

import com.hatirlabeni.authentication.dtos.*;
import com.hatirlabeni.authentication.entity.AuthUser;
import com.hatirlabeni.authentication.enums.Role;
import com.hatirlabeni.authentication.exception.*;
import com.hatirlabeni.authentication.feign.UserServiceFeign;
import com.hatirlabeni.authentication.repository.AuthUserRepository;
import com.hatirlabeni.authentication.security.JwtService;
import feign.FeignException;
import feign.Request;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import tools.jackson.databind.ObjectMapper;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceImplTest {

    @Mock
    private AuthUserRepository authUserRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private UserServiceFeign userServiceFeign;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private AuthServiceImpl authService;

    @BeforeEach
    void setUp() {
        authService = new AuthServiceImpl(
                authUserRepository,
                passwordEncoder,
                jwtService,
                userServiceFeign,
                objectMapper
        );
    }

    @Test
    void register_shouldRegisterUserSuccessfully() {

        RegisterRequest registerRequest = new RegisterRequest(
                "salih",
                "salih@example.com",
                "Salih123.",
                "Salih",
                "Baştug",
                "12345678901",
                "05551234567",
                "Adana",
                "Seyhan",
                LocalDate.of(1998, 4, 1)
        );

        when(passwordEncoder.encode(registerRequest.password()))
                .thenReturn("encodedPassword");

        UserResponse userResponse = new UserResponse(
                1L,
                UUID.randomUUID(),
                "Salih",
                "Baştug",
                "12345678901",
                "05551234567",
                "Adana",
                "Seyhan",
                LocalDate.of(1998, 4, 1),
                true,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        when(userServiceFeign.createUser(any(CreateUserRequest.class)))
                .thenReturn(userResponse);

        RegisterResponse response = authService.register(registerRequest);

        assertNotNull(response);
        assertNotNull(response.authUserResponse());

        assertEquals("salih", response.authUserResponse().username());
        assertEquals("salih@example.com", response.authUserResponse().email());
        assertEquals(Role.USER, response.authUserResponse().role());
        assertEquals(userResponse, response.userResponse());

        verify(passwordEncoder)
                .encode(registerRequest.password());

        verify(authUserRepository)
                .save(any(AuthUser.class));

        verify(userServiceFeign)
                .createUser(any(CreateUserRequest.class));
    }

    @Test
    void register_shouldThrowUserAlreadyExistsExceptionWhenUserAlreadyExists() {

        RegisterRequest request = new RegisterRequest(
                "salih",
                "salih@example.com",
                "Salih123.",
                "Salih",
                "Baştug",
                "12345678901",
                "05551234567",
                "Adana",
                "Seyhan",
                LocalDate.of(1998, 4, 1)
        );

        when(passwordEncoder.encode(request.password()))
                .thenReturn("encoded-password");

        String errorBody = """
                {
                    "message": [
                        "Kullanıcı zaten mevcut."
                    ]
                }
                """;

        Request requestInfo = Request.create(
                Request.HttpMethod.POST,
                "/users",
                Map.of(),
                errorBody.getBytes(StandardCharsets.UTF_8),
                StandardCharsets.UTF_8
        );

        FeignException.Conflict conflictException =
                new FeignException.Conflict(
                        "User already exists",
                        requestInfo,
                        errorBody.getBytes(StandardCharsets.UTF_8),
                        Map.of()
                );

        when(userServiceFeign.createUser(any(CreateUserRequest.class)))
                .thenThrow(conflictException);

        assertThrows(
                UserAlreadyExistsException.class,
                () -> authService.register(request)
        );
    }

    @Test
    void register_shouldThrowUserServiceExceptionWhenUserServiceFails(){

        RegisterRequest request = new RegisterRequest(
                "salih",
                "salih@example.com",
                "Salih123.",
                "Salih",
                "Baştug",
                "12345678901",
                "05551234567",
                "Adana",
                "Seyhan",
                LocalDate.of(1998, 4, 1)
        );
        when(passwordEncoder.encode(request.password()))
                .thenReturn("encoded-password");
        Request requestInfo = Request.create(
                Request.HttpMethod.POST,
                "/users",
                Map.of(),
                null,
                StandardCharsets.UTF_8
        );
        FeignException feignException =
                new FeignException.InternalServerError(
                        "User Service Error",
                        requestInfo,
                        null,
                        Map.of()
                );
        when(userServiceFeign.createUser(any(CreateUserRequest.class)))
                .thenThrow(feignException);

        assertThrows(
                UserServiceException.class,
                () -> authService.register(request)
        );
    }

    @Test
    void login_shouldLoginSuccessfully() {

        LoginRequest request = new LoginRequest(
                "salih",
                "Salih123."
        );

        UUID uuid = UUID.randomUUID();

        AuthUser authUser = new AuthUser();
        authUser.setId(1L);
        authUser.setUuid(uuid);
        authUser.setUsername("salih");
        authUser.setEmail("salih@example.com");
        authUser.setPassword("encoded-password");
        authUser.setRole(Role.USER);

        when(authUserRepository.findByUsernameOrEmail(
                request.identifier(),
                request.identifier()
        )).thenReturn(Optional.of(authUser));

        when(passwordEncoder.matches(
                request.password(),
                authUser.getPassword()
        )).thenReturn(true);

        String token = "access-token";
        String refreshToken = "refresh-token";

        when(jwtService.generateToken(authUser))
                .thenReturn(token);

        when(userServiceFeign.isActive(
                "Bearer " + token,
                uuid
        )).thenReturn(true);

        when(jwtService.generateRefreshToken(authUser))
                .thenReturn(refreshToken);

        LoginResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals(token, response.accessToken());
        assertEquals(refreshToken, response.refreshToken());
        assertEquals("Bearer", response.tokenType());

        verify(authUserRepository)
                .findByUsernameOrEmail(
                        request.identifier(),
                        request.identifier()
                );

        verify(passwordEncoder)
                .matches(
                        request.password(),
                        authUser.getPassword()
                );

        verify(jwtService)
                .generateToken(authUser);

        verify(userServiceFeign)
                .isActive(
                        "Bearer " + token,
                        uuid
                );

        verify(jwtService)
                .generateRefreshToken(authUser);
    }

    @Test
    void login_shouldThrowInvalidCredentialsExceptionWhenPasswordIsWrong() {

        LoginRequest request = new LoginRequest(
                "salih",
                "WrongPassword123."
        );

        AuthUser authUser = new AuthUser();
        authUser.setId(1L);
        authUser.setUuid(UUID.randomUUID());
        authUser.setUsername("salih");
        authUser.setEmail("salih@example.com");
        authUser.setPassword("encoded-password");
        authUser.setRole(Role.USER);

        when(authUserRepository.findByUsernameOrEmail(
                request.identifier(),
                request.identifier()
        )).thenReturn(Optional.of(authUser));

        when(passwordEncoder.matches(
                request.password(),
                authUser.getPassword()
        )).thenReturn(false);

        assertThrows(
                InvalidCredentialsException.class,
                () -> authService.login(request)
        );

        verify(authUserRepository)
                .findByUsernameOrEmail(
                        request.identifier(),
                        request.identifier()
                );

        verify(passwordEncoder)
                .matches(
                        request.password(),
                        authUser.getPassword()
                );

        verify(jwtService, never())
                .generateToken(any());

        verify(userServiceFeign, never())
                .isActive(anyString(), any(UUID.class));
    }

    @Test
    void login_shouldThrowInvalidCredentialsExceptionWhenUserNotFound() {

        LoginRequest request = new LoginRequest(
                "unknown",
                "Salih123."
        );

        when(authUserRepository.findByUsernameOrEmail(
                request.identifier(),
                request.identifier()
        )).thenReturn(Optional.empty());

        assertThrows(
                InvalidCredentialsException.class,
                () -> authService.login(request)
        );

        verify(authUserRepository)
                .findByUsernameOrEmail(
                        request.identifier(),
                        request.identifier()
                );

        verify(passwordEncoder, never())
                .matches(anyString(), anyString());

        verify(jwtService, never())
                .generateToken(any());

        verify(userServiceFeign, never())
                .isActive(anyString(), any(UUID.class));
    }

    @Test
    void login_shouldThrowUserNotActiveExceptionWhenUserIsNotActive() {

        LoginRequest request = new LoginRequest(
                "salih",
                "Salih123."
        );

        UUID uuid = UUID.randomUUID();

        AuthUser authUser = new AuthUser();
        authUser.setId(1L);
        authUser.setUuid(uuid);
        authUser.setUsername("salih");
        authUser.setEmail("salih@example.com");
        authUser.setPassword("encoded-password");
        authUser.setRole(Role.USER);

        when(authUserRepository.findByUsernameOrEmail(
                request.identifier(),
                request.identifier()
        )).thenReturn(Optional.of(authUser));

        when(passwordEncoder.matches(
                request.password(),
                authUser.getPassword()
        )).thenReturn(true);

        String token = "access-token";

        when(jwtService.generateToken(authUser))
                .thenReturn(token);

        when(userServiceFeign.isActive(
                "Bearer " + token,
                uuid
        )).thenReturn(false);

        assertThrows(
                UserNotActiveException.class,
                () -> authService.login(request)
        );

        verify(authUserRepository)
                .findByUsernameOrEmail(
                        request.identifier(),
                        request.identifier()
                );

        verify(passwordEncoder)
                .matches(
                        request.password(),
                        authUser.getPassword()
                );

        verify(jwtService)
                .generateToken(authUser);

        verify(userServiceFeign)
                .isActive(
                        "Bearer " + token,
                        uuid
                );

        verify(jwtService, never())
                .generateRefreshToken(any());
    }

    @Test
    void getByUuid_shouldReturnAuthUserResponseSuccessfully() {

        UUID uuid = UUID.randomUUID();

        AuthUser authUser = new AuthUser();
        authUser.setId(1L);
        authUser.setUuid(uuid);
        authUser.setUsername("salih");
        authUser.setEmail("salih@example.com");
        authUser.setPassword("encoded-password");
        authUser.setRole(Role.USER);

        when(authUserRepository.findByUuid(uuid))
                .thenReturn(Optional.of(authUser));

        AuthUserResponse response = authService.getByUuid(uuid);

        assertNotNull(response);

        assertEquals(authUser.getUuid(), response.uuid());
        assertEquals(authUser.getUsername(), response.username());
        assertEquals(authUser.getEmail(), response.email());
        assertEquals(authUser.getRole(), response.role());

        verify(authUserRepository)
                .findByUuid(uuid);
    }

    @Test
    void getByUuid_shouldThrowUserNotFoundExceptionWhenUserNotFound() {

        UUID uuid = UUID.randomUUID();

        when(authUserRepository.findByUuid(uuid))
                .thenReturn(Optional.empty());

        assertThrows(
                UserNotFoundException.class,
                () -> authService.getByUuid(uuid)
        );

        verify(authUserRepository)
                .findByUuid(uuid);
    }

    @Test
    void getByUsername_shouldReturnAuthUserResponseSuccessfully() {

        String username = "salih";

        UUID uuid = UUID.randomUUID();

        AuthUser authUser = new AuthUser();
        authUser.setId(1L);
        authUser.setUuid(uuid);
        authUser.setUsername(username);
        authUser.setEmail("salih@example.com");
        authUser.setPassword("encoded-password");
        authUser.setRole(Role.USER);

        when(authUserRepository.findByUsername(username))
                .thenReturn(Optional.of(authUser));

        AuthUserResponse response = authService.getByUsername(username);

        assertNotNull(response);

        assertEquals(authUser.getUuid(), response.uuid());
        assertEquals(authUser.getUsername(), response.username());
        assertEquals(authUser.getEmail(), response.email());
        assertEquals(authUser.getRole(), response.role());

        verify(authUserRepository)
                .findByUsername(username);
    }

    @Test
    void getByUsername_shouldThrowUserNotFoundExceptionWhenUserDoesNotExist() {

        String username = "unknown";

        when(authUserRepository.findByUsername(username))
                .thenReturn(Optional.empty());

        assertThrows(
                UserNotFoundException.class,
                () -> authService.getByUsername(username)
        );

        verify(authUserRepository)
                .findByUsername(username);
    }
    @Test
    void refresh_shouldReturnNewTokensSuccessfully() {

        String refreshToken = "refresh-token";
        String accessToken = "access-token";
        String newRefreshToken = "new-refresh-token";
        String username = "salih";

        UUID uuid = UUID.randomUUID();

        RefreshTokenRequest request = new RefreshTokenRequest(refreshToken);

        AuthUser authUser = new AuthUser();
        authUser.setId(1L);
        authUser.setUuid(uuid);
        authUser.setUsername(username);
        authUser.setEmail("salih@example.com");
        authUser.setPassword("encoded-password");
        authUser.setRole(Role.USER);

        when(jwtService.extractTokenType(refreshToken))
                .thenReturn("refresh");

        when(jwtService.extractUsername(refreshToken))
                .thenReturn(username);

        when(authUserRepository.findByUsername(username))
                .thenReturn(Optional.of(authUser));

        when(jwtService.generateToken(authUser))
                .thenReturn(accessToken);

        when(jwtService.generateRefreshToken(authUser))
                .thenReturn(newRefreshToken);

        when(userServiceFeign.isActive(
                "Bearer " + accessToken,
                uuid
        )).thenReturn(true);

        LoginResponse response = authService.refresh(request);

        assertNotNull(response);
        assertEquals(accessToken, response.accessToken());
        assertEquals(newRefreshToken, response.refreshToken());
        assertEquals("Bearer", response.tokenType());

        verify(jwtService)
                .extractTokenType(refreshToken);

        verify(jwtService)
                .extractUsername(refreshToken);

        verify(authUserRepository)
                .findByUsername(username);

        verify(jwtService)
                .generateToken(authUser);

        verify(jwtService)
                .generateRefreshToken(authUser);

        verify(userServiceFeign)
                .isActive("Bearer " + accessToken, uuid);
    }

    @Test
    void refresh_shouldThrowInvalidTokenExceptionWhenTokenTypeIsNotRefresh() {

        String refreshToken = "access-token";

        RefreshTokenRequest request = new RefreshTokenRequest(refreshToken);

        when(jwtService.extractTokenType(refreshToken))
                .thenReturn("access");

        assertThrows(
                InvalidTokenException.class,
                () -> authService.refresh(request)
        );

        verify(jwtService)
                .extractTokenType(refreshToken);

        verify(jwtService, never())
                .extractUsername(anyString());

        verify(authUserRepository, never())
                .findByUsername(anyString());
    }

    @Test
    void refresh_shouldThrowInvalidTokenExceptionWhenUserDoesNotExist() {

        String refreshToken = "refresh-token";
        String username = "unknown";

        RefreshTokenRequest request = new RefreshTokenRequest(refreshToken);

        when(jwtService.extractTokenType(refreshToken))
                .thenReturn("refresh");

        when(jwtService.extractUsername(refreshToken))
                .thenReturn(username);

        when(authUserRepository.findByUsername(username))
                .thenReturn(Optional.empty());

        assertThrows(
                InvalidTokenException.class,
                () -> authService.refresh(request)
        );

        verify(jwtService)
                .extractTokenType(refreshToken);

        verify(jwtService)
                .extractUsername(refreshToken);

        verify(authUserRepository)
                .findByUsername(username);

        verify(jwtService, never())
                .generateToken(any());

        verify(jwtService, never())
                .generateRefreshToken(any());
    }

    @Test
    void refresh_shouldThrowUserNotActiveExceptionWhenUserIsNotActive() {

        String refreshToken = "refresh-token";
        String accessToken = "access-token";
        String newRefreshToken = "new-refresh-token";
        String username = "salih";

        UUID uuid = UUID.randomUUID();

        RefreshTokenRequest request = new RefreshTokenRequest(refreshToken);

        AuthUser authUser = new AuthUser();
        authUser.setId(1L);
        authUser.setUuid(uuid);
        authUser.setUsername(username);
        authUser.setEmail("salih@example.com");
        authUser.setPassword("encoded-password");
        authUser.setRole(Role.USER);

        when(jwtService.extractTokenType(refreshToken))
                .thenReturn("refresh");

        when(jwtService.extractUsername(refreshToken))
                .thenReturn(username);

        when(authUserRepository.findByUsername(username))
                .thenReturn(Optional.of(authUser));

        when(jwtService.generateToken(authUser))
                .thenReturn(accessToken);

        when(jwtService.generateRefreshToken(authUser))
                .thenReturn(newRefreshToken);

        when(userServiceFeign.isActive(
                "Bearer " + accessToken,
                uuid
        )).thenReturn(false);

        assertThrows(
                UserNotActiveException.class,
                () -> authService.refresh(request)
        );

        verify(userServiceFeign)
                .isActive("Bearer " + accessToken, uuid);
    }

    @Test
    void deleteAuthUser_shouldDeleteUserSuccessfully() {

        UUID uuid = UUID.randomUUID();

        AuthUser authUser = new AuthUser();
        authUser.setId(1L);
        authUser.setUuid(uuid);
        authUser.setUsername("salih");
        authUser.setEmail("salih@example.com");
        authUser.setPassword("encoded-password");
        authUser.setRole(Role.USER);

        when(authUserRepository.findByUuid(uuid))
                .thenReturn(Optional.of(authUser));

        authService.deleteAuthUser(uuid);

        verify(authUserRepository)
                .findByUuid(uuid);

        verify(authUserRepository)
                .delete(authUser);
    }

    @Test
    void deleteAuthUser_shouldThrowExceptionWhenUserDoesNotExist() {


        UUID uuid = UUID.randomUUID();

        when(authUserRepository.findByUuid(uuid))
                .thenReturn(Optional.empty());

        assertThrows(
                UserNotFoundException.class,
                () -> authService.deleteAuthUser(uuid)
        );

        verify(authUserRepository)
                .findByUuid(uuid);

        verify(authUserRepository, never())
                .delete(any(AuthUser.class));
    }

    @Test
    void getUuidByEmail_shouldReturnAuthUserResponseSuccessfully() {

        String email = "salih@example.com";
        UUID uuid = UUID.randomUUID();

        AuthUser authUser = new AuthUser();
        authUser.setId(1L);
        authUser.setUuid(uuid);
        authUser.setUsername("salih");
        authUser.setEmail(email);
        authUser.setPassword("encoded-password");
        authUser.setRole(Role.USER);

        when(authUserRepository.findByEmail(email))
                .thenReturn(Optional.of(authUser));

        AuthUserResponse response = authService.getUuidByEmail(email);

        assertNotNull(response);
        assertEquals(uuid, response.uuid());
        assertEquals("salih", response.username());
        assertEquals(email, response.email());
        assertEquals(Role.USER, response.role());

        verify(authUserRepository)
                .findByEmail(email);
    }

    @Test
    void getUuidByEmail_shouldThrowUserNotFoundExceptionWhenEmailDoesNotExist() {

        String email = "unknown@example.com";

        when(authUserRepository.findByEmail(email))
                .thenReturn(Optional.empty());

        assertThrows(
                UserNotFoundException.class,
                () -> authService.getUuidByEmail(email)
        );

        verify(authUserRepository)
                .findByEmail(email);
    }

    @Test
    void makeAdmin_shouldPromoteUserToAdminSuccessfully() {

        UUID uuid = UUID.randomUUID();

        AuthUser authUser = new AuthUser();
        authUser.setId(1L);
        authUser.setUuid(uuid);
        authUser.setUsername("salih");
        authUser.setEmail("salih@example.com");
        authUser.setPassword("encoded-password");
        authUser.setRole(Role.USER);

        when(authUserRepository.findByUuid(uuid))
                .thenReturn(Optional.of(authUser));

        authService.makeAdmin(uuid);

        assertEquals(Role.ADMIN, authUser.getRole());

        verify(authUserRepository)
                .findByUuid(uuid);

        verify(authUserRepository)
                .save(authUser);
    }

    @Test
    void makeAdmin_shouldThrowAlreadyAdminExceptionWhenUserIsAlreadyAdmin() {

        UUID uuid = UUID.randomUUID();

        AuthUser authUser = new AuthUser();
        authUser.setUuid(uuid);
        authUser.setUsername("salih");
        authUser.setRole(Role.ADMIN);

        when(authUserRepository.findByUuid(uuid))
                .thenReturn(Optional.of(authUser));

        assertThrows(
                AlreadyAdminException.class,
                () -> authService.makeAdmin(uuid)
        );

        verify(authUserRepository)
                .findByUuid(uuid);

        verify(authUserRepository, never())
                .save(any(AuthUser.class));
    }

    @Test
    void makeAdmin_shouldThrowRootIsImmutableExceptionWhenUserIsRoot() {

        UUID uuid = UUID.randomUUID();

        AuthUser authUser = new AuthUser();
        authUser.setUuid(uuid);
        authUser.setUsername("root");
        authUser.setRole(Role.ROOT);

        when(authUserRepository.findByUuid(uuid))
                .thenReturn(Optional.of(authUser));

        assertThrows(
                RootIsImmutableException.class,
                () -> authService.makeAdmin(uuid)
        );

        verify(authUserRepository)
                .findByUuid(uuid);

        verify(authUserRepository, never())
                .save(any(AuthUser.class));
    }

    @Test
    void makeUser_shouldDemoteAdminToUserSuccessfully() {

        UUID uuid = UUID.randomUUID();

        AuthUser authUser = new AuthUser();
        authUser.setId(1L);
        authUser.setUuid(uuid);
        authUser.setUsername("salih");
        authUser.setEmail("salih@example.com");
        authUser.setPassword("encoded-password");
        authUser.setRole(Role.ADMIN);

        when(authUserRepository.findByUuid(uuid))
                .thenReturn(Optional.of(authUser));

        authService.makeUser(uuid);

        assertEquals(Role.USER, authUser.getRole());

        verify(authUserRepository)
                .findByUuid(uuid);

        verify(authUserRepository)
                .save(authUser);
    }

    @Test
    void makeUser_shouldThrowAlreadyUserExceptionWhenUserIsAlreadyUser() {

        UUID uuid = UUID.randomUUID();

        AuthUser authUser = new AuthUser();
        authUser.setUuid(uuid);
        authUser.setUsername("salih");
        authUser.setRole(Role.USER);

        when(authUserRepository.findByUuid(uuid))
                .thenReturn(Optional.of(authUser));

        assertThrows(
                AlreadyUserException.class,
                () -> authService.makeUser(uuid)
        );

        verify(authUserRepository)
                .findByUuid(uuid);

        verify(authUserRepository, never())
                .save(any(AuthUser.class));
    }

    @Test
    void makeUser_shouldThrowRootIsImmutableExceptionWhenUserIsRoot() {

        UUID uuid = UUID.randomUUID();

        AuthUser authUser = new AuthUser();
        authUser.setUuid(uuid);
        authUser.setUsername("root");
        authUser.setRole(Role.ROOT);

        when(authUserRepository.findByUuid(uuid))
                .thenReturn(Optional.of(authUser));

        assertThrows(
                RootIsImmutableException.class,
                () -> authService.makeUser(uuid)
        );

        verify(authUserRepository)
                .findByUuid(uuid);

        verify(authUserRepository, never())
                .save(any(AuthUser.class));
    }
}