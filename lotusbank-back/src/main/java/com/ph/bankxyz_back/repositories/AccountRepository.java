package com.ph.bankxyz_back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ph.bankxyz_back.models.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

}
