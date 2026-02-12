import { driver } from '@wdio/globals';
import { config as baseConfig } from './shared.conf.js';

export const config: WebdriverIO.Config = {
    ...baseConfig,

    services: [
        ...baseConfig.services || [],
        [
            'appium',
            {
                args: {
                    relaxedSecurity: true,
                    log: './logs/appium.log',
                },
            },
        ],
    ],
    before: async () => {
        if (driver.isAndroid) {
            await driver.updateSettings({
                waitForSelectorTimeout: 3 * 1000 // 3 seconds
            });
        }
    },
    capabilities: []
};
