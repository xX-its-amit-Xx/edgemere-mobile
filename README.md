# Edgemere Mobile

iOS + Android companion app for [Edgemere Barber Shop](https://edgemerebarbershop.com) (Shrewsbury, MA). Built with Expo Router + React Native. Talks to the website's deployed `/api/chat` for the AI barber (Eddie), and deep-links to Booksy for booking.

Part of [Route Nine Web Co](https://github.com/xX-its-amit-Xx/route_9_web_co).

## What's in this scaffold

| Screen | File | Purpose |
| --- | --- | --- |
| Home | `app/index.tsx` | Hero + live wait-time badge + quick actions |
| Book | `app/book.tsx` | Live status, three barber cards (Booksy deep-links), call CTA |
| Chat | `app/chat.tsx` | Eddie (Groq llama-3.3-70b) via the website's `/api/chat` |
| Contact | `app/contact.tsx` | Call, Google/Apple Maps, hours, social |

Shared logic:
- `theme.ts` — design tokens that mirror the website's CSS vars (`--gold`, `--black`, etc.) + barber roster + Booksy URLs
- `lib/status.ts` — local copy of `BUSY_SCHEDULE` and Eastern-Time-aware `getLiveStatus()` so the app shows live status offline

## First-time setup

```bash
cd edgemere-mobile
npm install
```

Expo will ask you to install platform tools the first time you run `npm run ios` / `npm run android`.

### Required assets (placeholders not included)

The scaffold references `assets/icon.png`, `assets/splash.png`, `assets/adaptive-icon.png`, `assets/favicon.png`. Drop in 1024×1024 PNGs (icon), 1242×2436 PNG (splash) — use the same gold-on-black barber clipart as the website's `BarberAvatar` for consistency. Until you do, `expo prebuild` will warn.

## Development

```bash
npm start          # Metro bundler + QR code for Expo Go
npm run ios        # iOS simulator (Mac only)
npm run android    # Android emulator / device
npm run web        # Web preview
```

## Production builds

Cloud-built via EAS (no local Xcode/Android Studio required):

```bash
npx eas login                # one-time
npx eas project:init         # one-time, creates the project on Expo's side
npm run build:ios            # eas build --platform ios
npm run build:android        # eas build --platform android
```

You'll need:
- **Apple Developer account** ($99/yr) for iOS App Store submission
- **Google Play Developer account** ($25 one-time) for Android Play Store submission

## App Store / Play Store submission

```bash
npm run submit:ios
npm run submit:android
```

EAS handles the signing, builds, and upload — you provide credentials.

## Architecture notes

- **No backend of its own.** The app calls the deployed website's `/api/chat` and `/api/waitlist` endpoints. Single source of truth for shop content, barber data, and AI knowledge.
- **Offline tolerance.** Hours, address, phone, and busy-schedule are bundled in-app (`lib/status.ts`, `theme.ts`) so the Home and Book screens work without network. Chat requires network.
- **No streaming on RN.** React Native's `fetch` doesn't expose `ReadableStream`; the chat screen reads the full response when Groq finishes. To get token-by-token streaming, swap in a polyfill (`react-native-fetch-api` or similar) — left as a future improvement.
- **Bundle ID.** `com.route9web.edgemere` (both platforms). Change in `app.json` before first build if you want a different namespace.
- **Push notifications.** Not wired yet. To enable appointment reminders: add `expo-notifications`, request permissions on first launch, and POST device tokens to a new `/api/push/register` endpoint on the website.

## Deep-link scheme

`edgemere://` is registered. Useful if the website's footer later adds "Open in app" buttons.
