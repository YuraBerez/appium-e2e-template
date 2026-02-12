# Appium E2E Tests Template

## Project Overview
This repository houses the end-to-end (E2E) test suite for the Mobile application. It is built using WebdriverIO, a powerful test automation framework, in conjunction with Appium for interacting with native mobile applications. The tests are designed to cover critical user flows and functionalities across both Android and iOS platforms, ensuring a high level of quality and stability for the Unimeal app.

**Key Technologies:**
*   **WebdriverIO**: The primary test automation framework.
*   **Appium**: Used for automating native, hybrid, and mobile web applications.
*   **TypeScript**: Enhances code quality and maintainability through static typing.

## Project Setup

To set up the project locally, follow these steps:

### Prerequisites

*   **Node.js**: Ensure you have Node.js (LTS version recommended) and npm installed.
*   **Appium**: Appium is managed as a WebdriverIO service in this project, so you generally don't need to install it globally. However, ensure all necessary Appium drivers are installed if you are running tests against a specific platform (e.g., `uiautomator2` for Android, `xcuitest` for iOS).
*   **Android SDK / Xcode**:
    *   For Android testing, you need the Android SDK installed with appropriate platform tools and desired Android versions. Set up `ANDROID_HOME` environment variable.
    *   For iOS testing, you need Xcode installed on a macOS machine.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yuraberez/appium-e2e-template.git
    cd appium-e2e-template
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Running Tests

Tests can be run against Android or iOS devices/emulators.

### General Command Structure

The primary way to run tests is using `npm run <platform>.app` with additional arguments for the app, device, platform version, and orientation.

*   `<platform>` can be `android` or `ios`.
*   `--app=<path_to_apk_or_ipa>`: Specifies the path to your application file (e.g., `your_app.apk` or `your_app.ipa`).
*   `--device=<device_name>`: Specifies the name of the device or emulator (e.g., `Pixel_8_Pro_Android_15_API_35` for Android, `iPhone 15 Pro` for iOS).
*   `--platformVersion=<version>`: Specifies the platform version (e.g., `15.0`).
*   `--orientation=<orientation>`: Specifies the device orientation (e.g., `PORTRAIT`, `LANDSCAPE`).

### Running Android Tests

To run tests on an Android emulator or device:

```bash
npm run android.app -- --app=path/to/your/app.apk --device="Pixel_8_Pro_Android_15_API_35" --platformVersion=15.0 --orientation=PORTRAIT
```

**Example:**
Assuming `app.apk` is in the project root:
```bash
npm run android.app -- --app=app.apk --device="Pixel_8_Pro_Android_15_API_35" --platformVersion=15.0 --orientation=PORTRAIT
```

### Running iOS Tests

To run tests on an iOS simulator or device:

```bash
npm run ios.app -- --app=path/to/your/app.ipa --device="iPhone 15 Pro" --platformVersion=17.0 --orientation=PORTRAIT
```

**Example:**
Assuming `app.ipa` is in the project root:
```bash
npm run ios.app -- --app=app.ipa --device="iPhone 15 Pro" --platformVersion=17.0 --orientation=PORTRAIT
```

## Advanced Configuration

### Using Local Appium Server
By default, tests are configured to use an Appium server managed by WebdriverIO. If you need to connect to a locally running Appium server (e.g., for debugging or specific setups), you can enable it by setting the `USE_LOCAL_APPIUM` environment variable to `true`:

```bash
USE_LOCAL_APPIUM=true npm run android.app -- --app=your_app.apk ...
```

When `USE_LOCAL_APPIUM` is true, the tests will attempt to connect to an Appium server running at `http://localhost:4723`.

### Environment Variables
You can customize test behavior using various environment variables:

*   `APPIUM_PORT`: Specifies the port for the Appium server if `USE_LOCAL_APPIUM` is enabled (default: `4723`).
*   `DEFAULT_WAIT_FOR_TIMEOUT`: Adjusts the default timeout for element waits (default: `30000` ms).
*   `APP_BUILD_PATH`: Overrides the `--app` argument if set, providing a default path to the application binary.
*   `VIEW_REPORT`: Set to `true` to automatically open the test report after a test run.

## Test Structure

*   **`src/tests/`**: Contains the test spec files (e.g., `WelcomeScreen.test.ts`).
*   **`src/core/screens/`**: Contains screen object definitions, representing different screens of the application.
*   **`src/core/components/`**: Contains reusable component object definitions.
*   **`src/config/`**: Contains WebdriverIO configuration files for different platforms and environments.
