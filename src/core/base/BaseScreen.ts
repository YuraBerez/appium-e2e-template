import { $ } from '@wdio/globals';
import { DEFAULT_TIMEOUT } from '../constants/constants';

/**
 * Abstract base class for all screen objects in the test framework.
 * Provides common utilities for interacting with screen elements.
 */
export default abstract class BaseScreen {
    protected readonly selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }
    
    /**
     * Getter for the root element representing the entire screen/context.
     * Uses the commonly accepted name 'root' or 'container' for consistency.
     */
    get root(): WebdriverIO.Element {
        return $(this.selector) as unknown as WebdriverIO.Element;
    }

    /**
     * Waits for the screen to be displayed or hidden within a specified timeout.
     * Renamed to 'waitForDisplayed' for consistency with WebdriverIO API.
     * @param isDisplayed True to wait for displayed, false to wait for hidden.
     * @param timeout The maximum time (in milliseconds) to wait.
     */
    public async waitForDisplayed(isDisplayed = true, timeout = DEFAULT_TIMEOUT): Promise<void> {
        await this.root.waitForDisplayed({
            timeout,
            reverse: !isDisplayed,
            timeoutMsg: `Expected screen "${this.selector}" to be ${isDisplayed ? 'displayed' : 'hidden'} within ${timeout}ms`,
        });
    }
    
    /**
     * Convenience method to wait until the screen is no longer displayed (is gone).
     * @param timeout The maximum time (in milliseconds) to wait.
     */
    async waitUntilGone(timeout = DEFAULT_TIMEOUT): Promise<void> {
        await this.waitForDisplayed(false, timeout);
    }

    /**
     * Scrolls a target element into view within the context of this screen's root element.
     * Note: This is primarily useful for scrollable screens on Android/iOS.
     * @param element The child element to scroll into view.
     * @param direction The scroll direction.
     */
    async scrollIntoView(element: WebdriverIO.Element, direction: 'up' | 'down' = 'down'): Promise<void> {
        await element.scrollIntoView({
            scrollableElement: await this.root,
            direction,
            percent: 0.9,
        });
    }

    /**
     * Clicks outside the active element/keyboard context, usually by clicking the screen root.
     * NOTE: This is generally platform-dependent and might not always dismiss the keyboard on real devices.
     */
    async tapOutside(): Promise<void> {
        await this.waitForDisplayed(true, DEFAULT_TIMEOUT); 
        await this.root.click();
    }

    async isDisplayed(): Promise<boolean> {
        return this.root.isDisplayed();
    }
}