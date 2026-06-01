import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts as useAlfa, AlfaSlabOne_400Regular } from "@expo-google-fonts/alfa-slab-one";
import { useFonts as useLime, Limelight_400Regular } from "@expo-google-fonts/limelight";
import { useFonts as useSpecial, SpecialElite_400Regular } from "@expo-google-fonts/special-elite";
import { useFonts as usePublic, PublicSans_400Regular, PublicSans_500Medium, PublicSans_700Bold } from "@expo-google-fonts/public-sans";
import { View } from "react-native";
import { theme } from "../theme";

export default function RootLayout() {
  const [alfa] = useAlfa({ AlfaSlabOne_400Regular });
  const [lime] = useLime({ Limelight_400Regular });
  const [special] = useSpecial({ SpecialElite_400Regular });
  const [publicSans] = usePublic({
    PublicSans_400Regular,
    PublicSans_500Medium,
    PublicSans_700Bold,
  });

  const fontsReady = alfa && lime && special && publicSans;

  if (!fontsReady) {
    return <View style={{ flex: 1, backgroundColor: theme.colors.paper }} />;
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor={theme.colors.paper} translucent />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.paper },
          animation: "fade",
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
