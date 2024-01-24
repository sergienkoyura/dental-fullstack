package com.serhiienko.backend.service.impl;

import com.serhiienko.backend.exception.BadRequestException;
import com.serhiienko.backend.exception.ItemNotFoundException;
import com.serhiienko.backend.model.dto.AppointmentDTO;
import com.serhiienko.backend.model.dto.UserDTO;
import com.serhiienko.backend.model.entity.Appointment;
import com.serhiienko.backend.model.entity.User;
import com.serhiienko.backend.model.enumeration.AppointmentStatus;
import com.serhiienko.backend.model.enumeration.EstimatedTime;
import com.serhiienko.backend.model.form.AppointmentRequest;
import com.serhiienko.backend.model.mapper.AppointmentMapper;
import com.serhiienko.backend.model.mapper.UserMapper;
import com.serhiienko.backend.repository.AppointmentRepository;
import com.serhiienko.backend.service.AppointmentService;
import com.serhiienko.backend.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final UserService userService;

    @Override
    public AppointmentDTO save(AppointmentRequest appointmentRequest) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
        Appointment appointment;
        try {
            User doctor = userService.getDoctorByFullName(appointmentRequest.getDoctorFullName());
            if (appointmentRepository.existsByDateAndDoctorId(sdf.parse(appointmentRequest.getDate()), doctor.getId())){
                throw new BadRequestException("This time is taken, choose another one");
            }
            appointment = Appointment.builder()
                    .status(appointmentRequest.getStatus())
                    .date(sdf.parse(appointmentRequest.getDate()))
                    .doctor(doctor)
                    .patient(userService.getUserByEmail(appointmentRequest.getPatientEmail()))
                    .pricing(appointmentRequest.getPricing())
                    .build();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        return AppointmentMapper.MAPPER.mapToDTO(appointmentRepository.save(appointment));
    }

    @Override
    @Transactional
    public Page<AppointmentDTO> getAllByUserEmail(String email, int pageNumber, int pageSize, AppointmentStatus status, Sort date) {
        Page<Appointment> appointments = appointmentRepository.findAllByPatient_EmailAndStatus(email, PageRequest.of(pageNumber, pageSize, date), status);
        return appointments.map(el ->
                AppointmentDTO.builder()
                        .id(el.getId())
                        .date(el.getDate())
                        .status(el.getStatus())
                        .patient(UserMapper.MAPPER.mapToDTO(el.getPatient()))
                        .doctor(UserMapper.MAPPER.mapToDTO(el.getDoctor()))
                        .pricing(el.getPricing())
                        .paid(el.isPaid())
                        .build()
        );
    }

    @Override
    public AppointmentDTO getById(Long id) {
        return null;
    }

    @Override
    public void deleteById(Long id) {
        appointmentRepository.deleteById(id);
    }

    @Override
    public void complete(Long id) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> {
            throw new ItemNotFoundException("Appointment not found");
        });

        if (appointment.isPaid()){
            appointment.setStatus(AppointmentStatus.visited);
            appointmentRepository.save(appointment);
        } else {
            throw new BadRequestException("Appointment is not paid");
        }

    }

    @Override
    public void setPaid(Long id) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> {
            throw new ItemNotFoundException("Appointment not found");
        });

        appointment.setPaid(true);
        appointmentRepository.save(appointment);
    }

    @Override
    @Transactional
    public void completeAllExpired() {
        appointmentRepository.completeAllExpired();
    }

    @Override
    @Transactional
    public List<AppointmentDTO> getAppointmentsByDateAndEmail(Date date, String email, AppointmentStatus status) {
        return AppointmentMapper.MAPPER.mapToDTOList(appointmentRepository.findAllByDateAndDoctor_Email(date, email,status));
    }

    @Override
    @Transactional
    public List<AppointmentDTO> getAppointmentsByDateAndStatus(Date date, AppointmentStatus status) {
        return AppointmentMapper.MAPPER.mapToDTOList(appointmentRepository.findAllByDateAndStatus(date, status));
    }

    @Override
    public HashMap<String, List<Date>> getAvailableIntervals(Date date, EstimatedTime time, String email) { // yyyy-MM-dd
        HashMap<UserDTO, List<Date>> intervals = new HashMap<>();
        HashMap<String, List<Date>> toReturn = new HashMap<>();

        List<UserDTO> doctors = userService.getAllDoctors();
        doctors.forEach(el -> {
            intervals.put(el, initializeIntervals(date, time, el.getFromTime(), el.getToTime()));
        });

        List<AppointmentDTO> appointmentList = getAppointmentsByDateAndStatus(date, AppointmentStatus.scheduled);
        for (UserDTO key : intervals.keySet()) {
            for (AppointmentDTO dto : appointmentList) {
                if (dto.getDoctor().getId().equals(key.getId())) {
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(dto.getDate());
                    calendar.add(Calendar.MINUTE, (int) dto.getPricing().getTime().getTime());
                    Date dateTo = calendar.getTime();

                    intervals.get(key).removeIf(el -> {
                        return (el.compareTo(dto.getDate()) >= 0 &&
                                el.compareTo(dateTo) < 0) ||
                                ((el.getTime() + time.getTime() * 60 * 1000) > dto.getDate().getTime() &&
                                        (el.getTime() + time.getTime() * 60 * 1000) < (dto.getDate().getTime() + time.getTime() * 60 * 1000));
                    });
                }
            }
            toReturn.put(key.getFullName(), intervals.get(key));
        }

        return toReturn;
    }

    public List<Date> initializeIntervals(Date date, EstimatedTime time, String from, String to) {
        try {
            List<Date> intervals = new ArrayList<>();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            String theDay = sdf.format(date);

            boolean isToday = theDay.equals(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));

            sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
            Date dateFrom = sdf.parse(theDay + "T" + from);
            Date dateTo = sdf.parse(theDay + "T" + to);

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(dateTo);
            calendar.add(Calendar.MINUTE, (int) (15 - time.getTime()));
            dateTo = calendar.getTime();


            calendar.setTime(dateFrom);

            while (calendar.getTime().before(dateTo)) {
                if (calendar.getTime().after(new Date()))
                    intervals.add(calendar.getTime());
                calendar.add(Calendar.MINUTE, 15);
            }
            return intervals;

        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
