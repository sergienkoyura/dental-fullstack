package com.serhiienko.backend.model.form;

import lombok.Data;

@Data
public class ContactRequest {
    private String fullName;
    private String email;
    private String description;
}
