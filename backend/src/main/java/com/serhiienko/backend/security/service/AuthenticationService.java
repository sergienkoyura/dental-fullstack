package com.serhiienko.backend.security.service;

import com.serhiienko.backend.exception.BadRequestException;
import com.serhiienko.backend.model.dto.AuthResponse;
import com.serhiienko.backend.model.entity.MedicalCard;
import com.serhiienko.backend.model.entity.Token;
import com.serhiienko.backend.model.entity.User;
import com.serhiienko.backend.model.entity.Verification;
import com.serhiienko.backend.model.enumeration.Role;
import com.serhiienko.backend.model.form.AuthRequest;
import com.serhiienko.backend.model.form.RegisterRequest;
import com.serhiienko.backend.model.form.TokenRequest;
import com.serhiienko.backend.security.util.JwtUtils;
import com.serhiienko.backend.service.TokenService;
import com.serhiienko.backend.service.UserService;
import com.serhiienko.backend.service.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final TokenService tokenService;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsServiceImpl userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final VerificationService verificationService;

    public AuthResponse register(RegisterRequest request) throws Exception {
        User tempUser = userService.getUserByEmailNullable(request.getEmail());
        if (tempUser == null) {

            MedicalCard medicalCard = new MedicalCard();
            User user = User.builder()
                    .fullName(request.getFullname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.ROLE_USER)
                    .medicalCard(medicalCard)
                    .build();
            User savedUser = userService.save(user);

            String jwtToken = jwtUtils.generateToken(userDetailsService.mapUserToUserDetails(user));
            String refreshToken = jwtUtils.generateRefreshToken(userDetailsService.mapUserToUserDetails(user));
            saveUserToken(savedUser, jwtToken);

            Verification verification = verificationService.generate(request.getEmail());
            verificationService.send(verification);

            return AuthResponse.builder()
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken)
                    .build();
        } else {
            throw new BadRequestException(String.format("User %s exists", tempUser.getEmail()));
        }
    }

    public AuthResponse authenticate(AuthRequest request) {
        User user = userService.getUserByEmail(request.getEmail());

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(), request.getPassword(), List.of(new SimpleGrantedAuthority(user.getRole().name()))
        ));

        revokeAllUserTokens(user);
        String jwtToken = jwtUtils.generateToken(userDetailsService.mapUserToUserDetails(user));
        String refreshToken = jwtUtils.generateRefreshToken(userDetailsService.mapUserToUserDetails(user));
        saveUserToken(user, jwtToken);
        return AuthResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    private void revokeAllUserTokens(User user) {
        tokenService.deleteAllExpiredByUser(user.getId());
    }

    private void saveUserToken(User savedUser, String jwtToken) {
        Token token = Token.builder()
                .user(savedUser)
                .token(jwtToken)
                .expired(false)
                .build();
        tokenService.save(token);
    }

    public ResponseEntity<?> refreshToken(TokenRequest tokenRequest) throws Exception {
        String refreshToken = tokenRequest.getRefreshToken();
        final String userEmail;
        userEmail = jwtUtils.extractUsername(refreshToken);

        if (userEmail != null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            User user = userService.getUserByEmailNullable(userEmail);

            if (jwtUtils.isTokenValid(refreshToken, userDetails) && user != null) {
                tokenService.deleteByToken(tokenRequest.getAccessToken());

                String accessToken = jwtUtils.generateToken(userDetails);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                return ResponseEntity.ok(AuthResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build());
            }
        }
        return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
    }

}
