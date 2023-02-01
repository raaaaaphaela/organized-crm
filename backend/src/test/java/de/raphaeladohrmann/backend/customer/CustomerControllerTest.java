package de.raphaeladohrmann.backend.customer;

import de.raphaeladohrmann.backend.TestData;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class CustomerControllerTest {

    @Autowired
    private MockMvc mvc;

    private void saveNewTestUser() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/app-users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(TestData.NEW_USER)).andExpect(status().isOk())
                .andExpect(content().json(TestData.NEW_USER_RESPONSE));
    }

    private void createCustomerForUser() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/customers")
                        .with(httpBasic("user", "password"))
                        .contentType(MediaType.APPLICATION_JSON).content(TestData.NEW_CUSTOMER))
                .andExpect(status().isOk())
                .andExpect(content().json(TestData.SINGLE_CUSTOMER));
    }

    @Test
    void findAll_whenNotLoggedIn_thenReturn401() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .get("/api/customers"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void findAll_whenLoggedInAndNoCustomers_thenReturnOKAndEmptyArray() throws Exception {

        // create user
        saveNewTestUser();

        mvc.perform(MockMvcRequestBuilders
                        .get("/api/customers")
                        .with(httpBasic("user", "password")))
                .andExpect(status().isOk())
                .andExpect(content().json("[]", true));
    }

    @Test
    void findAll_whenLoggedInAndHasCustomers_thenReturnOKAndCustomerList() throws Exception {

        // create user
        saveNewTestUser();

        // create customer for user
        createCustomerForUser();

        // get customers for user
        mvc.perform(MockMvcRequestBuilders
                        .get("/api/customers")
                        .with(httpBasic("user", "password")))
                .andExpect(status().isOk())
                .andExpect(content().json(TestData.CUSTOMER_LIST));
    }

    @Test
    void findById_whenNotLoggedIn_Return401() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .get("/api/customers/123"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void findById_whenLoggedInAndHasCustomer_Return200AndCustomer() throws Exception {

        // create user
        saveNewTestUser();

        // create customer for user
        createCustomerForUser();

        mvc.perform(MockMvcRequestBuilders
                        .get("/api/customers/123")
                        .with(httpBasic("user", "password")))
                .andExpect(status().isOk())
                .andExpect(content().json(TestData.SINGLE_CUSTOMER));
    }

    @Test
    void findById_whenFalseUserForCompany_ReturnNull() throws Exception {

        // create user
        saveNewTestUser();

        // create user2
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/app-users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(TestData.NEW_USER_2)).andExpect(status().isOk())
                .andExpect(content().json(TestData.NEW_USER_2_RESPONSE));

        // create customer for user
        createCustomerForUser();

        mvc.perform(MockMvcRequestBuilders
                        .get("/api/customers/123")
                        .with(httpBasic("user2", "password")))
                .andExpect(jsonPath("$").doesNotExist());
    }

    @Test
    void delete_whenLoggedInAndCustomerExists_thenDeleteCustomer() throws Exception {

        // create user
        saveNewTestUser();

        // create customer for user
        createCustomerForUser();

        // delete by id
        mvc.perform(MockMvcRequestBuilders
                        .delete("/api/customers/123")
                        .with(httpBasic("user", "password")))
                .andExpect(status().isOk());
    }

    @Test
    void delete_whenLoggedInAndCustomerDoesNotExists_thenReturn404() throws Exception {

        // create user
        saveNewTestUser();

        // delete by id
        mvc.perform(MockMvcRequestBuilders
                        .delete("/api/customers/123")
                        .with(httpBasic("user", "password")))
                .andExpect(status().isNotFound());
    }

    @Test
    void saveInformation_whenLoggedInAndCustomerExists_thenReturnUpdatedCustomer() throws Exception {

        // create user
        saveNewTestUser();

        // create customer
        createCustomerForUser();

        mvc.perform(MockMvcRequestBuilders
                        .post("/api/customers/info/123")
                        .with(httpBasic("user", "password"))
                        .contentType(MediaType.APPLICATION_JSON).content(TestData.CUSTOMER_INFO_POST))
                .andExpect(status().isOk())
                .andExpect(content().json(TestData.SINGLE_CUSTOMER_WITH_INFO));
    }
}
