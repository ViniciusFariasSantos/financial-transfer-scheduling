package com.demo.financial_transfer_scheduling.entity;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "TB_CLIENTE")
public class ClientEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true)
    private String conta;

    private BigDecimal saldo;

    private BigDecimal saldoAgendado;
}
