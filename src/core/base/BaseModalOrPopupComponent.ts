import BaseComponent from "./BaseComponent";

/**
 * Extends BaseComponent to represent modal windows, popups, Action Sheets, 
 * or system alerts that appear over the main screen content.
 * It provides specialized methods for checking visibility and dismissal.
 */
export default abstract class BaseModalOrPopupComponent extends BaseComponent {

    protected readonly DEFAULT_MODAL_TIMEOUT = 2000;
    protected readonly closeButtonSelector: string = '//*[@name="Close" or @label="Close"]';
    protected readonly titleSelector: string = '//*[@resource-id="modal-title" or @name="modalTitle"]';

    constructor(selector: string) {
        super(selector);
    }

    /**
     * Waits for the modal to be displayed (shown).
     * @param timeout The maximum time (in milliseconds) to wait.
     */
    async waitForAppeared(timeout: number = this.DEFAULT_MODAL_TIMEOUT): Promise<void> {
        this.log("Waiting for modal to appear.");
        await this.waitForDisplayed(true, timeout);
    }

    /**
     * Waits for the modal to be dismissed (hidden/gone).
     * Uses the inherited waitUntilGone method.
     * @param timeout The maximum time (in milliseconds) to wait.
     */
    async waitForDismissed(timeout: number = this.DEFAULT_MODAL_TIMEOUT): Promise<void> {
        this.log("Waiting for modal to be dismissed.");
        await this.waitUntilGone(timeout);
    }

    /**
     * Retrieves the title text of the modal, using a default title selector.
     * Inheriting classes should override the titleSelector if needed.
     * @returns A promise that resolves to the title text.
     */
    async getTitle(): Promise<string> {
        const titleElement = this.findChild(this.titleSelector);
        
        if (await titleElement.isExisting()) {
            return titleElement.getText();
        }
        this.log("Warning: Title element not found using default selector.");
        return "";
    }
    
    /**
     * Attempts to dismiss the modal by clicking a common "Close" or "Cancel" button.
     * This relies on the internal closeButtonSelector.
     */
    async tapCloseButton(): Promise<void> {
        this.log("Attempting to tap the modal's close button.");
        const closeButton = this.findChild(this.closeButtonSelector);
        
        if (await closeButton.isExisting()) {
            await closeButton.click(); 
        } else {
            this.log(`Error: Close button not found using selector: ${this.closeButtonSelector}`);
            throw new Error(`Cannot tap close button, element not found for modal: ${this.selector}`);
        }
    }

    /**
     * Attempts to dismiss the modal by clicking outside of its content area (on the overlay).
     * NOTE: This is only effective if the modal is designed to close on overlay tap.
     */
    async tapOutside(): Promise<void> {
        this.log("Attempting to dismiss modal by tapping outside (on the overlay).");
        
        await this.root.click(); 
    }
}