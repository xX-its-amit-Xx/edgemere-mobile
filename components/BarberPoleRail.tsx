import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { theme } from "../theme";

type Props = {
  /** Total height of the rail. */
  height?: number;
  /** Width of the stripe. Default 10px. */
  width?: number;
  /** Render the cylindrical "brass caps" at top and bottom. */
  caps?: boolean;
};

/**
 * Vertical barber pole — diagonal red/white/blue stripes that scroll upward
 * forever, like a real spinning pole. Renders as a stacked pattern of
 * diagonal stripes via a doubled, animated translation.
 */
export default function BarberPoleRail({
  height = 360,
  width = 12,
  caps = true,
}: Props) {
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-stripeUnit, { duration: 1800, easing: Easing.linear }),
      -1,
      false,
    );
  }, [offset]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const capH = caps ? 14 : 0;
  const inner = height - capH * 2;
  // Number of stripe-units we need so the doubled track can scroll seamlessly.
  const units = Math.ceil(inner / stripeUnit) + 2;

  return (
    <View style={[styles.outer, { width: width + 6, height }]}>
      {caps && <View style={[styles.cap, { width: width + 6, height: capH }]} />}
      <View style={[styles.tube, { width, height: inner }]}>
        <Animated.View style={[styles.track, animatedStyle]}>
          {Array.from({ length: units * 2 }).map((_, i) => (
            <Stripe key={i} index={i} width={width} />
          ))}
        </Animated.View>
      </View>
      {caps && <View style={[styles.cap, { width: width + 6, height: capH }]} />}
    </View>
  );
}

const stripeHeight = 16;
const stripeUnit = stripeHeight * 3; // red + white + blue triplet

function Stripe({ index, width }: { index: number; width: number }) {
  const colors = [theme.colors.poleRed, theme.colors.poleCream, theme.colors.poleBlue];
  const color = colors[index % 3];
  return (
    <View
      style={{
        width,
        height: stripeHeight,
        backgroundColor: color,
        transform: [{ skewY: "-25deg" }],
      }}
    />
  );
}

const styles = StyleSheet.create({
  outer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  cap: {
    backgroundColor: theme.colors.brass,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: theme.colors.ink,
  },
  tube: {
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: theme.colors.ink,
    backgroundColor: theme.colors.poleCream,
  },
  track: {
    width: "100%",
  },
});
