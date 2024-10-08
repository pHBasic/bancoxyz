package com.ph.bankxyz_back.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "operation", nullable = false)
    private String operation;
    
    @Column(name = "dateTimeOperation", nullable = false)
    private LocalDateTime dateTimeOperation;

    @Column(name = "observation", nullable = false)
    private String observation;

    @Column(name = "value", nullable = false)
    private Float value;

    @Column(name = "description", nullable = false)
    private String description;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id")
    private Account account;

}
