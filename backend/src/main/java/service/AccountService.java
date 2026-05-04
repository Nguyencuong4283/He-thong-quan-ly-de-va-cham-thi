package service;

import com.se104.backend.entity.Account;
import com.se104.backend.exception.ResourceNotFoundException;
import com.se104.backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AccountService {
    @Autowired
    AccountRepository accountRepository;

    public List<Account> getAll() {
        return accountRepository.findAll();
    }

    public Account getById(Long id) {
        return accountRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ACCOUNT NOT FOUND WITH ID: " + id));
    }

    public Account create(Account account) {
        return accountRepository.save(account);
    }

    public Account update(Long id, Account account) {
        Account existing = accountRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ACCOUNT NOT FOUND WITH ID: " + id));

        existing.setUsername(account.getUsername());
        existing.setPassword(account.getPassword());
        existing.setRole(account.getRole());
        existing.setTeacher(account.getTeacher());

        return accountRepository.save(existing);
    }

    public void delete(Long id) {
        Account existing = accountRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ACCOUNT NOT FOUND WITH ID: " + id));

        accountRepository.delete(existing);
    }
}