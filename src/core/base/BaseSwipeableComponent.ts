import { driver } from "@wdio/globals";
import BaseComponent from "./BaseComponent";
import { getElementRect } from "../utils/elementUtils"

/**
 * Extends BaseComponent to include common swipe/gesture interactions 
 * using the W3C Pointer Actions API.
 */
export default abstract class BaseSwipeableComponent extends BaseComponent {
    constructor(selector: string) {
        super(selector);
    }

    /**
     * Executes a pointer action (swipe or drag) within the context of the component.
     */
    private async performSwipe(
        startX: number,
        startY: number,
        endX: number,
        endY: number,
        durationMs: number = 500
    ): Promise<void> {
        await driver.performActions([
            {
                type: "pointer",
                id: "finger1",
                parameters: { pointerType: "touch" },
                actions: [
                    { type: "pointerMove", duration: 0, x: Math.round(startX), y: Math.round(startY) },
                    { type: "pointerDown", button: 0 },
                    { type: "pause", duration: 100 }, 
                    { type: "pointerMove", duration: durationMs, x: Math.round(endX), y: Math.round(endY) },
                    { type: "pointerUp", button: 0 },
                ],
            },
        ]);
        
        await driver.releaseActions();
    }

    /**
     * Swipes left across the component.
     */
    async swipeLeft(percent: number = 0.8): Promise<void> {
        const rect = await getElementRect(this.root);

        const startX = rect.x + rect.width * 0.9;
        const endX = rect.x + rect.width * (0.9 - percent); 
        const y = rect.y + rect.height / 2;

        await this.performSwipe(startX, y, endX, y);
    }

    /**
     * Swipes right across the component.
     */
    async swipeRight(percent: number = 0.8): Promise<void> {
        const rect = await getElementRect(this.root);
        
        const startX = rect.x + rect.width * 0.1;
        const endX = rect.x + rect.width * (0.1 + percent); 
        const y = rect.y + rect.height / 2;

        await this.performSwipe(startX, y, endX, y);
    }

    /**
     * Swipes up across the component (scrolls content down).
     */
    async swipeUp(percent: number = 0.8): Promise<void> {
        const rect = await getElementRect(this.root);
        const x = rect.x + rect.width / 2;
        
        const startY = rect.y + rect.height * 0.9;
        const endY = rect.y + rect.height * (0.9 - percent);

        await this.performSwipe(x, startY, x, endY);
    }

    /**
     * Swipes down across the component (scrolls content up).
     */
    async swipeDown(percent: number = 0.8): Promise<void> {
        const rect = await getElementRect(this.root);
        const x = rect.x + rect.width / 2;
        
        const startY = rect.y + rect.height * 0.1;
        const endY = rect.y + rect.height * (0.1 + percent); 

        await this.performSwipe(x, startY, x, endY);
    }
}