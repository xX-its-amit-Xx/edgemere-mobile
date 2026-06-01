import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { theme } from "../theme";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
};

/**
 * Gold gradient CTA with sheen highlight — the website's signature
 * "Book Your Cut" button pattern, ported to RN. Primary is filled gold;
 * secondary is outlined gold-on-black.
 */
export default function GoldButton({ label, onPress, variant = "primary", style }: Props) {
  const [pressed, setPressed] = useState(false);

  if (variant === "secondary") {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={[
          styles.secondaryBase,
          {
            borderColor: pressed ? theme.colors.gold : "rgba(201,169,110,0.4)",
            backgroundColor: pressed ? "rgba(201,169,110,0.1)" : "transparent",
          },
          style,
        ]}
      >
        <Text style={[styles.label, { color: theme.colors.gold }]}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[style, pressed && styles.primaryPressed]}
    >
      <View style={styles.primaryWrap}>
        <LinearGradient
          colors={[theme.colors.goldLight, theme.colors.gold, theme.colors.goldDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.primaryGradient}
        >
          {/* Inner highlight sheen */}
          <LinearGradient
            colors={["rgba(255,255,255,0.28)", "rgba(255,255,255,0)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.primarySheen}
            pointerEvents="none"
          />
          <Text style={[styles.label, { color: theme.colors.black }]}>{label}</Text>
        </LinearGradient>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryWrap: {
    borderRadius: theme.radii.sm,
    overflow: "hidden",
    // Outer glow
    shadowColor: theme.colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  primaryGradient: {
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  primarySheen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "55%",
  },
  primaryPressed: {
    transform: [{ translateY: 1 }],
    opacity: 0.92,
  },
  secondaryBase: {
    borderWidth: 1,
    borderRadius: theme.radii.sm,
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: theme.fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
});
