import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts as useCormorant, CormorantGaramond_400Regular, CormorantGaramond_400Regular_Italic, CormorantGaramond_700Bold, CormorantGaramond_700Bold_Italic } from "@expo-google-fonts/cormorant-garamond";
import { useFonts as useJakarta, PlusJakartaSans_400Regular, PlusJakartaSans_500Medium, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold } from "@expo-google-fonts/plus-jakarta-sans";
import { View } from "react-native";
import { theme } from "../theme";

export default function RootLayout() {
  const [cormorantLoaded] = useCormorant({
    CormorantGaramond_400Regular,
    CormorantGaramond_400Regular_Italic,
    CormorantGaramond_700Bold,
    CormorantGaramond_700Bold_Italic,
  });
  const [jakartaLoaded] = useJakarta({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  const fontsReady = cormorantLoaded && jakartaLoaded;

  // Hold the splash (solid brand-black) until both font families are
  // hydrated — prevents an ugly system-font flash on first render.
  if (!fontsReady) {
    return <View style={{ flex: 1, backgroundColor: theme.colors.black }} />;
  }

  return (
    <>
      <StatusBar style="light" backgroundColor={theme.colors.black} translucent />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.black },
          headerTintColor: theme.colors.gold,
          headerTitleStyle: { fontFamily: theme.fonts.displayBold, fontSize: 19 },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.colors.black },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="book" options={{ title: "Book a Cut" }} />
        <Stack.Screen name="chat" options={{ title: "Eddie" }} />
        <Stack.Screen name="contact" options={{ title: "Contact" }} />
      </Stack>
    </>
  );
}
