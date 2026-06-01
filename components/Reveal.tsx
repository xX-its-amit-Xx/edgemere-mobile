import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  Easing,
} from "react-native-reanimated";

type Props = {
  children: React.ReactNode;
  /** ms to wait before the reveal starts. Use a stagger like 0, 80, 160, 240 across siblings. */
  delay?: number;
  /** ms for the fade-in + slide-up duration. */
  duration?: number;
  /** Starting Y-offset (translated up to 0). Default 16. */
  fromY?: number;
};

/**
 * Stagger-reveal wrapper — matches the website Hero's "loaded" entrance pattern.
 * Child fades in + slides up; pass `delay` increments across siblings for the
 * staircase effect.
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 700,
  fromY = 16,
}: Props) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(fromY);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration, easing: Easing.out(Easing.cubic) }),
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration, easing: Easing.out(Easing.cubic) }),
    );
  }, [opacity, translateY, delay, duration]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={style}>{children}</Animated.View>;
}
