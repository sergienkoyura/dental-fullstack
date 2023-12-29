package com.serhiienko.backend.service.impl;


import com.serhiienko.backend.exception.ItemNotFoundException;
import com.serhiienko.backend.model.entity.Token;
import com.serhiienko.backend.repository.TokenRepository;
import com.serhiienko.backend.service.TokenService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {
    private final TokenRepository tokenRepository;
    @Override
    @Transactional
    public void deleteAllExpiredByUser(Long userId) {
        tokenRepository.deleteAllExpiredTokens(userId);
    }

    @Override
    public void delete(Token token) {
        tokenRepository.delete(token);
    }

    @Override
    public Optional<Token> findByToken(String token) {
        return tokenRepository.findByToken(token);
    }

    @Override
    public void save(Token token) {
        tokenRepository.save(token);
    }

    @Override
    public void saveAll(List<Token> tokens) {
        tokenRepository.saveAll(tokens);
    }

    @Override
    @Transactional
    public void deleteByToken(String accessToken) {
        if(tokenRepository.findByToken(accessToken).isPresent())
            tokenRepository.deleteByToken(accessToken);
        else throw new ItemNotFoundException("Token not found");
    }


}
