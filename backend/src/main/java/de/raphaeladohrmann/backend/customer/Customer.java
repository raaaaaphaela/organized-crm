package de.raphaeladohrmann.backend.customer;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    private String id;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @Email
    private String email;

    @NotBlank
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private String birthday;

    @NotBlank
    private String phone;

    @NotBlank
    private String street;

    @NotBlank
    @Pattern(regexp="^\\d.*")
    private String houseNo;

    @NotBlank
    private String city;

    @NotBlank
    @Pattern(regexp = "\\d{5}")
    private String postalCode;

    private List<Information> information;

    private String createdBy;

    private String belongsToCompany;
}
