package com.hatirlabeni.authentication.security;

import com.hatirlabeni.authentication.entity.AuthUser;
import com.hatirlabeni.authentication.repository.AuthUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetails implements UserDetailsService {

    private final AuthUserRepository authUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AuthUser authUser = authUserRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("Kullanıcı bulunamadı. "+username));

        return org.springframework.security.core.userdetails.User.builder()
                .username(authUser.getUsername())
                .password(authUser.getPassword())
                .authorities("ROLE_" + authUser.getRole().name())
                .build();
    }
}
