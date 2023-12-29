package com.serhiienko.backend.service.impl;

import com.serhiienko.backend.model.entity.MedicalCard;
import com.serhiienko.backend.repository.MedicalCardRepository;
import com.serhiienko.backend.service.MedicalCardService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MedicalCardServiceImpl implements MedicalCardService {
    private final MedicalCardRepository medicalCardRepository;

    @Override
    public MedicalCard save(MedicalCard card) {
        return medicalCardRepository.save(card);
    }

    @Override
    @Transactional
    public MedicalCard getByUser(String email) {
        return medicalCardRepository.findByUserEmail(email);
    }

    @Override
    @Transactional
    public MedicalCard getByUserId(Long id) {
        return medicalCardRepository.findByUserId(id);
    }
}
