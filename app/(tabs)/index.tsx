import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  Extrapolation,
} from "react-native-reanimated";
import { theme, SHOP } from "../../theme";
import { getLiveStatus } from "../../lib/status";
import Wordmark from "../../components/Wordmark";
import BarberPoleRail from "../../components/BarberPoleRail";
import DoorSign from "../../components/DoorSign";
import ChairButton from "../../components/ChairButton";
import PaperCard from "../../components/PaperCard";
import Rosette from "../../components/Rosette";
import { PhoneIcon, MapPinIcon, StarIcon, ScissorsIcon } from "../../components/LinocutIcons";
import Reveal from "../../components/Reveal";

const CHAIR_SCENE = require("../../assets/illustrations/chair_scene.jpeg");

export default function HomeScreen() {
  const [status, setStatus] = useState(getLiveStatus());
  const scrollY = useSharedValue(0);

  useEffect(() => {
    const id = setInterval(() => setStatus(getLiveStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  // Chair scene parallaxes upward at 0.4x scroll speed + fades out near the bottom.
  // Gives the "world behind the storefront" feel without being gimmicky.
  const heroStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: scrollY.value * 0.4 },
      { scale: interpolate(scrollY.value, [-120, 0, 240], [1.08, 1, 0.94], Extrapolation.CLAMP) },
    ],
    opacity: interpolate(scrollY.value, [0, 240, 380], [1, 0.7, 0.35], Extrapolation.CLAMP),
  }));

  // Rosette and wordmark also drift gently at 0.15x for a layered parallax depth.
  const topBlockStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollY.value * 0.15 }],
    opacity: interpolate(scrollY.value, [0, 180, 320], [1, 0.85, 0.5], Extrapolation.CLAMP),
  }));

  return (
    <View style={styles.root}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <View style={styles.layoutRow}>
          {/* Barber pole rail — runs the full height of the left edge */}
          <View style={styles.poleColumn}>
            <BarberPoleRail height={1100} width={12} caps />
          </View>

          <Animated.ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            decelerationRate="normal"
          >
            {/* ── Rosette + wordmark (parallax: drifts slowly with scroll) ── */}
            <Animated.View style={topBlockStyle}>
              <Reveal delay={0}>
                <View style={styles.rosetteWrap}>
                  <Rosette size={160} ribbon="EDGEMERE" />
                </View>
              </Reveal>

              <Reveal delay={120}>
                <View style={styles.wordmarkWrap}>
                  <Wordmark size={42} />
                  <View style={styles.subDecoration}>
                    <View style={styles.smallRule} />
                    <Text style={styles.scriptSubtitle}>Barber Shop</Text>
                    <View style={styles.smallRule} />
                  </View>
                  <Text style={styles.typewriterSubtitle}>EST. 2010 · ROUTE 20 · SHREWSBURY, MA</Text>
                </View>
              </Reveal>
            </Animated.View>

            {/* ── Chair scene illustration — parallaxes faster + fades on scroll ── */}
            <Reveal delay={220}>
              <Animated.View style={[styles.heroIllustration, heroStyle]}>
                <Image source={CHAIR_SCENE} style={styles.heroImage} resizeMode="contain" />
              </Animated.View>
            </Reveal>

            {/* ── Door sign — OPEN / CLOSED ── */}
            <Reveal delay={320}>
              <View style={styles.doorWrap}>
                <DoorSign status={status} />
              </View>
            </Reveal>

            {/* ── Primary CTAs ── */}
            <Reveal delay={420}>
              <View style={styles.ctaRow}>
                <View style={styles.ctaFlex}>
                  <Link href="/book" asChild>
                    <View>
                      <ChairButton label="BOOK" onPress={() => {}} variant="red" />
                    </View>
                  </Link>
                </View>
                <View style={styles.ctaFlex}>
                  <Link href="/chat" asChild>
                    <View>
                      <ChairButton label="ASK EDDIE" onPress={() => {}} variant="blue" />
                    </View>
                  </Link>
                </View>
              </View>
            </Reveal>

            {/* ── Services price list — feels like a shop menu ── */}
            <Reveal delay={520}>
              <PaperCard style={styles.servicesCard}>
                <Text style={styles.servicesTitle}>SERVICES</Text>
                <View style={styles.servicesRule} />
                {SHOP.services.map((s) => (
                  <View key={s.name} style={styles.serviceRow}>
                    <Text style={styles.serviceName}>{s.name}</Text>
                    <View style={styles.dottedFill} />
                    <Text style={styles.servicePrice}>{s.price}</Text>
                  </View>
                ))}
                <Text style={styles.servicesNote}>CASH ONLY · TIPS APPRECIATED</Text>
              </PaperCard>
            </Reveal>

            {/* ── Quick actions ── */}
            <Reveal delay={620}>
              <View style={styles.quickGrid}>
                <QuickAction
                  icon={<PhoneIcon size={22} />}
                  label="CALL"
                  onPress={() => Linking.openURL(`tel:${SHOP.phone}`)}
                />
                <Link href="/contact" asChild>
                  <Pressable style={styles.quickItem}>
                    <MapPinIcon size={22} />
                    <Text style={styles.quickLabel}>MAP</Text>
                  </Pressable>
                </Link>
                <QuickAction
                  icon={<StarIcon size={22} filled />}
                  label="REVIEW"
                  onPress={() =>
                    Linking.openURL(
                      "https://maps.google.com/?q=Edgemere+Barber+Shop+129+Hartford+Tpke+Shrewsbury+MA",
                    )
                  }
                />
                <QuickAction
                  icon={<ScissorsIcon size={22} />}
                  label="BOOKSY"
                  onPress={() => Linking.openURL(SHOP.booksy)}
                />
              </View>
            </Reveal>

            {/* ── Footer — the shop address card ── */}
            <Reveal delay={720}>
              <View style={styles.footer}>
                <Text style={styles.footerHand}>Come see us.</Text>
                <Text style={styles.footerAddr}>129 HARTFORD TPKE</Text>
                <Text style={styles.footerAddr}>SHREWSBURY · MA · 01545</Text>
                <Pressable onPress={() => Linking.openURL(`tel:${SHOP.phone}`)}>
                  <Text style={styles.footerPhone}>(508) 667·8481</Text>
                </Pressable>
                <Text style={styles.footerSlogan}>· WALK-INS WELCOME ·</Text>
              </View>
            </Reveal>
          </Animated.ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

function QuickAction({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.quickItem} onPress={onPress} accessibilityLabel={label}>
      {icon}
      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.paper },
  layoutRow: { flex: 1, flexDirection: "row" },
  poleColumn: {
    width: 18,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: "center",
    backgroundColor: theme.colors.paper,
  },
  scrollContent: { paddingHorizontal: 18, paddingBottom: 48 },

  rosetteWrap: { alignItems: "center", marginTop: 8, marginBottom: 8 },

  wordmarkWrap: { alignItems: "center", marginBottom: 18 },
  subDecoration: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  smallRule: {
    width: 28,
    height: 1.5,
    backgroundColor: theme.colors.ink,
  },
  scriptSubtitle: {
    fontFamily: theme.fonts.script,
    color: theme.colors.ink,
    fontSize: 22,
    letterSpacing: 2,
  },
  typewriterSubtitle: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.inkSoft,
    fontSize: 10.5,
    letterSpacing: 3,
    marginTop: 8,
  },

  heroIllustration: {
    alignItems: "center",
    marginVertical: 4,
  },
  heroImage: {
    width: "100%",
    height: 280,
  },

  doorWrap: { marginTop: 8, marginBottom: 22 },

  ctaRow: { flexDirection: "row", gap: 10, marginBottom: 22 },
  ctaFlex: { flex: 1 },

  servicesCard: { marginBottom: 22 },
  servicesTitle: {
    fontFamily: theme.fonts.display,
    color: theme.colors.ink,
    fontSize: 22,
    letterSpacing: 4,
    textAlign: "center",
  },
  servicesRule: {
    height: 1.5,
    backgroundColor: theme.colors.ink,
    marginVertical: 12,
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  serviceName: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.ink,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  dottedFill: {
    flex: 1,
    height: 1,
    marginHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.inkFaint,
    borderStyle: "dotted",
    marginBottom: 4,
  },
  servicePrice: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.ink,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  servicesNote: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.inkSoft,
    fontSize: 10,
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 14,
  },

  quickGrid: { flexDirection: "row", gap: 8, marginBottom: 22 },
  quickItem: {
    flex: 1,
    backgroundColor: theme.colors.paperDark,
    borderWidth: 1.5,
    borderColor: theme.colors.ink,
    paddingVertical: 14,
    alignItems: "center",
    gap: 6,
  },
  quickLabel: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.ink,
    fontSize: 10,
    letterSpacing: 2,
  },

  footer: {
    alignItems: "center",
    paddingVertical: 28,
    borderTopWidth: 1.5,
    borderTopColor: theme.colors.ink,
    borderStyle: "dashed",
    marginTop: 6,
  },
  footerHand: {
    fontFamily: theme.fonts.script,
    color: theme.colors.ink,
    fontSize: 26,
    letterSpacing: 1,
    marginBottom: 12,
  },
  footerAddr: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.ink,
    fontSize: 12,
    letterSpacing: 3,
    marginBottom: 2,
  },
  footerPhone: {
    fontFamily: theme.fonts.display,
    color: theme.colors.poleRed,
    fontSize: 26,
    letterSpacing: 2,
    marginTop: 8,
  },
  footerSlogan: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.inkSoft,
    fontSize: 11,
    letterSpacing: 3,
    marginTop: 10,
  },
});
