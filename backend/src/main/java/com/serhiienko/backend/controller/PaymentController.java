package com.serhiienko.backend.controller;

import com.serhiienko.backend.model.form.PaymentInfoRequest;
import com.serhiienko.backend.security.util.JwtUtils;
import com.serhiienko.backend.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/secure/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final JwtUtils jwtUtils;

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfoRequest paymentInfoRequest) throws StripeException {
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentInfoRequest);
        String paymentStr = paymentIntent.toJson();

        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }

    @PutMapping("/payment-complete")
    public ResponseEntity<String> stripePaymentComplete(@RequestBody PaymentInfoRequest paymentInfoRequest) throws Exception {
        return paymentService.stripePayment(paymentInfoRequest);
    }
}
