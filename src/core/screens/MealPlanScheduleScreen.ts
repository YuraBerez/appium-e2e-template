import BaseScreen from "../base/BaseScreen";
import ButtonComponent from "../components/ButtonComponent";
import { BUTTON_IDS } from "../selectors/button-ids";
import { SCREEN_IDS } from "../selectors/screen-ids";

export class MealPlanScheduleScreen extends BaseScreen {
    constructor() {
        super(SCREEN_IDS.MEAL_PLAN_SCHEDULE_SCREEN);
    }

    private ContinueButton= new ButtonComponent(BUTTON_IDS.CONTINUE_BUTTON);

    // to do add other fields and methods...

    public async tapContinue(): Promise<void> {
        await this.ContinueButton.click();
    }
}
