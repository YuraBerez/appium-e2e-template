import BaseScreen from "../base/BaseScreen";
import ButtonComponent from "../components/ButtonComponent";
import LinkComponent from "../components/LinkComponent";
import TextFieldComponent from "../components/TextFieldComponent";
import { BUTTON_IDS } from "../selectors/button-ids";
import { INPUT_IDS } from "../selectors/input-ids";
import { LINK_IDS } from "../selectors/link-ids";
import { SCREEN_IDS } from "../selectors/screen-ids";
import { TEXT_IDS } from "../selectors/text-ids";

export class SignInScreen extends BaseScreen {
    constructor() {
        super(SCREEN_IDS.SIGN_IN_SCREEN);
    }
    
    private EmailInput = new TextFieldComponent(INPUT_IDS.EMAIL_INPUT);
    private ContinueButton = new ButtonComponent(BUTTON_IDS.CONTINUE_BUTTON);
    private ContinueWithGoogleButton = new ButtonComponent(BUTTON_IDS.CONTINUE_WITH_GOOGLE_BUTTON);
    private ContinueWithAppleButton = new ButtonComponent(BUTTON_IDS.CONTINUE_WITH_APPLE_BUTTON);
    private ContactUsLink = new LinkComponent(LINK_IDS.CONTACT_US_LINK);
    private BackButton = new ButtonComponent(BUTTON_IDS.BACK_BUTTON);
    private ErrorMessageText = new LinkComponent(TEXT_IDS.ERROR_EMAIL_MESSAGE_TEXT);

    public async signIn(email: string): Promise<void> {
        await this.EmailInput.type(email);
        await this.ContinueButton.click();
    }

    public async goBack(): Promise<void> {
        await this.BackButton.click();
    }

    public async tapContinueWithGoogle(): Promise<void> {
        await this.ContinueWithGoogleButton.click();
    }

    public async tapContinueWithApple(): Promise<void> {
        await this.ContinueWithAppleButton.click();
    }

    public async tapContactUs(): Promise<void> {
        await this.ContactUsLink.click();
    }

    public async tapContinueButton(): Promise<void> {
        await this.ContinueButton.click();
    }

    public async isContinueButtonDisplayed(): Promise<boolean> {
        return this.ContinueButton.isDisabled();
    }

    public async enterEmail(email: string): Promise<void> {
        await this.EmailInput.type(email);
    }

    public async getErrorMessage(): Promise<string> {
        return this.ErrorMessageText.getText();
    }

    public async isErrorMessageDisplayed(): Promise<boolean> {
        return this.ErrorMessageText.isDisplayed();
    }
}