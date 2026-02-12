import BaseComponent from "./BaseComponent";
import { browser } from "@wdio/globals";

/**
 * Extends BaseComponent to represent static, read-only text elements
 * (e.g., labels, headers, error messages, paragraph text).
 * It focuses on retrieving and verifying text content.
 */
export default abstract class BaseTextComponent extends BaseComponent {

    constructor(selector: string) {
        super(selector);
    }

    /**
     * Retrieves the visible text content of the element.
     * Inherits the getText() method from BaseComponent.
     * @returns A promise that resolves to the element's visible text.
     */
    async getVisibleText(): Promise<string> {
        return this.getText();
    }

    /**
     * Checks if the element's text content exactly matches the expected text.
     * @param expectedText The exact string expected.
     * @returns A promise that resolves to true if the text matches, false otherwise.
     */
    async hasText(expectedText: string): Promise<boolean> {
        const actualText = await this.getVisibleText();
        this.log(`Verifying text. Expected: "${expectedText}", Actual: "${actualText}"`);
        return actualText === expectedText;
    }

    /**
     * Checks if the element's text content contains the expected substring.
     * @param expectedSubstring The substring expected to be present.
     * @returns A promise that resolves to true if the substring is found, false otherwise.
     */
    async includesText(expectedSubstring: string): Promise<boolean> {
        const actualText = await this.getVisibleText();
        this.log(`Verifying substring. Expected to include: "${expectedSubstring}", Actual: "${actualText}"`);
        return actualText.includes(expectedSubstring);
    }

    /**
     * Waits for the element's text to exactly match the expected text.
     * @param expectedText The exact string expected.
     * @param timeout The maximum time (in milliseconds) to wait.
     */
    async waitForText(expectedText: string, timeout: number = 5000): Promise<void> {
        this.log(`Waiting for text to match exactly: "${expectedText}"`);
        
        await browser.waitUntil(
            async () => (await this.getVisibleText()) === expectedText,
            {
                timeout,
                timeoutMsg: `Text on component "${this.selector}" did not become "${expectedText}" within ${timeout}ms. Current text: "${await this.getVisibleText()}"`,
            }
        );
    }
}