import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

const ROSETTE_SRC = require("../assets/illustrations/rosette.jpeg");

type Props = {
  size?: number;
  /** Text to render INSIDE the ribbon scroll (the badge image's ribbon is blank). */
  ribbon?: string;
  /** Headline on top of the badge (sits below the star, above the ribbon). */
  headline?: string;
};

/**
 * 5-star award rosette — vintage linocut illustration from Gemini Imagen
 * with text overlaid on the blank ribbon. Used as the trust marker on Home
 * in place of the "5 inline gold stars + 462+ reviews" SaaS strip.
 */
export default function Rosette({ size = 140, ribbon = "EDGEMERE", headline }: Props) {
  // The ribbon's blank scroll on the generated illustration sits around 78–88%
  // of the way down. Position the text mid-scroll, in cream so it reads on
  // top of the ink-filled scroll surface.
  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={ROSETTE_SRC}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
      <View style={[styles.ribbonOverlay, { width: size * 0.66, top: size * 0.81 }]}>
        <Text style={[styles.ribbonText, { fontSize: Math.max(8, size * 0.078) }]} numberOfLines={1}>
          {ribbon}
        </Text>
      </View>
      {headline ? (
        <View style={[styles.headlineOverlay, { width: size * 0.56, top: size * 0.42 }]}>
          <Text style={[styles.headlineText, { fontSize: Math.max(7, size * 0.07) }]} numberOfLines={1}>
            {headline}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  ribbonOverlay: {
    position: "absolute",
    alignItems: "center",
  },
  ribbonText: {
    fontFamily: theme.fonts.display,
    color: theme.colors.poleCream,
    letterSpacing: 2.5,
    textAlign: "center",
  },
  headlineOverlay: {
    position: "absolute",
    alignItems: "center",
  },
  headlineText: {
    fontFamily: theme.fonts.display,
    color: theme.colors.poleCream,
    letterSpacing: 1.2,
    textAlign: "center",
  },
});
