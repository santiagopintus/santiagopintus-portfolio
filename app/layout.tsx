import { Analytics } from '@vercel/analytics/next';
// This root layout is only used for the root redirect and Analytics
// The actual layout with html/body tags is in app/[locale]/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
