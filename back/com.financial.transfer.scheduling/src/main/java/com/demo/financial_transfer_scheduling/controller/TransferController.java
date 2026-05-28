package com.demo.financial_transfer_scheduling.controller;

import com.demo.financial_transfer_scheduling.dto.TransferDTO;

import com.demo.financial_transfer_scheduling.entity.ClientEntity;
import com.demo.financial_transfer_scheduling.entity.TransferEntity;
import com.demo.financial_transfer_scheduling.service.TransferService;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/transfer")
public class TransferController {
    private TransferService service;

    public TransferController(TransferService service) {
        this.service = service;
    }

    @PostMapping
    public void transfer(@RequestBody TransferDTO dto) {
        service.transfer(dto);
    }
    @GetMapping("/{id}")
    public ResponseEntity<List<TransferEntity>> listar(@PathVariable String id) {
        return service.listar(id);
    }

}
