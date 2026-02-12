import BaseScreen from "../base/BaseScreen";
import ButtonComponent from "../components/ButtonComponent";
import LinkComponent from "../components/LinkComponent";
import SliderComponent from "../components/SliderComponent";
import { BUTTON_IDS } from "../selectors/button-ids";
import { LINK_IDS } from "../selectors/link-ids";
import { SCREEN_IDS } from "../selectors/screen-ids";
import { SLIDER_IDS } from "../selectors/slider-ids";

export class WelcomeScreen extends BaseScreen {
    constructor() {
        super(SCREEN_IDS.WELCOME_SCREEN);
    }

    private Slider: SliderComponent = new SliderComponent(SLIDER_IDS.WELCOME_SCREEN_SLIDER);
    private SignInButton = new ButtonComponent(BUTTON_IDS.SIGN_IN_BUTTON);
    private SignUpButton = new ButtonComponent(BUTTON_IDS.SIGN_UP_BUTTON);
    private TermsOfUseLink = new LinkComponent(LINK_IDS.TERMS_OF_USE_LINK);
    private PrivacyPolicyLink = new LinkComponent(LINK_IDS.PRIVACY_POLICY_LINK);
    private RefoundPolicyLink = new LinkComponent(LINK_IDS.REFUND_POLICY_LINK);

    public async goToSignIn(): Promise<void> {
        await this.SignInButton.waitForDisplayed();
        await this.SignInButton.click();
    }

    public async goToSignUp(): Promise<void> {
        await this.SignUpButton.waitForDisplayed();
        await this.SignUpButton.click();
    }

    public async clickTermsOfUse(): Promise<void> {
        await this.TermsOfUseLink.waitForDisplayed();
        await this.TermsOfUseLink.click();
    }

    public async clickPrivacyPolicy(): Promise<void> {
        await this.PrivacyPolicyLink.click();
    }

    public async clickRefundPolicy(): Promise<void> {
        await this.RefoundPolicyLink.click();
    }

    public async swipeSliderLeft(): Promise<void> {
        await this.Slider.swipeLeft();
    }

    public async swipeSliderRight(): Promise<void> {
        await this.Slider.swipeRight();
    }
}