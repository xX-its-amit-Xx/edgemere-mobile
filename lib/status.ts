// Same wait-time logic as the website's OpenStatus.tsx — kept local so the
// app works offline. Eastern Time conversion mirrors the source.

const BUSY_SCHEDULE: Record<number, { openHour: number; levels: number[] }> = {
  2: { openHour: 10, levels: [38, 65, 83, 74, 55, 68, 77, 52] },
  3: { openHour: 10, levels: [28, 62, 78, 66, 50, 60, 70, 40] },
  4: { openHour: 10, levels: [28, 62, 78, 66, 50, 60, 70, 40] },
  5: { openHour: 10, levels: [35, 70, 88, 76, 58, 68, 80, 48] },
  6: { openHour: 8, levels: [75, 90, 84, 60] },
};

export type LiveStatus = {
  open: boolean;
  label: string;
  wait: string | null;
};

function waitHint(day: number, hour: number): string | null {
  const sched = BUSY_SCHEDULE[day];
  if (!sched) return null;
  const idx = hour - sched.openHour;
  if (idx < 0 || idx >= sched.levels.length) return null;
  const level = sched.levels[idx];
  if (level >= 80) return "Very busy — book to skip the wait";
  if (level >= 60) return "~20–35 min walk-in wait";
  if (level >= 40) return "~10–20 min walk-in wait";
  return "Little to no wait right now";
}

export function getLiveStatus(): LiveStatus {
  const now = new Date();
  const et = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const day = et.getDay();
  const hour = et.getHours();
  const min = et.getMinutes();
  const time = hour * 60 + min;

  if (day === 0) return { open: false, label: "Opens Tue at 10 AM", wait: null };
  if (day === 1) return { open: false, label: "Opens tomorrow at 10 AM", wait: null };
  if (day === 6) {
    if (time >= 480 && time < 720) return { open: true, label: "Open until 12:00 PM", wait: waitHint(day, hour) };
    if (time < 480) return { open: false, label: "Opens at 8:00 AM today", wait: null };
    return { open: false, label: "Opens Tue at 10 AM", wait: null };
  }
  if (day === 2) {
    if (time >= 600 && time < 1080) return { open: true, label: "Open until 6:00 PM", wait: waitHint(day, hour) };
    if (time < 600) return { open: false, label: "Opens at 10:00 AM today", wait: null };
    return { open: false, label: "Opens Wed at 10 AM", wait: null };
  }
  if (time >= 600 && time < 1050) return { open: true, label: "Open until 5:30 PM", wait: waitHint(day, hour) };
  if (time < 600) return { open: false, label: "Opens at 10:00 AM today", wait: null };
  if (day === 5) return { open: false, label: "Opens Sat at 8 AM", wait: null };
  return { open: false, label: "Opens tomorrow at 10 AM", wait: null };
}
