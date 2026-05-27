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

    private String nome;

    @Column(unique = true)
    private String conta;

    private BigDecimal saldo;

    private BigDecimal Taxa;

    private BigDecimal saldoAgendado;

    private LocalDate dataTransferencia;

    private LocalDate dataAgendamento;

    public void getDataTransferencia(LocalDate now) {

    }
}
