package com.demo.financial_transfer_scheduling;

import com.demo.financial_transfer_scheduling.controller.ClientController;
import com.demo.financial_transfer_scheduling.dto.ClientDTO;
import com.demo.financial_transfer_scheduling.entity.ClientEntity;
import com.demo.financial_transfer_scheduling.service.ClientService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class ClientControllerTest {

    @Mock
    private ClientService service;

    @InjectMocks
    private ClientController controller;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void listar_deveRetornarOk() throws Exception {
        when(service.listar()).thenReturn(ResponseEntity.ok(Collections.emptyList()));

        mockMvc.perform(get("/cliente"))
                .andExpect(status().isOk());

        verify(service).listar();
    }

    @Test
    void salvar_deveChamarService() throws Exception {
        ClientDTO dto = new ClientDTO();
        dto.setName("Teste");
        dto.setNumberAccount("1234");
        dto.setAmount(new BigDecimal("1000"));
        doNothing().when(service).salvar(any(ClientDTO.class));

        mockMvc.perform(post("/cliente")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk());

        verify(service).salvar(any(ClientDTO.class));
    }

    @Test
    void atualizar_deveChamarService() throws Exception {
        ClientDTO dto = new ClientDTO();
        dto.setName("Teste Atualizado");
        dto.setNumberAccount("1234");
        dto.setAmount(new BigDecimal("2000"));
        doNothing().when(service).atualizar(eq(1L), any(ClientDTO.class));

        mockMvc.perform(put("/cliente/1")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk());

        verify(service).atualizar(eq(1L), any(ClientDTO.class));
    }

    @Test
    void deletar_deveChamarService() throws Exception {
        doNothing().when(service).deletar(1L);

        mockMvc.perform(delete("/cliente/1"))
                .andExpect(status().isOk());

        verify(service).deletar(1L);
    }
}
