import { browser } from "@wdio/globals";
import BaseComponent from "./BaseComponent";

/**
 * Extends BaseComponent to represent a clickable button element,
 * adding specific gesture methods like double tap.
 */
export default abstract class BaseButtonComponent extends BaseComponent {
    
    constructor(selector: string) {
        super(selector);
    }

    /**
     * Checks if the button element is currently enabled and clickable.
     */
    async isEnabled(): Promise<boolean> {
        return this.root.isEnabled();
    }

    /**
     * Checks if the button element is currently disabled.
     */
    async isDisabled(): Promise<boolean> {
        return !(await this.isEnabled());
    }

    /**
     * Clicks the button using the robust logic inherited from BaseComponent 
     */
    async tap(): Promise<void> {
        this.log("Attempting to click/tap the button.");
        await this.click();
    }
    
    /**
     * Performs a double-tap gesture on the button element.
     * This uses the W3C Pointer Actions API for reliable double-tap simulation.
     */
    async doubleTap(): Promise<void> {
        this.log("Performing double tap action on the button.");

        await this.waitForDisplayed(true); 

        const location = await this.root.getLocation();
        const size = await this.root.getSize();
        const x = Math.round(location.x + size.width / 2);
        const y = Math.round(location.y + size.height / 2);

        const tapAction = [
            { type: "pointerMove", duration: 0, x, y },
            { type: "pointerDown", button: 0 },
            { type: "pointerUp", button: 0 },
        ];
        
        await browser.performActions([
            {
                type: "pointer",
                id: "finger1",
                parameters: { pointerType: "touch" },
                actions: [
                    ...tapAction,
                    { type: "pause", duration: 100 }, 
                    ...tapAction,
                ],
            },
        ]);

        await browser.releaseActions();
    }
}