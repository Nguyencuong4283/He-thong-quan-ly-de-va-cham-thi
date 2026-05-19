package com.se104.backend.util;

import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {
    public static String getCurrentTeacherId() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }
}
