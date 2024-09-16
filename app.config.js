import 'dotenv/config';

export default {
  expo: {
    name: "Coastbird",
    slug: "coastbird",
    version: "1.0.0",
    orientation: "portrait",
    extra: {
      GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY,
      WEATHER_API_KEY: process.env.WEATHER_API_KEY,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY
    },
    platforms: ["ios", "android"],
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    }
  }
}
