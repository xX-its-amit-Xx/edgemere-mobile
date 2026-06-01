import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Phone, MapPin, Star, Scissors, ArrowUpRight } from "lucide-react-native";
import { theme, SHOP } from "../theme";
import { getLiveStatus } from "../lib/status";
import BarberAvatar from "../components/BarberAvatar";
import Wordmark from "../components/Wordmark";
import StatusPill from "../components/StatusPill";
import GoldButton from "../components/GoldButton";
import { GoldRule, LabeledRule } from "../components/GoldAccent";
import Reveal from "../components/Reveal";

export default function HomeScreen() {
  const [status, setStatus] = useState(getLiveStatus());

  useEffect(() => {
    const id = setInterval(() => setStatus(getLiveStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.root}>
      {/* ── Photo background with darkening overlay ── */}
      <Image
        source={{ uri: SHOP.heroPhoto }}
        style={styles.bgPhoto}
        resizeMode="cover"
        accessible={false}
      />
      {/* Vignette + brand black wash */}
      <LinearGradient
        colors={["rgba(8,8,8,0.65)", "rgba(8,8,8,0.85)", "rgba(8,8,8,0.97)"]}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      <View style={styles.vignette} pointerEvents="none" />

      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Hero ── */}
          <View style={styles.hero}>
            <Reveal delay={0}>
              <BarberAvatar size={96} />
            </Reveal>

            <Reveal delay={150}>
              <View style={{ marginTop: 22 }}>
                <LabeledRule>
                  <Text style={styles.brandLabel}>EST. 2010 · SHREWSBURY, MA</Text>
                </LabeledRule>
              </View>
            </Reveal>

            <Reveal delay={300}>
              <View style={{ marginTop: 16 }}>
                <Wordmark size={54} layout="column" />
              </View>
            </Reveal>

            <Reveal delay={500}>
              <Text style={styles.barbershopLabel}>BARBER SHOP</Text>
            </Reveal>

            <Reveal delay={650}>
              <View style={styles.divider}>
                <GoldRule width={48} opacity={0.6} />
                <View style={styles.diamond} />
                <GoldRule width={48} opacity={0.6} />
              </View>
            </Reveal>

            <Reveal delay={800}>
              <Text style={styles.tagline}>
                Where precision meets tradition. Expert fades, cuts &amp; hot towel
                shaves by Shrewsbury&apos;s finest barbers.
              </Text>
            </Reveal>

            {/* Stars row */}
            <Reveal delay={950}>
              <View style={styles.starsRow}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    size={13}
                    color={theme.colors.gold}
                    fill={theme.colors.gold}
                    strokeWidth={0}
                  />
                ))}
                <Text style={styles.starsLabel}>5.0 · 462+ FIVE-STAR REVIEWS</Text>
              </View>
            </Reveal>
          </View>

          {/* ── Live status pill (breathes) ── */}
          <Reveal delay={1050}>
            <View style={styles.statusWrap}>
              <StatusPill status={status} />
            </View>
          </Reveal>

          {/* ── Primary CTAs ── */}
          <Reveal delay={1150}>
            <View style={styles.ctaRow}>
              <View style={styles.ctaFlex}>
                <Link href="/book" asChild>
                  <View>
                    <GoldButton
                      label="Book a Cut"
                      onPress={() => {}}
                      variant="primary"
                    />
                  </View>
                </Link>
              </View>
              <View style={styles.ctaFlex}>
                <Link href="/chat" asChild>
                  <View>
                    <GoldButton
                      label="Ask Eddie"
                      onPress={() => {}}
                      variant="secondary"
                    />
                  </View>
                </Link>
              </View>
            </View>
          </Reveal>

          {/* ── Quick actions ── */}
          <Reveal delay={1250}>
            <View style={styles.quickGrid}>
              <QuickAction
                icon={<Phone size={20} color={theme.colors.gold} strokeWidth={1.6} />}
                label="Call"
                onPress={() => Linking.openURL(`tel:${SHOP.phone}`)}
              />
              <Link href="/contact" asChild>
                <Pressable style={styles.quickItem}>
                  <MapPin size={20} color={theme.colors.gold} strokeWidth={1.6} />
                  <Text style={styles.quickLabel}>Directions</Text>
                </Pressable>
              </Link>
              <QuickAction
                icon={<Star size={20} color={theme.colors.gold} strokeWidth={1.6} />}
                label="Review"
                onPress={() =>
                  Linking.openURL(
                    "https://maps.google.com/?q=Edgemere+Barber+Shop+129+Hartford+Tpke+Shrewsbury+MA",
                  )
                }
              />
              <QuickAction
                icon={<Scissors size={20} color={theme.colors.gold} strokeWidth={1.6} />}
                label="Booksy"
                onPress={() => Linking.openURL(SHOP.booksy)}
              />
            </View>
          </Reveal>

          {/* ── Hours card ── */}
          <Reveal delay={1350}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Hours</Text>
                <GoldRule width={28} />
              </View>
              {[
                ["Monday", "Closed", true],
                ["Tuesday", "10 AM – 6 PM", false],
                ["Wed – Fri", "10 AM – 5:30 PM", false],
                ["Saturday", "8 AM – 12 PM", false],
                ["Sunday", "Closed", true],
              ].map(([d, t, dim]) => (
                <View key={d as string} style={styles.hourRow}>
                  <Text style={[styles.hourDay, dim && styles.hourDim]}>{d}</Text>
                  <Text style={[styles.hourTime, dim && styles.hourDim]}>{t}</Text>
                </View>
              ))}
            </View>
          </Reveal>

          {/* ── Footer ── */}
          <Reveal delay={1450}>
            <View style={styles.footer}>
              <Text style={styles.footerAddr}>{SHOP.address}</Text>
              <Pressable onPress={() => Linking.openURL(`tel:${SHOP.phone}`)}>
                <Text style={styles.footerPhone}>{SHOP.phoneDisplay}</Text>
              </Pressable>
              <Text style={styles.footerCash}>CASH ONLY · WALK-INS WELCOME</Text>
            </View>
          </Reveal>
        </ScrollView>
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
      <View style={styles.quickArrow}>
        <ArrowUpRight size={10} color="rgba(201,169,110,0.5)" strokeWidth={1.6} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.black, position: "relative" },
  bgPhoto: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.18,
  },
  vignette: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(8,8,8,0.4)",
  },
  scrollContent: { paddingHorizontal: 22, paddingBottom: 48, paddingTop: 4 },

  hero: { alignItems: "center", paddingTop: 28, paddingBottom: 28 },
  brandLabel: {
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.gold,
    fontSize: 10,
    letterSpacing: 4,
  },
  barbershopLabel: {
    fontFamily: theme.fonts.body,
    color: "rgba(242,239,232,0.55)",
    fontSize: 12,
    letterSpacing: 9,
    marginTop: 14,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 22,
  },
  diamond: {
    width: 7,
    height: 7,
    backgroundColor: theme.colors.gold,
    transform: [{ rotate: "45deg" }],
  },
  tagline: {
    fontFamily: theme.fonts.body,
    color: "rgba(242,239,232,0.65)",
    fontSize: 13,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 22,
    paddingHorizontal: 8,
    letterSpacing: 0.4,
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 28,
  },
  starsLabel: {
    fontFamily: theme.fonts.bodyMedium,
    color: "rgba(242,239,232,0.5)",
    fontSize: 9.5,
    letterSpacing: 2,
    marginLeft: 6,
  },

  statusWrap: { marginTop: 8, marginBottom: 22 },

  ctaRow: { flexDirection: "row", gap: 12, marginBottom: 22 },
  ctaFlex: { flex: 1 },

  quickGrid: { flexDirection: "row", gap: 8, marginBottom: 24 },
  quickItem: {
    flex: 1,
    backgroundColor: "rgba(16,16,16,0.85)",
    borderWidth: 1,
    borderColor: "rgba(201,169,110,0.22)",
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 6,
    alignItems: "center",
    gap: 8,
    position: "relative",
  },
  quickLabel: {
    fontFamily: theme.fonts.bodyMedium,
    color: "rgba(242,239,232,0.7)",
    fontSize: 10.5,
    letterSpacing: 1.5,
  },
  quickArrow: {
    position: "absolute",
    top: 6,
    right: 6,
  },

  card: {
    backgroundColor: "rgba(16,16,16,0.85)",
    borderRadius: 6,
    paddingVertical: 22,
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: "rgba(201,169,110,0.2)",
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: theme.fonts.displayBold,
    color: theme.colors.goldLight,
    fontSize: 22,
    letterSpacing: 0.4,
  },
  hourRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
  },
  hourDay: {
    fontFamily: theme.fonts.body,
    color: "rgba(242,239,232,0.78)",
    fontSize: 13.5,
    letterSpacing: 0.3,
  },
  hourTime: {
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.white,
    fontSize: 13.5,
    letterSpacing: 0.3,
  },
  hourDim: {
    color: "rgba(242,239,232,0.35)",
  },

  footer: { alignItems: "center", marginTop: 8 },
  footerAddr: {
    fontFamily: theme.fonts.body,
    color: "rgba(242,239,232,0.55)",
    fontSize: 11.5,
    letterSpacing: 0.5,
  },
  footerPhone: {
    fontFamily: theme.fonts.displayBold,
    color: theme.colors.gold,
    fontSize: 18,
    letterSpacing: 0.5,
    marginTop: 6,
  },
  footerCash: {
    fontFamily: theme.fonts.bodyMedium,
    color: "rgba(201,169,110,0.45)",
    fontSize: 9,
    letterSpacing: 3,
    marginTop: 10,
  },
});
