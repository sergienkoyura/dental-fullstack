package com.serhiienko.backend.model.dto;

import com.serhiienko.backend.model.enumeration.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private Long id;
    private String email;
    private String fullName;
    private String description;
    private Boolean verified;
    private String role;
    @Lob
    private byte[] image;

    private String fromTime;
    private String toTime;
}
