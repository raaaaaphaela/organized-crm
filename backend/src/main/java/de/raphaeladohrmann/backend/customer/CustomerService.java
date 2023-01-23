package de.raphaeladohrmann.backend.customer;

import de.raphaeladohrmann.backend.appUser.AppUser;
import de.raphaeladohrmann.backend.appUser.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final AppUserService appUserService;

    public List<Customer> findAllCustomers() {
        return customerRepository.findAllByBelongsToCompany(appUserService.getAuthenticatedUser().getCompany());
    }

    public Customer save(Customer customer) {
        AppUser currentUser = appUserService.getAuthenticatedUser();
        customer.setBelongsToCompany(currentUser.getCompany());
        customer.setCreatedBy(currentUser.getUsername());
        return customerRepository.save(customer);
    }
}
