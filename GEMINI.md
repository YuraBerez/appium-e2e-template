# GEMINI.md

## Project Overview

This repository contains the end-to-end (E2E) test suite for the Unimeal mobile application. The tests are built with WebdriverIO, a test automation framework, and Appium for interacting with native mobile applications. The project uses TypeScript for code quality and maintainability.

The primary goal of this project is to automate critical user flows and functionalities for both Android and iOS platforms to ensure the quality and stability of the Unimeal app.

The project follows the Page Object Model (POM) pattern, with screens and components separated into their own directories. This makes the tests more readable, maintainable, and reusable.

## Building and Running

### Installation

To install the project dependencies, run the following command:

```bash
npm install
```

### Running Tests

The tests can be run on Android or iOS devices/emulators. The general command structure is as follows:

```bash
npm run <platform>.app -- --app=<path_to_app> --device=<device_name> --platformVersion=<version> --orientation=<orientation>
```

-   `<platform>`: `android` or `ios`
-   `--app`: Path to the `.apk` or `.ipa` file.
-   `--device`: Name of the device or emulator.
-   `--platformVersion`: The platform version of the device or emulator.
-   `--orientation`: `PORTRAIT` or `LANDSCAPE`.

**Running Android Tests:**

```bash
npm run android.app -- --app=path/to/your/unimeal.apk --device="Pixel_8_Pro_Android_15_API_35" --platformVersion=15.0 --orientation=PORTRAIT
```

**Running iOS Tests:**

```bash
npm run ios.app -- --app=path/to/your/unimeal.ipa --device="iPhone 15 Pro" --platformVersion=17.0 --orientation=PORTRAIT
```

### Advanced Configuration

**Using a Local Appium Server:**

To use a local Appium server instead of the one managed by WebdriverIO, set the `USE_LOCAL_APPIUM` environment variable to `true`:

```bash
USE_LOCAL_APPIUM=true npm run android.app -- --app=unimeal.apk
```

**Environment Variables:**

-   `APPIUM_PORT`: Port for the local Appium server (default: `4723`).
-   `DEFAULT_WAIT_FOR_TIMEOUT`: Default timeout for element waits (default: `30000` ms).
-   `APP_BUILD_PATH`: Default path to the application binary.
-   `VIEW_REPORT`: Set to `true` to automatically open the test report after a test run.

## Development Conventions

### Test Structure

-   **`src/tests/`**: Contains the test spec files (e.g., `WelcomeScreen.test.ts`).
-   **`src/core/screens/`**: Contains screen object definitions, representing different screens of the application.
-   **`src/core/components/`**: Contains reusable component object definitions.
-   **`src/config/`**: Contains WebdriverIO configuration files for different platforms and environments.

### Coding Style

The project uses TypeScript and follows standard coding conventions. The code is organized into modules and classes, and the Page Object Model is used to separate test logic from UI interaction.

### Testing Practices

-   Tests are written using the Mocha framework.
-   Assertions are made using the `expect` library from WebdriverIO.
-   Each test should be independent and not rely on the state of previous tests. The `beforeEach` hook is used to reset the application state before each test.
