import React, { useEffect, useRef, useState } from 'react';
import {
  Bell,
  Check,
  FileText,
  Lock,
  MapPin,
  Menu,
  Navigation,
  Percent,
  ShieldCheck,
  ShoppingBag,
  Store,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import { CAMPAIGN, CTA_URL, SIGNUP } from '../../config/landing';
import { PLANS, formatBRL } from '../../config/plans';
import { trackCtaClick, trackDemoInteractionOnce } from '../../config/tracking';
import {
  BrandLogo,
  Button,
  Card,
  Eyebrow,
  PendingText,
  Pill,
  Section,
} from './ui';
import ManducaPhoneMockup from '../ManducaPhoneMockup';

interface NavigationProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function CampaignBar({ onNavigate }: NavigationProps) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('manduca_campaign_dismissed');
      if (saved === '1') {
        setDismissed(true);
      }
    } catch {
      // Ignore sessionStorage errors in restricted contexts
    }
  }, []);

  if (!CAMPAIGN.active || dismissed) {
    return null;
  }

  const handleClose = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('manduca_campaign_dismissed', '1');
    } catch {
      // Ignore
    }
  };

  return (
    <div
      role="region"
      aria-label="Aviso de campanha"
      className="relative z-50 bg-ink border-b border-white/10 text-amber text-xs sm:text-sm"
    >
      <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <p className="leading-snug">
          <span>Black Friday Manduca: preço de lançamento</span>
          <PendingText
            value={CAMPAIGN.endsOn}
            placeholder="[data]"
            prefix=" até "
          />
          <span>. </span>
          <a
            href="#regras-da-oferta"
            onClick={(e) => onNavigate('#regras-da-oferta', e)}
            className="underline decoration-amber/60 underline-offset-2 hover:decoration-amber font-medium focus-visible:outline-2 focus-visible:outline-amber"
          >
            Os 30 primeiros assinantes mantêm o valor
          </a>
          <span>.</span>
          {typeof CAMPAIGN.spotsTaken === 'number' && (
            <span className="ml-1.5 font-semibold">
              {CAMPAIGN.spotsTaken} de 30 vagas preenchidas
            </span>
          )}
        </p>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Fechar barra de campanha"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-amber/80 hover:bg-white/10 hover:text-amber focus-visible:outline-2 focus-visible:outline-amber cursor-pointer"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function Header({ onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleBtnRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileMenuOpen(false);
    onNavigate(href, e);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-ink/92 backdrop-blur-md border-b border-white/10 shadow-md'
          : 'bg-ink border-b border-white/5'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1160px] items-center justify-between gap-4 lg:gap-8 px-4 sm:px-6">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#inicio"
          onClick={(e) => handleLinkClick('#inicio', e)}
          aria-label="Manduca - Início"
          className="inline-flex items-center whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber rounded-md"
        >
          <BrandLogo variant="branco" withIcon />
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-[15px] font-medium text-paper/85"
        >
          <a
            href="#recursos"
            onClick={(e) => handleLinkClick('#recursos', e)}
            className="hover:text-amber transition-colors whitespace-nowrap shrink-0 py-2 focus-visible:outline-2 focus-visible:outline-amber rounded"
          >
            Recursos
          </a>
          <a
            href="#planos"
            onClick={(e) => handleLinkClick('#planos', e)}
            className="hover:text-amber transition-colors whitespace-nowrap shrink-0 py-2 focus-visible:outline-2 focus-visible:outline-amber rounded"
          >
            Planos
          </a>
          <a
            href="#perguntas"
            onClick={(e) => handleLinkClick('#perguntas', e)}
            className="hover:text-amber transition-colors whitespace-nowrap shrink-0 py-2 focus-visible:outline-2 focus-visible:outline-amber rounded"
          >
            Perguntas
          </a>
          <a
            href="/restaurante/login"
            onClick={(e) => handleLinkClick('/restaurante/login', e)}
            className="hover:text-amber transition-colors whitespace-nowrap shrink-0 py-2 focus-visible:outline-2 focus-visible:outline-amber rounded"
          >
            Entrar
          </a>
        </nav>

        {/* Zone 3: Primary CTA + Mobile Hamburger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            href={CTA_URL}
            size="md"
            onNavigate={(href, e) => {
              trackCtaClick({ location: 'header' });
              handleLinkClick(href, e);
            }}
            className="!min-h-[44px] !px-3.5 sm:!px-5 !py-2 text-xs sm:text-sm"
          >
            Testar 15 dias grátis
          </Button>

          <button
            ref={toggleBtnRef}
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-overlay"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex md:hidden h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-paper hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-amber cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-overlay"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="fixed inset-x-0 top-[72px] bottom-0 z-50 flex flex-col justify-between bg-ink p-6 md:hidden border-t border-white/10"
        >
          <nav className="flex flex-col gap-2 text-xl font-semibold text-paper">
            <a
              href="#recursos"
              onClick={(e) => handleLinkClick('#recursos', e)}
              className="rounded-xl px-4 py-3.5 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-amber"
            >
              Recursos
            </a>
            <a
              href="#planos"
              onClick={(e) => handleLinkClick('#planos', e)}
              className="rounded-xl px-4 py-3.5 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-amber"
            >
              Planos
            </a>
            <a
              href="#perguntas"
              onClick={(e) => handleLinkClick('#perguntas', e)}
              className="rounded-xl px-4 py-3.5 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-amber"
            >
              Perguntas
            </a>
            <a
              href="/restaurante/login"
              onClick={(e) => handleLinkClick('/restaurante/login', e)}
              className="rounded-xl px-4 py-3.5 text-amber hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-amber"
            >
              Entrar
            </a>
          </nav>

          <div className="pt-6 border-t border-white/10">
            <Button
              href={CTA_URL}
              size="lg"
              withArrow
              onNavigate={(href, e) => {
                trackCtaClick({ location: 'header' });
                handleLinkClick(href, e);
              }}
              className="w-full"
            >
              Testar 15 dias grátis
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export function HeroSection({ onNavigate }: NavigationProps) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-ink text-paper pt-12 pb-20 lg:pt-20 lg:pb-28"
    >
      {/* Dotted grid at 4% opacity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto max-w-[1160px] px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-6 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber/60 bg-ink-2/90 px-3.5 py-1.5 text-xs font-medium text-amber mb-6">
              <Store aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
              <span>Para restaurantes, marmitarias, pizzarias e lanchonetes</span>
            </div>

            <h1 className="heading-h1 text-paper mb-6">
              Seu delivery com link próprio e{' '}
              <span className="text-amber">sem comissão por pedido.</span>
            </h1>

            <p className="text-[17px] lg:text-[18px] leading-[1.6] text-muted-dark mb-8 max-w-2xl">
              Cardápio digital, painel de pedidos com campainha na cozinha, relatórios de vendas e entregadores com rota no celular. A assinatura é fixa, a partir de R$ 49 por mês, e cada venda cai direto na sua conta.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
              <Button
                href={CTA_URL}
                size="lg"
                withArrow
                onNavigate={(href, e) => {
                  trackCtaClick({ location: 'hero' });
                  onNavigate(href, e);
                }}
              >
                Criar minha loja e testar 15 dias grátis
              </Button>
              <Button
                href="#recursos"
                variant="outline-dark"
                size="lg"
                onNavigate={(href, e) => onNavigate(href, e)}
              >
                Ver como funciona
              </Button>
            </div>

            <div className="flex items-start gap-2.5 text-sm text-muted-dark">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ok/20 text-ok"
              >
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              </span>
              <p>
                <span>Confirme seu e-mail ou telefone, cadastre os pratos e comece a vender.</span>
                <PendingText
                  value={SIGNUP.cardInfo}
                  placeholder="[Cartão de crédito no cadastro: confirmar]"
                  prefix=" "
                />
              </p>
            </div>
          </div>

          {/* Right Column: 3 Animated Phones Composition */}
          <div className="relative lg:col-span-6 w-full flex flex-col items-center">
            {/* Subtle radial glow in brand at 18% behind the phones */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -m-8 rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(242, 106, 27, 0.18) 0%, rgba(27, 17, 12, 0) 70%)',
              }}
            />

            <ManducaPhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  const items = [
    { icon: Percent, text: 'Sem comissão por pedido' },
    { icon: Zap, text: 'Conta liberada na hora' },
    { icon: Wallet, text: 'Pagamento direto na sua conta' },
    { icon: Bell, text: 'Pedidos em tempo real com alerta sonoro' },
    { icon: FileText, text: 'Relatórios em PDF' },
    { icon: ShieldCheck, text: 'Dados tratados conforme a LGPD' },
  ];

  return (
    <section
      aria-label="Benefícios principais"
      className="border-b border-sand bg-paper py-7"
    >
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.text}
                className="flex items-start gap-2.5 text-[14px] leading-snug text-ink font-medium"
              >
                <Icon
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CommissionComparisonSection() {
  const [monthlySales, setMonthlySales] = useState(10000);

  const ifoodCost = Math.round(
    monthlySales * 0.12 + (monthlySales > 1800 ? 110 : 0)
  );
  const manducaMonthlyBasic = PLANS.basico.pricing.mensal.priceCharged;

  const staticRows = [
    { sales: 'R$ 3.000', ifood: 'R$ 470', manduca: 'a partir de R$ 49' },
    { sales: 'R$ 5.000', ifood: 'R$ 710', manduca: 'a partir de R$ 49' },
    { sales: 'R$ 10.000', ifood: 'R$ 1.310', manduca: 'a partir de R$ 49' },
    { sales: 'R$ 20.000', ifood: 'R$ 2.510', manduca: 'a partir de R$ 49' },
  ];

  return (
    <Section id="comparativo" variant="cream">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <Eyebrow>O CUSTO DA COMISSÃO</Eyebrow>
            <h2 className="heading-h2 text-ink">
              Quanto o marketplace fica{' '}
              <span className="text-brand">de cada venda sua.</span>
            </h2>
          </div>

          <p className="text-muted-light">
            Quem vende R$ 10.000 por mês pelo plano Básico do iFood, com entrega própria, paga R$ 1.310 entre comissão e mensalidade. No Manduca, o custo é a assinatura, com 50 pedidos ou com 5.000.
          </p>

          {/* Highlighted closing paragraph in ink card */}
          <div className="rounded-[24px] bg-ink p-6 text-paper shadow-md">
            <p className="text-[15px] lg:text-[16px] leading-relaxed text-paper/95">
              O Manduca não traz clientes novos. Ele serve para vender direto a quem já conhece seu restaurante: pelo Instagram, pelo WhatsApp, pelo QR Code na mesa e na sacola de entrega. Com 12% de comissão, R$ 49 equivalem a R$ 408 em vendas.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Slider + Static Reference Table */}
        <div className="lg:col-span-7">
          <Card variant="light" className="space-y-7">
            {/* Interactive Slider Calculator */}
            <div className="rounded-2xl border border-sand bg-cream p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <label
                  htmlFor="marketplace-sales-slider"
                  className="text-sm font-semibold text-ink"
                >
                  Quanto você vende por mês pelo marketplace?
                </label>
                <span className="heading-display text-2xl text-brand-strong tabular-nums">
                  {formatBRL(monthlySales, false)}
                </span>
              </div>

              <input
                id="marketplace-sales-slider"
                type="range"
                min={1000}
                max={30000}
                step={500}
                value={monthlySales}
                onChange={(e) => {
                  setMonthlySales(Number(e.target.value));
                  trackDemoInteractionOnce('comparativo');
                }}
                className="manduca-slider mb-2"
              />
              <div className="flex justify-between text-xs text-muted-light tabular-nums mb-5">
                <span>R$ 1.000</span>
                <span>R$ 15.000</span>
                <span>R$ 30.000</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="rounded-xl border border-sand bg-paper p-4">
                  <div className="text-xs font-medium text-muted-light mb-1">
                    iFood Básico
                  </div>
                  <div className="heading-display text-2xl sm:text-3xl text-ink tabular-nums">
                    {formatBRL(ifoodCost, false)}
                    <span className="text-xs font-sans font-normal text-muted-light">
                      /mês
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-brand/40 bg-brand/10 p-4">
                  <div className="flex items-center justify-between mb-1">
                    <BrandLogo variant="laranja" className="!h-4" />
                    <Pill tone="brand" className="!px-2 !py-0.5 !text-[10px]">
                      Manduca
                    </Pill>
                  </div>
                  <div className="heading-display text-2xl sm:text-3xl text-brand-strong tabular-nums">
                    a partir de {formatBRL(manducaMonthlyBasic, false)}
                    <span className="text-xs font-sans font-normal text-brand-strong/80">
                      /mês
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Static Reference Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm sm:text-base tabular-nums">
                <thead>
                  <tr className="border-b border-sand text-xs sm:text-sm text-muted-light">
                    <th className="py-3 pr-3 font-semibold">Vendas no mês</th>
                    <th className="py-3 px-3 font-semibold">
                      iFood Básico (12% + R$ 110)
                    </th>
                    <th className="py-3 pl-3 pr-3 font-semibold bg-brand/10 rounded-t-xl text-brand-strong">
                      <span className="inline-flex items-center gap-2">
                        <BrandLogo variant="laranja" className="!h-4" />
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand">
                  {staticRows.map((row) => (
                    <tr key={row.sales}>
                      <td className="py-3.5 pr-3 font-medium text-ink">
                        {row.sales}
                      </td>
                      <td className="py-3.5 px-3 text-muted-light">
                        {row.ifood}
                      </td>
                      <td className="py-3.5 pl-3 pr-3 font-semibold text-brand-strong bg-brand/10">
                        {row.manduca}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[12px] leading-relaxed text-muted-light">
              Valores da tabela pública do iFood em novembro de 2026: 12% de comissão e R$ 110 de mensalidade para vendas acima de R$ 1.800 por mês, sem contar a taxa de 3,2% sobre pagamentos feitos pelo app. No Manduca, o gateway que você escolher cobra a taxa dele. Os preços do iFood podem mudar.
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
}
