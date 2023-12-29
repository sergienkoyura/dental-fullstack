package com.serhiienko.backend.service;

import com.serhiienko.backend.model.entity.Token;

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
