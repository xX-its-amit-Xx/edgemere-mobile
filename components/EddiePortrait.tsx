import { useEffect } from "react";
import { Image, ImageStyle, StyleProp, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { theme } from "../theme";

const PORTRAIT_SRC = require("../assets/illustrations/eddie_portrait.jpeg");

type Props = {
  size?: number;
  framed?: boolean;
  /** When true (default), Eddie subtly breathes / shifts. Set false for static thumbnails. */
  animated?: boolean;
  style?: StyleProp<ImageStyle>;
};

const AnimatedImage = Animated.createAnimatedComponent(Image);

/**
 * Eddie portrait — vintage linocut illustration. Faint scale + tilt loop
 * (~3% / 0.6deg) implies a living shop helper instead of a static asset.
 */
export default function EddiePortrait({ size = 96, framed = true, animated = true, style }: Props) {
  const scale = useSharedValue(1);
  const tilt = useSharedValue(0);

  useEffect(() => {
    if (!animated) return;
    scale.value = withDelay(
      400,
      withRepeat(
        withSequence(
          withTiming(1.03, { duration: 2400, easing: Easing.inOut(Easing.sin) }),
          withTiming(1, { duration: 2400, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        true,
      ),
    );
    tilt.value = withDelay(
      800,
      withRepeat(
        withSequence(
          withTiming(0.6, { duration: 3200, easing: Easing.inOut(Easing.sin) }),
          withTiming(-0.6, { duration: 3200, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        true,
      ),
    );
  }, [animated, scale, tilt]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${tilt.value}deg` }],
  }));

  const img = (
    <AnimatedImage
      source={PORTRAIT_SRC}
      style={[{ width: "100%", height: "100%" }, animStyle, style]}
      resizeMode="contain"
    />
  );

  if (!framed) {
    return <View style={{ width: size, height: size }}>{img}</View>;
  }
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: theme.colors.paperDark,
        borderWidth: 2,
        borderColor: theme.colors.ink,
        padding: 3,
        shadowColor: theme.colors.ink,
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.22,
        shadowRadius: 0,
        elevation: 4,
      }}
    >
      {img}
    </View>
  );
}
