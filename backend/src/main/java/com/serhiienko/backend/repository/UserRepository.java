package com.serhiienko.backend.repository;

import com.serhiienko.backend.model.entity.User;
import com.serhiienko.backend.model.enumeration.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    User findByRoleAndFullName(Role role, String fullName);
    @Query("""
    select u from User u where u.role = 'ROLE_DOCTOR'
""")
    List<User> findAllDoctors();
    @Query("""
    select u from User u where u.role = 'ROLE_USER'
""")
    List<User> findAllUsers();
}
