// Own root layout: the Studio lives outside [locale] and needs none of the site's chrome.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
