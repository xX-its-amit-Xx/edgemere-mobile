import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { theme } from "../theme";
import { LiveStatus } from "../lib/status";

/**
 * Live OPEN/CLOSED pill — mirrors the website OpenStatus component.
 * On "open" the badge breathes (scale 1 → 1.025 → 1, 3.5s loop) and the
 * green dot pulses with a softer ring. On "closed" the dot blinks slowly.
 */
export default function StatusPill({ status }: { status: LiveStatus }) {
  const breathe = useSharedValue(1);
  const blink = useSharedValue(1);

  useEffect(() => {
    if (status.open) {
      breathe.value = withRepeat(
        withSequence(
          withTiming(1.025, { duration: 1750, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1750, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
    } else {
      blink.value = withRepeat(
        withSequence(
          withTiming(0.3, { duration: 1100, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1100, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
    }
  }, [status.open, breathe, blink]);

  const wrapStyle = useAnimatedStyle(() => ({
    transform: [{ scale: breathe.value }],
  }));
  const dotStyle = useAnimatedStyle(() => ({ opacity: blink.value }));

  const color = status.open ? theme.colors.success : theme.colors.danger;
  const colorFaint = status.open ? "rgba(34,197,94," : "rgba(248,113,113,";

  return (
    <Animated.View style={[wrapStyle, styles.outer]}>
      <View
        style={[
          styles.pill,
          {
            borderLeftColor: color,
            backgroundColor: `${colorFaint}0.08)`,
            borderTopColor: `${colorFaint}0.5)`,
            borderRightColor: `${colorFaint}0.18)`,
            borderBottomColor: `${colorFaint}0.1)`,
          },
        ]}
      >
        <View style={styles.dotCol}>
          <Animated.View
            style={[
              styles.dot,
              { backgroundColor: color, shadowColor: color },
              !status.open && dotStyle,
            ]}
          />
          <Text style={[styles.badge, { color }]}>
            {status.open ? "OPEN" : "CLOSED"}
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: `${colorFaint}0.2)` }]} />

        <View style={styles.textCol}>
          <Text style={styles.label}>{status.label}</Text>
          {status.open && status.wait ? (
            <Text style={styles.wait}>{status.wait}</Text>
          ) : null}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  outer: {
    alignSelf: "stretch",
    alignItems: "stretch",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 2,
    borderLeftWidth: 3,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 18,
    gap: 14,
  },
  dotCol: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  badge: {
    fontFamily: theme.fonts.bodyExtraBold,
    fontSize: 11,
    letterSpacing: 2.5,
  },
  divider: {
    width: 1,
    alignSelf: "stretch",
    marginHorizontal: 4,
  },
  textCol: {
    flex: 1,
  },
  label: {
    fontFamily: theme.fonts.body,
    color: theme.colors.whiteFaint,
    fontSize: 13,
    letterSpacing: 0.4,
  },
  wait: {
    fontFamily: theme.fonts.body,
    color: "rgba(242,239,232,0.42)",
    fontSize: 11,
    marginTop: 3,
    letterSpacing: 0.3,
  },
});
