export type PlanId = 'basico' | 'pro';
export type BillingPeriod = 'mensal' | 'trimestral' | 'anual';

export interface PlanPeriodPricing {
  period: BillingPeriod;
  label: string;
  unitSuffix: string;
  discountBadge?: string;
  priceCharged: number;
  perMonth: number;
  savingsText?: string;
  futurePriceCharged: number;
}

export interface PlanDefinition {
  id: PlanId;
  name: string;
  subtitle: string;
  featured: boolean;
  badge?: string;
  pricing: Record<BillingPeriod, PlanPeriodPricing>;
}

export const PERIOD_OPTIONS: {
  id: BillingPeriod;
  label: string;
  discountBadge?: string;
}[] = [
  { id: 'mensal', label: 'Mensal' },
  { id: 'trimestral', label: 'Trimestral', discountBadge: '10%' },
  { id: 'anual', label: 'Anual', discountBadge: '15%' },
];

export const PLANS: Record<PlanId, PlanDefinition> = {
  basico: {
    id: 'basico',
    name: 'Manduca Básico',
    subtitle: 'Para quem quer vender direto pelo link do Manduca.',
    featured: false,
    pricing: {
      mensal: {
        period: 'mensal',
        label: 'Mensal',
        unitSuffix: 'por mês',
        priceCharged: 49.0,
        perMonth: 49.0,
        futurePriceCharged: 69.0,
      },
      trimestral: {
        period: 'trimestral',
        label: 'Trimestral',
        unitSuffix: 'por trimestre',
        discountBadge: '10%',
        priceCharged: 132.3,
        perMonth: 44.1,
        savingsText: 'R$ 14,70 (10%)',
        futurePriceCharged: 186.3,
      },
      anual: {
        period: 'anual',
        label: 'Anual',
        unitSuffix: 'por ano',
        discountBadge: '15%',
        priceCharged: 499.8,
        perMonth: 41.65,
        savingsText: 'R$ 88,20 (15%, quase 2 meses)',
        futurePriceCharged: 703.8,
      },
    },
  },
  pro: {
    id: 'pro',
    name: 'Manduca Pro & Domínio',
    subtitle: 'Para quem tem entrega própria e quer o próprio endereço na loja.',
    featured: true,
    badge: 'Mais completo',
    pricing: {
      mensal: {
        period: 'mensal',
        label: 'Mensal',
        unitSuffix: 'por mês',
        priceCharged: 69.0,
        perMonth: 69.0,
        futurePriceCharged: 89.0,
      },
      trimestral: {
        period: 'trimestral',
        label: 'Trimestral',
        unitSuffix: 'por trimestre',
        discountBadge: '10%',
        priceCharged: 186.3,
        perMonth: 62.1,
        savingsText: 'R$ 20,70 (10%)',
        futurePriceCharged: 240.3,
      },
      anual: {
        period: 'anual',
        label: 'Anual',
        unitSuffix: 'por ano',
        discountBadge: '15%',
        priceCharged: 703.8,
        perMonth: 58.65,
        savingsText: 'R$ 124,20 (15%, quase 2 meses)',
        futurePriceCharged: 907.8,
      },
    },
  },
};

export interface FuturePriceRow {
  label: string;
  now: number;
  future: number;
}

export const FUTURE_PRICE_TABLE: FuturePriceRow[] = [
  {
    label: 'Básico mensal',
    now: PLANS.basico.pricing.mensal.priceCharged,
    future: PLANS.basico.pricing.mensal.futurePriceCharged,
  },
  {
    label: 'Básico trimestral',
    now: PLANS.basico.pricing.trimestral.priceCharged,
    future: PLANS.basico.pricing.trimestral.futurePriceCharged,
  },
  {
    label: 'Básico anual',
    now: PLANS.basico.pricing.anual.priceCharged,
    future: PLANS.basico.pricing.anual.futurePriceCharged,
  },
  {
    label: 'Pro & Domínio mensal',
    now: PLANS.pro.pricing.mensal.priceCharged,
    future: PLANS.pro.pricing.mensal.futurePriceCharged,
  },
  {
    label: 'Pro trimestral',
    now: PLANS.pro.pricing.trimestral.priceCharged,
    future: PLANS.pro.pricing.trimestral.futurePriceCharged,
  },
  {
    label: 'Pro anual',
    now: PLANS.pro.pricing.anual.priceCharged,
    future: PLANS.pro.pricing.anual.futurePriceCharged,
  },
];

export function formatBRL(value: number, showCents = true): string {
  const formatted = value.toLocaleString('pt-BR', {
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  });
  return `R$ ${formatted}`;
}
