/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  CampaignBar,
  CommissionComparisonSection,
  Header,
  HeroSection,
  TrustStrip,
} from './components/landing/TopSections';
import {
  CustomersAndCouponsSection,
  DigitalMenuSection,
  MarmitaBuilderSection,
  QrCodeSection,
  RealtimeKitchenSection,
  ReportsSection,
} from './components/landing/ProductSections';
import {
  CustomDomainSection,
  DirectPaymentSection,
  DriversSection,
  HowToStartSection,
} from './components/landing/OperationsSections';
import {
  FaqSection,
  FinalCtaSection,
  Footer,
  PlansSection,
} from './components/landing/ConversionSections';
import { RouteViews } from './components/landing/RouteViews';
import { PendingModeContext } from './components/landing/ui';
import { trackScrollDepthOnce } from './config/tracking';

export default function App() {
  const [route, setRoute] = useState<{ path: string; search: string }>(() => ({
    path: typeof window !== 'undefined' ? window.location.pathname : '/',
    search: typeof window !== 'undefined' ? window.location.search : '',
  }));

  const [showPending, setShowPending] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('pending') === '1';
  });

  useEffect(() => {
    const onPopState = () => {
      setRoute({
        path: window.location.pathname,
        search: window.location.search,
      });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Scroll depth tracking (25, 50, 75, 90%)
  useEffect(() => {
    if (route.path !== '/') return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const pct = (scrollTop / docHeight) * 100;
      if (pct >= 25) trackScrollDepthOnce(25);
      if (pct >= 50) trackScrollDepthOnce(50);
      if (pct >= 75) trackScrollDepthOnce(75);
      if (pct >= 90) trackScrollDepthOnce(90);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [route.path]);

  const handleNavigate = (
    href: string,
    e?: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (href.startsWith('mailto:') || href.startsWith('http')) {
      return;
    }

    if (e) {
      e.preventDefault();
    }

    if (href.startsWith('#')) {
      if (route.path !== '/') {
        window.history.pushState({}, '', `/${href}`);
        setRoute({ path: '/', search: '' });
        setTimeout(() => {
          const target = document.querySelector(href);
          if (target) {
            const top =
              target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 50);
      } else {
        const target = document.querySelector(href);
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
      return;
    }

    const [nextPath, nextQuery = ''] = href.split('?');
    const formattedSearch = nextQuery ? `?${nextQuery}` : '';
    window.history.pushState({}, '', `${nextPath}${formattedSearch}`);
    setRoute({ path: nextPath, search: formattedSearch });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLandingRoute = route.path === '/' || route.path === '';

  return (
    <PendingModeContext.Provider value={{ showPending, setShowPending }}>
      {!isLandingRoute ? (
        <RouteViews
          path={route.path}
          search={route.search}
          onNavigate={handleNavigate}
        />
      ) : (
        <div className="min-h-screen flex flex-col bg-paper text-ink">
          {/* 0. Barra de campanha */}
          <CampaignBar onNavigate={handleNavigate} />

          {/* 1. Header */}
          <Header onNavigate={handleNavigate} />

          <main className="flex-1">
            {/* 2. Hero */}
            <HeroSection onNavigate={handleNavigate} />

            {/* 3. Faixa de confiança */}
            <TrustStrip />

            {/* 4. O custo da comissão */}
            <CommissionComparisonSection />

            {/* 5. Cardápio digital */}
            <DigitalMenuSection />

            {/* 5.1 QR Code */}
            <QrCodeSection />

            {/* 6. Marmitas e pratos com regras */}
            <MarmitaBuilderSection />

            {/* 7. Cozinha em tempo real */}
            <RealtimeKitchenSection />

            {/* 8. Relatórios */}
            <ReportsSection />

            {/* 9. Clientes e cupons */}
            <CustomersAndCouponsSection />

            {/* 10. Domínio próprio */}
            <CustomDomainSection />

            {/* 11. Entregadores */}
            <DriversSection />

            {/* 12. Pagamento direto para você */}
            <DirectPaymentSection />

            {/* 13. Como começar */}
            <HowToStartSection onNavigate={handleNavigate} />

            {/* 14. Planos */}
            <PlansSection onNavigate={handleNavigate} />

            {/* 15. Perguntas frequentes */}
            <FaqSection />

            {/* 16. CTA final */}
            <FinalCtaSection onNavigate={handleNavigate} />
          </main>

          {/* 17. Rodapé */}
          <Footer onNavigate={handleNavigate} />
        </div>
      )}
    </PendingModeContext.Provider>
  );
}
