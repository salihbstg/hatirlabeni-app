package com.hatirlabeni.authentication.feign;

import com.hatirlabeni.authentication.config.FeignConfig;
import com.hatirlabeni.authentication.dtos.CreateUserRequest;
import com.hatirlabeni.authentication.dtos.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@FeignClient(
        name = "user-service",
        url = "${user-service.url}",
        configuration = FeignConfig.class
)
public interface UserServiceFeign {
    @PostMapping
    UserResponse createUser(@RequestBody CreateUserRequest createUserRequest);

    @DeleteMapping("admin/{uuid}")
    Void deleteUser(@PathVariable("uuid") UUID uuid);

    @GetMapping("/isActive/{uuid}")
    Boolean isActive(
            @RequestHeader("Authorization") String token,
            @PathVariable(name = "uuid")UUID uuid
    );
}
