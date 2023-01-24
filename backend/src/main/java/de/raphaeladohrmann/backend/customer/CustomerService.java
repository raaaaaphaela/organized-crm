package de.raphaeladohrmann.backend.customer;

import de.raphaeladohrmann.backend.appuser.AppUser;
import de.raphaeladohrmann.backend.appuser.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
        //TODO only delete when belongs to autheticated user
        customerRepository.deleteById(id);
    }
}
