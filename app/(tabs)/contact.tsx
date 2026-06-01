import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SHOP, theme } from "../../theme";
import PaperCard from "../../components/PaperCard";
import { PhoneIcon, MapPinIcon, StarIcon, ScissorsIcon, ArrowIcon } from "../../components/LinocutIcons";
import Reveal from "../../components/Reveal";

const ADDRESS_ENCODED = encodeURIComponent(
  "Edgemere Barber Shop, 129 Hartford Tpke, Shrewsbury, MA 01545",
);

type CardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  cta?: string;
  onPress?: () => void;
  tilt?: number;
};

function ContactCard({ icon, label, value, sub, cta, onPress, tilt }: CardProps) {
  return (
    <PaperCard onPress={onPress} style={styles.card} tilt={tilt}>
      <View style={styles.cardHead}>
        <View style={styles.iconWrap}>{icon}</View>
        <Text style={styles.cardLabel}>{label}</Text>
        {onPress ? <ArrowIcon size={16} color={theme.colors.poleRed} /> : null}
      </View>
      <Text style={styles.cardValue}>{value}</Text>
      {sub ? <Text style={styles.cardSub}>{sub}</Text> : null}
      {cta ? (
        <View style={styles.ctaRow}>
          <View style={styles.ctaRule} />
          <Text style={styles.cardCta}>{cta}</Text>
        </View>
      ) : null}
    </PaperCard>
  );
}

export default function ContactScreen() {
  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.paper }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Reveal delay={0}>
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>ROUTE 20 · SHREWSBURY</Text>
          <Text style={styles.heroTitle}>FIND THE SHOP</Text>
          <Text style={styles.heroScript}>drop by · call · or come on in</Text>
          <Text style={styles.heroSub}>CASH ONLY · WALK-INS WELCOME · FREE PARKING</Text>
        </View>
      </Reveal>

      <Reveal delay={120}>
        <ContactCard
          icon={<PhoneIcon size={20} color={theme.colors.poleRed} />}
          label="CALL"
          value="(508) 667·8481"
          cta="TAP TO RING"
          onPress={() => Linking.openURL(`tel:${SHOP.phone}`)}
          tilt={-0.4}
        />
      </Reveal>

      <Reveal delay={210}>
        <ContactCard
          icon={<MapPinIcon size={20} color={theme.colors.poleRed} />}
          label="ADDRESS"
          value="129 HARTFORD TPKE"
          sub="Shrewsbury, MA 01545"
          cta="OPEN IN GOOGLE MAPS"
          onPress={() => Linking.openURL(`https://maps.google.com/?q=${ADDRESS_ENCODED}`)}
          tilt={0.4}
        />
      </Reveal>

      <Reveal delay={300}>
        <ContactCard
          icon={<MapPinIcon size={20} color={theme.colors.poleBlue} />}
          label="APPLE MAPS"
          value="OPEN DIRECTIONS"
          cta="LAUNCH"
          onPress={() => Linking.openURL(`http://maps.apple.com/?q=${ADDRESS_ENCODED}`)}
          tilt={-0.3}
        />
      </Reveal>

      <Reveal delay={390}>
        <PaperCard style={styles.hoursCard} tilt={0.3}>
          <View style={styles.cardHead}>
            <Text style={styles.cardLabel}>HOURS</Text>
          </View>
          <View style={styles.hoursRule} />
          {[
            ["Monday", "Closed", true],
            ["Tuesday", "10 AM – 6 PM", false],
            ["Wed – Fri", "10 AM – 5:30 PM", false],
            ["Saturday", "8 AM – 12 PM", false],
            ["Sunday", "Closed", true],
          ].map(([d, t, dim]) => (
            <View key={d as string} style={styles.hourRow}>
              <Text style={[styles.hourDay, dim && styles.hourDim]}>{d}</Text>
              <View style={styles.hourFill} />
              <Text style={[styles.hourTime, dim && styles.hourDim]}>{t}</Text>
            </View>
          ))}
        </PaperCard>
      </Reveal>

      <Reveal delay={480}>
        <ContactCard
          icon={<StarIcon size={20} color={theme.colors.poleRed} filled />}
          label="LEAVE A REVIEW"
          value="462+ FIVE-STAR CUTS"
          cta="REVIEW ON GOOGLE"
          onPress={() =>
            Linking.openURL(
              "https://maps.google.com/?q=Edgemere+Barber+Shop+129+Hartford+Tpke+Shrewsbury+MA",
            )
          }
          tilt={-0.3}
        />
      </Reveal>

      <Reveal delay={560}>
        <ContactCard
          icon={<ScissorsIcon size={20} color={theme.colors.poleBlue} />}
          label="BOOKSY"
          value="BROWSE ALL BARBERS"
          cta="OPEN BOOKSY"
          onPress={() => Linking.openURL(SHOP.booksy)}
          tilt={0.3}
        />
      </Reveal>

      <Reveal delay={650}>
        <View style={styles.outro}>
          <Text style={styles.outroScript}>See you soon.</Text>
        </View>
      </Reveal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 56 },

  hero: { alignItems: "center", marginBottom: 22 },
  heroEyebrow: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.inkSoft,
    fontSize: 11,
    letterSpacing: 4,
  },
  heroTitle: {
    fontFamily: theme.fonts.display,
    color: theme.colors.ink,
    fontSize: 36,
    letterSpacing: 3,
    marginTop: 6,
  },
  heroScript: {
    fontFamily: theme.fonts.script,
    color: theme.colors.poleRed,
    fontSize: 18,
    letterSpacing: 0.5,
    marginTop: 6,
  },
  heroSub: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.inkSoft,
    fontSize: 10,
    letterSpacing: 2.5,
    marginTop: 10,
  },

  card: { marginBottom: 12 },
  hoursCard: { marginBottom: 12 },
  cardHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  iconWrap: {
    width: 24,
    alignItems: "center",
  },
  cardLabel: {
    flex: 1,
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.ink,
    fontSize: 10,
    letterSpacing: 3.5,
  },
  cardValue: {
    fontFamily: theme.fonts.display,
    color: theme.colors.ink,
    fontSize: 22,
    letterSpacing: 1.5,
  },
  cardSub: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.inkSoft,
    fontSize: 12,
    letterSpacing: 0.6,
    marginTop: 4,
  },
  ctaRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12 },
  ctaRule: {
    width: 22,
    height: 1.5,
    backgroundColor: theme.colors.poleRed,
  },
  cardCta: {
    fontFamily: theme.fonts.display,
    color: theme.colors.poleRed,
    fontSize: 11,
    letterSpacing: 3,
  },

  hoursRule: {
    height: 1.5,
    backgroundColor: theme.colors.ink,
    marginBottom: 10,
  },
  hourRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  hourDay: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.ink,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  hourFill: {
    flex: 1,
    height: 1,
    marginHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.inkFaint,
    borderStyle: "dotted",
    marginBottom: 4,
  },
  hourTime: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.ink,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  hourDim: { color: theme.colors.inkFaint },

  outro: { alignItems: "center", paddingVertical: 18 },
  outroScript: {
    fontFamily: theme.fonts.script,
    color: theme.colors.ink,
    fontSize: 26,
    letterSpacing: 1,
  },
});
