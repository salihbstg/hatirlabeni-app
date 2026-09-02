package com.hatirlabeni.authentication.service.impl;

import com.hatirlabeni.authentication.dtos.*;
import com.hatirlabeni.authentication.entity.AuthUser;
import com.hatirlabeni.authentication.enums.Role;
import com.hatirlabeni.authentication.exception.*;
import com.hatirlabeni.authentication.feign.UserServiceFeign;
import com.hatirlabeni.authentication.repository.AuthUserRepository;
import com.hatirlabeni.authentication.security.JwtService;
import com.hatirlabeni.authentication.service.interfaces.AuthService;
import feign.FeignException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthUserRepository authUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserServiceFeign userServiceFeign;
    private final ObjectMapper objectMapper;

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
                registerRequest.city(),
                registerRequest.address(),
                registerRequest.birthday()
        );
    }

    private void userIsActive(String token, UUID uuid){
        if(!userServiceFeign.isActive(
                "Bearer "+token,
                uuid
        )){
            throw new UserNotActiveException();
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
    public LoginResponse refresh(RefreshTokenRequest refreshTokenRequest) {
        String refreshToken = refreshTokenRequest.refreshToken();
        String tokenType = jwtService.extractTokenType(refreshToken);
        if (!"refresh".equals(tokenType)) {
            throw new InvalidTokenException("Invalid refresh token");
        }
        String username = jwtService.extractUsername(refreshToken);
        AuthUser authUser = authUserRepository.findByUsername(username)
                .orElseThrow(() -> new InvalidTokenException("Invalid refresh token"));

        String accessToken = jwtService.generateToken(authUser);
        String newRefreshToken = jwtService.generateRefreshToken(authUser);

        userIsActive(accessToken,authUser.getUuid());

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

}
