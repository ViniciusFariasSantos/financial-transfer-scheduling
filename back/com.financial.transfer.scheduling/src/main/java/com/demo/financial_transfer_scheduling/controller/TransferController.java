package com.demo.financial_transfer_scheduling.controller;

import com.demo.financial_transfer_scheduling.dto.TransferDTO;

import com.demo.financial_transfer_scheduling.service.TransferService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transfer")
    public class TransferController {
        private TransferService service;

        public TransferController(TransferService service) {
            this.service = service;
        }

        @PostMapping
        public void transfer(@RequestBody TransferDTO dto) {
            service.transfer(dto.getClientOrigin(), dto.getClientDestiny(), dto.getAmount(), dto.getDataScheduling());
        }

}
