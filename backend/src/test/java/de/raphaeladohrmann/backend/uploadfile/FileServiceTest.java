package de.raphaeladohrmann.backend.uploadfile;

import de.raphaeladohrmann.backend.appuser.AppUser;
import de.raphaeladohrmann.backend.appuser.AppUserService;
import de.raphaeladohrmann.backend.customer.CustomerRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@SpringBootTest
class FileServiceTest {

    private final GridFsOperations gridFsOperations = Mockito.mock(GridFsOperations.class);

    private final CustomerRepository customerRepository = Mockito.mock(CustomerRepository.class);

    private final AppUserService appUserService = Mockito.mock(AppUserService.class);

    private final GridFsTemplate gridFsTemplate = Mockito.mock(GridFsTemplate.class);

    private final FileService fileService = new FileService(gridFsTemplate, gridFsOperations, customerRepository, appUserService);

    private final AppUser user = new AppUser(
            "1", "UserName", "",
            "Company", "BASIC");

    @Test
    void addFile_WhenFileIsEmpty_ThrowResponseStatusException_BAD_REQUEST() throws IOException {

        // given
        MockMultipartFile mockMultipartFile = new MockMultipartFile(
                "data",
                "filename.txt",
                "multipart/form-data",
                new byte[0]);

        // when & then
        try {
            fileService.addFile("123", mockMultipartFile);
            Assertions.fail();
        } catch (ResponseStatusException e) {
            Assertions.assertEquals(HttpStatus.BAD_REQUEST, e.getStatus());
        }

        assertTrue(mockMultipartFile.isEmpty());
    }

    @Test
    void addFile_WhenCustomerIdIsNotValid_ThrowResponseStatusException_NOT_FOUND() throws IOException {

        // given
        MockMultipartFile mockMultipartFile = new MockMultipartFile(
                "data",
                "filename.txt",
                "multipart/form-data",
                "some xml".getBytes());

        when(appUserService.getAuthenticatedUser()).thenReturn(user);
        when(customerRepository.findByIdAndBelongsToCompany("123", "Company")).thenReturn(Optional.empty());

        // when & then
        try {
            fileService.addFile("123", mockMultipartFile);
            Assertions.fail();
        } catch (ResponseStatusException e) {
            Assertions.assertEquals(HttpStatus.NOT_FOUND, e.getStatus());
        }
    }
}