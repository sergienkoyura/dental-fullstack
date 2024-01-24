package com.serhiienko.backend.util;

import com.serhiienko.backend.repository.AppointmentRepository;
import com.serhiienko.backend.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@EnableScheduling
@Component
@RequiredArgsConstructor
@Slf4j
public class ScheduleUtil {

    private final AppointmentService appointmentService;

    @Scheduled(cron = "0 0 0 * * *")
    public void runIndexingHours24(){
        log.info("Completing all expired appointments..");
        appointmentService.completeAllExpired();
    }

}
