export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Utility function to combine element location and size into a single Rect object.
 */
export async function getElementRect(element: WebdriverIO.Element): Promise<Rect> {
    const location = await element.getLocation();
    const size = await element.getSize();

    return {
        x: location.x,
        y: location.y,
        width: size.width,
        height: size.height,
    };
}