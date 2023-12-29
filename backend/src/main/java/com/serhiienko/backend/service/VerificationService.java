package com.serhiienko.backend.service;

import com.serhiienko.backend.model.entity.Verification;

public interface VerificationService {
    Verification generate(String email);
    boolean delete(Long userId);
    void send(Verification verification);

    void verify(String email, String code);
}
