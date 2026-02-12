import type { Options } from '@wdio/types';

export const config: Options.Testrunner = {

    specs: ['../tests/**/*.test.ts'],

    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'debug',

    bail: 0,
   
    baseUrl: 'http://the-internet.herokuapp.com',
    
    waitforTimeout: 45000, // 45 seconds
   
    connectionRetryTimeout: 120000, // 2 minutes
    
    // Default request retries count
    connectionRetryCount: 3,
    
    services: [],

    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    framework: 'mocha',
    
    reporters: ['spec'],
    // Options to be passed to Mocha.
    mochaOpts: {
        ui: 'bdd',
        timeout: 3 * 60 * 1000, // 3min
    },
};
