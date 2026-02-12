import BaseScreen from "../base/BaseScreen";
import ButtonComponent from "../components/ButtonComponent";
import TextComponent from "../components/TextComponent";
import TextFieldComponent from "../components/TextFieldComponent";
import { BUTTON_IDS } from "../selectors/button-ids";
import { INPUT_IDS } from "../selectors/input-ids";
import { SCREEN_IDS } from "../selectors/screen-ids";
import { TEXT_IDS } from "../selectors/text-ids";

export class PinCodeScreen extends BaseScreen {
    constructor() {
        super(SCREEN_IDS.PIN_CODE_SCREEN);
    }

    private PinCodeField = new TextFieldComponent(INPUT_IDS.PIN_CODE_INPUT);
    private ResendCodeButton = new ButtonComponent(BUTTON_IDS.RESEND_CODE_BUTTON);
    private ErrorMessageText = new TextComponent(TEXT_IDS.ERROR_PIN_CODE_MESSAGE_TEXT);
    private BackButton = new ButtonComponent(BUTTON_IDS.BACK_BUTTON);

    public async enterPinCode(pinCode: string): Promise<void> {
        await this.PinCodeField.type(pinCode);
    }

    public async tapResendCodeButton(): Promise<void> {
        await this.ResendCodeButton.click();
    }

    public async getErrorMessage(): Promise<string> {
        return this.ErrorMessageText.getText();
    }

    public async isErrorMessageDisplayed(): Promise<boolean> {
        return this.ErrorMessageText.isDisplayed();
    }

    public async isResendCodeButtonDisplayed(): Promise<boolean> {
        return this.ResendCodeButton.isDisplayed();
    }

    public async isResendCodeButtonDisabled(): Promise<boolean> {
        return this.ResendCodeButton.isDisabled();
    }

    public async isPinCodeFieldDisplayed(): Promise<boolean> {
        return this.PinCodeField.isDisplayed();
    }

    public async goBack(): Promise<void> {
        await this.BackButton.click();
    }
}
