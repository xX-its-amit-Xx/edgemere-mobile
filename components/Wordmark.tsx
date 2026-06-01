import { StyleSheet, View } from "react-native";
import { theme } from "../theme";
import EmbossedText from "./EmbossedText";

type Props = { size?: number; color?: string };

/**
 * EDGEMERE wordmark — chiseled/engraved 3D treatment via EmbossedText.
 * Dark face with a paperDark highlight above-left and a deep ink shadow
 * below-right. Reads like the wordmark was carved into the cream paper
 * (or pressed in metal type).
 */
export default function Wordmark({ size = 40, color }: Props) {
  return (
    <View style={styles.wrap}>
      <EmbossedText
        size={size}
        color={color ?? theme.colors.ink}
        highlight="rgba(244,236,216,0.85)"
        shadow="rgba(0,0,0,0.55)"
        letterSpacing={2.5}
        depth={Math.max(1.5, size / 26)}
      >
        EDGEMERE
      </EmbossedText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
});
