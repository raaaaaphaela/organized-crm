package de.raphaeladohrmann.backend.AppUser;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class AppUserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void me_whenNotLoggedIn_shouldReturn401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/app-users/me"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser(username = "admin", roles = "ADMIN")
    void me_whenLoggedInAsUser_shouldReturnIsOk() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/app-users/me"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk()
                );
    }

    @Test
    void post_whenSuccessfulSignup_thenReturnAddedUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                          {
                            "username": "Testuser",
                            "password": "password",
                            "company": "TestCompany"
                            }
                        """)).andExpectAll(
                MockMvcResultMatchers.status().isOk(),
                MockMvcResultMatchers.content().json("""
                           {
                            "username": "Testuser",
                            "password": "",
                            "company": "TestCompany",
                            "role": "BASIC"
                            }
                        """)
        );
    }

    @Test
    void post_whenUsernameAlreadyTaken_thenReturnAddedUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                          {
                            "username": "Testuser",
                            "password": "password",
                            "company": "TestCompany"
                            }
                        """)).andExpectAll(
                MockMvcResultMatchers.status().isOk(),
                MockMvcResultMatchers.content().json("""
                           {
                            "username": "Testuser",
                            "password": "",
                            "company": "TestCompany",
                            "role": "BASIC"
                            }
                        """)
        );

        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                          {
                            "username": "Testuser",
                            "password": "password",
                            "company": "TestCompany"
                            }
                        """)).andExpectAll(
                MockMvcResultMatchers.status().isConflict()
        );
    }

    @Test
    @WithMockUser(username = "admin", roles = "ADMIN")
    void logout_whenLoggedInAsUser_shouldReturnIsOk() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/app-users/logout"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk()
                );
    }

    @Test
    void logout_whenNotLoggedInAsUser_shouldReturn() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/app-users/logout"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }
}
