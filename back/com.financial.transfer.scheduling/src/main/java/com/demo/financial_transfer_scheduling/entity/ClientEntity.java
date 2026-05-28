package com.demo.financial_transfer_scheduling.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "TB_CLIENTE")
public class ClientEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String numberAccount;

    private BigDecimal amount;

    private BigDecimal tax;

    private LocalDate dateTransfer;

    private LocalDate dateScheduling;


}
