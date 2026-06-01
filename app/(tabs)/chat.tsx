import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SHOP, theme } from "../../theme";
import EddiePortrait from "../../components/EddiePortrait";
import { ArrowIcon } from "../../components/LinocutIcons";

type Message = { role: "user" | "assistant"; content: string };

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hey — I'm Eddie, Edgemere's barbershop helper. Ask me about hours, prices, the barbers, walk-in wait, or anything else.",
};

const QUICKS = [
  "What are your hours?",
  "How busy now?",
  "Best barber for a fade?",
  "Walk-ins okay?",
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, streaming]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      const next: Message[] = [...messages, { role: "user", content: trimmed }];
      setMessages(next);
      setInput("");
      setStreaming(true);

      try {
        const res = await fetch(`${SHOP.apiBase}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next }),
        });

        if (!res.ok) {
          let errText = "Couldn't reach Eddie. Call (508) 667-8481 or open Booksy.";
          if (res.status === 503) {
            try {
              const j = await res.json();
              if (j?.error) errText = j.error;
            } catch { /* ignore */ }
          } else if (res.status === 429) {
            errText = "Slow down a moment — try again in a few seconds.";
          }
          setMessages((p) => [...p, { role: "assistant", content: errText }]);
          setStreaming(false);
          return;
        }

        const fullText = await res.text();
        setMessages((p) => [...p, { role: "assistant", content: fullText }]);
      } catch {
        setMessages((p) => [
          ...p,
          {
            role: "assistant",
            content: "Network problem. Call (508) 667-8481 — we'll take care of you.",
          },
        ]);
      } finally {
        setStreaming(false);
      }
    },
    [messages, streaming],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 96 : 0}
      style={styles.root}
    >
      {/* Eddie shop-keeper portrait at top */}
      <View style={styles.portraitWrap}>
        <EddiePortrait size={68} framed />
        <View>
          <Text style={styles.portraitName}>EDDIE</Text>
          <Text style={styles.portraitRole}>your shop helper</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {messages.map((m, i) => (
          <View
            key={i}
            style={[
              styles.row,
              m.role === "user" ? styles.rowUser : styles.rowAssistant,
            ]}
          >
            {m.role === "assistant" && <EddiePortrait size={36} framed />}
            <View
              style={[
                styles.bubble,
                m.role === "user" ? styles.bubbleUser : styles.bubbleAssistant,
              ]}
            >
              <Text style={m.role === "user" ? styles.textUser : styles.textAssistant}>
                {m.content}
              </Text>
            </View>
          </View>
        ))}
        {streaming && (
          <View style={[styles.row, styles.rowAssistant]}>
            <EddiePortrait size={36} framed />
            <View
              style={[
                styles.bubble,
                styles.bubbleAssistant,
                { minHeight: 40, justifyContent: "center", paddingHorizontal: 16 },
              ]}
            >
              <ActivityIndicator color={theme.colors.ink} size="small" />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Quick prompts as torn ticket stubs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quicks}
        contentContainerStyle={styles.quicksContent}
      >
        {QUICKS.map((q) => (
          <Pressable
            key={q}
            disabled={streaming}
            style={[styles.quickBtn, streaming && { opacity: 0.5 }]}
            onPress={() => send(q)}
          >
            <Text style={styles.quickBtnText}>{q}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.inputBar}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask Eddie…"
          placeholderTextColor={theme.colors.inkFaint}
          style={styles.input}
          multiline
          editable={!streaming}
          onSubmitEditing={() => send(input)}
        />
        <Pressable
          disabled={streaming || !input.trim()}
          style={[
            styles.sendBtn,
            (streaming || !input.trim()) && styles.sendBtnDisabled,
          ]}
          onPress={() => send(input)}
          accessibilityLabel="Send message"
        >
          <ArrowIcon size={18} color={theme.colors.poleCream} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.paper },

  portraitWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: theme.colors.ink,
    borderStyle: "dashed",
    backgroundColor: theme.colors.paperDark,
  },
  portraitName: {
    fontFamily: theme.fonts.display,
    color: theme.colors.ink,
    fontSize: 22,
    letterSpacing: 3,
  },
  portraitRole: {
    fontFamily: theme.fonts.script,
    color: theme.colors.poleRed,
    fontSize: 14,
    letterSpacing: 0.5,
  },

  scroll: { flex: 1 },
  scrollContent: { padding: 14, gap: 12 },
  row: { flexDirection: "row", alignItems: "flex-end", gap: 9 },
  rowUser: { justifyContent: "flex-end" },
  rowAssistant: { justifyContent: "flex-start" },
  bubble: {
    maxWidth: "78%",
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderWidth: 1.5,
    borderColor: theme.colors.ink,
  },
  bubbleUser: {
    backgroundColor: theme.colors.poleRed,
    borderColor: theme.colors.poleRedDark,
    // Torn-paper look: irregular bottom-right corner
    borderBottomRightRadius: 0,
  },
  bubbleAssistant: {
    backgroundColor: theme.colors.paperDark,
    borderTopLeftRadius: 0,
  },
  textUser: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.poleCream,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  textAssistant: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.ink,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.3,
  },

  quicks: {
    maxHeight: 48,
    borderTopWidth: 1.5,
    borderTopColor: theme.colors.ink,
    borderStyle: "dashed",
    backgroundColor: theme.colors.paperDark,
  },
  quicksContent: { padding: 10, gap: 8, alignItems: "center" },
  quickBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1.5,
    borderColor: theme.colors.ink,
    backgroundColor: theme.colors.paper,
  },
  quickBtnText: {
    fontFamily: theme.fonts.typewriter,
    color: theme.colors.ink,
    fontSize: 11,
    letterSpacing: 0.4,
  },

  inputBar: {
    flexDirection: "row",
    padding: 10,
    gap: 8,
    borderTopWidth: 1.5,
    borderTopColor: theme.colors.ink,
    alignItems: "flex-end",
    backgroundColor: theme.colors.paperDark,
  },
  input: {
    flex: 1,
    color: theme.colors.ink,
    fontFamily: theme.fonts.typewriter,
    backgroundColor: theme.colors.paper,
    borderWidth: 1.5,
    borderColor: theme.colors.ink,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
    letterSpacing: 0.3,
  },
  sendBtn: {
    backgroundColor: theme.colors.poleRed,
    borderWidth: 1.5,
    borderColor: theme.colors.poleRedDark,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minWidth: 48,
    alignItems: "center",
  },
  sendBtnDisabled: {
    backgroundColor: theme.colors.inkFainter,
    borderColor: theme.colors.inkFaint,
  },
});
