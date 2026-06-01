import { View } from "react-native";
import { theme } from "../theme";

/** Thin gold rule used as a section divider throughout the website. */
export function GoldRule({ width = 40, opacity = 1 }: { width?: number; opacity?: number }) {
  return (
    <View
      style={{
        height: 1,
        width,
        backgroundColor: theme.colors.gold,
        opacity,
      }}
    />
  );
}

/** Label-with-rules — the website's recurring "— SECTION LABEL —" pattern. */
export function LabeledRule({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <GoldRule width={30} />
      {children}
      <GoldRule width={30} />
    </View>
  );
}
