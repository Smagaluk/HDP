import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: "Heritage Build Value",
  description: "Heritage Development Partners",
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
