import BaseComponent from "./BaseComponent";

/**
 * Extends BaseComponent to represent stateful selection elements like
 * Checkboxes, Toggles (Switches), and Radio Buttons.
 * It focuses on managing the 'checked' state.
 */
export default abstract class BaseCheckboxOrToggleComponent extends BaseComponent {
    
    constructor(selector: string) {
        super(selector);
    }

    /**
     * Checks the current selection state of the element.
     * This uses WebdriverIO's built-in isSelected(), which generally maps to 
     * Appium's 'selected' or 'checked' attribute for these elements.
     * @returns A promise that resolves to true if the element is checked/on, false otherwise.
     */
    async isChecked(): Promise<boolean> {
        this.log("Checking selection state.");
        return this.root.isSelected();
    }

    /**
     * Sets the element state to 'checked' (ON).
     * If the element is already checked, no action is taken.
     */
    async check(): Promise<void> {
        this.log("Attempting to check the element.");
        if (!(await this.isChecked())) {
            await this.click(); 
        } else {
            this.log("Element is already checked. Skipping click.");
        }
    }

    /**
     * Sets the element state to 'unchecked' (OFF).
     * If the element is already unchecked, no action is taken.
     */
    async uncheck(): Promise<void> {
        this.log("Attempting to uncheck the element.");
        if (await this.isChecked()) {
            await this.click(); 
        } else {
            this.log("Element is already unchecked. Skipping click.");
        }
    }

    /**
     * Toggles the current state of the element (ON to OFF, or OFF to ON).
     * This is useful when the initial state is unknown.
     */
    async toggle(): Promise<void> {
        this.log("Toggling the element state.");
        await this.click(); 
    }
}