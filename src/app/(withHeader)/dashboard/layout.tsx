import { ThemeProvider } from "next-themes";
export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </>
  );
}
