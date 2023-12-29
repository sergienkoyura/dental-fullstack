package com.serhiienko.backend.model.dto;

import jakarta.persistence.Lob;
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
