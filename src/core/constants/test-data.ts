import { TestData } from '../interfaces/TestData';
import { TEST_DATA as STAGING_TEST_DATA } from './test-data.staging';



const env = process.env.APP_ENV || 'staging';

let environmentTestData: TestData;

switch (env.toLocaleLowerCase()) {
    case 'staging':
        environmentTestData = STAGING_TEST_DATA;
        break;

    default:
        console.warn(`
        Unknown environment: ${env}. Falling back to development data.
        To use a different environment, set the APP_ENV environment variable.
        Example: APP_ENV=staging npm run android.app -- ...
        `);
        environmentTestData = STAGING_TEST_DATA;
}

export const TEST_DATA = environmentTestData;