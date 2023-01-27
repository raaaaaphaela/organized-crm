package de.raphaeladohrmann.backend.customer;

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
    private String phone;
    private String street;
    private int houseNo;
    private String city;
    private int postalCode;
    private String linkToDSGVO;
    private List<Information> information;
    private String createdBy;
    private String belongsToCompany;
}
