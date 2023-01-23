package de.raphaeladohrmann.backend.customer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Action {

    private String content;
    private LocalDateTime dateTime;
    private String username;

}
