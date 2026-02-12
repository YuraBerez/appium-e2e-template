import { getArgValue } from './cliArgs';
import { join } from 'node:path';

export function getAppiumCapabilities(platform: 'Android' | 'iOS') {
    if (platform === 'Android') {
        const appName = getArgValue('app', 'app.apk');
        const deviceName = getArgValue('device', 'Pixel_8_Pro_Android_15_API_35');
        const platformVersion = getArgValue('platformVersion', '15.0');
        const orientation = getArgValue('orientation', 'PORTRAIT');

        return {
            platformName: 'Android',
            'wdio:maxInstances': 1,
            'appium:deviceName': deviceName,
            'appium:platformVersion': platformVersion,
            'appium:orientation': orientation,
            'appium:automationName': 'UiAutomator2',
            'appium:app': join(process.cwd(), 'apps', appName),
            'appium:newCommandTimeout': 240,
        };
    } else {
        const appName = getArgValue('app', 'app.ipa');
        const deviceName = getArgValue('device', 'iPhone_15');
        const platformVersion = getArgValue('platformVersion', '17.2');
        const orientation = getArgValue('orientation', 'PORTRAIT');

        return {
            platformName: 'iOS',
            'wdio:maxInstances': 1,
            'appium:deviceName': deviceName,
            'appium:platformVersion': platformVersion,
            'appium:orientation': orientation,
            'appium:automationName': 'XCUITest',
            'appium:app': join(process.cwd(), 'apps', appName),
            'appium:newCommandTimeout': 240,
        };
    }
}
