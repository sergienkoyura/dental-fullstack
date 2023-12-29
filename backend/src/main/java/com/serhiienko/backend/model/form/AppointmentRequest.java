package com.serhiienko.backend.model.form;

import com.serhiienko.backend.model.enumeration.AppointmentStatus;
import com.serhiienko.backend.model.enumeration.EstimatedTime;
import lombok.Data;

@Data
public class AppointmentRequest {
    private String description;
    private AppointmentStatus status;
    private String doctorFullName;
    private EstimatedTime duration;
    private String patientEmail;
    private String date;
    private double cost;
    private boolean paid;
}
