import { PinCodeScreen } from "../core/screens/PinCodeScreen";
import { SignInScreen } from "../core/screens/SignInScreen";
import { WelcomeScreen } from "../core/screens/WelcomeScreen";
import { MealPlanScheduleScreen } from '../core/screens/MealPlanScheduleScreen';
import { driver, expect } from "@wdio/globals";
import { TEST_DATA } from "../core/constants/test-data";

describe("Pin Code Screen functionality", () => {
    let pinCodeScreen = new PinCodeScreen();
    let signInScreen = new SignInScreen();
    let welcomeScreen = new WelcomeScreen();
    let mealPlanScheduleScreen = new MealPlanScheduleScreen();

    beforeEach(async () => {
        await driver.reloadSession();

        await welcomeScreen.waitForDisplayed();
        await welcomeScreen.goToSignIn();
        await signInScreen.waitForDisplayed();
        await signInScreen.enterEmail(TEST_DATA.SIGN_IN.VALID_EMAIL);
        await signInScreen.tapContinueButton();
        await pinCodeScreen.waitForDisplayed();
    });

    it("should display all essential elements on the Pin Code screen", async () => {
        await expect(pinCodeScreen.isDisplayed()).resolves.toBe(true);
        await expect(pinCodeScreen.isPinCodeFieldDisplayed()).resolves.toBe(true);
        await expect(pinCodeScreen.isResendCodeButtonDisplayed()).resolves.toBe(true);
    });

    it("should allow entering a Pin Code", async () => {
        const testPin = TEST_DATA.PIN_CODE.VALID_PIN;
        await pinCodeScreen.enterPinCode(testPin);

        await mealPlanScheduleScreen.waitForDisplayed();
        await expect(mealPlanScheduleScreen.isDisplayed()).resolves.toBe(true);
    });

    it("should allow tapping the 'Resend Code' button", async () => {
        await pinCodeScreen.tapResendCodeButton();

        await expect(pinCodeScreen.isResendCodeButtonDisabled()).resolves.toBe(true);

        await driver.pause(30000);

        await expect(pinCodeScreen.isResendCodeButtonDisabled()).resolves.toBe(false);
    });

    it("should display error message for invalid Pin Code", async () => {
        const invalidPin = TEST_DATA.PIN_CODE.INVALID_PIN;
        await pinCodeScreen.enterPinCode(invalidPin);

        await expect(pinCodeScreen.isErrorMessageDisplayed()).resolves.toBe(true);
        await expect(pinCodeScreen.getErrorMessage()).resolves.toContain("Incorrect code");
    });

    it("should navigate back to the Sign In screen when 'Back' button is tapped", async () => {
        await pinCodeScreen.goBack();
        await expect(signInScreen.isDisplayed()).resolves.toBe(true);
    });
});
