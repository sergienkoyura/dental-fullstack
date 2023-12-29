package com.serhiienko.backend.model.form;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
