package com.ph.bankxyz_back.controllers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ph.bankxyz_back.models.Account;
import com.ph.bankxyz_back.repositories.AccountRepository;
import com.ph.bankxyz_back.repositories.OperationRepository;

import com.ph.bankxyz_back.models.Operation;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private OperationRepository operationRepository;

    @GetMapping
    public List<Account> list() {
        return accountRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> findById(@PathVariable Long id) {
        return accountRepository.findById(id)
                .map(recordFound -> ResponseEntity.ok().body(recordFound))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("{id}/transactions")
    public List<Operation> findOperationById(@PathVariable Long id) {
        return accountRepository.findById(id).get().getOperations();
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Account create(@RequestBody Account account) {
        return accountRepository.save(account);
    }

    @PutMapping("/deposit/{id}")
    public ResponseEntity<Account> deposit(@PathVariable Long id, @RequestBody Map<String, Double> requestBody) {
        Optional<Account> account = accountRepository.findById(id);

        if (account.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Double balance = requestBody.get("balance");
        Account existingAccount = account.get();
        Double currentBalance = existingAccount.getBalance();
        existingAccount.setBalance(currentBalance + balance);

        Operation operation = new Operation();
        operation.setOperationType("DEPOSIT");
        operation.setTimestamp(LocalDateTime.now());
        operation.setObservation("Depósito de " + balance);
        operation.setOperationValue(balance);
        operation.setAccountId(existingAccount);

        operationRepository.save(operation);

        return ResponseEntity.ok().body(accountRepository.save(existingAccount));
    }

    @PutMapping("/withdraw/{id}")
    public ResponseEntity<Account> withdraw(@PathVariable Long id, @RequestBody Map<String, Double> requestBody) {
        Optional<Account> account = accountRepository.findById(id);

        if (account.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Double balance = requestBody.get("balance");
        Account existingAccount = account.get();
        Double currentBalance = existingAccount.getBalance();

        Operation operation = new Operation();
        operation.setOperationType("WITHDRAW");
        operation.setTimestamp(LocalDateTime.now());
        operation.setObservation("Depósito de " + balance);
        operation.setOperationValue(balance);
        operation.setAccountId(existingAccount);

        operationRepository.save(operation);

        if (currentBalance < balance) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        existingAccount.setBalance(currentBalance - balance);

        return ResponseEntity.ok().body(accountRepository.save(existingAccount));
    }

    @PutMapping("/transfer/{id}")
    public ResponseEntity<?> transfer(@PathVariable Long id, @RequestBody Map<String, Object> requestBody) {
        Optional<Account> fromAccountOptional = accountRepository.findById(id);

        if (fromAccountOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Long toAccountId = Long.valueOf(requestBody.get("toAccount").toString());
        Double balance = Double.valueOf(requestBody.get("balance").toString());

        Optional<Account> toAccountOptional = accountRepository.findById(toAccountId);

        if (toAccountOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Account fromAccount = fromAccountOptional.get();
        if (fromAccount.getBalance() < balance) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        fromAccount.setBalance(fromAccount.getBalance() - balance);

        Account toAccount = toAccountOptional.get();
        toAccount.setBalance(toAccount.getBalance() + balance);

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        Operation operation1 = new Operation();
        operation1.setOperationType("TRANSFER");
        operation1.setTimestamp(LocalDateTime.now());
        operation1.setObservation("Depósito de " + balance);
        operation1.setOperationValue(balance);
        operation1.setAccountId(fromAccount);

        operationRepository.save(operation1);

        Operation operation2 = new Operation();
        operation2.setOperationType("TRANSFER");
        operation2.setTimestamp(LocalDateTime.now());
        operation2.setObservation("Depósito de " + balance);
        operation2.setOperationValue(balance);
        operation2.setAccountId(toAccount);

        operationRepository.save(operation2);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Account> update(@PathVariable Long id,
            @RequestBody Account account) {
        return accountRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(account.getName());
                    recordFound.setAccountType(account.getAccountType());
                    recordFound.setBalance(account.getBalance());
                    Account updated = accountRepository.save(recordFound);
                    return ResponseEntity.ok().body(updated);
                })
                .orElse(ResponseEntity.notFound().build());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return accountRepository.findById(id)
                .map(recordFound -> {
                    accountRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
