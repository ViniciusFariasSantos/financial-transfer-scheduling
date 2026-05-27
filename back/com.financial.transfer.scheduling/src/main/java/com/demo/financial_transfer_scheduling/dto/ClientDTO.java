package com.demo.financial_transfer_scheduling.dto;

import com.demo.financial_transfer_scheduling.entity.ClientEntity;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class ClientDTO {

    private Long id;

    private String name;

    private String numberAccount;

    private BigDecimal amount;

    private BigDecimal amountScheduling;

    private ClientEntity clientOrigin;

    private ClientEntity clientDestiny;

    private BigDecimal tax;

    private LocalDate dateTransfer;

    private LocalDate dataScheduling;
}
