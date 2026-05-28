package com.demo.financial_transfer_scheduling;

import com.demo.financial_transfer_scheduling.controller.TransferController;
import com.demo.financial_transfer_scheduling.dto.TransferDTO;
import com.demo.financial_transfer_scheduling.entity.TransferEntity;
import com.demo.financial_transfer_scheduling.service.TransferService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
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
import java.time.LocalDate;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class TransferControllerTest {

    @Mock
    private TransferService service;

    @InjectMocks
    private TransferController controller;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    @Test
    void transfer_deveChamarService() throws Exception {
        TransferDTO dto = new TransferDTO();
        dto.setClientOrigin("ORIGIN-001");
        dto.setClientDestiny("DEST-001");
        dto.setAmount(new BigDecimal("100"));
        dto.setDateScheduling(LocalDate.now().plusDays(2));
        doNothing().when(service).transfer(any(TransferDTO.class));

        mockMvc.perform(post("/transfer")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk());

        verify(service).transfer(any(TransferDTO.class));
    }

    @Test
    void listar_deveRetornarOk() throws Exception {
        TransferEntity transferEntity = new TransferEntity();
        when(service.listar("ORIGIN-001")).thenReturn(ResponseEntity.ok(Collections.singletonList(transferEntity)));

        mockMvc.perform(get("/transfer/ORIGIN-001"))
                .andExpect(status().isOk());

        verify(service).listar("ORIGIN-001");
    }
}
