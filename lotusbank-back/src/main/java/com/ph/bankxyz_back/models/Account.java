package com.ph.bankxyz_back.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Account {

    @Id
    private Long id;

    private String name;

    private Long cpf;

    private String accountType;

    private Double balance;

    private List<Transaction> transactions;

}
