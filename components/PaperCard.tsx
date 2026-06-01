import { ReactNode } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { theme } from "../theme";

type Props = {
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  /** Slight rotation in degrees — gives the "tacked to the wall" feel. */
  tilt?: number;
};

const AnimatedView = Animated.createAnimatedComponent(View);

/**
 * 3D PaperCard. Three layers:
 *   1. Soft shadow — far back, +14px down with blur, gives ambient lift
 *   2. Hard stamp shadow — +5px down-right offset, gives the "tacked up" hard edge
 *   3. Face — the cream card with dashed inner border + a thin top highlight
 *      so the paper edge catches light from above
 *
 * On press: face scales 0.97, soft shadow collapses, hard shadow tightens
 * to +2. The card visibly "settles" into the surface rather than just
 * shrinking.
 */
export default function PaperCard({ children, onPress, style, tilt = 0 }: Props) {
  const press = useSharedValue(0);

  const faceStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: 1 - press.value * 0.025 },
      ...(tilt ? [{ rotate: `${tilt}deg` }] : []),
      { translateY: press.value * 2 },
    ],
  }));

  const softStyle = useAnimatedStyle(() => ({
    opacity: 0.18 - press.value * 0.12,
    transform: [{ translateY: 14 - press.value * 10 }],
  }));

  const hardStyle = useAnimatedStyle(() => ({
    opacity: 1 - press.value * 0.4,
    transform: [
      { translateY: 5 - press.value * 3 },
      { translateX: 5 - press.value * 3 },
    ],
  }));

  const inner = (
    <View style={styles.layoutWrap}>
      {/* Soft ambient shadow — far back */}
      <AnimatedView style={[styles.softShadow, softStyle, tilt ? { transform: [{ rotate: `${tilt}deg` }] } : null]} />
      {/* Hard stamp shadow — gives the "paper tacked to wood" feel */}
      <AnimatedView style={[styles.hardShadow, hardStyle, tilt ? { transform: [{ rotate: `${tilt}deg` }] } : null]} />
      {/* Face */}
      <AnimatedView style={[styles.face, faceStyle]}>
        {/* Top highlight rim — catches "light from above" */}
        <View style={styles.faceHighlight} pointerEvents="none" />
        <View style={styles.innerBorder}>{children}</View>
      </AnimatedView>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          press.value = withSpring(1, { damping: 18, stiffness: 320 });
        }}
        onPressOut={() => {
          press.value = withSpring(0, { damping: 18, stiffness: 320 });
        }}
        style={style}
      >
        {inner}
      </Pressable>
    );
  }
  return <View style={style}>{inner}</View>;
}

const styles = StyleSheet.create({
  layoutWrap: {
    position: "relative",
  },
  softShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.ink,
    opacity: 0.18,
    // Mimic blur via larger extent (RN doesn't have free blur on shadow color)
  },
  hardShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.ink,
  },
  face: {
    backgroundColor: theme.colors.paperDark,
    borderWidth: 2,
    borderColor: theme.colors.ink,
    padding: 6,
    position: "relative",
    overflow: "hidden",
  },
  faceHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "rgba(255,250,235,0.4)",
  },
  innerBorder: {
    borderWidth: 1,
    borderColor: theme.colors.inkFaint,
    borderStyle: "dashed",
    padding: 14,
  },
});
