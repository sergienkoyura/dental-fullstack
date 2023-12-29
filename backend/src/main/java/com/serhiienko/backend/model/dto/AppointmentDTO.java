package com.serhiienko.backend.model.dto;

import com.serhiienko.backend.model.entity.User;
import com.serhiienko.backend.model.enumeration.AppointmentStatus;
import com.serhiienko.backend.model.enumeration.EstimatedTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Builder
@Data
public class AppointmentDTO {
    private Long id;
    private Date date;
    private EstimatedTime duration;
    private String description;
    private AppointmentStatus status;
    private UserDTO patient;
    private UserDTO doctor;
    private double cost;
    private boolean paid;
}
