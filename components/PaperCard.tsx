import { ReactNode } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
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
 * Cream paper sign with thick ink border + double-layer ink shadow. The
 * shadow is two boxes stacked behind (a hard +3 offset + a soft +6 offset)
 * — gives the "tacked to a corkboard" depth instead of a flat CSS shadow.
 *
 * On press (when onPress is set), the card scales down and the shadow
 * collapses — modern app interaction, vintage paper aesthetic.
 */
export default function PaperCard({ children, onPress, style, tilt = 0 }: Props) {
  const scale = useSharedValue(1);
  const lift = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      ...(tilt ? [{ rotate: `${tilt + lift.value * 0.4}deg` }] : []),
      { translateY: -lift.value },
    ],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.985, { damping: 16, stiffness: 280 });
    lift.value = withSpring(0, { damping: 16, stiffness: 280 });
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 16, stiffness: 280 });
    lift.value = withSpring(0, { damping: 16, stiffness: 280 });
  };

  // Outer hard-shadow layer (offset +6, no blur) gives the paper-tacked look.
  // Inner card has its own shadow for a softer depth — combined they read 3D.
  const inner = (
    <AnimatedView
      style={[
        styles.card,
        tilt && !onPress ? { transform: [{ rotate: `${tilt}deg` }] } : null,
        onPress ? animStyle : null,
      ]}
    >
      <View style={styles.innerBorder}>{children}</View>
    </AnimatedView>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} style={style}>
        {inner}
      </Pressable>
    );
  }
  return <View style={style}>{inner}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.paperDark,
    borderWidth: 2,
    borderColor: theme.colors.ink,
    padding: 6,
    // Two-axis ink shadow for the "paper on a wall" feel
    shadowColor: theme.colors.ink,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 0,
    elevation: 5,
  },
  innerBorder: {
    borderWidth: 1,
    borderColor: theme.colors.inkFaint,
    borderStyle: "dashed",
    padding: 14,
  },
});
