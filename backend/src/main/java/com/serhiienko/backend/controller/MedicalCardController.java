package com.serhiienko.backend.controller;

import com.serhiienko.backend.model.entity.MedicalCard;
import com.serhiienko.backend.security.util.JwtUtils;
import com.serhiienko.backend.service.MedicalCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/secure/medical-card")
@RequiredArgsConstructor
public class MedicalCardController {

    private final JwtUtils jwtUtils;
    private final MedicalCardService medicalCardService;

    @PostMapping
    public ResponseEntity<?> saveMedicalCard(@RequestBody MedicalCard medicalCard){
        return ResponseEntity.ok(medicalCardService.save(medicalCard));
    }

    @GetMapping
    public ResponseEntity<MedicalCard> getMedicalCard(@RequestHeader(value = "Authorization") String token){
        String email = jwtUtils.extractUsername(token);
        return ResponseEntity.ok(medicalCardService.getByUser(email));
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasRole('ADMIN') || hasRole('DOCTOR')")
    public ResponseEntity<MedicalCard> getMedicalCardByUserEmail(@PathVariable Long id){
        return ResponseEntity.ok(medicalCardService.getByUserId(id));
    }
}
