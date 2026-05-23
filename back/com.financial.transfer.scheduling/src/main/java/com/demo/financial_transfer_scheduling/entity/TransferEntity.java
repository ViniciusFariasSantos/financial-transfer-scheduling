package com.demo.financial_transfer_scheduling.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "TB_TRANSFERENCIA")
public class TransferEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_origem_id")
    private ClientEntity clienteOrigem;

    @ManyToOne
    @JoinColumn(name = "cliente_destino_id")
    private ClientEntity clienteDestino;

    private BigDecimal valor;

    private BigDecimal taxa;

    private LocalDate dataTransferencia;

    private LocalDate dataAgendamento;

}
