package com.serhiienko.backend.controller;

import com.serhiienko.backend.exception.BadRequestException;
import com.serhiienko.backend.model.entity.Pricing;
import com.serhiienko.backend.security.util.JwtUtils;
import com.serhiienko.backend.service.PricingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class PricingController {
    private final JwtUtils jwtUtils;
    private final PricingService pricingService;

    @GetMapping("/secure/pricing/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Pricing> getPricing(@PathVariable Long id){
        return ResponseEntity.ok(pricingService.getById(id));
    }

    @DeleteMapping("/secure/pricing/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deletePricing(@PathVariable Long id){
        pricingService.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }

    @PostMapping("/secure/pricing")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> savePricing(@RequestBody @Valid Pricing pricing, BindingResult bindingResult) throws BadRequestException{
        return ResponseEntity.ok(pricingService.save(pricing));
    }
}
