import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";
import {
  ScissorsIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
} from "../../components/LinocutIcons";

/**
 * Bottom-tab layout — the modern barbershop app pattern (Great Clips / Supercuts).
 * Custom styling so it reads as cream-paper-with-ink-icons, not iOS defaults.
 * Tabs are reordered to put the most-used actions front-and-center:
 *   Shop  |  Book  |  Eddie  |  Find
 */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarActiveTintColor: theme.colors.poleRed,
        tabBarInactiveTintColor: theme.colors.inkSoft,
        tabBarLabelStyle: styles.label,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "SHOP",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused}>
              <ScissorsIcon size={22} color={focused ? theme.colors.poleRed : theme.colors.inkSoft} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          tabBarLabel: "BOOK",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused}>
              <StarIcon size={22} color={focused ? theme.colors.poleRed : theme.colors.inkSoft} filled />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarLabel: "EDDIE",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused}>
              <PhoneIcon size={22} color={focused ? theme.colors.poleRed : theme.colors.inkSoft} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          tabBarLabel: "FIND",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused}>
              <MapPinIcon size={22} color={focused ? theme.colors.poleRed : theme.colors.inkSoft} />
            </TabIcon>
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ focused, children }: { focused: boolean; children: React.ReactNode }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 4 }}>
      {children}
      {focused ? <View style={styles.activeDot} /> : <View style={styles.inactiveDot} />}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.paperDark,
    borderTopWidth: 1.5,
    borderTopColor: theme.colors.ink,
    height: 72,
    paddingTop: 4,
    paddingBottom: 8,
    // Heavy ink shadow for elevation
    shadowColor: theme.colors.ink,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 10,
  },
  tabItem: { paddingTop: 6 },
  label: {
    fontFamily: theme.fonts.typewriter,
    fontSize: 9.5,
    letterSpacing: 2,
    marginTop: 2,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.poleRed,
    marginTop: 4,
  },
  inactiveDot: {
    width: 4,
    height: 4,
    marginTop: 4,
  },
});
