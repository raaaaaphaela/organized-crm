package de.raphaeladohrmann.backend.customer;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping
    public List<Customer> findAll () {
        return customerService.findAllCustomers();
    }

    @PostMapping
    public Customer save (@RequestBody Customer customer) {
        return customerService.save(customer);
    }
}
