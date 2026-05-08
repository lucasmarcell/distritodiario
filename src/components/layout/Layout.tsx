import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from '@/components/CookieConsent';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-40 md:pt-44">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
