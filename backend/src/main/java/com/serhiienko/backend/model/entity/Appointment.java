package com.serhiienko.backend.model.entity;

import com.serhiienko.backend.model.enumeration.AppointmentStatus;
import com.serhiienko.backend.model.enumeration.EstimatedTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "appointment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date;
    @Enumerated(EnumType.STRING)
    private EstimatedTime duration;
    private String description;
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;
    private double cost;
    private boolean paid;
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "patient_id", referencedColumnName = "id")
    private User patient;
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "doctor_id", referencedColumnName = "id")
    private User doctor;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "appointment")
    private Payment payment;
}
