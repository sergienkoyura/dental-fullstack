package com.serhiienko.backend.model.form;

import com.serhiienko.backend.model.dto.AppointmentDTO;
import lombok.Data;

@Data
public class PaymentInfoRequest {
    private int amount;
    private String currency;
    private AppointmentDTO appointmentDTO;
}