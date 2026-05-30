import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SHOP, theme } from "../theme";

const ADDRESS_ENCODED = encodeURIComponent("Edgemere Barber Shop, 129 Hartford Tpke, Shrewsbury, MA 01545");

export default function ContactScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Drop by, call, or message</Text>
      <Text style={styles.sub}>Cash only · Walk-ins welcome · Free parking</Text>

      <Pressable
        style={styles.card}
        onPress={() => Linking.openURL(`tel:${SHOP.phone}`)}
        accessibilityLabel={`Call ${SHOP.name} at ${SHOP.phoneDisplay}`}
      >
        <Text style={styles.cardLabel}>Call</Text>
        <Text style={styles.cardValue}>{SHOP.phoneDisplay}</Text>
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() => Linking.openURL(`https://maps.google.com/?q=${ADDRESS_ENCODED}`)}
        accessibilityLabel="Open in Google Maps"
      >
        <Text style={styles.cardLabel}>Address</Text>
        <Text style={styles.cardValue}>129 Hartford Tpke</Text>
        <Text style={styles.cardSub}>Shrewsbury, MA 01545</Text>
        <Text style={styles.cardCta}>Google Maps →</Text>
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() => Linking.openURL(`http://maps.apple.com/?q=${ADDRESS_ENCODED}`)}
        accessibilityLabel="Open in Apple Maps"
      >
        <Text style={styles.cardLabel}>Apple Maps</Text>
        <Text style={styles.cardCta}>Open directions →</Text>
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Hours</Text>
        {[
          ["Monday", "Closed"],
          ["Tuesday", "10 AM – 6 PM"],
          ["Wed – Fri", "10 AM – 5:30 PM"],
          ["Saturday", "8 AM – 12 PM"],
          ["Sunday", "Closed"],
        ].map(([d, t]) => (
          <View key={d} style={styles.row}>
            <Text style={styles.day}>{d}</Text>
            <Text style={styles.time}>{t}</Text>
          </View>
        ))}
      </View>

      <Pressable
        style={styles.card}
        onPress={() => Linking.openURL("https://www.facebook.com/edgemerebarbershop/")}
      >
        <Text style={styles.cardLabel}>Facebook</Text>
        <Text style={styles.cardCta}>@edgemerebarbershop →</Text>
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() => Linking.openURL("https://www.yelp.com/biz/edgemere-barber-shop-shrewsbury")}
      >
        <Text style={styles.cardLabel}>Yelp</Text>
        <Text style={styles.cardCta}>Read 462+ reviews →</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48 },
  heading: {
    color: theme.colors.white,
    fontSize: 26,
    fontFamily: theme.fonts.display,
    marginBottom: 8,
  },
  sub: { color: theme.colors.whiteFaint, marginBottom: 24 },
  card: {
    backgroundColor: theme.colors.black2,
    borderWidth: 1,
    borderColor: "rgba(201,169,110,0.24)",
    borderRadius: 10,
    padding: 18,
    marginBottom: 12,
  },
  cardLabel: {
    color: theme.colors.gold,
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 6,
  },
  cardValue: { color: theme.colors.white, fontSize: 20, fontWeight: "600" },
  cardSub: { color: theme.colors.whiteFaint, fontSize: 14, marginTop: 2 },
  cardCta: {
    color: theme.colors.gold,
    fontSize: 13,
    marginTop: 8,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  day: { color: theme.colors.whiteFaint, fontSize: 13 },
  time: { color: theme.colors.white, fontSize: 13 },
});
