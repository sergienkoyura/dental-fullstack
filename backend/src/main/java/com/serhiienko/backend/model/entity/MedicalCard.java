package com.serhiienko.backend.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "medical_card")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicalCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Length(max = 255, message = "Length must be between 0 and 255 characters")
    private String latestReport;
    @Length(max = 255, message = "Length must be between 0 and 255 characters")
    private String latestDisease;
    @Length(max = 1500, message = "Description must be between 0 and 1500 characters")
    @Column(length = 1500)
    private String diseaseDescription;
    @Lob
    private byte[] newestResults;
}
