import BaseTextFieldComponent from "../base/BaseTextFieldComponent";

/**
 * Represents a generic text input field component in the application.
 * It extends the BaseTextFieldComponent, inheriting common text field functionalities.
 */
export default class TextFieldComponent extends BaseTextFieldComponent {
    constructor(selector: string) {
        super(selector);
    }
}