package com.serhiienko.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ItemNotFoundException extends UsernameNotFoundException {
    public ItemNotFoundException(String msg) {
        super(msg);
    }
}
