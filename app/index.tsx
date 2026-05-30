import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Svg, Circle, Path, Ellipse } from "react-native-svg";
import { theme, SHOP } from "../theme";
import { getLiveStatus } from "../lib/status";

// ── Clipart barber avatar (same character as the website chat widget) ──
function BarberAvatar({ size = 120 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: theme.colors.black2,
        borderWidth: 2,
        borderColor: theme.colors.gold,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={size * 0.86} height={size * 0.86} viewBox="0 0 64 64">
        <Circle cx="32" cy="34" r="17" fill="#e8c98a" />
        <Path
          d="M15 28 Q15 14 32 12 Q49 14 49 28 Q49 22 46 19 Q40 11 32 11 Q24 11 18 19 Q15 22 15 28 Z"
          fill="#1a1209"
        />
        <Path
          d="M22 17 Q28 14 32 14 Q36 14 42 17 Q38 12 32 12 Q26 12 22 17 Z"
          fill="#c9a96e"
          opacity={0.42}
        />
        <Ellipse cx="26" cy="32" rx="1.4" ry="1.7" fill="#0a0a0a" />
        <Ellipse cx="38" cy="32" rx="1.4" ry="1.7" fill="#0a0a0a" />
        <Path
          d="M19 42 Q24 38 32 41 Q40 38 45 42 Q42 45 38 44 Q35 44 32 43 Q29 44 26 44 Q22 45 19 42 Z"
          fill="#3a2818"
        />
        <Path
          d="M27 52 L32 49 L37 52 L37 55 L32 52 L27 55 Z"
          fill={theme.colors.gold}
        />
        <Circle cx="32" cy="52" r="0.9" fill="#080808" />
      </Svg>
    </View>
  );
}

export default function HomeScreen() {
  const [status, setStatus] = useState(getLiveStatus());

  useEffect(() => {
    const id = setInterval(() => setStatus(getLiveStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Hero */}
        <View style={styles.hero}>
          <BarberAvatar size={96} />
          <Text style={styles.brandLabel}>EDGEMERE BARBER SHOP</Text>
          <Text style={styles.headline}>
            Shrewsbury&apos;s <Text style={styles.italic}>5-star</Text> cut.
          </Text>
          <Text style={styles.sub}>Route 20 · Cash only · Walk-ins welcome</Text>
        </View>

        {/* Live status pill */}
        <View
          style={[
            styles.statusPill,
            { borderColor: status.open ? theme.colors.success : theme.colors.danger },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              { backgroundColor: status.open ? theme.colors.success : theme.colors.danger },
            ]}
          />
          <View style={{ flex: 1 }}>
            <Text style={[styles.statusBadge, { color: status.open ? theme.colors.success : theme.colors.danger }]}>
              {status.open ? "OPEN" : "CLOSED"}
            </Text>
            <Text style={styles.statusLabel}>{status.label}</Text>
            {status.open && status.wait && (
              <Text style={styles.statusWait}>{status.wait}</Text>
            )}
          </View>
        </View>

        {/* Primary CTAs */}
        <View style={styles.ctaRow}>
          <Link href="/book" asChild>
            <Pressable style={styles.ctaPrimary}>
              <Text style={styles.ctaPrimaryText}>Book a Cut</Text>
            </Pressable>
          </Link>
          <Link href="/chat" asChild>
            <Pressable style={styles.ctaSecondary}>
              <Text style={styles.ctaSecondaryText}>Ask Eddie</Text>
            </Pressable>
          </Link>
        </View>

        {/* Quick actions */}
        <View style={styles.quickGrid}>
          <Pressable
            style={styles.quickItem}
            onPress={() => Linking.openURL(`tel:${SHOP.phone}`)}
            accessibilityLabel={`Call ${SHOP.name}`}
          >
            <Text style={styles.quickEmoji}>📞</Text>
            <Text style={styles.quickLabel}>Call</Text>
          </Pressable>
          <Link href="/contact" asChild>
            <Pressable style={styles.quickItem}>
              <Text style={styles.quickEmoji}>📍</Text>
              <Text style={styles.quickLabel}>Directions</Text>
            </Pressable>
          </Link>
          <Pressable
            style={styles.quickItem}
            onPress={() =>
              Linking.openURL(
                "https://maps.google.com/?q=Edgemere+Barber+Shop+129+Hartford+Tpke+Shrewsbury+MA"
              )
            }
            accessibilityLabel="Leave a Google review"
          >
            <Text style={styles.quickEmoji}>⭐</Text>
            <Text style={styles.quickLabel}>Review</Text>
          </Pressable>
          <Pressable
            style={styles.quickItem}
            onPress={() => Linking.openURL(SHOP.booksy)}
            accessibilityLabel="Open Booksy"
          >
            <Text style={styles.quickEmoji}>✂️</Text>
            <Text style={styles.quickLabel}>Booksy</Text>
          </Pressable>
        </View>

        {/* Hours card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hours</Text>
          {[
            ["Monday", "Closed"],
            ["Tuesday", "10 AM – 6 PM"],
            ["Wed – Fri", "10 AM – 5:30 PM"],
            ["Saturday", "8 AM – 12 PM"],
            ["Sunday", "Closed"],
          ].map(([d, t]) => (
            <View key={d} style={styles.hourRow}>
              <Text style={styles.hourDay}>{d}</Text>
              <Text style={styles.hourTime}>{t}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footerNote}>
          {SHOP.address} · {SHOP.phoneDisplay}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.black },
  container: { padding: 20, paddingBottom: 48 },
  hero: { alignItems: "center", marginTop: 16, marginBottom: 24 },
  brandLabel: {
    color: theme.colors.gold,
    fontSize: 11,
    letterSpacing: 4,
    marginTop: 16,
    marginBottom: 12,
  },
  headline: {
    color: theme.colors.white,
    fontSize: 32,
    fontFamily: theme.fonts.display,
    textAlign: "center",
    lineHeight: 38,
  },
  italic: { color: theme.colors.goldLight, fontStyle: "italic" },
  sub: { color: theme.colors.whiteFaint, fontSize: 13, marginTop: 8 },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: "rgba(20,20,20,0.7)",
    marginBottom: 16,
  },
  statusDot: { width: 12, height: 12, borderRadius: 6 },
  statusBadge: { fontSize: 11, fontWeight: "800", letterSpacing: 2 },
  statusLabel: { color: theme.colors.whiteFaint, fontSize: 14, marginTop: 2 },
  statusWait: { color: theme.colors.gold, fontSize: 12, marginTop: 4 },
  ctaRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  ctaPrimary: {
    flex: 1,
    backgroundColor: theme.colors.gold,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  ctaPrimaryText: {
    color: theme.colors.black,
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  ctaSecondary: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.gold,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  ctaSecondaryText: {
    color: theme.colors.gold,
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  quickGrid: { flexDirection: "row", gap: 10, marginBottom: 24 },
  quickItem: {
    flex: 1,
    backgroundColor: theme.colors.black2,
    borderWidth: 1,
    borderColor: "rgba(201,169,110,0.18)",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    gap: 4,
  },
  quickEmoji: { fontSize: 22 },
  quickLabel: { color: theme.colors.whiteFaint, fontSize: 11, letterSpacing: 1 },
  card: {
    backgroundColor: theme.colors.black2,
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(201,169,110,0.18)",
    marginBottom: 16,
  },
  cardTitle: {
    color: theme.colors.goldLight,
    fontSize: 18,
    fontFamily: theme.fonts.display,
    marginBottom: 12,
  },
  hourRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  hourDay: { color: theme.colors.whiteFaint, fontSize: 14 },
  hourTime: { color: theme.colors.white, fontSize: 14 },
  footerNote: {
    color: theme.colors.whiteFainter,
    fontSize: 11,
    textAlign: "center",
    marginTop: 12,
  },
});
