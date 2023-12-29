package com.serhiienko.backend.service;

import com.serhiienko.backend.model.dto.ProfileDTO;
import com.serhiienko.backend.model.dto.UserDTO;
import com.serhiienko.backend.model.entity.User;
import com.serhiienko.backend.model.form.PasswordRequest;
import com.serhiienko.backend.model.form.UserRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    User getDoctorByFullName(String fullName);
    ProfileDTO getProfileDTOByEmail(String email);
    User getUserByEmail(String email);
    User getUserByEmailNullable(String email);
    List<UserDTO> getAll();
    UserDTO save(UserDTO userDTO);
    UserDTO save(UserRequest userRequest);
    User save(User user);
    UserDTO update(String email, UserDTO userDTO);

    UserDTO updatePassword(String email, PasswordRequest passwordRequest);

    boolean existsByEmail(String email);


    void deleteById(String email, Long id);

    List<UserDTO> getAllDoctors();
    User getUserByIdNullable(Long id);

    List<UserDTO> getAllUsers();
}
