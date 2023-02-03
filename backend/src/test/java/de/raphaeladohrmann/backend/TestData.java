package de.raphaeladohrmann.backend;

public class TestData {

    public final static String NEW_USER = """
            {
                "username":"user",
                "password":"password",
                "company": "test"
            }
            """;

    public final static String NEW_USER_2 = """
            {
                "username":"user2",
                "password":"password",
                "company": "test2"
            }
            """;

    public final static String NEW_USER_RESPONSE = """
            {
                "username": "user",
                "password": "",
                "company": "test",
                "role": "BASIC"
            }
            """;

    public final static String NEW_USER_2_RESPONSE = """
            {
                "username": "user2",
                "password": "",
                "company": "test2",
                "role": "BASIC"
            }
            """;

    public final static String NEW_CUSTOMER = """
            {
                "id": "123",
                "firstName": "Max",
                "lastName": "Mustermann",
                "email": "maxi.must@test.de",
                "birthday": "1995-06-11",
                "phone": "+49017327482223",
                "street": "Mondstr.",
                "houseNo": 5,
                "city": "Hamburg",
                "information": [],
                "postalCode": 22769
            }
            """;

    public final static String UPDATED_CUSTOMER = """
            {
                "id": "123",
                "firstName": "Maximilian",
                "lastName": "Mustermann",
                "email": "maxi.must@test.de",
                 "birthday": "1995-06-11",
                "phone": "+49017327482223",
                "street": "Mondstr.",
                "houseNo": 5,
                "city": "Hamburg",
                "information": [],
                "postalCode": 22769
            }
            """;

    public final static String CUSTOMER_LIST = """
            [{
                "id": "123",
                "firstName": "Max",
                "lastName": "Mustermann",
                "email": "maxi.must@test.de",
                "birthday": "1995-06-11",
                "phone": "+49017327482223",
                "street": "Mondstr.",
                "houseNo": 5,
                "city": "Hamburg",
                "information": [],
                "postalCode": 22769,
                "createdBy": "user",
                "belongsToCompany": "test"
            }]
            """;

    public final static String SINGLE_CUSTOMER = """
            {
                "id": "123",
                "firstName": "Max",
                "lastName": "Mustermann",
                "email": "maxi.must@test.de",
                "birthday": "1995-06-11",
                "phone": "+49017327482223",
                "street": "Mondstr.",
                "houseNo": 5,
                "city": "Hamburg",
                "information": [],
                "postalCode": 22769,
                "createdBy": "user",
                "belongsToCompany": "test"
            }
            """;

    public final static String SINGLE_CUSTOMER_WITH_INFO = """
            {
                "id": "123",
                "firstName": "Max",
                "lastName": "Mustermann",
                "email": "maxi.must@test.de",
                "birthday": "1995-06-11",
                "phone": "+49017327482223",
                "street": "Mondstr.",
                "houseNo": 5,
                "city": "Hamburg",
                "information": [
                    {
                        "content":"Knieschmerz...",
                        "dateTime":"1995-06-11T11:11",
                        "username":"user"
                    }
                ],
                "postalCode": 22769,
                "createdBy": "user",
                "belongsToCompany": "test"
            }
            """;

    public final static String CUSTOMER_INFO_POST = """
              {
                 "content": "Knieschmerz...",
                 "dateTime": "1995-06-11T11:11"
            }
             """;
}
