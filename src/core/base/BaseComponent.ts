import { $ } from '@wdio/globals';
import { DEFAULT_TIMEOUT } from '../constants/constants';

/**
 * BaseComponent
 */
export default abstract class BaseComponent {
    protected readonly selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    /**
     * Returns the root WebdriverIO element for this component.
     * This uses a getter to ensure the element is freshly retrieved on each access, 
     * preventing Stale Element Reference errors across page navigations.
     */
    get root(): WebdriverIO.Element {
        return $(this.selector) as unknown as WebdriverIO.Element;
    }
    
    /**
     * Waits for the component to be displayed or hidden within a specified timeout.
     * @param isDisplayed True to wait for displayed, false to wait for hidden.
     * @param timeout The maximum time (in milliseconds) to wait.
     */
    async waitForDisplayed(isDisplayed = true, timeout = DEFAULT_TIMEOUT): Promise<void> {
        await this.root.waitForDisplayed({
            timeout,
            reverse: !isDisplayed,
            timeoutMsg: `Expected component "${this.selector}" to be ${isDisplayed ? 'displayed' : 'hidden'} within ${timeout}ms`,
        });
    }

    /**
     * Convenience method to wait until the component is no longer displayed (is gone).
     * @param timeout The maximum time (in milliseconds) to wait.
     */
    async waitUntilGone(timeout = DEFAULT_TIMEOUT): Promise<void> {
        await this.waitForDisplayed(false, timeout);
    }

    async isDisplayed(): Promise<boolean> {
        return this.root.isDisplayed();
    }

    findChild(childSelector: string): WebdriverIO.Element {
        return this.root.$(childSelector) as unknown as WebdriverIO.Element;
    }

    /**
     * Waits for the element to be clickable and then performs a click action.
     * This replaces the old 'safeClick' and is the recommended click method.
     */
    async click(): Promise<void> {
        await this.root.click();
    }

    async getText(): Promise<string> {
        return this.root.getText();
    }

    log(message: string): void {
        console.log(`[Component: ${this.selector}] ${message}`);
    }
}