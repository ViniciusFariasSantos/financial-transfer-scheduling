package com.demo.financial_transfer_scheduling.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class TranferSchedulingDTO {


        private Long id;

        private String name;

        private String clientAccount;

        private BigDecimal amount;

        private BigDecimal tax;

        private LocalDate dataScheduling;

        private LocalDate dataTranfer;

}
