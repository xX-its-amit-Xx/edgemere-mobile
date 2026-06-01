import { useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { ArrowUpRight, Star, Phone } from "lucide-react-native";
import { SHOP, theme } from "../theme";
import { getLiveStatus } from "../lib/status";
import StatusPill from "../components/StatusPill";
import { GoldRule, LabeledRule } from "../components/GoldAccent";
import Reveal from "../components/Reveal";

export default function BookScreen() {
  const [status, setStatus] = useState(getLiveStatus());
  useEffect(() => {
    const id = setInterval(() => setStatus(getLiveStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.black }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Live status hero ── */}
      <Reveal delay={0}>
        <View style={styles.statusWrap}>
          <StatusPill status={status} />
        </View>
      </Reveal>

      {/* ── Section label ── */}
      <Reveal delay={150}>
        <View style={styles.sectionHeader}>
          <LabeledRule>
            <Text style={styles.sectionLabel}>PICK YOUR BARBER</Text>
          </LabeledRule>
        </View>
      </Reveal>

      <Reveal delay={250}>
        <Text style={styles.sectionLead}>
          All three are <Text style={styles.italic}>5-star</Text> rated. Tap a card to
          book directly on Booksy.
        </Text>
      </Reveal>

      {/* ── Barber cards ── */}
      {SHOP.barbers.map((b, i) => (
        <Reveal key={b.key} delay={350 + i * 80}>
          <Pressable
            style={styles.barberCard}
            onPress={() => WebBrowser.openBrowserAsync(b.booksy)}
            accessibilityLabel={`Book with ${b.name} on Booksy`}
          >
            <View style={styles.barberHeader}>
              <View style={styles.starsRow}>
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star
                    key={s}
                    size={10}
                    color={theme.colors.gold}
                    fill={theme.colors.gold}
                    strokeWidth={0}
                  />
                ))}
                <Text style={styles.barberStars}>{b.reviews} reviews</Text>
              </View>
              <ArrowUpRight size={18} color="rgba(201,169,110,0.55)" strokeWidth={1.6} />
            </View>
            <Text style={styles.barberName}>{b.name}</Text>
            <Text style={styles.barberFullName}>{b.fullName}</Text>
            <View style={styles.barberDivider}>
              <GoldRule width={32} opacity={0.5} />
            </View>
            <Text style={styles.barberSpecialty}>{b.specialty}</Text>
            <Text style={styles.barberCta}>BOOK ON BOOKSY  →</Text>
          </Pressable>
        </Reveal>
      ))}

      {/* ── Shop fallback ── */}
      <Reveal delay={650}>
        <Pressable
          style={styles.shopCard}
          onPress={() => WebBrowser.openBrowserAsync(SHOP.booksy)}
        >
          <Text style={styles.shopCardText}>
            Or book without choosing a specific barber →
          </Text>
        </Pressable>
      </Reveal>

      {/* ── Old school ── */}
      <Reveal delay={750}>
        <View style={styles.callBlock}>
          <Text style={styles.callTagline}>
            <Text style={styles.italic}>Old school?</Text>
          </Text>
          <Pressable
            style={styles.callRow}
            onPress={() => Linking.openURL(`tel:${SHOP.phone}`)}
          >
            <Phone size={18} color={theme.colors.gold} strokeWidth={1.6} />
            <Text style={styles.callPhone}>{SHOP.phoneDisplay}</Text>
          </Pressable>
        </View>
      </Reveal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 56 },

  statusWrap: { marginBottom: 30 },

  sectionHeader: { alignItems: "center", marginBottom: 10 },
  sectionLabel: {
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.gold,
    fontSize: 10,
    letterSpacing: 4,
  },
  sectionLead: {
    fontFamily: theme.fonts.body,
    color: "rgba(242,239,232,0.6)",
    fontSize: 13.5,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 26,
    letterSpacing: 0.3,
  },
  italic: {
    fontFamily: theme.fonts.displayBoldItalic,
    fontStyle: "italic",
    color: theme.colors.goldLight,
    fontSize: 16,
  },

  barberCard: {
    backgroundColor: "rgba(16,16,16,0.9)",
    borderRadius: 4,
    paddingVertical: 22,
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: "rgba(201,169,110,0.3)",
    marginBottom: 14,
  },
  barberHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  starsRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  barberStars: {
    fontFamily: theme.fonts.bodyMedium,
    color: "rgba(201,169,110,0.7)",
    fontSize: 9.5,
    letterSpacing: 1.8,
    marginLeft: 7,
  },
  barberName: {
    fontFamily: theme.fonts.displayBold,
    color: theme.colors.goldLight,
    fontSize: 30,
    letterSpacing: 0.5,
  },
  barberFullName: {
    fontFamily: theme.fonts.body,
    color: "rgba(242,239,232,0.4)",
    fontSize: 11,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  barberDivider: { marginVertical: 14 },
  barberSpecialty: {
    fontFamily: theme.fonts.body,
    color: "rgba(242,239,232,0.78)",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  barberCta: {
    fontFamily: theme.fonts.bodyBold,
    color: theme.colors.gold,
    fontSize: 10.5,
    letterSpacing: 3,
  },

  shopCard: { alignItems: "center", paddingVertical: 14, marginBottom: 32 },
  shopCardText: {
    fontFamily: theme.fonts.body,
    color: "rgba(242,239,232,0.55)",
    fontSize: 12.5,
    letterSpacing: 0.3,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(201,169,110,0.4)",
    paddingBottom: 3,
  },

  callBlock: {
    alignItems: "center",
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(201,169,110,0.15)",
  },
  callTagline: { marginBottom: 14 },
  callRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  callPhone: {
    fontFamily: theme.fonts.displayBold,
    color: theme.colors.gold,
    fontSize: 22,
    letterSpacing: 0.5,
  },
});
