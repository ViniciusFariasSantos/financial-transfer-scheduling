package com.demo.financial_transfer_scheduling;

import com.demo.financial_transfer_scheduling.dto.ClientDTO;
import com.demo.financial_transfer_scheduling.entity.ClientEntity;
import com.demo.financial_transfer_scheduling.exception.BusinessException;
import com.demo.financial_transfer_scheduling.repository.ClientRepository;
import com.demo.financial_transfer_scheduling.service.ClientService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ClientServiceTest {

    @Mock
    private ClientRepository repository;

    @InjectMocks
    private ClientService service;

    private ClientEntity existingClient;
    private ClientDTO clientDTO;

    @BeforeEach
    void setUp() {
        existingClient = new ClientEntity();
        existingClient.setId(1L);
        existingClient.setName("Cliente Teste");
        existingClient.setNumberAccount("123456");
        existingClient.setAmount(BigDecimal.valueOf(1000));

        clientDTO = new ClientDTO();
        clientDTO.setName("Cliente Teste");
        clientDTO.setNumberAccount("123456");
        clientDTO.setAmount(BigDecimal.valueOf(1000));
    }

    @Test
    void listar_deveRetornarListaDeClientes() {
        when(repository.findAll()).thenReturn(Collections.singletonList(existingClient));

        ResponseEntity<List<ClientEntity>> response = service.listar();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        assertEquals(existingClient, response.getBody().get(0));
    }

    @Test
    void salvar_deveSalvarQuandoContaNaoExistir() {
        when(repository.findByNumberAccount(clientDTO.getNumberAccount())).thenReturn(Optional.empty());
        when(repository.save(any(ClientEntity.class))).thenReturn(existingClient);

        service.salvar(clientDTO);

        verify(repository).save(any(ClientEntity.class));
    }

    @Test
    void salvar_deveLancarBusinessExceptionQuandoContaJaExistir() {
        when(repository.findByNumberAccount(clientDTO.getNumberAccount())).thenReturn(Optional.of(existingClient));

        assertThrows(BusinessException.class, () -> service.salvar(clientDTO));
    }

    @Test
    void atualizar_deveLancarBusinessExceptionQuandoClienteNaoExistir() {
        when(repository.findAllById(1L)).thenReturn(null);

        assertThrows(BusinessException.class, () -> service.atualizar(1L, clientDTO));
    }

    @Test
    void atualizar_deveAtualizarQuandoClienteExistir() {
        when(repository.findAllById(1L)).thenReturn(existingClient);
        when(repository.save(any(ClientEntity.class))).thenReturn(existingClient);

        service.atualizar(1L, clientDTO);

        verify(repository).save(existingClient);
        assertEquals(clientDTO.getName(), existingClient.getName());
        assertEquals(clientDTO.getNumberAccount(), existingClient.getNumberAccount());
        assertEquals(clientDTO.getAmount(), existingClient.getAmount());
    }

    @Test
    void deletar_deveLancarBusinessExceptionQuandoClienteNaoExistir() {
        when(repository.findAllById(1L)).thenReturn(null);

        assertThrows(BusinessException.class, () -> service.deletar(1L));
    }

    @Test
    void deletar_deveDeletarQuandoClienteExistir() {
        when(repository.findAllById(1L)).thenReturn(existingClient);
        doNothing().when(repository).delete(existingClient);

        service.deletar(1L);

        verify(repository).delete(existingClient);
    }
}
