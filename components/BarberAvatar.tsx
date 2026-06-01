import { View } from "react-native";
import { Svg, Circle, Path, Ellipse } from "react-native-svg";
import { theme } from "../theme";

/**
 * Clipart barber — same character used in the website chat widget.
 * Render at any size; the SVG viewBox handles scaling.
 */
export default function BarberAvatar({
  size = 120,
  ringed = true,
}: { size?: number; ringed?: boolean }) {
  const ringWidth = ringed ? Math.max(1.5, size * 0.025) : 0;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: theme.colors.black2,
        borderWidth: ringWidth,
        borderColor: theme.colors.gold,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={size * 0.86} height={size * 0.86} viewBox="0 0 64 64">
        {/* Face */}
        <Circle cx="32" cy="34" r="17" fill="#e8c98a" />
        {/* Pompadour hair */}
        <Path
          d="M15 28 Q15 14 32 12 Q49 14 49 28 Q49 22 46 19 Q40 11 32 11 Q24 11 18 19 Q15 22 15 28 Z"
          fill="#1a1209"
        />
        <Path
          d="M22 17 Q28 14 32 14 Q36 14 42 17 Q38 12 32 12 Q26 12 22 17 Z"
          fill="#c9a96e"
          opacity={0.42}
        />
        {/* Eyes */}
        <Ellipse cx="26" cy="32" rx="1.4" ry="1.7" fill="#0a0a0a" />
        <Ellipse cx="38" cy="32" rx="1.4" ry="1.7" fill="#0a0a0a" />
        {/* Brows */}
        <Path d="M23 28 Q26 27 29 28" stroke="#1a1209" strokeWidth={1.2} strokeLinecap="round" fill="none" />
        <Path d="M35 28 Q38 27 41 28" stroke="#1a1209" strokeWidth={1.2} strokeLinecap="round" fill="none" />
        {/* Handlebar mustache */}
        <Path
          d="M19 42 Q24 38 32 41 Q40 38 45 42 Q42 45 38 44 Q35 44 32 43 Q29 44 26 44 Q22 45 19 42 Z"
          fill="#3a2818"
        />
        <Path
          d="M19 42 Q17 40 16 42 Q17 43 19 42 M45 42 Q47 40 48 42 Q47 43 45 42"
          fill="#3a2818"
        />
        {/* Mouth */}
        <Path d="M30 46 Q32 47 34 46" stroke="#5c3a1f" strokeWidth={1} strokeLinecap="round" fill="none" />
        {/* Bowtie */}
        <Path d="M27 52 L32 49 L37 52 L37 55 L32 52 L27 55 Z" fill={theme.colors.gold} />
        <Circle cx="32" cy="52" r="0.9" fill="#080808" />
      </Svg>
    </View>
  );
}
