package com.serhiienko.backend.service.impl;

import com.serhiienko.backend.exception.ItemNotFoundException;
import com.serhiienko.backend.model.entity.Pricing;
import com.serhiienko.backend.repository.PricingRepository;
import com.serhiienko.backend.service.PricingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PricingServiceImpl implements PricingService {
    private final PricingRepository pricingRepository;

    @Override
    public Pricing getById(Long id) {
        return pricingRepository.findById(id).orElseThrow(() -> {
            throw new ItemNotFoundException("Pricing not found");
        });
    }

    @Override
    public List<Pricing> getAll() {
        return pricingRepository.findAll();
    }

    @Override
    public Pricing save(Pricing pricing) {
        return pricingRepository.save(pricing);
    }

    @Override
    public void deleteById(Long id) {
        pricingRepository.deleteById(id);
    }
}
