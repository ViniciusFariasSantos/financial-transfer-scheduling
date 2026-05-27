package com.demo.financial_transfer_scheduling.service;

import com.demo.financial_transfer_scheduling.dto.ClientDTO;
import com.demo.financial_transfer_scheduling.entity.ClientEntity;
import com.demo.financial_transfer_scheduling.exception.BusinessException;
import com.demo.financial_transfer_scheduling.repository.ClientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    private final ClientRepository repository;

    public ClientService(ClientRepository repository) {
        this.repository = repository;
    }

    public ResponseEntity<List<ClientEntity> >listar() {
        return ResponseEntity.status(HttpStatus.OK).body(repository.findAll());
    }

    public void salvar( ClientDTO dto) {
        ClientEntity clientEntity = new ClientEntity();

        clientEntity.setNome(dto.getName());
        clientEntity.setConta(dto.getNumberAccount());
        clientEntity.setSaldo(dto.getAmount());
        repository.findByConta(clientEntity.getConta())
                .ifPresent(client -> {
                    throw new BusinessException("Conta já cadastrada");
                });

        repository.save(clientEntity);
    }

    public void atualizar(Long id,ClientDTO dto) {
        ClientEntity clientEntity = repository.findAllById(id);

        if (clientEntity == null) {
            throw new BusinessException("Cliente não encontrado");
        }
        clientEntity.setNome(dto.getName());
        clientEntity.setConta(dto.getNumberAccount());
        clientEntity.setSaldo(dto.getAmount());

        repository.save(clientEntity);
    }

    public void deletar(Long id) {
        ClientEntity client = repository.findAllById(id);

        if (client == null) {
            throw new BusinessException("Cliente não encontrado ou já deletado");
        }
        repository.delete(client);
    }
}
