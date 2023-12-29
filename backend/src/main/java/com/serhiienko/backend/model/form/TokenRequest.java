package com.serhiienko.backend.model.form;

import lombok.Data;

@Data
public class TokenRequest {
    private String accessToken;
    private String refreshToken;
}
