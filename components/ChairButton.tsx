import * as Haptics from "expo-haptics";
import { Platform, Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { theme } from "../theme";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "red" | "blue" | "ghost";
  style?: ViewStyle;
};

const AnimatedView = Animated.createAnimatedComponent(View);

/**
 * Punch-card style CTA button. Square corners, double-line border (outer +
 * dashed inner), heavy ink drop-shadow. Spring-scale + haptic on press.
 * Vintage paper look on the outside; modern app feel on the touch interaction.
 */
export default function ChairButton({ label, onPress, variant = "red", style }: Props) {
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0.22);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: shadowOpacity.value,
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
        scale.value = withSpring(0.95, { damping: 14, stiffness: 320 });
        shadowOpacity.value = withTiming(0.08, { duration: 90 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 14, stiffness: 320 });
        shadowOpacity.value = withTiming(0.22, { duration: 140 });
      }}
      style={[style]}
    >
      <AnimatedView
        style={[
          styles.outer,
          { backgroundColor: palette.bg, borderColor: palette.border },
          animStyle,
        ]}
      >
        <View style={[styles.innerBorder, { borderColor: palette.inner }]}>
          <Text style={[styles.label, { color: palette.text }]}>{label}</Text>
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
      inner: "rgba(248,243,227,0.5)",
      text: theme.colors.poleCream,
    };
  }
  if (variant === "blue") {
    return {
      bg: theme.colors.paperDark,
      border: theme.colors.poleBlue,
      inner: theme.colors.poleBlue,
      text: theme.colors.poleBlue,
    };
  }
  return {
    bg: theme.colors.paper,
    border: theme.colors.ink,
    inner: theme.colors.inkFaint,
    text: theme.colors.ink,
  };
}

const styles = StyleSheet.create({
  outer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 0,
    elevation: 5,
  },
  innerBorder: {
    borderWidth: 1,
    borderStyle: "dashed",
    paddingVertical: 7,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  label: {
    fontFamily: theme.fonts.display,
    fontSize: 14,
    letterSpacing: 2.5,
  },
});
