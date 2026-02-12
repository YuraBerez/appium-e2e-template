import BaseSwipeableComponent from "../base/BaseSwipeableComponent";
import { SLIDER_SLIDE_TEXT_SELECTOR } from "../selectors/slider-ids";
import TextComponent from "./TextComponent";

/**
 * Represents a specific horizontal slider/carousel component, which is assumed to have 4 slides.
 * It uses the gesture capability from SwipeableComponent.
 */
export default class SliderComponent extends BaseSwipeableComponent {

    constructor(selector: string) {
        super(selector);
    }

    /**
     * Retrieves the text from the current slide.
     * Assumes each slide has a common text selector within the slider component.
     */
    async getCurrentSlideText(): Promise<string> {
        const slideText = new TextComponent(`${this.selector} ${SLIDER_SLIDE_TEXT_SELECTOR}`);
        return slideText.getText();
    }
}