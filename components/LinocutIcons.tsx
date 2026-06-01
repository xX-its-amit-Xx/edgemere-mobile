// Chunky inline-SVG icons in linocut style. Thick strokes, no rounded ends,
// no thin details — meant to read as "carved ink" not "system icon font."
// All icons take a size prop; color defaults to ink. Use these instead of
// lucide-react-native, which has Vogue-thin 1.5px hairlines that read as SaaS.

import { Svg, Path, Circle, Rect, Line, Polygon, G } from "react-native-svg";
import { theme } from "../theme";

type IconProps = { size?: number; color?: string };

const STROKE = 2.5;

export function PhoneIcon({ size = 24, color }: IconProps) {
  const c = color ?? theme.colors.ink;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A14 14 0 0 1 4 7a3 3 0 0 1 1-3z"
        fill={c}
      />
    </Svg>
  );
}

export function MapPinIcon({ size = 24, color }: IconProps) {
  const c = color ?? theme.colors.ink;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 2C7.6 2 4 5.6 4 10c0 5.5 8 12 8 12s8-6.5 8-12c0-4.4-3.6-8-8-8z"
        fill={c}
      />
      <Circle cx="12" cy="10" r="3" fill={theme.colors.paper} />
    </Svg>
  );
}

export function StarIcon({ size = 24, color, filled = true }: IconProps & { filled?: boolean }) {
  const c = color ?? theme.colors.ink;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Polygon
        points="12,2 14.7,8.6 22,9.3 16.5,14 18.2,21 12,17.3 5.8,21 7.5,14 2,9.3 9.3,8.6"
        fill={filled ? c : "none"}
        stroke={c}
        strokeWidth={STROKE}
        strokeLinejoin="miter"
      />
    </Svg>
  );
}

export function ScissorsIcon({ size = 24, color }: IconProps) {
  const c = color ?? theme.colors.ink;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="6" cy="6" r="3" fill="none" stroke={c} strokeWidth={STROKE} />
      <Circle cx="6" cy="18" r="3" fill="none" stroke={c} strokeWidth={STROKE} />
      <Line x1="20" y1="4" x2="8.12" y2="15.88" stroke={c} strokeWidth={STROKE} strokeLinecap="butt" />
      <Line x1="14.47" y1="14.48" x2="20" y2="20" stroke={c} strokeWidth={STROKE} strokeLinecap="butt" />
      <Line x1="8.12" y1="8.12" x2="12" y2="12" stroke={c} strokeWidth={STROKE} strokeLinecap="butt" />
    </Svg>
  );
}

export function RazorIcon({ size = 24, color }: IconProps) {
  const c = color ?? theme.colors.ink;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* Blade */}
      <Path d="M3 9 L15 5 L17 8 L5 12 Z" fill={c} />
      {/* Pivot */}
      <Circle cx="17" cy="9" r="1.8" fill={c} />
      {/* Handle */}
      <Rect x="17.5" y="9.5" width="5" height="2.5" fill={c} transform="rotate(20 17.5 9.5)" />
    </Svg>
  );
}

export function CombIcon({ size = 24, color }: IconProps) {
  const c = color ?? theme.colors.ink;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x="2" y="6" width="20" height="3" fill={c} />
      {[3, 6, 9, 12, 15, 18, 21].map((x) => (
        <Rect key={x} x={x - 0.7} y="8" width="1.4" height="10" fill={c} />
      ))}
    </Svg>
  );
}

export function ArrowIcon({ size = 24, color }: IconProps) {
  const c = color ?? theme.colors.ink;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M5 12 L17 12 M12 6 L18 12 L12 18"
        stroke={c}
        strokeWidth={STROKE}
        fill="none"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </Svg>
  );
}

export function StarRow({ count = 5, size = 14, color }: { count?: number; size?: number; color?: string }) {
  const c = color ?? theme.colors.ink;
  return (
    <Svg width={size * count + (count - 1) * 3} height={size} viewBox={`0 0 ${count * (size + 3) - 3} ${size}`}>
      <G>
        {Array.from({ length: count }).map((_, i) => {
          const cx = i * (size + 3);
          // Re-use the 12-center 24-size star points, scaled to the cell.
          const scale = size / 24;
          const pts = "12,2 14.7,8.6 22,9.3 16.5,14 18.2,21 12,17.3 5.8,21 7.5,14 2,9.3 9.3,8.6"
            .split(" ")
            .map((p) => {
              const [x, y] = p.split(",").map(Number);
              return `${x * scale + cx},${y * scale}`;
            })
            .join(" ");
          return <Polygon key={i} points={pts} fill={c} />;
        })}
      </G>
    </Svg>
  );
}
