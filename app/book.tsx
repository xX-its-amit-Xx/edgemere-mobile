import { useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { SHOP, theme } from "../theme";
import { getLiveStatus } from "../lib/status";

export default function BookScreen() {
  const [status, setStatus] = useState(getLiveStatus());
  useEffect(() => {
    const id = setInterval(() => setStatus(getLiveStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Live status hero */}
      <View
        style={[
          styles.statusHero,
          { borderColor: status.open ? theme.colors.success : theme.colors.danger },
        ]}
      >
        <View
          style={[
            styles.dot,
            { backgroundColor: status.open ? theme.colors.success : theme.colors.danger },
          ]}
        />
        <View>
          <Text style={[styles.statusBadge, { color: status.open ? theme.colors.success : theme.colors.danger }]}>
            {status.open ? "OPEN NOW" : "CLOSED"}
          </Text>
          {status.open && status.wait ? (
            <Text style={styles.waitHeadline}>{status.wait}</Text>
          ) : (
            <Text style={styles.waitHeadline}>{status.label}</Text>
          )}
        </View>
      </View>

      <Text style={styles.sectionLabel}>PICK YOUR BARBER</Text>

      {SHOP.barbers.map((b) => (
        <Pressable
          key={b.key}
          style={styles.barberCard}
          onPress={() => WebBrowser.openBrowserAsync(b.booksy)}
          accessibilityLabel={`Book with ${b.name} on Booksy`}
        >
          <View style={styles.barberHeader}>
            <Text style={styles.barberStars}>5.0 ★ · {b.reviews} reviews</Text>
          </View>
          <Text style={styles.barberName}>{b.name}</Text>
          <Text style={styles.barberFullName}>{b.fullName}</Text>
          <Text style={styles.barberSpecialty}>{b.specialty}</Text>
          <Text style={styles.barberCta}>Book on Booksy →</Text>
        </Pressable>
      ))}

      <Pressable
        style={styles.shopCard}
        onPress={() => WebBrowser.openBrowserAsync(SHOP.booksy)}
      >
        <Text style={styles.shopCardText}>Or book without choosing a specific barber →</Text>
      </Pressable>

      <View style={styles.divider} />

      <Text style={styles.sectionLabel}>OLD SCHOOL</Text>
      <Pressable
        style={styles.callCard}
        onPress={() => Linking.openURL(`tel:${SHOP.phone}`)}
      >
        <Text style={styles.callCardTitle}>Just call us</Text>
        <Text style={styles.callCardPhone}>{SHOP.phoneDisplay}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  statusHero: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: "rgba(20,20,20,0.7)",
    marginBottom: 28,
  },
  dot: { width: 14, height: 14, borderRadius: 7 },
  statusBadge: { fontSize: 11, fontWeight: "800", letterSpacing: 2, marginBottom: 4 },
  waitHeadline: { color: theme.colors.white, fontSize: 18, fontFamily: theme.fonts.display },
  sectionLabel: {
    color: theme.colors.gold,
    fontSize: 11,
    letterSpacing: 3,
    marginBottom: 14,
  },
  barberCard: {
    backgroundColor: theme.colors.black2,
    borderRadius: 10,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(201,169,110,0.28)",
    marginBottom: 12,
  },
  barberHeader: { marginBottom: 8 },
  barberStars: {
    color: theme.colors.gold,
    fontSize: 10,
    letterSpacing: 2,
  },
  barberName: {
    color: theme.colors.goldLight,
    fontSize: 24,
    fontFamily: theme.fonts.display,
  },
  barberFullName: {
    color: theme.colors.whiteFainter,
    fontSize: 12,
    marginBottom: 8,
  },
  barberSpecialty: {
    color: theme.colors.whiteFaint,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  barberCta: {
    color: theme.colors.gold,
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  shopCard: {
    alignItems: "center",
    padding: 14,
    marginTop: 8,
    marginBottom: 24,
  },
  shopCardText: {
    color: theme.colors.whiteFaint,
    fontSize: 13,
    textDecorationLine: "underline",
    textDecorationStyle: "dashed",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(201,169,110,0.18)",
    marginVertical: 16,
  },
  callCard: {
    backgroundColor: theme.colors.black2,
    borderRadius: 10,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(201,169,110,0.28)",
    alignItems: "center",
  },
  callCardTitle: {
    color: theme.colors.goldLight,
    fontSize: 16,
    fontFamily: theme.fonts.display,
    fontStyle: "italic",
    marginBottom: 6,
  },
  callCardPhone: {
    color: theme.colors.gold,
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
