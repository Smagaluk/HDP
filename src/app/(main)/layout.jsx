import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthWrapper } from "@/components/AuthWrapper";

export const dynamic = 'force-dynamic';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <AuthWrapper>{children}</AuthWrapper>
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
