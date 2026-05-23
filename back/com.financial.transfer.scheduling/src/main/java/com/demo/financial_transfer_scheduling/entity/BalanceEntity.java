package com.demo.financial_transfer_scheduling.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "TB_EXTRATO")
public class BalanceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private ClientEntity cliente;

    @ManyToOne
    @JoinColumn(name = "transferencia_id")
    private TransferEntity transferencia;

    private BigDecimal valor;

    private String descricao;

    private LocalDateTime dataMovimentacao;

}
