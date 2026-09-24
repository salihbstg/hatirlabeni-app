package com.hatirlabeni.authentication.config;

import feign.RequestInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Configuration
public class FeignConfig {

    @Bean
    public RequestInterceptor feignClientInterceptor() {
        return template -> {
            // Mevcut HTTP isteğinin context bilgilerini alır.
            ServletRequestAttributes attributes =
                    (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

            // İstek context'i yoksa interceptor işlem yapmadan sonlanır.
            if (attributes == null) {
                return;
            }

            // Gelen istekteki Authorization header'ını alır.
            String authorization =
                    attributes.getRequest().getHeader("Authorization");

            // Header mevcutsa Feign üzerinden yapılan servise iletir.
            if (authorization != null) {
                template.header("Authorization", authorization);
            }
        };
    }
}