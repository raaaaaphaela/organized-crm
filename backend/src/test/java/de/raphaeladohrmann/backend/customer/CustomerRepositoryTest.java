package de.raphaeladohrmann.backend.customer;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.ArrayList;
import java.util.List;

@DataMongoTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class CustomerRepositoryTest {

    @Autowired
    private CustomerRepository repository;

    @Test
    void findAllByBelongsToCompany_WhenCustomersExist_ThenReturnCustomers() {

        String companyName = "Company";
        Customer customer = new Customer();
        customer.setBelongsToCompany(companyName);

        Customer actual = repository.save(customer);
        List<Customer> actualList = repository.findAllByBelongsToCompany(companyName);

        Assertions.assertEquals(actual, customer);
        Assertions.assertEquals(actualList, new ArrayList<>(List.of(customer)));

    }


}
