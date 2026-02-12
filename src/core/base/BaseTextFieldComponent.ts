import BaseComponent from "./BaseComponent";

/**
 * Extends BaseComponent to represent a text input field (e.g., <input type="text">, <textarea>, etc.).
 * It provides specialized methods for interacting with text input elements.
 */
export default abstract class BaseTextFieldComponent extends BaseComponent {

    constructor(selector: string) {
        super(selector);
    }

    /**
     * Clears the current text from the input field.
     * It uses the element's built-in clearValue method for reliability.
     */
    async clear(): Promise<void> {
        this.log("Clearing text field value.");
        await this.waitForDisplayed(true);
        await this.root.clearValue();
    }

    /**
     * Types the specified text into the input field.
     * It automatically clears the field before typing by default.
     * @param text The string value to enter into the text field.
     * @param clearBeforeTyping If true, clears the field before typing. Default is true.
     */
    async type(text: string, clearBeforeTyping: boolean = true): Promise<void> {
        this.log(`Typing text: "${text}"`);
        await this.click(); 

        if (clearBeforeTyping) {
            await this.clear();
        }

        await this.root.setValue(text);
    }

    /**
     * Appends the specified text to the existing text in the input field.
     * @param text The string value to append.
     */
    async append(text: string): Promise<void> {
        this.log(`Appending text: "${text}"`);
        await this.click();
        await this.root.addValue(text);
    }

    /**
     * Retrieves the current value (text) entered into the input field.
     * This is generally more reliable than getText() for input elements.
     * @returns A promise that resolves to the text field's current value.
     */
    async getValue(): Promise<string> {
        return this.root.getValue();
    }
    
    /**
     * Retrieves the placeholder attribute value of the input field.
     * @returns A promise that resolves to the placeholder text.
     */
    async getPlaceholder(): Promise<string> {
        return this.root.getAttribute('placeholder');
    }
    
    /**
     * Retrieves the type attribute value (e.g., 'text', 'password') of the input field.
     * @returns A promise that resolves to the input type.
     */
    async getType(): Promise<string> {
        return this.root.getAttribute('type');
    }
}