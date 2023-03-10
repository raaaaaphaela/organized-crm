package de.raphaeladohrmann.backend.customer;

import de.raphaeladohrmann.backend.appuser.AppUser;
import de.raphaeladohrmann.backend.appuser.AppUserService;
import de.raphaeladohrmann.backend.uploadfile.FileService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class CustomerServiceTest {

    private final CustomerRepository customerRepository = mock(CustomerRepository.class);

    private final AppUserService appUserService = mock(AppUserService.class);

    private final FileService fileService = mock(FileService.class);

    private final CustomerService customerService = new CustomerService(customerRepository, appUserService, fileService);


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
        customer.setInformation(new ArrayList<>());

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

    @Test
    void save_whenCorrectInputWithInformation_returnNewCustomerWithUsernameInInformation() {
        // given
        AppUser user = new AppUser(
                "1", "UserName", "",
                "Company", "BASIC");

        Information info = new Information("Knieschmerz", "2023-01-27T22:11", "");
        Customer customer = new Customer();
        customer.setInformation(new ArrayList<>(List.of(info)));

        when(appUserService.getAuthenticatedUser()).thenReturn(user);
        when(customerRepository.save(customer)).thenReturn(customer);

        // when
        Customer actual = customerService.save(customer);
        System.out.println(customer);

        // then
        Assertions.assertEquals(actual.getInformation().get(0).getUsername(), user.getUsername());
        Mockito.verify(customerRepository).save(customer);
    }

    @Test
    void findById_whenCustomerExists_returnCustomer() {
        // given
        AppUser user = new AppUser(
                "1", "UserName", "",
                "Company", "BASIC");

        Customer customer = new Customer();
        customer.setId("123");

        when(appUserService.getAuthenticatedUser()).thenReturn(user);
        when(customerRepository.findByIdAndBelongsToCompany(customer.getId(), user.getCompany())).thenReturn(Optional.of(customer));

        // when
        Optional<Customer> actual = customerService.findById(customer.getId());

        // then
        Assertions.assertEquals(actual, Optional.of(customer));

        Mockito.verify(customerRepository).findByIdAndBelongsToCompany(customer.getId(), user.getCompany());
    }

    @Test
    void findById_whenCustomerExistsButFalseCompany_returnEmptyOptional() {
        // given
        AppUser user = new AppUser(
                "1", "UserName", "",
                "Company", "BASIC");

        Customer customer = new Customer();
        customer.setId("123");

        when(appUserService.getAuthenticatedUser()).thenReturn(user);
        when(customerRepository.findByIdAndBelongsToCompany(customer.getId(), user.getCompany())).thenReturn(Optional.empty());

        // when
        Optional<Customer> actual = customerService.findById(customer.getId());

        // then
        Assertions.assertEquals(actual, Optional.empty());

        Mockito.verify(customerRepository).findByIdAndBelongsToCompany(customer.getId(), user.getCompany());
    }
}
