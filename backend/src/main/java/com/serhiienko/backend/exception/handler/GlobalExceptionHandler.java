package com.serhiienko.backend.exception.handler;

import com.serhiienko.backend.exception.BadRequestException;
import com.serhiienko.backend.exception.PasswordNotMatchException;
import com.serhiienko.backend.exception.TokenRefreshException;
import com.serhiienko.backend.exception.message.ErrorMessage;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.Arrays;
import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({TokenRefreshException.class, AccessDeniedException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorMessage handleForbiddenException(Exception ex, WebRequest request) {
        return new ErrorMessage(HttpStatus.FORBIDDEN.value(), new Date(), ex.getMessage(), request.getDescription(false));
    }

    @ExceptionHandler({UsernameNotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleNotFoundException(Exception ex, WebRequest request) {
        return new ErrorMessage(HttpStatus.NOT_FOUND.value(), new Date(), ex.getMessage(), request.getDescription(false));
    }

    @ExceptionHandler({PasswordNotMatchException.class, BadRequestException.class,})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleBadRequestException(Exception ex, WebRequest request) {
        return new ErrorMessage(HttpStatus.BAD_REQUEST.value(), new Date(), ex.getMessage(), request.getDescription(false));
    }

    @ExceptionHandler({InterruptedException.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage handleInternalServerException(Exception ex, WebRequest request) {
        return new ErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR.value(), new Date(), ex.getMessage(), request.getDescription(false));
    }

    @ExceptionHandler({ConstraintViolationException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleValidationException(ConstraintViolationException ex, WebRequest request) {
        return new ErrorMessage(
                HttpStatus.BAD_REQUEST.value(),
                new Date(),
                String.join(", ", ex.getConstraintViolations().stream().map(ConstraintViolation::getMessage).distinct().toList()),
                request.getDescription(false));
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleValidationMethodException(MethodArgumentNotValidException ex, WebRequest request) {
        return new ErrorMessage(
                HttpStatus.BAD_REQUEST.value(),
                new Date(),
                String.join(", ", ex.getBindingResult().getFieldErrors().stream().map(el -> el.getDefaultMessage()).distinct().toList()),
                request.getDescription(false));
    }
}
