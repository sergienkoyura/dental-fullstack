package com.serhiienko.backend.controller;

import com.serhiienko.backend.model.dto.UserDTO;
import com.serhiienko.backend.model.entity.Pricing;
import com.serhiienko.backend.model.form.ContactRequest;
import com.serhiienko.backend.service.PricingService;
import com.serhiienko.backend.service.UserService;
import com.serhiienko.backend.util.MailingUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/v1/public")
@RequiredArgsConstructor
public class PublicController {
    private final PricingService pricingService;
    private final UserService userService;
    private final MailingUtil mailingUtil;
    @Value("${application.email.main-admin}")
    private String emailAdmin;

    @GetMapping("/pricing")
    public ResponseEntity<List<Pricing>> getAll(){
        return ResponseEntity.ok(pricingService.getAll());
    }
    @GetMapping("/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok("test");
    }

    @GetMapping("/users/doctors")
    public ResponseEntity<List<UserDTO>> getAllDoctors(){
        return ResponseEntity.ok(userService.getAllDoctors());
    }

    @PostMapping("/contact")
    public ResponseEntity<String> sendContact(@RequestBody @Valid ContactRequest contactRequest){
        String message = "Full name: " + contactRequest.getFullName() + "\nDescription: " + contactRequest.getDescription();
        mailingUtil.sendMessage(emailAdmin, contactRequest.getEmail(), message);
        return ResponseEntity.ok("sent!");
    }
}
