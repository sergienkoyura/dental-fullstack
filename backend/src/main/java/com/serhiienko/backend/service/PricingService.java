package com.serhiienko.backend.service;

import com.serhiienko.backend.model.entity.Pricing;

import java.util.List;

public interface PricingService {
    Pricing getById(Long id);
    List<Pricing> getAll();
    Pricing save(Pricing pricing);
    void deleteById(Long id);
}
