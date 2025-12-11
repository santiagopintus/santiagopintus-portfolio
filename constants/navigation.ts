// Navigation sections - single source of truth
// Add new sections here and they'll automatically be used in:
// 1. Navigation links
// 2. Scroll spy detection
// 3. Translations (must also add to messages/*.json)

export const NAV_SECTIONS = ['about', 'projects', 'skills', 'experience', 'contact'] as const;

export type NavSection = (typeof NAV_SECTIONS)[number];
