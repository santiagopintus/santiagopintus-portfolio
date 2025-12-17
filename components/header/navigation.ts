// Navigation sections - single source of truth
// Add new sections here and they'll automatically be used in:
// 1. Navigation links
// 2. Scroll spy detection
// 3. Translations (must also add to messages/*.json)

//ORDER MATTERS - this array defines the order of sections in the nav
export const NAV_SECTIONS = ['projects', 'experience', 'about', 'contact'] as const;

export type NavSection = (typeof NAV_SECTIONS)[number];
