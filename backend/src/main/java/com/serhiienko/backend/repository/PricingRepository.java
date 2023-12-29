package com.serhiienko.backend.repository;

import com.serhiienko.backend.model.entity.Pricing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PricingRepository extends JpaRepository<Pricing, Long> {
}
