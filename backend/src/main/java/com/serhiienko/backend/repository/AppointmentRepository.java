package com.serhiienko.backend.repository;

import com.serhiienko.backend.model.entity.Appointment;
import com.serhiienko.backend.model.enumeration.AppointmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    Page<Appointment> findAllByPatient_EmailAndStatus(String email, Pageable pageable, AppointmentStatus status);
    @Query("""
    select a from Appointment a join User u on a.doctor.id = u.id
    where date(a.date) = date(:date) and
    u.email = :email and
    a.status = :status
    order by a.date asc
""")
    List<Appointment> findAllByDateAndDoctor_Email(Date date, String email, AppointmentStatus status);
    @Query("""
    select a from Appointment a
    where date(a.date) = date(:date) and a.status = :status
    order by a.date asc
""")
    List<Appointment> findAllByDateAndStatus(Date date, AppointmentStatus status);
}
