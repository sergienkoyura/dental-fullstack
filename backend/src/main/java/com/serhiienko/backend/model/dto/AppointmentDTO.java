package com.serhiienko.backend.model.dto;

import com.serhiienko.backend.model.enumeration.AppointmentStatus;
import com.serhiienko.backend.model.enumeration.EstimatedTime;
import lombok.Builder;
import lombok.Data;

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
