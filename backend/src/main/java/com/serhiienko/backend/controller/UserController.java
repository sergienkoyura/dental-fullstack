package com.serhiienko.backend.controller;

import com.serhiienko.backend.exception.BadRequestException;
import com.serhiienko.backend.model.dto.ProfileDTO;
import com.serhiienko.backend.model.dto.UserDTO;
import com.serhiienko.backend.model.form.PasswordRequest;
import com.serhiienko.backend.model.form.UserRequest;
import com.serhiienko.backend.security.util.JwtUtils;
import com.serhiienko.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/secure/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtUtils jwtUtils;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveUser(@RequestBody @Valid UserRequest userRequest, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            if (bindingResult.getFieldError("email") != null)
                throw new BadRequestException("Email is invalid!");
            if (bindingResult.getFieldError("length") != null)
                throw new BadRequestException("One of the fields is not in the bounds");
            throw new BadRequestException("Bad Request!");
        }
        return ResponseEntity.ok(userService.save(userRequest));
    }
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getUsers(){
        return ResponseEntity.ok(userService.getAll());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable Long id,
                                             @RequestHeader(value = "Authorization") String token) throws BadRequestException {
        String email = jwtUtils.extractUsername(token);
        userService.deleteById(email, id);
        return ResponseEntity.ok("deleted!");
    }

    @GetMapping("/user-profile")
    public ResponseEntity<ProfileDTO> getUserProfile(@RequestHeader(value = "Authorization") String token) {
        String email = jwtUtils.extractUsername(token);
        return ResponseEntity.ok(userService.getProfileDTOByEmail(email));
    }

    @PatchMapping("/update")
    public ResponseEntity<UserDTO> updateUserInfo(@RequestBody UserDTO userDTO,
                                                  @RequestHeader(value = "Authorization") String token) {
        String email = jwtUtils.extractUsername(token);
        return ResponseEntity.ok(userService.update(email, userDTO));
    }

    @PatchMapping("/update/password")
    public ResponseEntity<UserDTO> updateUserPassword(@RequestBody PasswordRequest passwordRequest,
                                                      @RequestHeader(value = "Authorization") String token) {
        String email = jwtUtils.extractUsername(token);
        return ResponseEntity.ok(userService.updatePassword(email, passwordRequest));
    }

    @GetMapping("/role-user")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllRoleUser(){
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
