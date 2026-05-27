package com.demo.financial_transfer_scheduling.repository;

import com.demo.financial_transfer_scheduling.entity.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ClientRepository extends JpaRepository<ClientEntity, Long> {

    Optional<ClientEntity> findByConta(String conta);

    ClientEntity findAllByConta(String conta);

    ClientEntity findAllById(Long id);
}
