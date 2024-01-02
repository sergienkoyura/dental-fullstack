package com.serhiienko.backend.model.form;

import com.serhiienko.backend.model.entity.Pricing;
import com.serhiienko.backend.model.enumeration.AppointmentStatus;
import com.serhiienko.backend.model.enumeration.EstimatedTime;
import lombok.Data;

@Data
public class AppointmentRequest {
    private AppointmentStatus status;
    private String doctorFullName;
    private String patientEmail;
    private String date;
    private Pricing pricing;
    private boolean paid;
}
