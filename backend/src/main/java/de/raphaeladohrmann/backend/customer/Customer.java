package de.raphaeladohrmann.backend.customer;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    private String id;

    private String firstName;

    private String lastName;

    private String email;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private String birthday;

    private String phone;

    private String street;

    private int houseNo;

    private String city;

    private int postalCode;

    private List<Information> information;

    private String createdBy;

    private String belongsToCompany;
}
