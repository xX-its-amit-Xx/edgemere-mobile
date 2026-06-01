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
import { Send } from "lucide-react-native";
import { SHOP, theme } from "../theme";
import BarberAvatar from "../components/BarberAvatar";

type Message = { role: "user" | "assistant"; content: string };

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hey — I'm Eddie, Edgemere's AI barber. Ask me about hours, prices, the barbers, walk-in wait, or anything else.",
};

const QUICKS = [
  "What are your hours?",
  "How busy are you right now?",
  "Which barber for fades?",
  "Do you take walk-ins?",
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

        // RN's fetch doesn't expose ReadableStream — read the full body once.
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
            {m.role === "assistant" && <BarberAvatar size={30} ringed />}
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
            <BarberAvatar size={30} ringed />
            <View
              style={[
                styles.bubble,
                styles.bubbleAssistant,
                { minHeight: 40, justifyContent: "center", paddingHorizontal: 16 },
              ]}
            >
              <ActivityIndicator color={theme.colors.gold} size="small" />
            </View>
          </View>
        )}
      </ScrollView>

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
          placeholderTextColor="rgba(242,239,232,0.35)"
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
          <Send size={15} color={theme.colors.black} strokeWidth={2.4} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.black },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 12 },
  row: { flexDirection: "row", alignItems: "flex-end", gap: 9 },
  rowUser: { justifyContent: "flex-end" },
  rowAssistant: { justifyContent: "flex-start" },
  bubble: {
    maxWidth: "78%",
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 16,
  },
  bubbleUser: {
    backgroundColor: theme.colors.gold,
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    backgroundColor: "rgba(201,169,110,0.07)",
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(201,169,110,0.2)",
  },
  textUser: {
    fontFamily: theme.fonts.body,
    color: theme.colors.black,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.2,
  },
  textAssistant: {
    fontFamily: theme.fonts.body,
    color: theme.colors.white,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.2,
  },
  quicks: {
    maxHeight: 46,
    borderTopWidth: 1,
    borderTopColor: "rgba(201,169,110,0.12)",
  },
  quicksContent: { padding: 10, gap: 8, alignItems: "center" },
  quickBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "rgba(201,169,110,0.32)",
    borderRadius: 999,
    backgroundColor: "rgba(201,169,110,0.06)",
  },
  quickBtnText: {
    fontFamily: theme.fonts.bodyMedium,
    color: "rgba(242,239,232,0.7)",
    fontSize: 11.5,
    letterSpacing: 0.3,
  },
  inputBar: {
    flexDirection: "row",
    padding: 11,
    gap: 9,
    borderTopWidth: 1,
    borderTopColor: "rgba(201,169,110,0.14)",
    alignItems: "flex-end",
    backgroundColor: theme.colors.black2,
  },
  input: {
    flex: 1,
    color: theme.colors.white,
    fontFamily: theme.fonts.body,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
    letterSpacing: 0.2,
    borderWidth: 1,
    borderColor: "rgba(201,169,110,0.18)",
  },
  sendBtn: {
    backgroundColor: theme.colors.gold,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    minWidth: 44,
    alignItems: "center",
    shadowColor: theme.colors.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  sendBtnDisabled: {
    backgroundColor: "rgba(201,169,110,0.3)",
    shadowOpacity: 0,
  },
});
