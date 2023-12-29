package com.serhiienko.backend.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "medical_card")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicalCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String latestReport;
    private String latestDisease;
    private String diseaseDescription;
    @Lob
    private byte[] newestResults;
}
