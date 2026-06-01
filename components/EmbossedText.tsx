import { ReactNode } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { theme } from "../theme";

type Props = {
  children: string;
  /** Font size in px. */
  size: number;
  /** Main face color (the visible top layer). */
  color?: string;
  /** Highlight color — drawn UP-LEFT of the face. Makes it look lit from upper-left. */
  highlight?: string;
  /** Shadow color — drawn DOWN-RIGHT of the face. Makes it look chiseled. */
  shadow?: string;
  /** Depth of the engraving in px. Defaults to ~size/22, capped 1–4. */
  depth?: number;
  fontFamily?: string;
  letterSpacing?: number;
  italic?: boolean;
  style?: TextStyle;
  containerStyle?: ViewStyle;
};

/**
 * Multi-layer 3D text — same letterform painted 3 times at different offsets
 * to give the chiseled/embossed/sign-painter-on-metal feel that flat RN Text
 * can't produce. Cheap (just 3 absolute Texts), works on all platforms (no
 * text-shadow gotchas on Android), and animation-friendly (whole stack moves
 * together when the parent transforms).
 *
 * Use for the big display headlines: EDGEMERE, BARBER, FIND THE SHOP, etc.
 */
export default function EmbossedText({
  children,
  size,
  color = theme.colors.ink,
  highlight = theme.colors.paperDark,
  shadow = "rgba(0,0,0,0.45)",
  depth,
  fontFamily = theme.fonts.display,
  letterSpacing = 2,
  italic = false,
  style,
  containerStyle,
}: Props) {
  const d = depth ?? Math.max(1, Math.min(4, Math.round(size / 22)));

  const baseStyle: TextStyle = {
    fontFamily,
    fontSize: size,
    letterSpacing,
    fontStyle: italic ? "italic" : "normal",
    lineHeight: size * 1.04,
    includeFontPadding: false,
    textAlign: "center",
    ...style,
  };

  return (
    <View style={[styles.wrap, containerStyle]}>
      {/* Deep shadow — drawn first, sits at the back, offset down-right */}
      <Text style={[baseStyle, styles.layer, { color: shadow, top: d * 1.5, left: d * 1.5 }]}>
        {children}
      </Text>
      {/* Highlight — offset up-left, gives the lit-from-upper-left feel */}
      <Text style={[baseStyle, styles.layer, { color: highlight, top: -d * 0.6, left: -d * 0.6 }]}>
        {children}
      </Text>
      {/* Face — drawn last, on top */}
      <Text style={[baseStyle, { color }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  layer: {
    position: "absolute",
  },
});
