import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { CustomCursor } from "./CustomCursor";
import { LanguageProvider } from "@/lib/i18n";

type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <LanguageProvider>
      <div className="font-display-scope min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <CustomCursor />
      </div>
    </LanguageProvider>
  );
}
