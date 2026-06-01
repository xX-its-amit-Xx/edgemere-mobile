import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

type Props = { size?: number; color?: string };

/**
 * EDGEMERE wordmark — single chunky line in Alfa Slab One. Replaces the
 * earlier EDGE/MERE split-color treatment which felt editorial / SaaS-y.
 * This is the painted-on-the-window version.
 */
export default function Wordmark({ size = 40, color }: Props) {
  return (
    <View style={styles.wrap}>
      <Text
        style={[
          styles.word,
          { fontSize: size, color: color ?? theme.colors.ink, lineHeight: size * 1.05 },
        ]}
      >
        EDGEMERE
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center" },
  word: {
    fontFamily: theme.fonts.display,
    letterSpacing: 2,
    textAlign: "center",
    includeFontPadding: false,
  },
});
