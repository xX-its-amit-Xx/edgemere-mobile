// Edgemere mobile design tokens — "Shop Window" rebrand.
// Cream paper, deep ink, barber-pole red and blue. Slab serifs and typewriter
// for body. Gilt is a rare accent only (hardware highlights), not the dominant
// color. Mirrors the visual language of a real 1920s American barbershop —
// not a SaaS dashboard.

export const theme = {
  colors: {
    paper: "#f4ecd8",        // dominant background — warm off-white
    paperDark: "#e8dcc0",    // card surface — slightly darker cream
    paperShadow: "#d8c9a0",  // shadow lines, hairline ink
    ink: "#1a1410",          // body text + heavy ink
    inkSoft: "rgba(26,20,16,0.72)",
    inkFaint: "rgba(26,20,16,0.45)",
    inkFainter: "rgba(26,20,16,0.22)",
    poleRed: "#c8312a",      // primary CTA, barber-pole red stripe
    poleRedDark: "#a4241e",
    poleBlue: "#1f4a7a",     // secondary accent, barber-pole blue stripe
    poleBlueDark: "#163758",
    poleCream: "#f8f3e3",    // white stripe of the pole
    brass: "#a07840",        // metal hardware (sparing)
    brassLight: "#d4a455",
    success: "#5a8a3a",      // OPEN sign green (muted, not neon)
    danger: "#a4241e",       // CLOSED red (matches pole-red-dark)
  },
  fonts: {
    // Loaded via @expo-google-fonts in _layout.tsx
    display: "AlfaSlabOne_400Regular",       // sign-painter slab — wordmark + big headers
    script: "Limelight_400Regular",          // Art Deco condensed caps — accents like "Est. 2010"
    typewriter: "SpecialElite_400Regular",   // ticket/label feel
    body: "PublicSans_400Regular",
    bodyMedium: "PublicSans_500Medium",
    bodyBold: "PublicSans_700Bold",
  },
  radii: { sm: 2, md: 4, lg: 8, pill: 9999 },  // mostly square — paper signs don't have rounded corners
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
} as const;

export const SHOP = {
  name: "Edgemere Barber Shop",
  phone: "+15086678481",
  phoneDisplay: "(508) 667-8481",
  address: "129 Hartford Tpke, Shrewsbury, MA 01545",
  booksy: "https://booksy.com/en-us/1369750_edgemere-barbershop_barber-shop_22487_shrewsbury",
  apiBase: "https://edgemerebarbershop.com",
  barbers: [
    {
      key: "jb",
      name: "JB",
      fullName: "Jason Biegen",
      specialty: "Precision cuts & beard work",
      reviews: 156,
      booksy: "https://booksy.com/en-us/466856_jb-the-barber-edgemere-barbershop_barber-shop_22487_shrewsbury",
    },
    {
      key: "matty",
      name: "Matty Ice",
      fullName: "Matt Cox",
      specialty: "Fades, texture & kids' cuts",
      reviews: 129,
      booksy: "https://booksy.com/en-us/723622_matty-ice-edgemere-barbershop_barber-shop_22487_shrewsbury",
    },
    {
      key: "ian",
      name: "Ian",
      fullName: "Ian Hunt — the Bald Barber",
      specialty: "Classic cuts & welcoming vibe",
      reviews: 177,
      booksy: "https://booksy.com/en-us/508548_bald-barber-edgemere-barbershop_barber-shop_22487_shrewsbury",
    },
  ],
  services: [
    { name: "Classic Cut", price: "$30" },
    { name: "Fade", price: "$30–35" },
    { name: "Kids Cut", price: "$27" },
    { name: "Beard Trim", price: "$15–25" },
    { name: "Hot Towel Shave", price: "$35–50" },
    { name: "Cut + Shave", price: "$60–75" },
    { name: "The Works", price: "$75" },
  ],
} as const;
