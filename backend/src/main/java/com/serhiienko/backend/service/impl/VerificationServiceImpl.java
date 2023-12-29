package com.serhiienko.backend.service.impl;

import com.serhiienko.backend.exception.BadRequestException;
import com.serhiienko.backend.model.entity.User;
import com.serhiienko.backend.model.entity.Verification;
import com.serhiienko.backend.repository.UserRepository;
import com.serhiienko.backend.repository.VerificationRepository;
import com.serhiienko.backend.service.VerificationService;
import com.serhiienko.backend.util.MailingUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class VerificationServiceImpl implements VerificationService {

    private final VerificationRepository verificationRepository;
    private final UserRepository userRepository;
    private final MailingUtil mailingUtil;
    @Override
    @Transactional
    public Verification generate(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            throw new RuntimeException("User doesn't exist!");
        });

        verificationRepository.deleteByUserId(user.getId());

        Verification toSave = Verification.builder()
                .code(String.valueOf(new Random().nextInt(1000, 9999)))
                .user(user)
                .build();

        return verificationRepository.save(toSave);
    }

    @Override
    public boolean delete(Long userId) {
        Optional<Verification> verification = verificationRepository.findByUserId(userId);
        if (verification.isPresent()) {
            verificationRepository.delete(verification.get());
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void send(Verification verification) {
        mailingUtil.sendVerify(verification.getUser().getEmail(), verification.getCode());
    }

    @Override
    public void verify(String email, String code) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            throw new BadRequestException("User doesn't exist!");
        });

        Optional<Verification> verification = verificationRepository.findByUserId(user.getId());
        if (verification.isPresent()){
            if (verification.get().getCode().equals(code)){
                verificationRepository.delete(verification.get());
                user.setVerified(true);
                userRepository.save(user);
            } else {
                throw new BadRequestException("Code doesn't match");
            }
        } else{
            throw new BadRequestException("VerificationController is not generated");
        }
    }
}
