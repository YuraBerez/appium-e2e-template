import { SignInScreen } from "../core/screens/SignInScreen";
import { WelcomeScreen } from "../core/screens/WelcomeScreen";
import { TEST_DATA } from "../core/constants/test-data";
import { driver, expect } from "@wdio/globals";

describe("Sign In Screen functionality", () => {
    let welcomeScreen = new WelcomeScreen();
    let signInScreen = new SignInScreen();

    beforeEach(async () => {
        await driver.reloadSession();

        await welcomeScreen.waitForDisplayed();
        await welcomeScreen.goToSignIn();
        await signInScreen.waitForDisplayed();
    });

    it("should display all essential elements on the Sign In screen", async () => {
        await expect(signInScreen.isDisplayed()).resolves.toBe(true);
    });

    it("should allow entering an email and tapping continue", async () => {
        const testEmail = TEST_DATA.SIGN_IN.VALID_EMAIL;

        await signInScreen.enterEmail(testEmail);
        await signInScreen.tapContinueButton();
        await expect(signInScreen.isDisplayed()).resolves.toBe(true);
    });

    it("should navigate back to the Welcome screen when 'Back' button is tapped", async () => {
        await signInScreen.goBack();
        await expect(welcomeScreen.isDisplayed()).resolves.toBe(true);
    });

    it("should allow tapping 'Contact Us' link", async () => {
        await signInScreen.tapContactUs();
    });

    it("should display an error message when the email field is left empty", async () => {
        await signInScreen.enterEmail("");
        
        await expect(signInScreen.isDisplayed()).resolves.toBe(true);
        await expect(signInScreen.isContinueButtonDisplayed()).resolves.toBe(true);
    });

    it("should display an error message when an invalid email is entered", async () => {
        const invalidEmail = TEST_DATA.SIGN_IN.INVALID_EMAIL;

        await signInScreen.enterEmail(invalidEmail);
        await signInScreen.tapContinueButton();

        await expect(signInScreen.isDisplayed()).resolves.toBe(true);
        await expect(signInScreen.isErrorMessageDisplayed()).resolves.toBe(true);
        await expect(signInScreen.getErrorMessage()).resolves.toContain("Please use a valid email address");

    });

    it("should display an error message when a non-registered email is entered", async () => {
        const unregisteredEmail = TEST_DATA.SIGN_IN.UNREGISTERED_EMAIL;

        await signInScreen.enterEmail(unregisteredEmail);
        await signInScreen.tapContinueButton();

        await expect(signInScreen.isDisplayed()).resolves.toBe(true);
        await expect(signInScreen.isErrorMessageDisplayed()).resolves.toBe(true);
        await expect(signInScreen.getErrorMessage()).resolves.toContain("We can't find an account with this email address");
    });
});
