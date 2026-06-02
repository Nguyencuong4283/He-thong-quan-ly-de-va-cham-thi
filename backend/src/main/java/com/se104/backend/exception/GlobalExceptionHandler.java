package com.se104.backend.exception;

import com.se104.backend.dto.response.ApiResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    //Chuan hoa ve chung dang api response thoi chu khong phai xu ly gi

    //Khong tim thay entity (cai nay hay dung)
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleEntityNotFound(EntityNotFoundException ex) {
        return new ResponseEntity<>(
                ApiResponse.<Void>builder()
                        .success(false)
                        .message(ex.getMessage())
                        .build(),
                HttpStatus.NOT_FOUND
        );
    }

    //Khi request gui mot so truong null ma trong csdl quy dinh notnull
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getFieldErrors().stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .findFirst()
                .orElse("Invalid input");
        return new ResponseEntity<>(
                ApiResponse.<Void>builder()
                        .success(false)
                        .message(errorMessage)
                        .build(),
                HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<Void>> handleBadCredentialsException(BadCredentialsException ex)
    {
        return new ResponseEntity<>(
                ApiResponse.<Void>builder()
                        .success(false)
                        .message("Invalid teacher ID or password")
                        .build(),
                HttpStatus.UNAUTHORIZED
        );
    }
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<Void>> handleBusinessException(BusinessException ex) {
        return new ResponseEntity<>(
                ApiResponse.<Void>builder()
                        .success(false)
                        .message(ex.getMessage())
                        .build(),
                HttpStatus.BAD_REQUEST
        );
    }

    //
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneralException(Exception ex) {
        ex.printStackTrace();
        return new ResponseEntity<>(
                ApiResponse.<Void>builder()
                        .success(false)
                        .message("Internal server error")
                        .build(),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
