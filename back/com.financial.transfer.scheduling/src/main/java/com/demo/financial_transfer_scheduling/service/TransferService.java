package com.demo.financial_transfer_scheduling.service;

import com.demo.financial_transfer_scheduling.dto.TransferDTO;
import com.demo.financial_transfer_scheduling.entity.ClientEntity;
import com.demo.financial_transfer_scheduling.exception.BusinessException;
import com.demo.financial_transfer_scheduling.repository.ClientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;



@Service
public class TransferService {

    private final ClientRepository repository;

    public TransferService(ClientRepository repository) {
        this.repository = repository;
    }

    public void transfer(String toId, String fromId, BigDecimal amount, LocalDate dateScheduling) {

        ClientEntity to   = repository.findAllByConta(toId);
        ClientEntity from = repository.findAllByConta(fromId);

        if (from == null || to == null) {
            throw new BusinessException("Conta não encontrada");
        }

        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessException("Valor inválido");
        }

        if (from.getSaldo().compareTo(amount) < 0) {
            throw new BusinessException("Saldo insuficiente");
        }
        long dias =
                ChronoUnit.DAYS.between(
                        LocalDate.now(),
                        dateScheduling
                );
        BigDecimal valueTax = amount.add(calcularTaxa(amount, dias));
        to.setTaxa(calcularTaxa(amount, dias));
        to.setSaldo(to.getSaldo().subtract(valueTax));
        to.setDataAgendamento(dateScheduling);
        to.setDataTransferencia(LocalDate.now());
        from.setSaldo(from.getSaldo().add(amount));

        repository.save(from);
        repository.save(to);
    }


    public BigDecimal calcularTaxa(BigDecimal valor, long dias) {

        if (dias >= 0 && dias <= 10) {

            BigDecimal taxaFixa = new BigDecimal("12");

            BigDecimal percentual =
                    valor.multiply(new BigDecimal("0.025"));

            return taxaFixa.add(percentual);
        }

        if (dias >= 11 && dias <= 20) {
            return valor.multiply(new BigDecimal("0.0"));
        }

        if (dias >= 21 && dias <= 30) {
            return valor.multiply(new BigDecimal("0.082"));
        }

        if (dias >= 31 && dias <= 40) {
            return valor.multiply(new BigDecimal("0.069"));
        }

        if (dias >= 41 && dias <= 50) {
            return valor.multiply(new BigDecimal("0.047"));
        }

        if (dias > 50) {
            return valor.multiply(new BigDecimal("0.017"));
        }

        throw new RuntimeException("Taxa não aplicável");
    }

}
