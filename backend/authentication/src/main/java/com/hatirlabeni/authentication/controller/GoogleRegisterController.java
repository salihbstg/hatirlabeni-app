package com.hatirlabeni.authentication.controller;

import com.hatirlabeni.authentication.dtos.GoogleRegisterInfoResponse;
import com.hatirlabeni.authentication.dtos.GoogleRegisterRequest;
import com.hatirlabeni.authentication.dtos.LoginResponse;
import com.hatirlabeni.authentication.service.interfaces.AuthService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth/google")
public class GoogleRegisterController {

    private final AuthService authService;

    @GetMapping("/register-info")
    public GoogleRegisterInfoResponse getGoogleRegisterInfo(
            HttpSession session
    ) {

        String email = (String) session.getAttribute("googleEmail");
        String firstName = (String) session.getAttribute("googleFirstName");
        String lastName = (String) session.getAttribute("googleLastName");

        if (email == null || email.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Google kayıt oturumu bulunamadı. Lütfen tekrar Google ile giriş yapın."
            );
        }

        return new GoogleRegisterInfoResponse(
                firstName,
                lastName,
                email
        );
    }

    @PostMapping("/register")
    public LoginResponse registerWithGoogle(
            @Valid @RequestBody GoogleRegisterRequest request,
            HttpSession session
    ) {

        String email = (String) session.getAttribute("googleEmail");

        if (email == null || email.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Google kayıt oturumu bulunamadı. Lütfen tekrar Google ile giriş yapın."
            );
        }

        LoginResponse response = authService.registerWithGoogle(
                request,
                email
        );

        session.removeAttribute("googleEmail");
        session.removeAttribute("googleFirstName");
        session.removeAttribute("googleLastName");

        return response;
    }
}