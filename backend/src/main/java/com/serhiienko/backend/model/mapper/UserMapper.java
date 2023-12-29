package com.serhiienko.backend.model.mapper;

import com.serhiienko.backend.model.dto.ProfileDTO;
import com.serhiienko.backend.model.dto.UserDTO;
import com.serhiienko.backend.model.entity.User;
import com.serhiienko.backend.model.form.UserRequest;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface UserMapper {

    UserMapper MAPPER = Mappers.getMapper(UserMapper.class);
    UserDTO mapToDTO(User user);
    ProfileDTO mapToProfileDTO(User user);
    User mapToEntity(UserDTO userDTO);
    List<UserDTO> mapToDTOList(List<User> all);
    User mapToEntity(UserRequest userRequest);
}
