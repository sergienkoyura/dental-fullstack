package com.serhiienko.backend.exception.message;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorMessage {
    private int status;
    private Date error;
    private String message;
    private String path;
}
