import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor={theme.colors.black} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.black },
          headerTintColor: theme.colors.gold,
          headerTitleStyle: { fontFamily: theme.fonts.display, fontSize: 18 },
          contentStyle: { backgroundColor: theme.colors.black },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" options={{ title: "Edgemere", headerShown: false }} />
        <Stack.Screen name="book" options={{ title: "Book" }} />
        <Stack.Screen name="chat" options={{ title: "Eddie — AI Barber" }} />
        <Stack.Screen name="contact" options={{ title: "Contact" }} />
      </Stack>
    </>
  );
}
