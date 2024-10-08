package com.ph.bankxyz_back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ph.bankxyz_back.models.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
