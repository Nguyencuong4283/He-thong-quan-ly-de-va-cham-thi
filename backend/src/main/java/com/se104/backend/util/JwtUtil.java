package com.se104.backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {
    // Hardcode secret key
    private final String secretKey = "ALO-ANH-EM-OI-CHUNG-TA-CUNG-NHAU-LAM-DO-AN-SE104-DEN-HOI-THO-CUOI-CUNG";

    // Generate key
    private final SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

    // Token lifespan: 8 hours
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 8;

    // 1. Generate Token
    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username) // Replaced setSubject
                .issuedAt(new Date(System.currentTimeMillis())) // Replaced setIssuedAt
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Replaced setExpiration
                .signWith(key) // Replaced signWith(key, algorithm) - algorithm is inferred from the key
                .compact();
    }

    // 2. Parse token and get body (Claims)
    private Claims getTokenBody(String token) {
        return Jwts.parser()
                .verifyWith(key) // Replaced setSigningKey
                .build()
                .parseSignedClaims(token) // Replaced parseClaimsJws
                .getPayload(); // Replaced getBody
    }

    // 3. Extract username
    public String extractUsername(String token) {
        return getTokenBody(token).getSubject();
    }

    // 4. Check if token is expired
    private boolean isTokenExpired(String token) {
        return getTokenBody(token).getExpiration().before(new Date());
    }

    // 5. Validate token
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}