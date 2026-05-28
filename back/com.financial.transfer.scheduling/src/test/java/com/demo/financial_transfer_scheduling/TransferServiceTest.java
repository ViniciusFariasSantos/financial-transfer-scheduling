package com.demo.financial_transfer_scheduling;

import com.demo.financial_transfer_scheduling.dto.TransferDTO;
import com.demo.financial_transfer_scheduling.entity.ClientEntity;
import com.demo.financial_transfer_scheduling.entity.TransferEntity;
import com.demo.financial_transfer_scheduling.exception.BusinessException;
import com.demo.financial_transfer_scheduling.repository.ClientRepository;
import com.demo.financial_transfer_scheduling.repository.TransferRepesitory;
import com.demo.financial_transfer_scheduling.service.TransferService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TransferServiceTest {

    @Mock
    private ClientRepository repository;

    @Mock
    private TransferRepesitory repositoryTransfer;

    @InjectMocks
    private TransferService service;

    private ClientEntity origin;
    private ClientEntity destiny;
    private TransferDTO transferDTO;

    @BeforeEach
    void setUp() {
        origin = new ClientEntity();
        origin.setId(1L);
        origin.setName("Origin");
        origin.setNumberAccount("ORIGIN-001");
        origin.setAmount(new BigDecimal("1000"));

        destiny = new ClientEntity();
        destiny.setId(2L);
        destiny.setName("Destiny");
        destiny.setNumberAccount("DEST-001");
        destiny.setAmount(new BigDecimal("2000"));

        transferDTO = new TransferDTO();
        transferDTO.setClientOrigin(origin.getNumberAccount());
        transferDTO.setClientDestiny(destiny.getNumberAccount());
        transferDTO.setAmount(new BigDecimal("100"));
        transferDTO.setDateScheduling(LocalDate.now().plusDays(5));
    }

    @Test
    void listar_deveRetornarListaDeTransferencias() {
        TransferEntity transferEntity = new TransferEntity();
        transferEntity.setId(10L);
        when(repositoryTransfer.findByClientOriginContaining(origin.getNumberAccount()))
                .thenReturn(Collections.singletonList(transferEntity));

        ResponseEntity<List<TransferEntity>> response = service.listar(origin.getNumberAccount());

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        assertEquals(transferEntity, response.getBody().get(0));
    }

    @Test
    void transfer_deveLancarBusinessExceptionQuandoContaNaoEncontrada() {
        when(repository.findAllByNumberAccount(origin.getNumberAccount())).thenReturn(null);
        when(repository.findAllByNumberAccount(destiny.getNumberAccount())).thenReturn(destiny);

        assertThrows(BusinessException.class, () -> service.transfer(transferDTO));
    }

    @Test
    void transfer_deveLancarBusinessExceptionQuandoValorInvalido() {
        transferDTO.setAmount(null);

        assertThrows(BusinessException.class, () -> service.transfer(transferDTO));
    }

    @Test
    void transfer_deveLancarBusinessExceptionQuandoSaldoInsuficiente() {
        transferDTO.setAmount(new BigDecimal("1500"));
        when(repository.findAllByNumberAccount(origin.getNumberAccount())).thenReturn(origin);
        when(repository.findAllByNumberAccount(destiny.getNumberAccount())).thenReturn(destiny);

        assertThrows(BusinessException.class, () -> service.transfer(transferDTO));
    }

    @Test
    void transfer_deveSalvarTransferenciaEAtualizarContasQuandoAgendado() {
        when(repository.findAllByNumberAccount(origin.getNumberAccount())).thenReturn(origin);
        when(repository.findAllByNumberAccount(destiny.getNumberAccount())).thenReturn(destiny);
        when(repository.save(any(ClientEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(repositoryTransfer.save(any(TransferEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        service.transfer(transferDTO);

        assertEquals(0, origin.getAmount().compareTo(new BigDecimal("885.5")));
        assertEquals(0, destiny.getAmount().compareTo(new BigDecimal("2000")));
        verify(repository, times(2)).save(any(ClientEntity.class));
        verify(repositoryTransfer).save(any(TransferEntity.class));
    }

    @Test
    void calcularTaxa_deveRetornarTaxaCorretaParaVariasFaixas() {
        assertEquals(0, service.calcularTaxa(new BigDecimal("100"), 5)
                .compareTo(new BigDecimal("14.5")));
        assertEquals(0, service.calcularTaxa(new BigDecimal("100"), 15)
                .compareTo(BigDecimal.ZERO));
        assertEquals(0, service.calcularTaxa(new BigDecimal("100"), 55)
                .compareTo(new BigDecimal("1.7")));
    }
}
