package de.raphaeladohrmann.backend.appuser;

public class UserData {

    final static String TEST_USER = """
              {
                "username": "user",
                "password": "password",
                "company": "TestCompany"
                }
            """;

    final static String TEST_USER_RES = """
               {
                "username": "user",
                "password": "",
                "company": "TestCompany",
                "role": "BASIC"
                }
            """;
}
