import BaseTextComponent from "../base/BaseTextComponent";

/**
 * Represents a standard hyperlink or navigation label.
 * It inherits text retrieval and robust click functionality.
 * Inheriting from BaseTextComponent is useful as links often need text verification.
 */
export default class LinkComponent extends BaseTextComponent {
    
    constructor(selector: string) {
        super(selector);
    }
    
    /**
     * Taps the link.
     * Uses the robust click method inherited from BaseComponent 
     * (waitForClickable + click).
     */
    async tap(): Promise<void> {
        this.log("Tapping the link.");
        await this.click();
    }
    
    /**
     * Optional: Verifies if the link contains a specific accessible URL attribute
     * (common in some hybrid/web views).
     * @param attributeName The name of the attribute containing the URL (e.g., 'href', 'url').
     * @returns The URL string from the element's attribute.
     */
    async getUrlAttribute(attributeName: string = 'url'): Promise<string> {
        return this.root.getAttribute(attributeName);
    }
}