package com.ph.bankxyz_back;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.ph.bankxyz_back.models.Account;
import com.ph.bankxyz_back.repositories.AccountRepository;

@SpringBootApplication
public class BankxyzBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankxyzBackApplication.class, args);
	}

	@Bean
    CommandLineRunner initDatabase(AccountRepository accountRepository){
        return args -> {
            accountRepository.deleteAll();

            Account a1 = new Account();
                a1.setName("Pedro");
				a1.setCpf("10987654321");
                a1.setAccountType("Corrente");
                a1.setBalance(200.0);
                // a1.setAccountType(AccountType.CORRENTE);

            Account a2 = new Account();
                a2.setName("Renata");
				a2.setCpf("12345678901");
                a2.setAccountType("Poupança");
                a2.setBalance(2700.0);
                // a2.setAccountType(AccountType.POUPANCA);

            accountRepository.save(a1);
            accountRepository.save(a2);
        };
    }

}
