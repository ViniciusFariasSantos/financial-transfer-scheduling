package com.demo.financial_transfer_scheduling.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "TB_TRANSFERENCIA")
public class TransferEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clientOrigin;

    private String nameTransfer;

    private BigDecimal amount;

    private BigDecimal tax;

    private LocalDate dateTransfer;

    private LocalDate dateScheduling;

}
