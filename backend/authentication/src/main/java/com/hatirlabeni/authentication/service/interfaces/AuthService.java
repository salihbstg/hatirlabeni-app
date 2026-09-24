package com.hatirlabeni.authentication.service.interfaces;

import com.hatirlabeni.authentication.dtos.mail.VerifyChangeEmailRequest;
import com.hatirlabeni.authentication.dtos.user.AuthUserResponse;
import com.hatirlabeni.authentication.dtos.google.GoogleRegisterRequest;
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

import java.util.UUID;

public interface AuthService {

    // ==================================================
    // Registration & Authentication
    // ==================================================

    RegisterResponse register(RegisterRequest registerRequest);

    LoginResponse registerWithGoogle(
            GoogleRegisterRequest request,
            String email
    );

    LoginResult login(LoginRequest loginRequest);


    // ==================================================
    // Session Management
    // ==================================================

    LoginResult refresh(String token);


    // ==================================================
    // Password Management
    // ==================================================

    void forgotPassword(ForgotPasswordRequest forgotPasswordRequest);

    void resetPassword(ResetPasswordRequest resetPasswordRequest);

    void changePassword(
            String token,
            ChangePasswordRequest changePasswordRequest
    );


    // ==================================================
    // Email Management
    // ==================================================

    void createAndSendActivationToken();

    void verifyAndConsumeActivationToken(
            VerifyMailRequest verifyMailRequest
    );

    public void createAndSendChangeEmailToken(ChangeEmailRequest request);


    // ==================================================
    // User Information
    // ==================================================

    AuthUserResponse getByUuid(UUID uuid);

    AuthUserResponse getByUsername(String username);

    AuthUserResponse getUuidByEmail(String email);

    void verifyAndConsumeChangeEmailToken(VerifyChangeEmailRequest verifyChangeEmailRequest);

    // ==================================================
    // User Role Management

    // ==================================================

    void makeAdmin(UUID uuid);

    void makeUser(UUID uuid);

    // ==================================================
    // User Management

    // ==================================================

    void deleteAuthUser(UUID uuid);
}