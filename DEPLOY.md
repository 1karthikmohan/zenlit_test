# Zenlit Mobile App Deployment Guide

This guide outlines the steps to build, test, and deploy the Zenlit Next.js PWA as a native mobile application using Capacitor.

## 🚀 Getting Started

Before you begin, ensure you have:
- Node.js (v18 or higher) and npm installed
- Xcode (for iOS development) and Android Studio (for Android development) installed
- Java Development Kit (JDK) for Android development
- Your system configured for Android and iOS development (e.g., Android SDK, environment variables)

## 🛠 Local Development & Testing

### 1. Install Dependencies

First, install all project dependencies, including Capacitor:

```bash
npm install
```

### 2. Initialize Capacitor (First Time Only)

If you haven't already, initialize Capacitor and add the native platforms. This will create the `android/` and `ios/` folders.

```bash
npm run cap:init
npm run cap:add-android
npm run cap:add-ios
```

Or run the commands directly:

```bash
npx cap init Zenlit com.zenlit.social
npx cap add android
npx cap add ios
```

### 3. Generate Native Assets (Icons & Splash Screens)

Ensure you have `public/icon-512x512.png` as your base icon.
Generate the native assets:

```bash
npm run cap:generate-assets
```

Or run directly:

```bash
npx @capacitor/resources generate --icon public/icon-512x512.png --splash public/apple-splash-2048-2732.png
```

*Note: If you have other specific splash screen images, you might need to manually place them in the respective platform folders.*

### 4. Build and Copy Web Assets to Native Projects

This command will:
- Build your Next.js application for production
- Export the static files to the `out/` directory
- Copy these static files into the native projects

```bash
npm run build:cap
```

### 5. Open Native Projects in IDEs

To work with the native projects, open them in their respective IDEs:

**Android Studio:**
```bash
npm run cap:open-android
```

**Xcode (for iOS):**
```bash
npm run cap:open-ios
```

### 6. Run on Device/Emulator with Live Reload

For development, you can run the app on a device or emulator with live reload enabled:

**Android:**
```bash
npm run cap:run-android
```

**iOS:**
```bash
npm run cap:run-ios
```

*Note: For live reload to work, ensure your development server is accessible from your device/emulator.*

## 📦 App Store Readiness

Before submitting to app stores, ensure the following configurations are in place:

### iOS Configuration (`ios/App/App/Info.plist`)

Open `Info.plist` in Xcode and verify/add:

- **Bundle Identifier**: `com.zenlit.social`
- **Bundle Name**: `Zenlit`
- **Privacy Usage Descriptions**: Add entries for permissions your app uses:
  ```xml
  <key>NSLocationWhenInUseUsageDescription</key>
  <string>Zenlit needs access to your location to find nearby users.</string>
  <key>NSCameraUsageDescription</key>
  <string>Zenlit needs camera access to allow you to take photos for posts.</string>
  <key>NSPhotoLibraryUsageDescription</key>
  <string>Zenlit needs access to your photo library to select images for posts.</string>
  ```

### Android Configuration (`android/app/src/main/AndroidManifest.xml`)

Open `AndroidManifest.xml` in Android Studio and verify/add:

- **Package Name**: The `package` attribute should be `com.zenlit.social`
- **Application Label**: The `android:label` should be `Zenlit`
- **Permissions**: Add necessary permissions within the `<manifest>` tag:
  ```xml
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.CAMERA" />
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  ```

### Privacy Policy & Terms of Service

Ensure your `public/policy.html` and `public/terms.html` files contain your actual, complete Privacy Policy and Terms of Service. These URLs will be required during app store submission.

## 🚀 Generating Signed Builds for Submission

### Android

1. **Generate a Signed APK/App Bundle**:
   - Open your Android project in Android Studio (`npm run cap:open-android`)
   - Go to `Build` > `Generate Signed Bundle / APK...`
   - Select `Android App Bundle` (recommended for Play Store)
   - Create a new Key Store if you don't have one, or use an existing one
   - **Keep your keystore file and password safe!**
   - Follow the prompts to generate the signed build

### iOS

1. **Configure Signing & Capabilities**:
   - Open your iOS project in Xcode (`npm run cap:open-ios`)
   - Select your project in the Project Navigator
   - Go to the `Signing & Capabilities` tab
   - Select your Team and ensure "Automatically manage signing" is checked
   - Add any required capabilities if your app uses them

2. **Archive for Distribution**:
   - Select `Any iOS Device (arm64)` as the target device
   - Go to `Product` > `Archive`
   - Once complete, the Organizer window will appear
   - Select your archive and click `Distribute App`
   - Choose `App Store Connect` and follow the prompts

## 🔧 Development Workflow

### Making Changes

1. **Update your Next.js code** as usual
2. **Build and sync** with native projects:
   ```bash
   npm run build:cap
   npm run cap:sync
   ```
3. **Test on device/emulator**:
   ```bash
   npm run cap:run-android
   # or
   npm run cap:run-ios
   ```

### Debugging

- **Android**: Use Chrome DevTools by navigating to `chrome://inspect` while your app is running
- **iOS**: Use Safari Web Inspector by enabling it in Safari's Develop menu

## ✅ App Store Submission Checklist

Before submitting your app, ensure you have:

### App Information
- [ ] App Name: Zenlit
- [ ] Short Description (Android) / Subtitle (iOS)
- [ ] Full Description
- [ ] Category: Social Networking
- [ ] Support URL
- [ ] Privacy Policy URL: `https://yourdomain.com/policy.html`
- [ ] Terms of Service URL: `https://yourdomain.com/terms.html`

### Visual Assets
- [ ] App Icon (high-resolution, platform-specific sizes)
- [ ] Screenshots (for various device sizes and orientations)
- [ ] Feature Graphic (Android) / Promotional Image (iOS)
- [ ] Promotional Video (optional)

### Builds
- [ ] Signed Android App Bundle (`.aab`) or APK (`.apk`)
- [ ] Signed iOS App Store Package (`.ipa`)

### Metadata
- [ ] Content Rating / Age Rating
- [ ] Pricing and Distribution (Android) / Price Tier (iOS)
- [ ] Availability (countries/regions)

### Testing
- [ ] Thoroughly tested on various devices and OS versions
- [ ] No crashes or major bugs
- [ ] All features work as expected
- [ ] Location services work properly
- [ ] Camera and photo selection work
- [ ] Social media verification flows work

### Legal
- [ ] Compliance with Google Play Store and Apple App Store policies
- [ ] Complete and accurate Privacy Policy
- [ ] Complete and accurate Terms of Service
- [ ] Proper handling of user data and permissions

### Developer Accounts
- [ ] Active Google Play Developer Account ($25 one-time fee)
- [ ] Active Apple Developer Program membership ($99/year)

## 🔍 Troubleshooting

### Common Issues

**Build Errors:**
- Ensure all dependencies are installed: `npm install`
- Clear Next.js cache: `rm -rf .next out`
- Rebuild: `npm run build:cap`

**Live Reload Not Working:**
- Check that your development server is accessible from your device
- Ensure both device and computer are on the same network
- Try using your computer's IP address instead of localhost

**Permission Errors:**
- Verify all required permissions are declared in native manifests
- Test permission requests on actual devices, not just emulators

**Asset Generation Issues:**
- Ensure `public/icon-512x512.png` exists and is a valid PNG file
- Check that splash screen images exist in the public folder
- Manually copy assets to native folders if automatic generation fails

## 📱 Platform-Specific Notes

### Android
- Minimum SDK version: 22 (Android 5.1)
- Target SDK version: 34 (Android 14)
- Requires signing with a keystore for Play Store submission

### iOS
- Minimum iOS version: 13.0
- Requires Apple Developer account for device testing and App Store submission
- Must be built on macOS with Xcode

## 🎯 Next Steps

1. **Complete the setup** by running the initialization commands
2. **Test thoroughly** on both platforms
3. **Replace placeholder content** in policy.html and terms.html
4. **Generate signed builds** for app store submission
5. **Submit to app stores** following their respective guidelines

Good luck with your app submission! 🚀