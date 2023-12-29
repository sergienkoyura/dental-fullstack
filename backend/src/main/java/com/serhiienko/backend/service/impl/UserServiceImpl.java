package com.serhiienko.backend.service.impl;

import com.serhiienko.backend.exception.BadRequestException;
import com.serhiienko.backend.exception.PasswordNotMatchException;
import com.serhiienko.backend.model.dto.ProfileDTO;
import com.serhiienko.backend.model.dto.UserDTO;
import com.serhiienko.backend.model.entity.MedicalCard;
import com.serhiienko.backend.model.entity.User;
import com.serhiienko.backend.model.enumeration.Role;
import com.serhiienko.backend.model.form.PasswordRequest;
import com.serhiienko.backend.model.form.UserRequest;
import com.serhiienko.backend.model.mapper.UserMapper;
import com.serhiienko.backend.repository.MedicalCardRepository;
import com.serhiienko.backend.repository.UserRepository;
import com.serhiienko.backend.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MedicalCardRepository medicalCardRepository;

    @Override
    @Transactional
    public User getDoctorByFullName(String fullName) {
        return userRepository.findByRoleAndFullName(Role.ROLE_DOCTOR, fullName);
    }

    @Override
    @Transactional
    public ProfileDTO getProfileDTOByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Username with %s not found", email)));
        return UserMapper.MAPPER.mapToProfileDTO(user);
    }

    @Override
    @Transactional
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Username with %s not found", email)));
    }

    public User getUserByEmailNullable(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public List<UserDTO> getAll() {
        return UserMapper.MAPPER.mapToDTOList(userRepository.findAll());
    }

    @Override
    public UserDTO save(UserDTO userDTO) {
        if (userDTO.getEmail().equals("admin@admin.com")){
            throw new BadRequestException("You can't edit this admin!");
        }

        User user = UserMapper.MAPPER.mapToEntity(userDTO);
        if (user.getMedicalCard() == null){
            user.setMedicalCard(new MedicalCard());
        }
        return UserMapper.MAPPER.mapToDTO(userRepository.save(user));
    }

    @Override
    public UserDTO save(UserRequest userRequest) {
        User user = getUserByIdNullable(userRequest.getId());
        if (userRequest.getEmail().equals("admin@admin.com")){
            throw new BadRequestException("You can't edit this admin!");
        }
        if ((userRequest.getId() == null || userRequest.getId() == 0) && user != null ||
                userRepository.existsByEmail(userRequest.getEmail())){
            throw new BadRequestException("User with this email exists!");
        }

        User userToSave = UserMapper.MAPPER.mapToEntity(userRequest);
        userToSave.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        if (user == null || user.getMedicalCard() == null){
            userToSave.setMedicalCard(new MedicalCard());
        } else {
            userToSave.setMedicalCard(user.getMedicalCard());
        }
        return UserMapper.MAPPER.mapToDTO(userRepository.save(userToSave));
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public UserDTO update(String email, UserDTO userDTO) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Username with %s not found", userDTO.getEmail())));

        if (userDTO.getFullName() != null)
            user.setFullName(userDTO.getFullName());
        if (userDTO.getDescription() != null)
            user.setDescription(userDTO.getDescription());

        return UserMapper.MAPPER.mapToDTO(userRepository.save(user));
    }

    @Override
    public UserDTO updatePassword(String email,
                                  PasswordRequest passwordRequest) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Username with %s not found", email)));

        try {
            if (BCrypt.checkpw(passwordRequest.getOldPassword(), user.getPassword())) {

                if (passwordRequest.getNewPassword() != null)
                    user.setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));

                return UserMapper.MAPPER.mapToDTO(userRepository.save(user));
            } else {
                throw new PasswordNotMatchException("Old password is wrong!");
            }
        } catch (Exception e) {
            throw new PasswordNotMatchException("Old password is wrong!");
        }

    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void deleteById(String email, Long id) throws BadRequestException {
        User userToDelete = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Username with %s not found", email)));
        if (userToDelete.getEmail().equals("admin@admin.com")){
            throw new BadRequestException("You can't delete this admin!");
        }
        if (userToDelete.getEmail().equals(email)){
            throw new BadRequestException("You can't delete yourself...");
        }
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public List<UserDTO> getAllDoctors() {
        return UserMapper.MAPPER.mapToDTOList(userRepository.findAllDoctors());
    }

    @Override
    public User getUserByIdNullable(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public List<UserDTO> getAllUsers() {
        return UserMapper.MAPPER.mapToDTOList(userRepository.findAllUsers());
    }

}
