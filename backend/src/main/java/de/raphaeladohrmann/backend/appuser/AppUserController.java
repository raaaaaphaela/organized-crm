package de.raphaeladohrmann.backend.appuser;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/app-users")
public class AppUserController {

    private final AppUserService appUserService;

    @PostMapping("/signup")
    public AppUser post(@RequestBody AppUser appUser) {
        return appUserService.create(appUser);
    }

    @PostMapping("/login")
    public Optional<AppUser> login() {
        return me();
    }

    @GetMapping("/me")
    public Optional<AppUser> me() {
        return appUserService.findByUsernameWithoutPassword(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    @GetMapping("/logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
    }
}
