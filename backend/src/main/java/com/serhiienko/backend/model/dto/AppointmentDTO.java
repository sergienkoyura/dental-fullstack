package com.serhiienko.backend.model.dto;

import com.serhiienko.backend.model.entity.Pricing;
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
    private AppointmentStatus status;
    private UserDTO patient;
    private UserDTO doctor;
    private Pricing pricing;
    private boolean paid;
}
