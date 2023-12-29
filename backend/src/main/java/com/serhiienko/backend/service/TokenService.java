package com.serhiienko.backend.service;

import com.serhiienko.backend.model.dto.UserDTO;
import com.serhiienko.backend.model.entity.Token;
import com.serhiienko.backend.model.form.PasswordRequest;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenService {
    void deleteAllExpiredByUser(Long userId);
    void delete(Token token);
    Optional<Token> findByToken(String token);
    void save(Token token);

    void saveAll(List<Token> tokens);

    void deleteByToken(String accessToken);
}
