package com.serhiienko.backend.model.form;

import lombok.Data;

@Data
public class PasswordRequest {
    private String oldPassword;
    private String newPassword;
}
