package com.serhiienko.backend.model.entity;

import com.serhiienko.backend.model.enumeration.EstimatedTime;
import com.serhiienko.backend.model.enumeration.PricingCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "pricing")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pricing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Fields can't be blank")
    @Pattern(regexp = "^[a-zA-Z]+(?:\\s[a-zA-Z]+)*$", message = "Latin characters only")
    @Length(max = 255, message = "Service name must be between 0 and 255 characters")
    private String service;
    @Enumerated(EnumType.STRING)
    private PricingCategory category;
    @Min(value = 50, message = "Cost must be greater then 50")
    private double cost;
    @Enumerated(EnumType.STRING)
    private EstimatedTime time;
}
