package com.serhiienko.backend.model.form;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserRequest {
    private Long id;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String fullName;
    private String description;
    @NotBlank
    private String password;
    private Boolean verified;
    private String role;
    @Lob
    private byte[] image;

    private String fromTime;
    private String toTime;
}
