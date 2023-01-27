package de.raphaeladohrmann.backend.customer;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping
    public List<Customer> findAll() {
        return customerService.findAllCustomers();
    }

    @GetMapping("/{id}")
    public Optional<Customer> findById(@PathVariable String id) {
        return customerService.findById(id);
    }

    @PostMapping
    public Customer save(@RequestBody Customer customer) {
        return customerService.save(customer);
    }

    @PostMapping("/info/{customerId}")
    public Customer saveInformation(@PathVariable String customerId, @RequestBody Information information) {
        return customerService.saveInformation(customerId, information);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        customerService.deleteById(id);
    }
}
