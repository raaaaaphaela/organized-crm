package de.raphaeladohrmann.backend.appuser;

import de.raphaeladohrmann.backend.TestData;
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
                .content(TestData.NEW_USER)).andExpectAll(
                MockMvcResultMatchers.status().isOk(),
                MockMvcResultMatchers.content().json(TestData.NEW_USER_RESPONSE)
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
                .content(TestData.NEW_USER)).andExpectAll(
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
}
