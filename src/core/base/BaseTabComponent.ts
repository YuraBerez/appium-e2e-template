import BaseComponent from "./BaseComponent";

/**
 * Extends BaseComponent to represent a bottom navigation panel (Tab Bar)
 * which controls primary screen switching.
 */
export default abstract class BaseTabComponent extends BaseComponent {
    
    protected abstract readonly tabItemSelector: string;

    constructor(selector: string) {
        super(selector);
    }

    /**
     * Taps a specific tab identified by a common accessible label (name).
     * NOTE: Inheriting classes must map the label to the exact selector for the tab.
     * @param tabSelector The unique selector for the specific tab item to tap (e.g., '~ProfileTab').
     */
    async tapTab(tabSelector: string): Promise<void> {
        this.log(`Tapping tab with selector: ${tabSelector}`);
        const tab = this.findChild(tabSelector);
        
        await tab.waitForDisplayed({ timeout: 5000, timeoutMsg: `Tab not found: ${tabSelector}` });
        await tab.click();
    }

    /**
     * Checks if a specific tab is currently selected (active).
     * @param tabSelector The unique selector for the specific tab item.
     * @returns A promise that resolves to true if the tab is selected/active.
     */
    async isTabSelected(tabSelector: string): Promise<boolean> {
        this.log(`Checking if tab is selected: ${tabSelector}`);
        const tab = this.findChild(tabSelector);

        return tab.isSelected(); 
    }
    
    /**
     * Gets all tabs available in the tab bar.
     * @returns A promise that resolves to an array of all tab WebdriverIO elements.
     */
    async getAllTabs(): Promise<WebdriverIO.ElementArray> {
        this.log("Retrieving all tab elements.");
        return (await this.root.$$(this.tabItemSelector)) as unknown as WebdriverIO.ElementArray;
    }
}