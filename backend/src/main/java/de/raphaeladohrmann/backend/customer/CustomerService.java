package de.raphaeladohrmann.backend.customer;

import de.raphaeladohrmann.backend.appuser.AppUser;
import de.raphaeladohrmann.backend.appuser.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final AppUserService appUserService;

    public List<Customer> findAllCustomers() {
        return customerRepository.findAllByBelongsToCompany(appUserService.getAuthenticatedUser().getCompany());
    }

    public Optional<Customer> findById(String id) {
        return customerRepository.findByIdAndBelongsToCompany(id, appUserService.getAuthenticatedUser().getCompany());
    }

    public Customer save(Customer customer) {
        AppUser currentUser = appUserService.getAuthenticatedUser();
        customer.setBelongsToCompany(currentUser.getCompany());
        customer.setCreatedBy(currentUser.getUsername());
        return customerRepository.save(customer);
    }

    public void deleteById(String id) {
        Optional<Customer> customer = customerRepository.findByIdAndBelongsToCompany(id, appUserService.getAuthenticatedUser().getCompany());
        if(customer.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        customer.ifPresent(value -> customerRepository.deleteById(value.getId()));
    }
}
