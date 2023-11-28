import type { Metadata } from "next";
import { Providers } from "./providers";
import LayoutClientElement from "./LayoutClientElement";

export const metadata: Metadata = {
  title: "Home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          <LayoutClientElement>{children}</LayoutClientElement>
        </Providers>
      </body>
    </html>
  );
}
