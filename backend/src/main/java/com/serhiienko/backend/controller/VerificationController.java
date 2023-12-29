package com.serhiienko.backend.controller;

import com.serhiienko.backend.model.entity.Verification;
import com.serhiienko.backend.security.util.JwtUtils;
import com.serhiienko.backend.service.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/api/v1/secure/verification")
@RequiredArgsConstructor
public class VerificationController {
    private final VerificationService verificationService;
    private final JwtUtils jwtUtils;

    @PostMapping("/generate-and-send")
    public ResponseEntity<String> generateAndSend(@RequestHeader(value = "Authorization") String token) throws ParseException {
        String email = jwtUtils.extractUsername(token);
        Verification verification = verificationService.generate(email);
        verificationService.send(verification);
        return ResponseEntity.ok("sent");
    }


    @PutMapping("/verify")
    public ResponseEntity<String> verify(@RequestHeader(value = "Authorization") String token, @RequestParam String code){
        String email = jwtUtils.extractUsername(token);
        verificationService.verify(email, code);
        return ResponseEntity.ok("verified");
    }
}
