package com.serhiienko.backend.service.impl;

import com.serhiienko.backend.model.entity.Appointment;
import com.serhiienko.backend.model.entity.Payment;
import com.serhiienko.backend.model.form.PaymentInfoRequest;
import com.serhiienko.backend.model.mapper.AppointmentMapper;
import com.serhiienko.backend.repository.AppointmentRepository;
import com.serhiienko.backend.repository.PaymentRepository;
import com.serhiienko.backend.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final AppointmentRepository appointmentRepository;

    @Autowired
    public PaymentServiceImpl(PaymentRepository paymentRepository, AppointmentRepository appointmentRepository,
                              @Value("${stripe.key.secret}") String secretKey) {
        this.paymentRepository = paymentRepository;
        this.appointmentRepository = appointmentRepository;
        Stripe.apiKey = secretKey;
    }

    @Override
    public PaymentIntent createPaymentIntent(PaymentInfoRequest paymentInfoRequest) throws StripeException {
        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfoRequest.getAmount());
        params.put("currency", paymentInfoRequest.getCurrency());
        params.put("payment_method_types", List.of("card"));

        return PaymentIntent.create(params);
    }

    @Override
    public ResponseEntity<String> stripePayment(PaymentInfoRequest paymentInfoRequest) {
        paymentRepository.save(Payment.builder()
                .amount(paymentInfoRequest.getAmount())
                .appointment(AppointmentMapper.MAPPER.mapToEntity(paymentInfoRequest.getAppointmentDTO()))
                .build());

        log.info(String.format("%s paid successfully!", paymentInfoRequest.getAppointmentDTO().getPatient().getEmail()));

        Appointment appointment = appointmentRepository.findById(paymentInfoRequest.getAppointmentDTO().getId()).orElse(null);
        if (appointment != null){
            appointment.setPaid(true);
            appointmentRepository.save(appointment);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
