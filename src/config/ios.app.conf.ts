import { config as baseConfig } from './shared.local.appium.conf';
import { getAppiumCapabilities } from '../utils/configUtils';

// npm run ios.app --app=app.ipa --device="iPhone_15" --platformVersion=17.2 --orientation=PORTRAIT
export const config: WebdriverIO.Config = {
    ...baseConfig,

    capabilities: [getAppiumCapabilities('iOS')],
};
