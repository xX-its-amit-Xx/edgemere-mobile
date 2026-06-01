import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

type Props = {
  /** Font size for each half. Default 56. */
  size?: number;
  /** "row" stacks horizontally (EDGEMERE one line); "column" stacks vertically (EDGE / MERE). */
  layout?: "row" | "column";
};

/**
 * EDGE / MERE wordmark — the same letterform treatment as the website Hero:
 * EDGE in white, MERE in gold italic. Display font is Cormorant Garamond.
 */
export default function Wordmark({ size = 56, layout = "column" }: Props) {
  const flexDirection = layout === "row" ? "row" : "column";
  return (
    <View style={[styles.wrap, { flexDirection }]}>
      <Text style={[styles.half, { fontSize: size, color: theme.colors.white }]}>
        EDGE
      </Text>
      <Text
        style={[
          styles.half,
          styles.italic,
          { fontSize: size, color: theme.colors.goldLight },
        ]}
      >
        MERE
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  half: {
    fontFamily: theme.fonts.displayBold,
    lineHeight: undefined,
    letterSpacing: 1,
    includeFontPadding: false,
  },
  italic: {
    fontFamily: theme.fonts.displayBoldItalic,
    fontStyle: "italic",
  },
});
