package com.serhiienko.backend.repository;

import com.serhiienko.backend.model.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    @Query("""
    select t from Token t inner join User u on t.user.id = u.id
    where u.id = :userId
""")
    List<Token> findAllByUser(Long userId);

    Optional<Token> findByToken(String token);

    @Modifying
    @Query("""
    delete from Token t where t.expired = true and t.user.id = :userId
""")
    void deleteAllExpiredTokens(Long userId);

    void deleteByToken(String token);

    void deleteByUserId(Long id);
}
