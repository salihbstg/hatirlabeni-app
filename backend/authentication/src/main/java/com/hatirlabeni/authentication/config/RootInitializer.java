package com.hatirlabeni.authentication.config;

import com.hatirlabeni.authentication.dtos.CreateUserRequest;
import com.hatirlabeni.authentication.entity.AuthUser;
import com.hatirlabeni.authentication.enums.Role;
import com.hatirlabeni.authentication.feign.UserServiceFeign;
import com.hatirlabeni.authentication.repository.AuthUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class RootInitializer implements CommandLineRunner {

    private final AuthUserRepository authUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserServiceFeign userServiceFeign;

    @Value("${app.root.username}")
    private String rootUsername;
    @Value("${app.root.password}")
    private String rootPassword;
    @Value("${app.root.email}")
    private String rootEmail;

    @Override
    public void run(String... args){

        if (authUserRepository.existsByUsername(rootUsername)) {
            return;
        }
        UUID uuid = UUID.randomUUID();
        AuthUser rootUser = new AuthUser();
        rootUser.setUuid(uuid);
        rootUser.setUsername(rootUsername);
        rootUser.setPassword(passwordEncoder.encode(rootPassword));
        rootUser.setEmail(rootEmail);
        rootUser.setRole(Role.ROOT);
        CreateUserRequest createUserRequest = new CreateUserRequest(
                uuid,
                "Root",
                "Hatırlabeni",
                "10000000000",
                "05000000000",
                "Root",
                "Hatırlabeni Root",
                LocalDate.of(2026, 1, 1)
        );
        createUserWithRetry(createUserRequest);
        authUserRepository.save(rootUser);
    }

    private void createUserWithRetry(CreateUserRequest createUserRequest) {
        int maxAttempts = 5;
        for (int attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                userServiceFeign.createUser(createUserRequest);
                return;
            } catch (Exception e) {
                try {
                    if(attempt==maxAttempts-1)
                        return;
                    Thread.sleep(5000);
                } catch (InterruptedException interruptedException) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException(interruptedException);
                }
            }
        }
        throw new IllegalStateException("Root user could not be created.");
    }
}
