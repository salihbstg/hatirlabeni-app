package com.hatirlabeni.userservice.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Component
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    private SecretKey getSigningKey(){
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }
    public UUID extractUuid(String token) {
        String uuid=getClaims(token).get("uuid", String.class);
        return UUID.fromString(uuid);
    }
    public String extractTokenType(String token){
       return getClaims(token).get("type", String.class);
    }
    public String extractRole(String token){return getClaims(token).get("role", String.class);}
    public boolean isTokenValid(String token) {
        try{
            getClaims(token);
            return true;
        }
        catch(Exception e){
            return false;
        }
    }
}
