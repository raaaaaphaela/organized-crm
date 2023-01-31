package de.raphaeladohrmann.backend.appuser;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AppUserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private void postNewUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(UserData.TEST_USER)).andExpectAll(
                MockMvcResultMatchers.status().isOk(),
                MockMvcResultMatchers.content().json(UserData.TEST_USER_RES)
        );
    }

    @Test
    void me_whenNotLoggedIn_shouldReturn401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/app-users/me"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    @Test
    void me_whenLoggedInAsUser_shouldReturnIsOk() throws Exception {
        postNewUser();

        mockMvc.perform(MockMvcRequestBuilders.get("/api/app-users/me")
                        .with(httpBasic("user", "password")))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk()
                );
    }

    @Test
    void post_whenUsernameAlreadyTaken_thenReturnAddedUser() throws Exception {
        postNewUser();

        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(UserData.TEST_USER)).andExpectAll(
                MockMvcResultMatchers.status().isConflict()
        );
    }

    @Test
    void logout_whenLoggedInAsUser_shouldReturnIsOk() throws Exception {
        postNewUser();

        mockMvc.perform(MockMvcRequestBuilders.get("/api/app-users/logout")
                .with(httpBasic("user", "password")))
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
