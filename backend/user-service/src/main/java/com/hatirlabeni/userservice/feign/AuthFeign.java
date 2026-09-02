package com.hatirlabeni.userservice.feign;

import com.hatirlabeni.userservice.config.FeignConfig;
import com.hatirlabeni.userservice.dtos.AuthUserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.UUID;

@FeignClient(
        name = "auth-service",
        url = "${auth-service.url}",
        configuration = FeignConfig.class
)
public interface AuthFeign {
    @GetMapping("/users/username/{username}")
     AuthUserResponse getByUsername(@PathVariable String username);

    @GetMapping("/users/uuid/{uuid}")
    AuthUserResponse getByUuid(@PathVariable UUID uuid);

    @GetMapping("/users/admin/email")
    AuthUserResponse getAuthUserByEmail(@RequestParam("email") String email);
}
