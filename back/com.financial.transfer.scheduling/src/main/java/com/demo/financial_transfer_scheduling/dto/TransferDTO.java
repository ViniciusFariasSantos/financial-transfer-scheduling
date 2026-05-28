package com.demo.financial_transfer_scheduling.dto;

import com.demo.financial_transfer_scheduling.entity.ClientEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class TransferDTO {

    private Long id;

    private String clientOrigin;

    private String clientDestiny;

    private BigDecimal amount;

    private BigDecimal tax;

    private LocalDate dateScheduling;

}
