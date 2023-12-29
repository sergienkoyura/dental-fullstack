package com.serhiienko.backend.repository;

import com.serhiienko.backend.model.entity.Verification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface VerificationRepository extends JpaRepository<Verification, Long> {
    Optional<Verification> findByUserId(Long userId);
    @Modifying
    @Query("""
    delete from Verification v where v.user.id = :userId
""")
    void deleteByUserId(Long userId);
}
