import { useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { SHOP, theme } from "../../theme";
import { getLiveStatus } from "../../lib/status";
import DoorSign from "../../components/DoorSign";
import PaperCard from "../../components/PaperCard";
import ChairButton from "../../components/ChairButton";
import { StarRow, PhoneIcon, ArrowIcon } from "../../components/LinocutIcons";
import Reveal from "../../components/Reveal";

export default function BookScreen() {
  const [status, setStatus] = useState(getLiveStatus());
  useEffect(() => {
    const id = setInterval(() => setStatus(getLiveStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.paper }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Door sign first — answers "are you open?" before "who?" */}
      <Reveal delay={0}>
        <View style={styles.statusWrap}>
          <DoorSign status={status} />
        </View>
      </Reveal>

      {/* Big shop-window headline */}
      <Reveal delay={150}>
        <View style={styles.headerBlock}>
          <Text style={styles.eyebrow}>PICK YOUR</Text>
          <Text style={styles.headerWord}>BARBER</Text>
          <Text style={styles.subhead}>
            three chairs · all five-star · tap to book on Booksy
          </Text>
        </View>
      </Reveal>

      {SHOP.barbers.map((b, i) => (
        <Reveal key={b.key} delay={280 + i * 90}>
          <PaperCard
            style={styles.barberCard}
            onPress={() => WebBrowser.openBrowserAsync(b.booksy)}
            tilt={i % 2 === 0 ? -0.5 : 0.5}
          >
            <View style={styles.barberRow}>
              <View style={{ flex: 1 }}>
                <View style={styles.barberHead}>
                  <StarRow count={5} size={11} />
                  <Text style={styles.reviewCount}>{b.reviews} CUTS APPROVED</Text>
                </View>
                <Text style={styles.barberName}>{b.name}</Text>
                <Text style={styles.barberFullName}>· {b.fullName} ·</Text>
                <View style={styles.barberRule} />
                <Text style={styles.barberSpec}>{b.specialty}</Text>
              </View>
            </View>
            <View style={styles.barberCtaRow}>
              <Text style={styles.barberCta}>BOOK ON BOOKSY</Text>
              <ArrowIcon size={16} color={theme.colors.poleRed} />
            </View>
          </PaperCard>
        </Reveal>
      ))}

      <Reveal delay={620}>
        <Pressable
          style={styles.shopFallback}
          onPress={() => WebBrowser.openBrowserAsync(SHOP.booksy)}
        >
          <Text style={styles.shopFallbackText}>
            ·  Or book without picking a barber  ·
          </Text>
        </Pressable>
      </Reveal>

      <Reveal delay={720}>
        <View style={styles.dividerBlock}>
          <View style={styles.dividerRule} />
          <Text style={styles.dividerLabel}>OR · OLD SCHOOL</Text>
          <View style={styles.dividerRule} />
        </View>
        <Pressable
          style={styles.callBlock}
          onPress={() => Linking.openURL(`tel:${SHOP.phone}`)}
        >
          <PhoneIcon size={28} color={theme.colors.poleRed} />
          <Text style={styles.callPhone}>(508) 667·8481</Text>
          <Text style={styles.callNote}>cash only · come on by</Text>
        </Pressable>
      </Reveal>

      <Reveal delay={820}>
        <View style={styles.bottomCtaWrap}>
          <ChairButton
            label="GO TO BOOKSY"
            onPress={() => WebBrowser.openBrowserAsync(SHOP.booksy)}
            variant="red"
          />
        </View>
      </Reveal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 48 },

  statusWrap: { marginBottom: 22 },

  headerBlock: { alignItems: "center", marginBottom: 22 },
  eyebrow: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.inkSoft,
    fontSize: 12,
    letterSpacing: 5,
    marginBottom: 4,
  },
  headerWord: {
    fontFamily: theme.fonts.display,
    color: theme.colors.ink,
    fontSize: 48,
    letterSpacing: 3,
  },
  subhead: {
    fontFamily: theme.fonts.script,
    color: theme.colors.poleRed,
    fontSize: 16,
    letterSpacing: 0.5,
    marginTop: 4,
  },

  barberCard: { marginBottom: 14 },
  barberRow: { flexDirection: "row" },
  barberHead: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  reviewCount: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.inkSoft,
    fontSize: 9,
    letterSpacing: 2,
  },
  barberName: {
    fontFamily: theme.fonts.display,
    color: theme.colors.ink,
    fontSize: 32,
    letterSpacing: 1.5,
  },
  barberFullName: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.inkSoft,
    fontSize: 11,
    letterSpacing: 1,
    marginTop: 2,
  },
  barberRule: {
    height: 1,
    width: 32,
    backgroundColor: theme.colors.ink,
    marginVertical: 10,
  },
  barberSpec: {
    fontFamily: theme.fonts.body,
    color: theme.colors.ink,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.3,
  },
  barberCtaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.inkFaint,
    borderStyle: "dashed",
  },
  barberCta: {
    fontFamily: theme.fonts.display,
    color: theme.colors.poleRed,
    fontSize: 13,
    letterSpacing: 3,
  },

  shopFallback: { alignItems: "center", paddingVertical: 14, marginBottom: 18 },
  shopFallbackText: {
    fontFamily: theme.fonts.script,
    color: theme.colors.inkSoft,
    fontSize: 16,
    letterSpacing: 0.5,
  },

  dividerBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 18,
  },
  dividerRule: {
    flex: 1,
    height: 1.5,
    backgroundColor: theme.colors.ink,
  },
  dividerLabel: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.ink,
    fontSize: 10,
    letterSpacing: 4,
  },

  callBlock: {
    alignItems: "center",
    paddingVertical: 22,
    paddingHorizontal: 22,
    borderWidth: 2,
    borderColor: theme.colors.ink,
    borderStyle: "dashed",
    gap: 8,
    marginBottom: 18,
  },
  callPhone: {
    fontFamily: theme.fonts.display,
    color: theme.colors.poleRed,
    fontSize: 32,
    letterSpacing: 2,
  },
  callNote: {
    fontFamily: theme.fonts.script,
    color: theme.colors.inkSoft,
    fontSize: 15,
    letterSpacing: 0.5,
  },

  bottomCtaWrap: { marginTop: 6 },
});
