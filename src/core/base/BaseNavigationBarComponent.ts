import BaseComponent from "./BaseComponent";

/**
 * Extends BaseComponent to represent the top navigation bar (Header) of a screen.
 * It provides core functionality for common navigation controls.
 */
export default abstract class BaseNavigationBarComponent extends BaseComponent {
    
    protected abstract readonly backButtonSelector: string;
    protected abstract readonly titleSelector: string;
    protected abstract readonly menuButtonSelector?: string;

    constructor(selector: string) {
        super(selector); 
    }

    /**
     * Retrieves the text displayed in the navigation bar's main title area.
     */
    async getTitle(): Promise<string> {
        this.log("Retrieving navigation bar title.");
        const titleElement = this.findChild(this.titleSelector);
        
        if (await titleElement.isExisting()) {
            return titleElement.getText();
        }
        throw new Error(`Title element not found for selector: ${this.titleSelector}`);
    }

    /**
     * Taps the 'Back' or 'Up' navigation button.
     */
    async tapBackButton(): Promise<void> {
        this.log("Tapping the Back button.");
        const backButton = this.findChild(this.backButtonSelector);
        await backButton.click();
    }

    /**
     * Taps the menu, hamburger, or primary action button (if present).
     * @returns True if the button was found and tapped, false otherwise.
     */
    async tapMenuButton(): Promise<boolean> {
        if (!this.menuButtonSelector) {
            this.log("Menu button selector is not defined for this navigation bar.");
            return false;
        }
        
        this.log("Tapping the Menu/Action button.");
        const menuButton = this.findChild(this.menuButtonSelector);
        
        if (await menuButton.isExisting()) {
            await menuButton.click();
            return true;
        }
        this.log("Warning: Menu/Action button element not found.");
        return false;
    }
}