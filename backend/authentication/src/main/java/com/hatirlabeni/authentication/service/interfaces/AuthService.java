package com.hatirlabeni.authentication.service.interfaces;

import com.hatirlabeni.authentication.dtos.*;
import jakarta.validation.Valid;

import java.util.UUID;

public interface AuthService {
    RegisterResponse register(RegisterRequest registerRequest);

    LoginResponse login(LoginRequest loginRequest);

    AuthUserResponse getByUuid(UUID uuid);

    AuthUserResponse getByUsername(String username);

    LoginResponse refresh(String token);

    void deleteAuthUser(UUID uuid);

    AuthUserResponse getUuidByEmail(String email);

    void makeAdmin(UUID uuid);

    void makeUser(UUID uuid);

    void forgotPassword(ForgotPasswordRequest forgotPasswordRequest);

    void resetPassword(ResetPasswordRequest resetPasswordRequest);

    void createAndSendActivationToken();
    void verifyAndConsumeActivationToken(VerifyMailRequest verifyMailRequest);

}
