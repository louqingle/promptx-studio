import "./globals.css";

export const metadata = {
  title: "PromptX Studio",
  description: "AI Video Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
