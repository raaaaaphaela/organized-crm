package de.raphaeladohrmann.backend.customer;

import de.raphaeladohrmann.backend.appUser.AppUser;
import de.raphaeladohrmann.backend.appUser.AppUserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class CustomerServiceTest {

    @Test
    void findAllCustomers_whenUserHasCustomers_returnCustomerList() {
        // given
        AppUser user = new AppUser(
                "1", "UserName", "",
                "Company", "BASIC");

        Customer customer = new Customer();
        customer.setCreatedBy(user.getUsername());
        customer.setBelongsToCompany(user.getCompany());

        List<Customer> customerList = new ArrayList<>(List.of(customer));

        CustomerRepository customerRepository = mock(CustomerRepository.class);

        AppUserService appUserService = mock(AppUserService.class);

        CustomerService customerService = new CustomerService(customerRepository, appUserService);

        when(appUserService.getAuthenticatedUser()).thenReturn(user);
        when(customerRepository.findAllByBelongsToCompany(user.getCompany())).thenReturn(customerList);

        // when
        List<Customer> actual = customerService.findAllCustomers();

        // then
        Assertions.assertEquals(actual, customerList);
        Mockito.verify(customerRepository).findAllByBelongsToCompany(user.getCompany());
    }

    @Test
    void findAllCustomers_whenUserHasNoCustomers_returnEmptyArray() {
        // given
        AppUser user = new AppUser(
                "1", "UserName", "",
                "Company", "BASIC");

        List<Customer> customerList = new ArrayList<>();

        CustomerRepository customerRepository = mock(CustomerRepository.class);

        AppUserService appUserService = mock(AppUserService.class);

        CustomerService customerService = new CustomerService(customerRepository, appUserService);

        when(appUserService.getAuthenticatedUser()).thenReturn(user);
        when(customerRepository.findAllByBelongsToCompany(user.getCompany())).thenReturn(customerList);

        // when
        List<Customer> actual = customerService.findAllCustomers();

        // then
        Assertions.assertEquals(actual, new ArrayList<>());
        Mockito.verify(customerRepository).findAllByBelongsToCompany(user.getCompany());
    }

    @Test
    void save_whenCorrectInput_returnNewCustomerWithCorrectUserAndCompany() {
        // given
        AppUser user = new AppUser(
                "1", "UserName", "",
                "Company", "BASIC");

        Customer customer = new Customer();

        CustomerRepository customerRepository = mock(CustomerRepository.class);

        AppUserService appUserService = mock(AppUserService.class);

        CustomerService customerService = new CustomerService(customerRepository, appUserService);

        when(appUserService.getAuthenticatedUser()).thenReturn(user);
        when(customerRepository.save(customer)).thenReturn(customer);

        // when
        Customer actual = customerService.save(customer);
        System.out.println(customer);

        // then
        Assertions.assertEquals(actual.getBelongsToCompany(), user.getCompany());
        Assertions.assertEquals(actual.getCreatedBy(), user.getUsername());

        Mockito.verify(customerRepository).save(customer);
    }
}
