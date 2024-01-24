package com.serhiienko.backend.model.form;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
public class UserRequest {
    private Long id;
    @NotBlank
    @Email
    @Length(max = 255)
    private String email;
    @NotBlank
    @Length(min = 5, max = 50)
    private String fullName;
    @Length(max = 1500)
    private String description;
    @NotBlank
    @Length(min = 6, max = 64)
    private String password;
    private Boolean verified;
    private String role;
    @Lob
    private byte[] image;

    private String fromTime;
    private String toTime;
}
