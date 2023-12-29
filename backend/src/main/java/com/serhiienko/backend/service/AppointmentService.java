package com.serhiienko.backend.service;

import com.serhiienko.backend.model.dto.AppointmentDTO;
import com.serhiienko.backend.model.enumeration.AppointmentStatus;
import com.serhiienko.backend.model.enumeration.EstimatedTime;
import com.serhiienko.backend.model.form.AppointmentRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

public interface AppointmentService {
    AppointmentDTO save(AppointmentRequest appointmentRequest);

    Page<AppointmentDTO> getAllByUserEmail(String email, int pageNumber, int pageSize, AppointmentStatus status, Sort date);

    AppointmentDTO getById(Long id);

    void deleteById(Long id);

    void complete(Long id);
    List<AppointmentDTO> getAppointmentsByDateAndEmail(Date date, String email, AppointmentStatus status);

    List<AppointmentDTO> getAppointmentsByDateAndStatus(Date date, AppointmentStatus status);

    HashMap<String, List<Date>> getAvailableIntervals(Date date, EstimatedTime time, String email);
}
