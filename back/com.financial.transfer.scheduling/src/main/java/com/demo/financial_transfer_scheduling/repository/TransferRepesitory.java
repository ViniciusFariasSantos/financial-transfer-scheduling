package com.demo.financial_transfer_scheduling.repository;

import com.demo.financial_transfer_scheduling.entity.ClientEntity;
import com.demo.financial_transfer_scheduling.entity.TransferEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TransferRepesitory extends JpaRepository<TransferEntity, Long> {
    List<TransferEntity> findByClientOriginContaining(String clientOrigin);
}
