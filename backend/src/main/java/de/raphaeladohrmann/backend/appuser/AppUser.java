package de.raphaeladohrmann.backend.appuser;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppUser {

    private String id;
    private String username;
    private String password;
    private String company;
    private String role;
}
