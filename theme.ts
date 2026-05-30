// Shared design tokens — kept in sync with the website's CSS vars.
export const theme = {
  colors: {
    gold: "#c9a96e",
    goldDark: "#a07840",
    goldLight: "#e8c98a",
    black: "#080808",
    black2: "#101010",
    black3: "#181818",
    white: "#f2efe8",
    whiteFaint: "rgba(242,239,232,0.65)",
    whiteFainter: "rgba(242,239,232,0.45)",
    success: "#22c55e",
    danger: "#f87171",
  },
  fonts: {
    // System fonts for now; can swap to Cormorant Garamond / Plus Jakarta
    // via expo-font once we add Google Fonts on the mobile side.
    display: "serif",
    body: "System",
  },
  radii: { sm: 6, md: 10, lg: 16, pill: 9999 },
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
} as const;
