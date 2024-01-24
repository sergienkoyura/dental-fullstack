package com.serhiienko.backend.controller;

import com.serhiienko.backend.model.dto.AppointmentDTO;
import com.serhiienko.backend.model.enumeration.AppointmentStatus;
import com.serhiienko.backend.model.enumeration.EstimatedTime;
import com.serhiienko.backend.model.form.AppointmentRequest;
import com.serhiienko.backend.security.util.JwtUtils;
import com.serhiienko.backend.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/secure/appointments")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final JwtUtils jwtUtils;

    @GetMapping("/available")
    public ResponseEntity<HashMap<String, List<Date>>> getAvailableIntervals(@RequestParam String date, @RequestParam EstimatedTime time,
                                                                             @RequestHeader(value = "Authorization") String token) throws ParseException {
        String email = jwtUtils.extractUsername(token);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date dateToProcess = sdf.parse(date);

        return ResponseEntity.ok(appointmentService.getAvailableIntervals(dateToProcess, time, email));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDTO> getAppointment(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getById(id));
    }

    @GetMapping("/scheduled")
    public ResponseEntity<?> getByUserEmailScheduled(@RequestParam int pageNumber,
                                                     @RequestParam int pageSize,
                                                     @RequestHeader(value = "Authorization") String token) {
        String email = jwtUtils.extractUsername(token);

        Page<AppointmentDTO> appointmentRaw = appointmentService.getAllByUserEmail(email, pageNumber, pageSize, AppointmentStatus.scheduled, Sort.by("date").ascending());

        List<AppointmentDTO> appointments = appointmentRaw.getContent();

        Map<String, Object> response = new HashMap<>();
        response.put("appointments", appointments);
        response.put("currentPage", appointmentRaw.getNumber());
        response.put("totalElements", appointmentRaw.getTotalElements());
        response.put("totalPages", appointmentRaw.getTotalPages());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/history")
    public ResponseEntity<?> getUserByEmailHistory(@RequestParam int pageNumber,
                                                   @RequestParam int pageSize,
                                                   @RequestHeader(value = "Authorization") String token) {
        String email = jwtUtils.extractUsername(token);

        Page<AppointmentDTO> appointmentRaw = appointmentService.getAllByUserEmail(email, pageNumber, pageSize, AppointmentStatus.visited, Sort.by("date").descending());

        List<AppointmentDTO> appointments = appointmentRaw.getContent();

        Map<String, Object> response = new HashMap<>();
        response.put("appointments", appointments);
        response.put("currentPage", appointmentRaw.getNumber());
        response.put("totalElements", appointmentRaw.getTotalElements());
        response.put("totalPages", appointmentRaw.getTotalPages());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        appointmentService.deleteById(id);
        return ResponseEntity.ok("deleted");
    }

    @PostMapping
    public ResponseEntity<AppointmentDTO> addAppointment(@RequestBody AppointmentRequest appointmentRequest) throws ParseException {
        return ResponseEntity.ok(appointmentService.save(appointmentRequest));
    }

    @GetMapping
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByDate(@RequestParam String date,
                                                                      @RequestHeader(value = "Authorization") String token) throws ParseException {
        String email = jwtUtils.extractUsername(token);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date dateToProcess = sdf.parse(date);

        return ResponseEntity.ok(appointmentService.getAppointmentsByDateAndEmail(dateToProcess, email, AppointmentStatus.scheduled));
    }

    @GetMapping("/scheduled/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AppointmentDTO>> getAllByDate(@RequestParam String date) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date dateToProcess = sdf.parse(date);

        return ResponseEntity.ok(appointmentService.getAppointmentsByDateAndStatus(dateToProcess, AppointmentStatus.scheduled));
    }

    @PatchMapping("/complete/{id}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<String> completeAppointment(@PathVariable Long id) throws ParseException {
        appointmentService.complete(id);
        return ResponseEntity.ok("completed");
    }

    @PatchMapping("/pay/{id}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<String> payForAppointment(@PathVariable Long id) throws ParseException {
        appointmentService.setPaid(id);
        return ResponseEntity.ok("completed");
    }
}
