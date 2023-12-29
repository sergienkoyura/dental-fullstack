package com.serhiienko.backend.security.service;

import com.serhiienko.backend.model.entity.User;
import com.serhiienko.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findByEmail(username).orElseThrow(() -> {
            throw new RuntimeException("User not found");
        });
        return mapUserToUserDetails(user);
    }

    public UserDetailsImpl mapUserToUserDetails(User user) {
        UserDetailsImpl userDetailsImpl = new UserDetailsImpl();
        userDetailsImpl.setId(user.getId());
        userDetailsImpl.setEmail(user.getEmail());
        userDetailsImpl.setPassword(user.getPassword());
        userDetailsImpl.setRole(user.getRole());
        return userDetailsImpl;
    }
}
