import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Heart,
  Instagram,
  Lock,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import {
  CAMPAIGN,
  CTA_URL,
  FAQ,
  FEATURES,
  OFFER_RULES,
  SUPPORT_EMAIL,
  TRIAL,
} from '../../config/landing';
import {
  BillingPeriod,
  FUTURE_PRICE_TABLE,
  PERIOD_OPTIONS,
  PLANS,
  formatBRL,
} from '../../config/plans';
import {
  trackCtaClick,
  trackFaqOpen,
  trackSelectPeriod,
  trackViewPlansOnce,
} from '../../config/tracking';
import {
  BrandLogo,
  Button,
  Card,
  CheckItem,
  Eyebrow,
  PendingText,
  Pill,
  Section,
  usePendingMode,
} from './ui';

interface NavigationProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function PlansSection({ onNavigate }: NavigationProps) {
  const [period, setPeriod] = useState<BillingPeriod>('anual');
  const [animatingPrice, setAnimatingPrice] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { showPending } = usePendingMode();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackViewPlansOnce();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePeriodChange = (nextPeriod: BillingPeriod) => {
    if (nextPeriod === period) return;
    setAnimatingPrice(true);
    setPeriod(nextPeriod);
    trackSelectPeriod(nextPeriod);
    setTimeout(() => setAnimatingPrice(false), 150);
  };

  const basicPlan = PLANS.basico;
  const proPlan = PLANS.pro;
  const basicPricing = basicPlan.pricing[period];
  const proPricing = proPlan.pricing[period];

  const basicCtaHref = `${CTA_URL}?plan=basico&period=${period}`;
  const proCtaHref = `${CTA_URL}?plan=pro&period=${period}`;

  const campaignDatesRange =
    CAMPAIGN.startsOn.trim() && CAMPAIGN.endsOn.trim()
      ? `${CAMPAIGN.startsOn.trim()} e ${CAMPAIGN.endsOn.trim()}`
      : '';

  return (
    <Section id="planos" variant="light">
      <div ref={sectionRef} className="space-y-10">
        {/* Top Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Eyebrow>PLANOS</Eyebrow>
          <h2 className="heading-h2 text-ink">
            Dois planos, três formas de pagar e{' '}
            <span className="text-brand">nenhuma comissão por pedido.</span>
          </h2>
          <p className="text-muted-light">
            15 dias grátis em qualquer plano. Quanto maior o período, menor o valor por mês.
          </p>
        </div>

        {/* Campaign Banner */}
        {CAMPAIGN.active && (
          <div className="mx-auto max-w-4xl rounded-[24px] border-2 border-amber bg-cream p-6 sm:p-7">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber text-ink">
                <Tag aria-hidden="true" className="h-5 w-5" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="heading-display text-xl text-ink">
                    Preço de lançamento Black Friday
                  </h3>
                  {typeof CAMPAIGN.spotsTaken === 'number' && (
                    <Pill tone="amber">
                      {CAMPAIGN.spotsTaken} de 30 vagas preenchidas
                    </Pill>
                  )}
                </div>
                <p className="text-sm sm:text-base text-ink/90 leading-relaxed">
                  <span>Estamos abrindo o Manduca. Os valores desta página valem</span>
                  <PendingText
                    value={CAMPAIGN.endsOn}
                    placeholder="[data]"
                    prefix=" até "
                  />
                  <span>
                    . Os 30 primeiros assinantes mantêm o valor do plano contratado enquanto a assinatura estiver ativa e em dia.{' '}
                  </span>
                  <a
                    href="#regras-da-oferta"
                    onClick={(e) => {
                      setRulesOpen(true);
                      onNavigate('#regras-da-oferta', e);
                    }}
                    className="font-semibold text-brand-strong underline underline-offset-2 hover:text-brand"
                  >
                    Ver regras da oferta
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Segmented Period Selector */}
        <div className="flex justify-center">
          <div
            role="group"
            aria-label="Selecionar período de assinatura"
            className="inline-flex items-center gap-1.5 rounded-2xl border border-sand bg-cream p-1.5"
          >
            {PERIOD_OPTIONS.map((opt) => {
              const active = period === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => handlePeriodChange(opt.id)}
                  className={`min-h-[44px] inline-flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2 text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-ink text-paper shadow-sm'
                      : 'text-muted-light hover:text-ink'
                  }`}
                >
                  <span>{opt.label}</span>
                  {opt.discountBadge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                        active
                          ? 'bg-amber text-ink'
                          : 'bg-brand/15 text-brand-strong'
                      }`}
                    >
                      -{opt.discountBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2 Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
          {/* Card 1: Manduca Básico */}
          <Card
            variant="light"
            className="flex flex-col justify-between border-2 border-sand !p-7 sm:!p-9"
          >
            <div className="space-y-6">
              <div>
                <h3 className="heading-display text-2xl sm:text-3xl text-ink">
                  {basicPlan.name}
                </h3>
                <p className="mt-1.5 text-sm sm:text-base text-muted-light">
                  {basicPlan.subtitle}
                </p>
              </div>

              {/* Price Block */}
              <div
                className={`rounded-2xl bg-cream border border-sand p-5 transition-opacity duration-150 tabular-nums ${
                  animatingPrice ? 'opacity-60' : 'opacity-100'
                }`}
              >
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="heading-display text-3xl sm:text-4xl text-ink">
                    {formatBRL(basicPricing.priceCharged)}
                  </span>
                  <span className="text-sm font-medium text-muted-light">
                    {basicPricing.unitSuffix}
                  </span>
                </div>

                {period !== 'mensal' && (
                  <div className="mt-1.5 text-sm font-semibold text-ink">
                    Por mês: {formatBRL(basicPricing.perMonth)}
                  </div>
                )}

                {basicPricing.savingsText && (
                  <div className="mt-1 text-xs font-semibold text-ok">
                    Economia de {basicPricing.savingsText}
                  </div>
                )}
              </div>

              <Button
                href={basicCtaHref}
                variant="secondary"
                size="lg"
                onNavigate={(href, e) => {
                  trackCtaClick({
                    location: 'planos',
                    plan: 'basico',
                    period,
                  });
                  onNavigate(href, e);
                }}
                className="w-full"
              >
                Testar 15 dias grátis
              </Button>

              <ul className="space-y-3 text-sm sm:text-base pt-2">
                <CheckItem>Cardápio digital no link do Manduca</CheckItem>
                <CheckItem>
                  Painel de pedidos em tempo real, com pedidos ilimitados
                </CheckItem>
                <CheckItem>
                  Impressão de comanda térmica (80mm e 58mm)
                </CheckItem>
                <CheckItem>Clientes com histórico e métricas</CheckItem>
                <CheckItem>Gateways próprios e Pix direto</CheckItem>
                {FEATURES.reportsInBasic && (
                  <CheckItem>
                    Relatórios de vendas com exportação em PDF
                  </CheckItem>
                )}

                {/* Denied item with lock icon */}
                <li className="flex items-start gap-3 pt-2 text-muted-light/80">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sand text-muted-light"
                  >
                    <Lock className="h-3 w-3" />
                  </span>
                  <span>Sem domínio próprio e sem módulo de entregadores</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Card 2: Manduca Pro & Domínio (Featured) */}
          <Card
            variant="dark"
            className="relative flex flex-col justify-between !border-2 !border-amber !p-7 sm:!p-9"
          >
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="heading-display text-2xl sm:text-3xl text-paper">
                    {proPlan.name}
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-muted-dark">
                    {proPlan.subtitle}
                  </p>
                </div>
                {proPlan.badge && <Pill tone="amber">{proPlan.badge}</Pill>}
              </div>

              {/* Price Block */}
              <div
                className={`rounded-2xl bg-ink border border-white/10 p-5 transition-opacity duration-150 tabular-nums ${
                  animatingPrice ? 'opacity-60' : 'opacity-100'
                }`}
              >
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="heading-display text-3xl sm:text-4xl text-amber">
                    {formatBRL(proPricing.priceCharged)}
                  </span>
                  <span className="text-sm font-medium text-muted-dark">
                    {proPricing.unitSuffix}
                  </span>
                </div>

                {period !== 'mensal' && (
                  <div className="mt-1.5 text-sm font-semibold text-paper">
                    Por mês: {formatBRL(proPricing.perMonth)}
                  </div>
                )}

                {proPricing.savingsText && (
                  <div className="mt-1 text-xs font-semibold text-ok">
                    Economia de {proPricing.savingsText}
                  </div>
                )}
              </div>

              <Button
                href={proCtaHref}
                variant="primary"
                size="lg"
                withArrow
                onNavigate={(href, e) => {
                  trackCtaClick({
                    location: 'planos',
                    plan: 'pro',
                    period,
                  });
                  onNavigate(href, e);
                }}
                className="w-full"
              >
                Testar 15 dias grátis
              </Button>

              <ul className="space-y-3 text-sm sm:text-base pt-2">
                <CheckItem dark>Tudo do Básico</CheckItem>
                <CheckItem dark>
                  Domínio próprio com HTTPS (registro pago por você)
                </CheckItem>
                <CheckItem dark>
                  Módulo de entregadores com PIN e rota no Google Maps ou Waze
                </CheckItem>
              </ul>
            </div>
          </Card>
        </div>

        {/* Card "Depois da Black Friday" (Only if CAMPAIGN.futurePricesConfirmed is true or in dev pending mode) */}
        {(CAMPAIGN.futurePricesConfirmed || showPending) && (
          <Card variant="cream" className="max-w-4xl mx-auto space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="heading-display text-xl sm:text-2xl text-ink">
                  Os valores mudam depois da campanha.
                </h3>
                {!CAMPAIGN.futurePricesConfirmed && showPending && (
                  <PendingText
                    value=""
                    placeholder="CAMPAIGN.futurePricesConfirmed = false"
                  />
                )}
              </div>
              <p className="text-sm sm:text-base text-muted-light">
                <span>A partir</span>
                <PendingText
                  value={CAMPAIGN.endsOn}
                  placeholder="[data]"
                  prefix=" de "
                />
                <span>
                  , o Manduca passa a custar o valor de lista abaixo. Quem assinar agora paga o valor de campanha, e os 30 primeiros o mantêm nas condições das regras da oferta.
                </span>
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-sand bg-paper">
              <table className="w-full text-left border-collapse text-sm sm:text-base tabular-nums">
                <thead>
                  <tr className="border-b border-sand bg-cream/60 text-xs sm:text-sm text-muted-light">
                    <th className="py-3 px-4 font-semibold">Plano e período</th>
                    <th className="py-3 px-4 font-semibold text-brand-strong">
                      Agora
                    </th>
                    <th className="py-3 px-4 font-semibold">
                      <span>A partir de </span>
                      <PendingText
                        value={CAMPAIGN.endsOn}
                        placeholder="[data]"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand">
                  {FUTURE_PRICE_TABLE.map((row) => (
                    <tr key={row.label}>
                      <td className="py-3 px-4 font-medium text-ink">
                        {row.label}
                      </td>
                      <td className="py-3 px-4 font-bold text-brand-strong">
                        {formatBRL(row.now)}
                      </td>
                      <td className="py-3 px-4 text-ink">
                        {formatBRL(row.future)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm font-semibold text-ink">
              No mensal, são R$ 20 a menos por mês nos dois planos. No anual, R$ 204 a menos por ano.
            </p>
          </Card>
        )}

        {/* Regras da oferta (Accordion, id="regras-da-oferta") */}
        <div
          id="regras-da-oferta"
          className="max-w-4xl mx-auto rounded-[24px] border border-sand bg-cream overflow-hidden"
        >
          <details
            open={rulesOpen}
            onToggle={(e) =>
              setRulesOpen((e.currentTarget as HTMLDetailsElement).open)
            }
            className="group"
          >
            <summary
              aria-expanded={rulesOpen}
              className="flex items-center justify-between gap-4 px-6 py-5 font-bold text-base sm:text-lg text-ink cursor-pointer select-none hover:bg-sand/40 focus-visible:outline-2 focus-visible:outline-brand"
            >
              <span>Regras da oferta de lançamento</span>
              <ChevronDown
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-muted-light transition-transform duration-200 group-open:rotate-180"
              />
            </summary>

            <div className="border-t border-sand px-6 py-5 text-sm sm:text-base text-ink/90">
              <ol className="list-decimal pl-5 space-y-2.5">
                <li>
                  <span>
                    Vale para as 30 primeiras assinaturas pagas contratadas
                  </span>
                  <PendingText
                    value={campaignDatesRange}
                    placeholder="entre [início] e [fim]"
                    prefix=" entre "
                  />
                  <span>.</span>
                </li>
                <li>
                  O assinante mantém o valor do plano e do período contratado enquanto a assinatura estiver ativa e em dia.
                </li>
                <li>
                  <span>
                    O benefício deixa de valer se houver suspensão do uso da plataforma
                  </span>
                  <PendingText
                    value={CAMPAIGN.suspensionDays}
                    placeholder="por mais de [X dias]"
                    prefix=" por mais de "
                  />
                  <span>
                    , cancelamento, banimento ou suspensão da conta pelo Manduca.
                  </span>
                </li>
                <li>
                  Quem perde o benefício e volta a assinar paga o preço vigente.
                </li>
                {(Boolean(OFFER_RULES.planChange.trim()) || showPending) && (
                  <li>
                    <PendingText
                      value={OFFER_RULES.planChange}
                      placeholder="[Regra sobre troca de plano ou de período]"
                    />
                  </li>
                )}
                {(Boolean(OFFER_RULES.nonFounders.trim()) || showPending) && (
                  <li>
                    <PendingText
                      value={OFFER_RULES.nonFounders}
                      placeholder="[Regra sobre o valor para quem assina na campanha sem estar entre os 30]"
                    />
                  </li>
                )}
              </ol>
            </div>
          </details>
        </div>
      </div>
    </Section>
  );
}

interface FaqItemData {
  id: string;
  question: string;
  answerNode: React.ReactNode;
  jsonLdAnswer?: string;
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const { showPending } = usePendingMode();

  const items: FaqItemData[] = [
    {
      id: 'q1',
      question: 'Vocês cobram comissão sobre os pedidos?',
      answerNode: (
        <>
          Não. Você paga só a assinatura. O valor de cada venda é seu. O gateway cobra a taxa dele, e o Pix direto não passa por gateway.
        </>
      ),
      jsonLdAnswer:
        'Não. Você paga só a assinatura. O valor de cada venda é seu. O gateway cobra a taxa dele, e o Pix direto não passa por gateway.',
    },
    {
      id: 'q2',
      question: 'Como funciona o teste de 15 dias?',
      answerNode: (
        <>
          <span>
            Você cria a conta, confirma o e-mail ou o telefone e usa o plano escolhido por 15 dias.
          </span>
          <PendingText
            value={TRIAL.endNote}
            placeholder="[Cartão e o que acontece no fim do teste]"
            prefix=" "
          />
        </>
      ),
      jsonLdAnswer: `Você cria a conta, confirma o e-mail ou o telefone e usa o plano escolhido por 15 dias.${
        TRIAL.endNote.trim() ? ` ${TRIAL.endNote.trim()}` : ''
      }`,
    },
    {
      id: 'q3',
      question: 'Qual a diferença entre os planos?',
      answerNode: (
        <>
          O Básico tem cardápio, painel de pedidos, relatórios, clientes e pagamentos, no link do Manduca. O Pro soma domínio próprio e módulo de entregadores.
        </>
      ),
      jsonLdAnswer:
        'O Básico tem cardápio, painel de pedidos, relatórios, clientes e pagamentos, no link do Manduca. O Pro soma domínio próprio e módulo de entregadores.',
    },
    {
      id: 'q4',
      question: 'Preciso saber mexer com DNS para usar o domínio próprio?',
      answerNode: (
        <>
          <span>
            Só precisa criar um registro CNAME no painel onde você registrou o domínio. O painel do Manduca mostra o passo a passo e verifica se funcionou.
          </span>
          {Boolean(FEATURES.dnsHelp.trim()) && (
            <span> {FEATURES.dnsHelp.trim()}</span>
          )}
        </>
      ),
      jsonLdAnswer: `Só precisa criar um registro CNAME no painel onde você registrou o domínio. O painel do Manduca mostra o passo a passo e verifica se funcionou.${
        FEATURES.dnsHelp.trim() ? ` ${FEATURES.dnsHelp.trim()}` : ''
      }`,
    },
    {
      id: 'q5',
      question: 'O dinheiro das vendas passa pelo Manduca?',
      answerNode: (
        <>
          Não. O pagamento vai direto para o seu gateway ou para a sua chave Pix.
        </>
      ),
      jsonLdAnswer:
        'Não. O pagamento vai direto para o seu gateway ou para a sua chave Pix.',
    },
    {
      id: 'q6',
      question: 'O Manduca fornece entregadores?',
      answerNode: (
        <>
          Não. Você cadastra os entregadores do seu restaurante e define um PIN para cada um.
        </>
      ),
      jsonLdAnswer:
        'Não. Você cadastra os entregadores do seu restaurante e define um PIN para cada um.',
    },
    {
      id: 'q7',
      question: 'Preciso instalar algum aplicativo?',
      answerNode: (
        <>
          Não. O cliente abre o cardápio no navegador, o motoboy usa o link no celular e o painel roda no computador ou no tablet.
        </>
      ),
      jsonLdAnswer:
        'Não. O cliente abre o cardápio no navegador, o motoboy usa o link no celular e o painel roda no computador ou no tablet.',
    },
    {
      id: 'q8',
      question: 'Qual impressora eu preciso?',
      answerNode: (
        <>
          Qualquer impressora térmica de 80mm ou 58mm que imprima pelo navegador.
        </>
      ),
      jsonLdAnswer:
        'Qualquer impressora térmica de 80mm ou 58mm que imprima pelo navegador.',
    },
    {
      id: 'q9',
      question: 'Funciona junto com outros canais de venda?',
      answerNode: (
        <>
          Sim. O Manduca é o seu canal próprio. Hoje não há integração de pedidos com marketplaces: os pedidos do Manduca aparecem só no painel do Manduca.
        </>
      ),
      jsonLdAnswer:
        'Sim. O Manduca é o seu canal próprio. Hoje não há integração de pedidos com marketplaces: os pedidos do Manduca aparecem só no painel do Manduca.',
    },
    {
      id: 'q10',
      question: 'Os dados dos meus clientes são meus?',
      answerNode: (
        <>
          A base de clientes é do seu restaurante. O cliente pode baixar os próprios dados e pedir a exclusão da conta, como a LGPD prevê.
        </>
      ),
      jsonLdAnswer:
        'A base de clientes é do seu restaurante. O cliente pode baixar os próprios dados e pedir a exclusão da conta, como a LGPD prevê.',
    },
    {
      id: 'q11',
      question: 'Como funciona o preço travado da Black Friday?',
      answerNode: (
        <>
          <span>
            Os 30 primeiros assinantes pagantes da campanha mantêm o valor do plano enquanto a assinatura estiver ativa e em dia. Suspensão do uso
          </span>
          <PendingText
            value={CAMPAIGN.suspensionDays}
            placeholder="por mais de [X dias]"
            prefix=" por mais de "
          />
          <span>
            , cancelamento, banimento ou suspensão da conta fazem perder o benefício.
          </span>
        </>
      ),
      jsonLdAnswer: CAMPAIGN.suspensionDays.trim()
        ? `Os 30 primeiros assinantes pagantes da campanha mantêm o valor do plano enquanto a assinatura estiver ativa e em dia. Suspensão do uso por mais de ${CAMPAIGN.suspensionDays.trim()}, cancelamento, banimento ou suspensão da conta fazem perder o benefício.`
        : undefined,
    },
    {
      id: 'q12',
      question: 'Os valores vão mudar?',
      answerNode: (
        <>
          <span>Sim</span>
          <PendingText
            value={CAMPAIGN.endsOn}
            placeholder="[data]"
            prefix=", a partir de "
          />
          <span>
            . O quadro &ldquo;Depois da Black Friday&rdquo; mostra os valores de lista.
          </span>
        </>
      ),
      jsonLdAnswer: CAMPAIGN.endsOn.trim()
        ? `Sim, a partir de ${CAMPAIGN.endsOn.trim()}. O quadro "Depois da Black Friday" mostra os valores de lista.`
        : undefined,
    },
    ...(Boolean(FAQ.planChange.trim()) || showPending
      ? [
          {
            id: 'q13',
            question: 'Posso trocar de plano ou de período?',
            answerNode: (
              <PendingText value={FAQ.planChange} placeholder="[Definir.]" />
            ),
            jsonLdAnswer: FAQ.planChange.trim() || undefined,
          },
        ]
      : []),
    ...(Boolean(FAQ.cancel.trim()) || showPending
      ? [
          {
            id: 'q14',
            question: 'Posso cancelar?',
            answerNode: (
              <PendingText
                value={FAQ.cancel}
                placeholder="[Definir para mensal, trimestral e anual.]"
              />
            ),
            jsonLdAnswer: FAQ.cancel.trim() || undefined,
          },
        ]
      : []),
  ];

  // JSON-LD only includes effectively rendered questions without unresolved placeholders
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items
      .filter((item) => Boolean(item.jsonLdAnswer))
      .map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.jsonLdAnswer,
        },
      })),
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Manduca',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'Cardápio digital, painel de pedidos com alerta sonoro, relatórios, entregadores com rota e domínio próprio. Sem comissão por pedido. 15 dias grátis. A partir de R$ 49/mês.',
    offers: {
      '@type': 'Offer',
      price: PLANS.basico.pricing.mensal.priceCharged.toFixed(2),
      priceCurrency: 'BRL',
    },
  };

  return (
    <Section id="perguntas" variant="cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        {/* Left: Title */}
        <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-28">
          <Eyebrow>PERGUNTAS</Eyebrow>
          <h2 className="heading-h2 text-ink">Perguntas frequentes</h2>
        </div>

        {/* Right: Accordion using <details> and <summary> */}
        <div className="lg:col-span-8 space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <details
                key={item.id}
                open={isOpen}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.closest('summary')) {
                    e.preventDefault();
                    const nextOpen = isOpen ? -1 : idx;
                    setOpenIndex(nextOpen);
                    if (nextOpen === idx) {
                      trackFaqOpen(item.question);
                    }
                  }
                }}
                className="group rounded-2xl border border-sand bg-paper overflow-hidden transition-colors"
              >
                <summary
                  aria-expanded={isOpen}
                  className="flex min-h-[56px] items-center justify-between gap-4 px-5 sm:px-6 py-4 font-bold text-base sm:text-lg text-ink cursor-pointer select-none hover:bg-cream/50 focus-visible:outline-2 focus-visible:outline-brand"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 text-brand transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </summary>
                <div className="border-t border-sand/70 px-5 sm:px-6 py-4 text-sm sm:text-base text-muted-light leading-relaxed">
                  {item.answerNode}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export function FinalCtaSection({ onNavigate }: NavigationProps) {
  return (
    <Section id="comecar" variant="light">
      <div className="relative overflow-hidden rounded-[40px] bg-ink px-6 py-14 sm:px-12 sm:py-20 text-center text-paper shadow-2xl">
        {/* Subtle radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(255, 176, 32, 0.16) 0%, rgba(27, 17, 12, 0) 65%)',
          }}
        />

        <div className="relative mx-auto max-w-2xl space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber text-ink shadow-md">
            <Clock aria-hidden="true" className="h-7 w-7" />
          </div>

          <h2 className="heading-h2 text-paper">
            Seu cardápio <span className="text-amber">no ar hoje.</span>
          </h2>

          <p className="text-muted-dark text-[17px] lg:text-[18px]">
            <span>
              Crie a conta, confirme o código e teste o Manduca por 15 dias com seus pratos e seus clientes.
            </span>
            {CAMPAIGN.active && (
              <>
                <span> Os valores de lançamento valem</span>
                <PendingText
                  value={CAMPAIGN.endsOn}
                  placeholder="[data]"
                  prefix=" até "
                />
                <span>.</span>
              </>
            )}
          </p>

          <div className="pt-2 flex justify-center">
            <Button
              href={CTA_URL}
              size="lg"
              withArrow
              onNavigate={(href, e) => {
                trackCtaClick({ location: 'final' });
                onNavigate(href, e);
              }}
            >
              Criar minha loja grátis
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: '/assets/aistudio/manduca-celular-centro-1x_c484341b.webp',
    tag: 'Cardápio Digital',
    caption: 'Seu restaurante com link próprio no Instagram e WhatsApp sem taxa por pedido.',
    likes: '248',
    comments: '34',
    bg: 'from-[#2A1A12] via-[#1B110C] to-[#120B08]',
  },
  {
    id: 'ig-2',
    image: '/assets/aistudio/manduca-celular-esquerda-1x_0367881f.webp',
    tag: 'Montador P, M e G',
    caption: 'Limite automático de proteínas e acompanhamentos para marmitarias.',
    likes: '312',
    comments: '49',
    bg: 'from-[#331D11] via-[#1F130D] to-[#140C08]',
  },
  {
    id: 'ig-3',
    image: '/assets/aistudio/manduca-celular-direita-1x_68e49b14.webp',
    tag: 'Zero Comissão',
    caption: 'Assinatura fixa a partir de R$ 49/mês e 100% do lucro no seu caixa.',
    likes: '419',
    comments: '62',
    bg: 'from-[#261810] via-[#1B110C] to-[#0F0906]',
  },
  {
    id: 'ig-4',
    image: '/assets/aistudio/manduca-celular-lista-1x_95c3402e.webp',
    tag: 'Sacola Rápida',
    caption: 'Pedido em poucos toques, direto do celular do cliente sem baixar app.',
    likes: '187',
    comments: '21',
    bg: 'from-[#2E1B12] via-[#1C110C] to-[#120B07]',
  },
  {
    id: 'ig-5',
    image: '/assets/aistudio/Captura_de_tela_2026-11-05_185808_8792bffc.png',
    tag: 'App do Entregador',
    caption: 'Rota multi-paradas otimizada no Google Maps e Waze para sua equipe.',
    likes: '276',
    comments: '38',
    bg: 'from-[#131B2E] via-[#0F172A] to-[#090D16]',
  },
  {
    id: 'ig-6',
    image: '/assets/aistudio/manduca-celular-marmita-1x_b8c55386.webp',
    tag: 'Adicionais & Opções',
    caption: 'Personalização completa com adicionais somados na hora na comanda.',
    likes: '294',
    comments: '41',
    bg: 'from-[#362013] via-[#21140D] to-[#130C08]',
  },
];

export function Footer({ onNavigate }: NavigationProps) {
  const { showPending } = usePendingMode();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newsletterEmail.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-ink border-t border-white/10 text-paper">
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6 pt-16 pb-12 space-y-14">
        {/* 1. Newsletter Subscription Card */}
        <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-ink-2 p-6 sm:p-8 lg:p-10 shadow-xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #F26A1B 0%, transparent 70%)',
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
                <Mail aria-hidden="true" className="h-3.5 w-3.5" />
                <span>Newsletter Manduca</span>
              </div>
              <h3 className="heading-display text-2xl sm:text-3xl text-paper">
                Dicas práticas para vender mais no seu delivery próprio.
              </h3>
              <p className="text-sm text-muted-dark leading-relaxed">
                Receba estratégias de cardápio, fidelização de clientes no WhatsApp e novidades da plataforma. Sem spam, cancele quando quiser.
              </p>
            </div>

            <div className="lg:col-span-6">
              {newsletterStatus === 'success' ? (
                <div className="flex items-center gap-3 rounded-2xl border border-ok/40 bg-ok/15 p-4 text-sm text-paper">
                  <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-ok" />
                  <div>
                    <div className="font-bold text-paper">Inscrição confirmada!</div>
                    <div className="text-xs text-muted-dark">
                      Você receberá nossos próximos conteúdos diretamente no seu e-mail.
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2.5" noValidate>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label htmlFor="footer-newsletter-email" className="sr-only">
                      Seu melhor e-mail
                    </label>
                    <input
                      id="footer-newsletter-email"
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterStatus !== 'idle') setNewsletterStatus('idle');
                      }}
                      placeholder="Digite seu melhor e-mail..."
                      className="flex-1 min-h-[48px] rounded-xl border border-white/15 bg-ink px-4 py-3 text-sm text-paper placeholder:text-muted-dark/70 focus:border-amber focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-strong px-6 py-3 text-sm font-bold text-paper shadow-md transition-colors cursor-pointer shrink-0"
                    >
                      <span>Inscrever-se</span>
                      <Send aria-hidden="true" className="h-4 w-4" />
                    </button>
                  </div>
                  {newsletterStatus === 'error' ? (
                    <p className="text-xs text-amber">
                      Informe um endereço de e-mail válido para assinar a newsletter.
                    </p>
                  ) : (
                    <p className="text-xs text-muted-dark">
                      Ao se inscrever, você concorda com nossa{' '}
                      <a
                        href="/privacidade"
                        onClick={(e) => onNavigate('/privacidade', e)}
                        className="underline hover:text-amber"
                      >
                        Política de Privacidade
                      </a>
                      .
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 2. Instagram Feed Strip */}
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-sm">
                <Instagram aria-hidden="true" className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-paper">@manduca.app</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-amber">
                    Instagram
                  </span>
                </div>
                <p className="text-xs text-muted-dark">
                  Acompanhe bastidores, atualizações e dicas de operação para restaurantes
                </p>
              </div>
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-ink-2 hover:border-amber/60 hover:text-amber px-4 py-2 text-xs font-semibold text-paper transition-colors"
            >
              <Instagram aria-hidden="true" className="h-3.5 w-3.5" />
              <span>Seguir no Instagram</span>
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {INSTAGRAM_POSTS.map((post) => (
              <a
                key={post.id}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${post.bg} p-2.5 flex flex-col justify-between`}
              >
                <span className="relative z-10 self-start rounded-md bg-ink/80 backdrop-blur-xs border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-amber">
                  {post.tag}
                </span>

                <img
                  src={post.image}
                  alt={post.caption}
                  loading="lazy"
                  decoding="async"
                  className="pointer-events-none absolute inset-x-0 bottom-[-12%] mx-auto w-[68%] h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover overlay with likes, comments and caption */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end bg-ink/90 p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <p className="text-[11px] leading-snug text-paper/95 line-clamp-3 mb-2.5">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-3 text-xs font-semibold text-amber">
                    <span className="inline-flex items-center gap-1">
                      <Heart aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
                      {post.likes}
                    </span>
                    <span className="inline-flex items-center gap-1 text-paper/80">
                      <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 3. Main Footer Columns: Brand & Socials + Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pt-6 border-t border-white/10">
          {/* Brand + Description + Social Icons */}
          <div className="lg:col-span-4 space-y-5">
            <a
              href="#inicio"
              onClick={(e) => onNavigate('#inicio', e)}
              aria-label="Manduca - Início"
              className="inline-flex items-center"
            >
              <BrandLogo variant="branco" withTagline withIcon />
            </a>

            <p className="text-sm text-muted-dark leading-relaxed max-w-sm">
              Sistema de gestão para restaurantes, cardápio digital e delivery próprio por assinatura fixa. Sem comissão por pedido e com recebimento direto na sua conta.
            </p>

            {/* Social Media Links */}
            <div className="space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-paper/70">
                Redes sociais
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram do Manduca"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-ink-2 text-paper/85 hover:border-amber hover:text-amber transition-colors"
                >
                  <Instagram aria-hidden="true" className="h-4 w-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube do Manduca"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-ink-2 text-paper/85 hover:border-amber hover:text-amber transition-colors"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn do Manduca"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-ink-2 text-paper/85 hover:border-amber hover:text-amber transition-colors"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                  </svg>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok do Manduca"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-ink-2 text-paper/85 hover:border-amber hover:text-amber transition-colors"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column 1: Produto & Recursos */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber">
              Recursos do Sistema
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-dark">
              <li>
                <a
                  href="#recursos"
                  onClick={(e) => onNavigate('#recursos', e)}
                  className="hover:text-paper transition-colors"
                >
                  Cardápio Digital no Link
                </a>
              </li>
              <li>
                <a
                  href="#marmitas"
                  onClick={(e) => onNavigate('#marmitas', e)}
                  className="hover:text-paper transition-colors"
                >
                  Montador de Marmitas (P, M e G)
                </a>
              </li>
              <li>
                <a
                  href="#cozinha"
                  onClick={(e) => onNavigate('#cozinha', e)}
                  className="hover:text-paper transition-colors"
                >
                  Painel KDS &amp; Campainha Sonora
                </a>
              </li>
              <li>
                <a
                  href="#qrcode"
                  onClick={(e) => onNavigate('#qrcode', e)}
                  className="hover:text-paper transition-colors"
                >
                  QR Code para Mesas e Sacolas
                </a>
              </li>
              <li>
                <a
                  href="#relatorios"
                  onClick={(e) => onNavigate('#relatorios', e)}
                  className="hover:text-paper transition-colors"
                >
                  Relatórios e Base de Clientes
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2: Operação & Planos */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber">
              Operação &amp; Planos
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-dark">
              <li>
                <a
                  href="#entregadores"
                  onClick={(e) => onNavigate('#entregadores', e)}
                  className="hover:text-paper transition-colors"
                >
                  App do Entregador com Rota
                </a>
              </li>
              <li>
                <a
                  href="#dominio"
                  onClick={(e) => onNavigate('#dominio', e)}
                  className="hover:text-paper transition-colors"
                >
                  Domínio Próprio com SSL
                </a>
              </li>
              <li>
                <a
                  href="#planos"
                  onClick={(e) => onNavigate('#planos', e)}
                  className="hover:text-paper transition-colors"
                >
                  Planos e Preços
                </a>
              </li>
              <li>
                <a
                  href="#regras-da-oferta"
                  onClick={(e) => onNavigate('#regras-da-oferta', e)}
                  className="hover:text-paper transition-colors"
                >
                  Regras da Oferta de Lançamento
                </a>
              </li>
              <li>
                <a
                  href="#perguntas"
                  onClick={(e) => onNavigate('#perguntas', e)}
                  className="hover:text-paper transition-colors"
                >
                  Perguntas Frequentes (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 3: Acessos Rápidos & Legal */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber">
              Acessos Rápidos
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-dark">
              <li>
                <a
                  href={CTA_URL}
                  onClick={(e) => onNavigate(CTA_URL, e)}
                  className="font-semibold text-paper hover:text-amber transition-colors"
                >
                  Testar 15 dias grátis
                </a>
              </li>
              <li>
                <a
                  href="/restaurante/login"
                  onClick={(e) => onNavigate('/restaurante/login', e)}
                  className="hover:text-paper transition-colors"
                >
                  Login do Restaurante
                </a>
              </li>
              <li>
                <a
                  href="/entregador"
                  onClick={(e) => onNavigate('/entregador', e)}
                  className="hover:text-paper transition-colors"
                >
                  Portal do Entregador
                </a>
              </li>
              <li>
                <a
                  href="/termos"
                  onClick={(e) => onNavigate('/termos', e)}
                  className="hover:text-paper transition-colors"
                >
                  Termos de Uso
                </a>
              </li>
              <li>
                <a
                  href="/privacidade"
                  onClick={(e) => onNavigate('/privacidade', e)}
                  className="hover:text-paper transition-colors"
                >
                  Privacidade e LGPD
                </a>
              </li>
              {Boolean(SUPPORT_EMAIL.trim()) ? (
                <li>
                  <a
                    href={`mailto:${SUPPORT_EMAIL.trim()}`}
                    className="hover:text-amber transition-colors"
                  >
                    {SUPPORT_EMAIL.trim()}
                  </a>
                </li>
              ) : (
                showPending && (
                  <li>
                    <PendingText value={SUPPORT_EMAIL} placeholder="[SUPPORT_EMAIL]" />
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* 4. Bottom Copyright & Trust Badges */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-muted-dark">
          <p>© 2026 Manduca. Todos os direitos reservados.</p>

          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-paper/80">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-ok" />
              <span>Plataforma em conformidade com a LGPD</span>
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span>0% de comissão sobre vendas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
