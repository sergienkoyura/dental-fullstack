package com.serhiienko.backend.model.form;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class ContactRequest {
    @Length(max = 50, min = 5, message = "Full name must be between 5 and 50 characters")
    @Pattern(regexp = "^[a-zA-Z]+(?:\\s[a-zA-Z]+)*$", message = "Full name must have latin letters only")
    private String fullName;
    @Email(message = "Email is invalid")
    @NotBlank(message = "Email can't be empty")
    private String email;

    @NotBlank(message = "Description can't be empty")
    @Length(max = 1500, message = "Description is too long")
    private String description;
}
