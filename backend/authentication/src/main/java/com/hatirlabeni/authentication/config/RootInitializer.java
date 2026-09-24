package com.hatirlabeni.authentication.config;

import com.hatirlabeni.authentication.dtos.user.CreateUserRequest;
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
    public void run(String... args) {

        // Root kullanıcı daha önce oluşturulmuşsa tekrar oluşturulmasını engeller.
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

        // Root kullanıcının User Service tarafındaki profil bilgilerini hazırlar.
        CreateUserRequest createUserRequest = new CreateUserRequest(
                uuid,
                "Root",
                "Hatırlabeni",
                "10000000000",
                "05000000000",
                LocalDate.of(2026, 1, 1)
        );

        // Auth Service'e kaydetmeden önce User Service tarafında kullanıcıyı oluşturur.
        createUserWithRetry(createUserRequest);

        authUserRepository.save(rootUser);
    }

    private void createUserWithRetry(CreateUserRequest createUserRequest) {
        int maxAttempts = 5;

        // User Service çağrısı başarısız olursa en fazla 5 kez yeniden dener.
        for (int attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                System.out.println(
                        "User Service'e kullanıcı oluşturma isteği gönderiliyor... " +
                                "Deneme: " + attempt + "/" + maxAttempts
                );

                userServiceFeign.createRoot(createUserRequest);

                System.out.println("User Service'e kullanıcı başarıyla oluşturuldu.");
                return;

            } catch (Exception e) {
                System.err.println(
                        "User Service'e kullanıcı oluşturulurken hata oluştu. " +
                                "Deneme: " + attempt + "/" + maxAttempts
                );

                e.printStackTrace();

                // Tüm denemeler başarısız olursa uygulama başlangıcını hatayla sonlandırır.
                if (attempt == maxAttempts) {
                    throw new IllegalStateException(
                            "Root user could not be created in user-service.",
                            e
                    );
                }

                try {
                    // Sonraki denemeden önce 5 saniye bekler.
                    Thread.sleep(5000);
                } catch (InterruptedException interruptedException) {
                    Thread.currentThread().interrupt();

                    throw new RuntimeException(
                            "Root user creation retry interrupted.",
                            interruptedException
                    );
                }
            }
        }
    }
}