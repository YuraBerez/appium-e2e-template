import { WelcomeScreen } from "../core/screens/WelcomeScreen";
import { SignInScreen } from "../core/screens/SignInScreen";
import { driver, expect } from "@wdio/globals";

describe("Welcome Screen functionality", () => {
    let welcomeScreen = new WelcomeScreen();
    let signInScreen = new SignInScreen();

    beforeEach(async () => {
        await driver.reloadSession();
        await welcomeScreen.waitForDisplayed();
    });

    it("should allow swiping the welcome slider", async () => {
        await welcomeScreen.swipeSliderLeft();
        await welcomeScreen.swipeSliderLeft();

        await welcomeScreen.swipeSliderRight();
        await welcomeScreen.swipeSliderRight();
    });

    it("should navigate to the Sign In screen when 'Sign In' button is tapped", async () => {
        await welcomeScreen.goToSignIn();

        await expect(signInScreen.isDisplayed()).resolves.toBe(true);

        await signInScreen.goBack();
        await expect(welcomeScreen.isDisplayed()).resolves.toBe(true);
    });
});