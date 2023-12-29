package com.serhiienko.backend.repository;

import com.serhiienko.backend.model.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
