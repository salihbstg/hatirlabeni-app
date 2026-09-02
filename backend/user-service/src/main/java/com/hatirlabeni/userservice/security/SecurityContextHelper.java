package com.hatirlabeni.userservice.security;

import com.hatirlabeni.userservice.dtos.CustomUserDetails;
import com.hatirlabeni.userservice.exception.UserAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class SecurityContextHelper {
    public CustomUserDetails getCurrentUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null ||
                !(authentication.getPrincipal() instanceof CustomUserDetails userDetails)) {
            throw new UserAuthenticationException();
        }

        return userDetails;
    }

    public UUID getCurrentUserId() {
        if(getCurrentUser().uuid() == null) {
            throw new UserAuthenticationException();
        }
        return getCurrentUser().uuid();
    }
}
