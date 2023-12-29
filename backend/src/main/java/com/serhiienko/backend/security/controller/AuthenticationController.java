package com.serhiienko.backend.security.controller;

import com.serhiienko.backend.model.dto.AuthResponse;
import com.serhiienko.backend.model.form.AuthRequest;
import com.serhiienko.backend.model.form.RegisterRequest;
import com.serhiienko.backend.model.form.TokenRequest;
import com.serhiienko.backend.security.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) throws Exception {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody TokenRequest tokenRequest) throws Exception {
        return authenticationService.refreshToken(tokenRequest);
    }


}
