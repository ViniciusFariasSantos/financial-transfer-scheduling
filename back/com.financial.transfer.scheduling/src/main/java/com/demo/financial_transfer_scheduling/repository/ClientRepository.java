package com.demo.financial_transfer_scheduling.repository;

import com.demo.financial_transfer_scheduling.entity.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ClientRepository extends JpaRepository<ClientEntity, Long> {

    Optional<ClientEntity> findByNumberAccount(String NumberAccount);

    ClientEntity findAllByNumberAccount(String NumberAccount);

    ClientEntity findAllById(Long id);
}
