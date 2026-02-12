import { WelcomeScreen } from '../screens/WelcomeScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { PinCodeScreen } from '../screens/PinCodeScreen';

export default class AuthHelper {
  public static async signInWithPin(email: string, pin: string): Promise<void> {
    const welcomeScreen = new WelcomeScreen();
    const signInScreen = new SignInScreen();
    const pinCodeScreen = new PinCodeScreen();

    await welcomeScreen.goToSignIn();
    await signInScreen.waitForDisplayed();
    await signInScreen.signIn(email);
    await pinCodeScreen.waitForDisplayed();
    await pinCodeScreen.enterPinCode(pin);
  }
}
