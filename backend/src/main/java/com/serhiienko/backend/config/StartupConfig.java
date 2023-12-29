package com.serhiienko.backend.config;

import com.serhiienko.backend.model.entity.MedicalCard;
import com.serhiienko.backend.model.entity.User;
import com.serhiienko.backend.model.enumeration.Role;
import com.serhiienko.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StartupConfig implements ApplicationRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (!userRepository.existsByEmail("admin@admin.com"))
            userRepository.save(User.builder()
                    .email("admin@admin.com")
                    .fullName("admin")
                    .description("admin")
                    .verified(true)
                    .password(passwordEncoder.encode("admin"))
                    .role(Role.ROLE_ADMIN)
                    .medicalCard(new MedicalCard())
                    .build());
    }
}
