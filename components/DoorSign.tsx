import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { theme } from "../theme";
import { LiveStatus } from "../lib/status";

/**
 * Wooden door sign that flips between hand-painted "OPEN" / "CLOSED".
 * Hangs from two little hooks at the top corners. Open signs sway slightly
 * (Reanimated rotation loop) to imply "we're in there"; closed signs sit still.
 *
 * Replaces the earlier StatusPill, which looked like a Slack badge.
 */
export default function DoorSign({ status }: { status: LiveStatus }) {
  const sway = useSharedValue(0);

  useEffect(() => {
    if (status.open) {
      sway.value = withRepeat(
        withSequence(
          withTiming(-0.6, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.6, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        true,
      );
    } else {
      sway.value = 0;
    }
  }, [status.open, sway]);

  const swayStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sway.value}deg` }],
  }));

  const isOpen = status.open;
  const headline = isOpen ? "OPEN" : "CLOSED";
  const accentColor = isOpen ? theme.colors.success : theme.colors.danger;

  return (
    <View style={styles.outer}>
      <View style={styles.hookRow}>
        <View style={styles.hook} />
        <View style={styles.hook} />
      </View>
      <Animated.View style={[swayStyle, styles.signWrap]}>
        <View style={styles.sign}>
          <View style={styles.signInner}>
            <View style={[styles.signBorder, { borderColor: accentColor }]}>
              <Text style={styles.smallLabel}>THE SHOP IS</Text>
              <Text style={[styles.headline, { color: accentColor }]}>{headline}</Text>
              <View style={styles.rule} />
              <Text style={styles.label}>{status.label}</Text>
              {isOpen && status.wait ? (
                <Text style={styles.wait}>{status.wait}</Text>
              ) : null}
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { alignItems: "center", paddingTop: 4 },
  hookRow: {
    flexDirection: "row",
    width: 220,
    justifyContent: "space-between",
    paddingHorizontal: 40,
    marginBottom: -2,
  },
  hook: {
    width: 8,
    height: 14,
    backgroundColor: theme.colors.brass,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.ink,
  },
  signWrap: { alignSelf: "stretch", alignItems: "center" },
  sign: {
    alignSelf: "stretch",
    backgroundColor: theme.colors.paperDark,
    borderWidth: 2.5,
    borderColor: theme.colors.ink,
    paddingVertical: 18,
    paddingHorizontal: 22,
    // Heavy ink shadow — looks like a sign hanging on a wall
    shadowColor: theme.colors.ink,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 0,
    elevation: 4,
  },
  signInner: { alignItems: "center" },
  signBorder: {
    alignSelf: "stretch",
    borderWidth: 1,
    borderStyle: "dashed",
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  smallLabel: {
    fontFamily: theme.fonts.typewriter,
    fontSize: 10,
    color: theme.colors.inkSoft,
    letterSpacing: 3,
    marginBottom: 4,
  },
  headline: {
    fontFamily: theme.fonts.display,
    fontSize: 38,
    letterSpacing: 4,
    lineHeight: 42,
  },
  rule: {
    height: 1,
    width: 36,
    backgroundColor: theme.colors.inkFaint,
    marginVertical: 8,
  },
  label: {
    fontFamily: theme.fonts.typewriter,
    fontSize: 12,
    color: theme.colors.ink,
    letterSpacing: 0.6,
    textAlign: "center",
  },
  wait: {
    fontFamily: theme.fonts.typewriter,
    fontSize: 11,
    color: theme.colors.inkSoft,
    letterSpacing: 0.5,
    textAlign: "center",
    marginTop: 4,
  },
});
