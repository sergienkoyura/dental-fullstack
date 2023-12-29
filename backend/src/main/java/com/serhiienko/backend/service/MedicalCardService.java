package com.serhiienko.backend.service;

import com.serhiienko.backend.model.entity.MedicalCard;

public interface MedicalCardService {
    MedicalCard save(MedicalCard medicalCard);

    MedicalCard getByUser(String email);

    MedicalCard getByUserId(Long id);
}
