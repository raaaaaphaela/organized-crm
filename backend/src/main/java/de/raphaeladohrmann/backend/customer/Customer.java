package de.raphaeladohrmann.backend.customer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String street;
    private int houseNo;
    private String city;
    private int postalCode;
    private String linkToDSGVO;
    private String createdBy;
    private String belongsToCompany;
}
