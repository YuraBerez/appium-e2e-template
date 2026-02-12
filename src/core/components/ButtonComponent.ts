import BaseButtonComponent from '../base/BaseButtonComponent';
/**
 * Represents a standard, simple button element in the application UI.
 * It inherits all robust click, tap, doubleTap, and state-checking (isEnabled/isDisabled)
 * functionality from BaseButton.
 */
export default class ButtonComponent extends BaseButtonComponent {
    
    constructor(selector: string) {
        super(selector);
    }
}