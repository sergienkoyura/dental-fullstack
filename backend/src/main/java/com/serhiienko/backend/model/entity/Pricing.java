package com.serhiienko.backend.model.entity;

import com.serhiienko.backend.model.enumeration.EstimatedTime;
import com.serhiienko.backend.model.enumeration.PricingCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pricing")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pricing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String service;
    @Enumerated(EnumType.STRING)
    private PricingCategory category;
    private double cost;
    @Enumerated(EnumType.STRING)
    private EstimatedTime time;
}
