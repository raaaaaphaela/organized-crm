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
    private String houseNo;
    private String city;
    private String postalCode;
    private String linkToDSGVO;
    private String createdBy;
    private String belongsToCompany;
}
