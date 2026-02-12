import { TestData } from "../interfaces/TestData";

export const TEST_DATA = {
    SIGN_IN: {
        VALID_EMAIL: "valid-email@test.com",
        INVALID_EMAIL: "invalid-email",
        UNREGISTERED_EMAIL: "notexistemail@not.exist.email"
    },
    PIN_CODE: {
        VALID_PIN: "0987",
        INVALID_PIN: "0000",
    },
    WELCOME_SCREEN: {
    }
} as TestData;
