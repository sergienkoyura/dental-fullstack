package com.serhiienko.backend.service;

import com.serhiienko.backend.model.form.PaymentInfoRequest;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.http.ResponseEntity;

public interface PaymentService {
    PaymentIntent createPaymentIntent(PaymentInfoRequest paymentInfoRequest) throws StripeException;

    ResponseEntity<String> stripePayment(PaymentInfoRequest paymentInfoRequest) throws Exception;
}
