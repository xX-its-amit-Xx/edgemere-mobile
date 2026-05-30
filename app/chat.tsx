import { useCallback, useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { Svg, Circle, Path, Ellipse } from "react-native-svg";
import { SHOP, theme } from "../theme";

type Message = { role: "user" | "assistant"; content: string };

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hey! I'm Eddie, Edgemere's AI barber. Ask me about hours, prices, the barbers, walk-in wait — or anything else.",
};

const QUICKS = [
  "What are your hours?",
  "How busy are you right now?",
  "Which barber for fades?",
  "Do you take walk-ins?",
];

function BarberAvatar({ size = 28 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: theme.colors.black2,
        borderWidth: 1.5,
        borderColor: theme.colors.gold,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={size * 0.84} height={size * 0.84} viewBox="0 0 64 64">
        <Circle cx="32" cy="34" r="17" fill="#e8c98a" />
        <Path d="M15 28 Q15 14 32 12 Q49 14 49 28 Q49 22 46 19 Q40 11 32 11 Q24 11 18 19 Q15 22 15 28 Z" fill="#1a1209" />
        <Ellipse cx="26" cy="32" rx="1.4" ry="1.7" fill="#0a0a0a" />
        <Ellipse cx="38" cy="32" rx="1.4" ry="1.7" fill="#0a0a0a" />
        <Path d="M19 42 Q24 38 32 41 Q40 38 45 42 Q42 45 38 44 Q35 44 32 43 Q29 44 26 44 Q22 45 19 42 Z" fill="#3a2818" />
        <Path d="M27 52 L32 49 L37 52 L37 55 L32 52 L27 55 Z" fill={theme.colors.gold} />
      </Svg>
    </View>
  );
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamText, setStreamText] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, streamText]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      const next: Message[] = [...messages, { role: "user", content: trimmed }];
      setMessages(next);
      setInput("");
      setStreaming(true);
      setStreamText("");

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
            errText = "Slow down a moment — try again in a few seconds!";
          }
          setMessages((p) => [...p, { role: "assistant", content: errText }]);
          setStreaming(false);
          return;
        }

        // React Native fetch doesn't expose ReadableStream natively — read full body.
        // (For a future iteration, swap to react-native-fetch-api or a polyfill
        //  to get token-by-token streaming. Full-response is acceptable for now —
        //  Groq's llama-3.3-70b finishes a 400-token reply in 1-2 seconds.)
        const fullText = await res.text();
        setMessages((p) => [...p, { role: "assistant", content: fullText }]);
        setStreamText("");
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
    [messages, streaming]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
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
            {m.role === "assistant" && <BarberAvatar size={28} />}
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
            <BarberAvatar size={28} />
            <View style={[styles.bubble, styles.bubbleAssistant, { minHeight: 36, justifyContent: "center" }]}>
              <ActivityIndicator color={theme.colors.gold} size="small" />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Quick buttons */}
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
            style={styles.quickBtn}
            onPress={() => send(q)}
          >
            <Text style={styles.quickBtnText}>{q}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputBar}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask Eddie…"
          placeholderTextColor={theme.colors.whiteFainter}
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
        >
          <Text style={styles.sendBtnText}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.black },
  scroll: { flex: 1 },
  scrollContent: { padding: 14, gap: 10 },
  row: { flexDirection: "row", alignItems: "flex-end", gap: 8 },
  rowUser: { justifyContent: "flex-end" },
  rowAssistant: { justifyContent: "flex-start" },
  bubble: {
    maxWidth: "82%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  bubbleUser: {
    backgroundColor: theme.colors.gold,
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    backgroundColor: theme.colors.black2,
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(201,169,110,0.2)",
  },
  textUser: { color: theme.colors.black, fontSize: 14, lineHeight: 20 },
  textAssistant: { color: theme.colors.white, fontSize: 14, lineHeight: 20 },
  quicks: {
    maxHeight: 44,
    borderTopWidth: 1,
    borderTopColor: "rgba(201,169,110,0.12)",
  },
  quicksContent: { padding: 10, gap: 8 },
  quickBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(201,169,110,0.3)",
    borderRadius: 999,
    backgroundColor: "rgba(201,169,110,0.06)",
  },
  quickBtnText: { color: theme.colors.whiteFaint, fontSize: 12 },
  inputBar: {
    flexDirection: "row",
    padding: 10,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(201,169,110,0.14)",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    color: theme.colors.white,
    backgroundColor: theme.colors.black2,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
  },
  sendBtn: {
    backgroundColor: theme.colors.gold,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  sendBtnDisabled: {
    backgroundColor: "rgba(201,169,110,0.3)",
  },
  sendBtnText: {
    color: theme.colors.black,
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 1,
  },
});
