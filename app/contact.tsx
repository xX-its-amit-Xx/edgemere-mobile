import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ArrowUpRight, Phone, MapPin, Star, Scissors } from "lucide-react-native";
import { SHOP, theme } from "../theme";
import { GoldRule } from "../components/GoldAccent";
import Reveal from "../components/Reveal";

const ADDRESS_ENCODED = encodeURIComponent(
  "Edgemere Barber Shop, 129 Hartford Tpke, Shrewsbury, MA 01545",
);

type ContactCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  cta?: string;
  onPress?: () => void;
};

function ContactCard({ icon, label, value, sub, cta, onPress }: ContactCardProps) {
  const Wrap = onPress ? Pressable : View;
  return (
    <Wrap style={styles.card} onPress={onPress}>
      <View style={styles.cardHead}>
        <View style={styles.iconWrap}>{icon}</View>
        <Text style={styles.cardLabel}>{label}</Text>
        {onPress ? (
          <ArrowUpRight size={16} color="rgba(201,169,110,0.5)" strokeWidth={1.6} />
        ) : null}
      </View>
      <Text style={styles.cardValue}>{value}</Text>
      {sub ? <Text style={styles.cardSub}>{sub}</Text> : null}
      {cta ? (
        <View style={styles.ctaRow}>
          <GoldRule width={20} opacity={0.5} />
          <Text style={styles.cardCta}>{cta}</Text>
        </View>
      ) : null}
    </Wrap>
  );
}

export default function ContactScreen() {
  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.black }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Reveal delay={0}>
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>FIND US ON ROUTE 20</Text>
          <Text style={styles.heroTitle}>
            Drop by,{" "}
            <Text style={styles.italic}>call</Text>, or message.
          </Text>
          <Text style={styles.heroSub}>
            Cash only · Walk-ins welcome · Free parking
          </Text>
        </View>
      </Reveal>

      <Reveal delay={120}>
        <ContactCard
          icon={<Phone size={18} color={theme.colors.gold} strokeWidth={1.6} />}
          label="CALL"
          value={SHOP.phoneDisplay}
          cta="TAP TO CALL"
          onPress={() => Linking.openURL(`tel:${SHOP.phone}`)}
        />
      </Reveal>

      <Reveal delay={200}>
        <ContactCard
          icon={<MapPin size={18} color={theme.colors.gold} strokeWidth={1.6} />}
          label="ADDRESS"
          value="129 Hartford Tpke"
          sub="Shrewsbury, MA 01545"
          cta="OPEN IN GOOGLE MAPS"
          onPress={() => Linking.openURL(`https://maps.google.com/?q=${ADDRESS_ENCODED}`)}
        />
      </Reveal>

      <Reveal delay={280}>
        <ContactCard
          icon={<MapPin size={18} color={theme.colors.gold} strokeWidth={1.6} />}
          label="APPLE MAPS"
          value="Open directions"
          cta="LAUNCH"
          onPress={() => Linking.openURL(`http://maps.apple.com/?q=${ADDRESS_ENCODED}`)}
        />
      </Reveal>

      <Reveal delay={360}>
        <View style={styles.hoursCard}>
          <View style={styles.cardHead}>
            <View style={styles.iconWrap}>
              <GoldRule width={16} />
            </View>
            <Text style={styles.cardLabel}>HOURS</Text>
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

      <Reveal delay={460}>
        <ContactCard
          icon={<Star size={18} color={theme.colors.gold} strokeWidth={1.6} fill={theme.colors.gold} />}
          label="LEAVE A REVIEW"
          value="462+ five-star reviews"
          cta="REVIEW ON GOOGLE"
          onPress={() =>
            Linking.openURL(
              "https://maps.google.com/?q=Edgemere+Barber+Shop+129+Hartford+Tpke+Shrewsbury+MA",
            )
          }
        />
      </Reveal>

      <Reveal delay={540}>
        <ContactCard
          icon={<Scissors size={18} color={theme.colors.gold} strokeWidth={1.6} />}
          label="BOOKSY"
          value="Browse all barbers"
          cta="OPEN BOOKSY"
          onPress={() => Linking.openURL(SHOP.booksy)}
        />
      </Reveal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 22, paddingTop: 24, paddingBottom: 56 },

  hero: { marginBottom: 28 },
  heroEyebrow: {
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.gold,
    fontSize: 10,
    letterSpacing: 4,
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: theme.fonts.displayBold,
    color: theme.colors.white,
    fontSize: 32,
    letterSpacing: 0.4,
    lineHeight: 36,
    marginBottom: 12,
  },
  italic: {
    fontFamily: theme.fonts.displayBoldItalic,
    color: theme.colors.goldLight,
    fontStyle: "italic",
  },
  heroSub: {
    fontFamily: theme.fonts.body,
    color: "rgba(242,239,232,0.55)",
    fontSize: 12.5,
    letterSpacing: 0.4,
  },

  card: {
    backgroundColor: "rgba(16,16,16,0.85)",
    borderWidth: 1,
    borderColor: "rgba(201,169,110,0.25)",
    borderRadius: 4,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  hoursCard: {
    backgroundColor: "rgba(16,16,16,0.85)",
    borderWidth: 1,
    borderColor: "rgba(201,169,110,0.25)",
    borderRadius: 4,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  cardHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  iconWrap: {
    width: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  cardLabel: {
    flex: 1,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.gold,
    fontSize: 9.5,
    letterSpacing: 3,
  },
  cardValue: {
    fontFamily: theme.fonts.displayBold,
    color: theme.colors.white,
    fontSize: 20,
    letterSpacing: 0.3,
  },
  cardSub: {
    fontFamily: theme.fonts.body,
    color: "rgba(242,239,232,0.55)",
    fontSize: 13,
    marginTop: 4,
    letterSpacing: 0.3,
  },
  ctaRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 12 },
  cardCta: {
    fontFamily: theme.fonts.bodyBold,
    color: theme.colors.gold,
    fontSize: 9.5,
    letterSpacing: 2.5,
  },

  hourRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  hourDay: {
    fontFamily: theme.fonts.body,
    color: "rgba(242,239,232,0.78)",
    fontSize: 13,
    letterSpacing: 0.3,
  },
  hourTime: {
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.white,
    fontSize: 13,
    letterSpacing: 0.3,
  },
  hourDim: { color: "rgba(242,239,232,0.35)" },
});
