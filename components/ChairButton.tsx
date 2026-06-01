import * as Haptics from "expo-haptics";
import { Platform, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { theme } from "../theme";
import EmbossedText from "./EmbossedText";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "red" | "blue" | "ghost";
  style?: ViewStyle;
};

const AnimatedView = Animated.createAnimatedComponent(View);

/**
 * 3D punch-card CTA. The button has three physical pieces:
 *   1. Outer dark "stamp" — sits 4px down-right, visible only when not pressed
 *   2. Face — the main colored slab with the dashed inner border + label
 *   3. Inset highlight on top edge — a thin lighter rim, "lit from above"
 *
 * On press the face translates DOWN onto the stamp (translateY +4), the
 * inset highlight dims, and the dashed border tightens — all spring-easing.
 * This gives the genuine "pressing a metal stamp" feel rather than the
 * usual web "opacity dim" press feedback.
 */
export default function ChairButton({ label, onPress, variant = "red", style }: Props) {
  const press = useSharedValue(0); // 0 = idle, 1 = pressed

  const faceStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: press.value * 4 },
      { translateX: press.value * 4 },
    ],
  }));

  const highlightStyle = useAnimatedStyle(() => ({
    opacity: 1 - press.value * 0.85,
  }));

  const palette = variantPalette(variant);

  return (
    <Pressable
      onPress={() => {
        if (Platform.OS !== "web") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
        }
        onPress();
      }}
      onPressIn={() => {
        press.value = withSpring(1, { damping: 16, stiffness: 380 });
      }}
      onPressOut={() => {
        press.value = withSpring(0, { damping: 18, stiffness: 360 });
      }}
      style={[style, styles.wrap]}
    >
      {/* Stamp — the dark slab the button sits ON */}
      <View
        style={[styles.stamp, { backgroundColor: palette.stamp, borderColor: palette.stampBorder }]}
      />
      {/* Face — the visible button surface */}
      <AnimatedView
        style={[
          styles.face,
          { backgroundColor: palette.bg, borderColor: palette.border },
          faceStyle,
        ]}
      >
        {/* Top-edge highlight — gives the "lit from above" gloss */}
        <Animated.View style={[styles.highlight, { backgroundColor: palette.highlight }, highlightStyle]} />
        {/* Inner dashed border */}
        <View style={[styles.innerBorder, { borderColor: palette.inner }]}>
          <EmbossedText
            size={14}
            color={palette.text}
            highlight={palette.textHighlight}
            shadow={palette.textShadow}
            letterSpacing={2.5}
            depth={1.2}
          >
            {label}
          </EmbossedText>
        </View>
      </AnimatedView>
    </Pressable>
  );
}

function variantPalette(variant: "red" | "blue" | "ghost") {
  if (variant === "red") {
    return {
      bg: theme.colors.poleRed,
      border: theme.colors.poleRedDark,
      stamp: "#5a1410",
      stampBorder: "#3a0a08",
      inner: "rgba(248,243,227,0.5)",
      highlight: "rgba(255,255,255,0.28)",
      text: theme.colors.poleCream,
      textHighlight: "rgba(255,210,200,0.55)",
      textShadow: "rgba(0,0,0,0.55)",
    };
  }
  if (variant === "blue") {
    return {
      bg: theme.colors.paperDark,
      border: theme.colors.poleBlue,
      stamp: "#0c1f33",
      stampBorder: "#06121e",
      inner: theme.colors.poleBlue,
      highlight: "rgba(255,255,255,0.5)",
      text: theme.colors.poleBlue,
      textHighlight: "rgba(255,255,255,0.6)",
      textShadow: "rgba(0,0,0,0.25)",
    };
  }
  return {
    bg: theme.colors.paper,
    border: theme.colors.ink,
    stamp: theme.colors.ink,
    stampBorder: theme.colors.ink,
    inner: theme.colors.inkFaint,
    highlight: "rgba(255,255,255,0.4)",
    text: theme.colors.ink,
    textHighlight: "rgba(255,255,255,0.5)",
    textShadow: "rgba(0,0,0,0.3)",
  };
}

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
  },
  stamp: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    borderWidth: 2,
  },
  face: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 2,
    position: "relative",
    overflow: "hidden",
  },
  highlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
  },
  innerBorder: {
    borderWidth: 1,
    borderStyle: "dashed",
    paddingVertical: 7,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
