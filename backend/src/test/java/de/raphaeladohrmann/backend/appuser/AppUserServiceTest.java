package de.raphaeladohrmann.backend.appuser;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AppUserServiceTest {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void create_whenValidInput_thenReturnNewUser() {

        // given
        AppUser userInput = new AppUser(
                "1", "UserName", "geheimespwd",
                "Company", null);
        AppUser createdUser = new AppUser(
                "1", "UserName", "",
                "Company", "BASIC");
        AppUserRepository repository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findByUsername(userInput.getUsername())).thenReturn(Optional.empty());

        // when
        AppUser actual = appUserService.create(userInput);

        // then
        Assertions.assertEquals(actual, createdUser);
    }


    @Test
    public void create_whenUserAlreadyExists_thenReturnException() {

        // given
        AppUser userInput = new AppUser(
                null, "UserName", "geheimespwd",
                "Company", null);
        AppUser createdUser = new AppUser(
                "1", "UserName", "geheimespwd",
                "Company", "BASIC");
        AppUserRepository repository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findByUsername(userInput.getUsername())).thenReturn(Optional.of(createdUser));

        // when
        try {
            appUserService.create(userInput);
            Assertions.fail();
        } catch (ResponseStatusException e) {
            Assertions.assertEquals(HttpStatus.CONFLICT, e.getStatus());
        }
    }

    @Test
    void findByUsername_whenUserExists_thenReturnUser() {

        // given
        AppUser user = new AppUser(
                "1", "UserName", "geheimespwd",
                "Company", "BASIC");
        AppUserRepository repository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));

        // when
        Optional<AppUser> actual = appUserService.findByUsernameWithoutPassword(user.getUsername());

        // then
        Assertions.assertEquals(actual, Optional.of(user));
    }

    @Test
    void findByUsername_whenUserDoesNotExists_thenReturnNull() {

        // given
        AppUserRepository repository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findByUsername("Username")).thenReturn(Optional.empty());

        // when
        Optional<AppUser> actual = appUserService.findByUsernameWithoutPassword("Username");

        // then
        Assertions.assertEquals(actual, Optional.empty());
    }

    @Test
    void findByUsernameWithoutPassword_whenUserExists_thenReturnUser() {

        // given
        AppUser user = new AppUser(
                "1", "UserName", "geheimespwd",
                "Company", "BASIC");
        AppUser userWithoutPassword = new AppUser("1", "UserName", "", "Company", "BASIC");
        AppUserRepository repository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));

        // when
        Optional<AppUser> actual = appUserService.findByUsernameWithoutPassword(user.getUsername());

        // then
        Assertions.assertEquals(actual, Optional.of(userWithoutPassword));
        Mockito.verify(repository).findByUsername(user.getUsername());
    }

    @Test
    void findByUsernameWithoutPassword_whenUserDoesNotExists_thenReturnNull() {

        // given
        AppUserRepository repository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findByUsername("Username")).thenReturn(Optional.empty());

        // when
        Optional<AppUser> actual = appUserService.findByUsernameWithoutPassword("Username");

        // then
        Assertions.assertEquals(actual, Optional.empty());
        Mockito.verify(repository).findByUsername("Username");
    }
}
