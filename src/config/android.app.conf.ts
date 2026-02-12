import { config as baseConfig } from './shared.local.appium.conf';
import { getAppiumCapabilities } from '../utils/configUtils';

// npm run android.app --app=app.apk --device=Pixel_8_Pro_Android_15_API_35 --platformVersion=15.0 --orientation=PORTRAIT 

export const config: WebdriverIO.Config = {
    ...baseConfig,

    capabilities: [getAppiumCapabilities('Android')],
};
