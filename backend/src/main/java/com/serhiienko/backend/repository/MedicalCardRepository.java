package com.serhiienko.backend.repository;

import com.serhiienko.backend.model.entity.MedicalCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MedicalCardRepository extends JpaRepository<MedicalCard, Long> {
    @Query("""
    select c from MedicalCard c join User u on u.medicalCard.id = c.id where u.email = :email
""")
    MedicalCard findByUserEmail(String email);
    @Query("""
    select c from MedicalCard c join User u on u.medicalCard.id = c.id where u.id = :id
""")
    MedicalCard findByUserId(Long id);
}
