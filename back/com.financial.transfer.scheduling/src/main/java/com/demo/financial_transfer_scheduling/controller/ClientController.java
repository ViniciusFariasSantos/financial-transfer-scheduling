package com.demo.financial_transfer_scheduling.controller;

import com.demo.financial_transfer_scheduling.dto.ClientDTO;
import com.demo.financial_transfer_scheduling.entity.ClientEntity;
import com.demo.financial_transfer_scheduling.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cliente")
public class ClientController {

        private ClientService service;

        public ClientController(ClientService service) {
            this.service = service;
        }

        @GetMapping
        public ResponseEntity<List<ClientEntity>> listar() {
            return service.listar();
        }

        @PostMapping
        public void salvar(@RequestBody ClientDTO dto) {
            service.salvar(dto);
        }

        @PutMapping("/{id}")
        public void atualizar(@PathVariable Long id,
                              @RequestBody ClientDTO dto) {
            service.atualizar(id, dto);
        }

        @DeleteMapping("/{id}")
        public void deletar(@PathVariable Long id) {
            service.deletar(id);
        }
}
