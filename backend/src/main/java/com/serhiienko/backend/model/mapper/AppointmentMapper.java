package com.serhiienko.backend.model.mapper;

import com.serhiienko.backend.model.dto.AppointmentDTO;
import com.serhiienko.backend.model.entity.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface AppointmentMapper {
    AppointmentMapper MAPPER = Mappers.getMapper(AppointmentMapper.class);
    Appointment mapToEntity(AppointmentDTO appointmentDTO);
    AppointmentDTO mapToDTO(Appointment appointment);
    List<AppointmentDTO> mapToDTOList(List<Appointment> appointments);
}
