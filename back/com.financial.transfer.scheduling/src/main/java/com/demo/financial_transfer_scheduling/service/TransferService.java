package com.demo.financial_transfer_scheduling.service;

import com.demo.financial_transfer_scheduling.dto.TranferSchedulingDTO;
import com.demo.financial_transfer_scheduling.dto.TransferDTO;
import com.demo.financial_transfer_scheduling.entity.ClientEntity;
import com.demo.financial_transfer_scheduling.entity.TransferEntity;
import com.demo.financial_transfer_scheduling.exception.BusinessException;
import com.demo.financial_transfer_scheduling.repository.ClientRepository;
import com.demo.financial_transfer_scheduling.repository.TransferRepesitory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;


@Service
public class TransferService {

    private final ClientRepository repository;

    private final TransferRepesitory repositoryTransfer;

    public TransferService(ClientRepository repository, TransferRepesitory repositoryTransfer) {
        this.repository = repository;
        this.repositoryTransfer = repositoryTransfer;
    }

    public ResponseEntity<List<TransferEntity>> listar(String numberAccount) {
        return ResponseEntity.ok(
                repositoryTransfer.findByClientOriginContaining(numberAccount)
        );
    }
    public void transfer(TransferDTO dto) {

        ClientEntity to   = repository.findAllByNumberAccount(dto.getClientOrigin());
        ClientEntity from = repository.findAllByNumberAccount(dto.getClientDestiny());

        long dias =
                ChronoUnit.DAYS.between(
                        LocalDate.now(),
                        dto.getDateScheduling()
                );

        BigDecimal valueTax = dto.getAmount().add(calcularTaxa(dto.getAmount(), dias));

        if (from == null || to == null) {
            throw new BusinessException("Conta não encontrada");
        }

        if (dto.getAmount() == null || dto.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessException("Valor inválido");
        }

        if (from.getAmount().compareTo(dto.getAmount()) < 0) {
            throw new BusinessException("Saldo insuficiente");
        }

        TransferEntity transfer =
                new TransferEntity();

        transfer.setNameTransfer(
                from.getName()
        );

        transfer.setAmount(
                dto.getAmount()
        );

        transfer.setDateTransfer(
                LocalDate.now()
        );

        transfer.setClientOrigin(
                dto.getClientDestiny()
        );

        transfer.setDateScheduling(
                dto.getDateScheduling()
        );
        transfer.setTax(calcularTaxa(
                dto.getAmount(), dias)
        );

        if (dto.getDateScheduling() == LocalDate.now() ){
            to.setTax(calcularTaxa(dto.getAmount(), dias));
            to.setAmount(to.getAmount().subtract(valueTax));
            to.setDateScheduling(dto.getDateScheduling());
            to.setDateTransfer(LocalDate.now());
            from.setAmount(from.getAmount().add(dto.getAmount()));
        } else{
            to.setTax(calcularTaxa( dto.getAmount(), dias));
            to.setAmount(to.getAmount().subtract(valueTax));
            to.setDateScheduling(dto.getDateScheduling());
            to.setDateTransfer(LocalDate.now());
            repositoryTransfer.save(transfer);
        }

        repository.save(from);
        repository.save(to);
    }

    private TranferSchedulingDTO converterTransferencia(
            TransferEntity entity) {

        TranferSchedulingDTO dto =
                new TranferSchedulingDTO();

        dto.setName(
                entity.getNameTransfer()
        );

        dto.setAmount(
                entity.getAmount()
        );

        dto.setTax(
                entity.getTax()
        );

        dto.setDataTranfer(
                entity.getDateTransfer()
        );

        dto.setDataScheduling(
                entity.getDateScheduling()
        );

        return dto;
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
