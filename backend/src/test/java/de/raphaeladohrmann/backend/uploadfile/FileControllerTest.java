package de.raphaeladohrmann.backend.uploadfile;

import de.raphaeladohrmann.backend.TestData;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class FileControllerTest {

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
    void upload_whenNotLoggedIn_thenReturn401() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .get("/api/files/download/123"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void upload_whenEmptyFile_thenReturn_BAD_REQUEST() throws Exception {

        // given
        saveNewTestUser();

        MockMultipartFile mockMultipartFile = new MockMultipartFile(
                "data",
                "filename.txt",
                "multipart/form-data",
                new byte[0]);

        mvc.perform(MockMvcRequestBuilders
                        .post("/api/files/upload")
                        .with(httpBasic("user", "password"))
                        .contentType(MediaType.MULTIPART_FORM_DATA).content(String.valueOf(mockMultipartFile)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void upload_whenValidFileAndNoExistingCustomer_thenReturn_NOT_FOUND() throws Exception {

        // given
        saveNewTestUser();

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "filename.txt",
                "multipart/form-data",
                "some xml".getBytes());


        mvc.perform(multipart("/api/files/upload")
                        .file(file)
                        .with(httpBasic("user", "password"))
                        .header("customerId", "1234")
                )
                .andExpect(status().isNotFound());
    }

    @Test
    void upload_whenValidFileAndExistingCustomer_thenUpload_OK_And_download_OK() throws Exception {

        // given
        saveNewTestUser();
        createCustomerForUser();

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "filename.txt",
                "multipart/form-data",
                "some xml".getBytes());


        mvc.perform(multipart("/api/files/upload")
                        .file(file)
                        .with(httpBasic("user", "password"))
                        .header("customerId", "123")
                )
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders
                        .get("/api/files/download/123")
                        .with(httpBasic("user", "password")))
                .andExpect(status().isOk());
    }

    @Test
    void upload_whenCustomerHasNoFile_thenReturn_NOT_FOUND() throws Exception {

        // given
        saveNewTestUser();
        createCustomerForUser();

        mvc.perform(MockMvcRequestBuilders
                        .get("/api/files/download/123")
                        .with(httpBasic("user", "password")))
                .andExpect(status().isNotFound());
    }
}