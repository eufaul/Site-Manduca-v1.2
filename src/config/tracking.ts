import type { BillingPeriod, PlanId } from './plans';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type CtaLocation = 'header' | 'hero' | 'como-funciona' | 'planos' | 'final';
export type DemoId = 'montador' | 'campainha' | 'entrega' | 'comparativo' | 'dashboard';

const firedDemos = new Set<DemoId>();
const firedScrollDepths = new Set<number>();
let firedViewPlans = false;

export function pushDataLayer(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...params,
  });
}

export function trackCtaClick(params: {
  location: CtaLocation;
  plan?: PlanId;
  period?: BillingPeriod;
}) {
  pushDataLayer('cta_click', params);
}

export function trackSelectPeriod(period: BillingPeriod) {
  pushDataLayer('select_period', { period });
}

export function trackViewPlansOnce() {
  if (firedViewPlans) return;
  firedViewPlans = true;
  pushDataLayer('view_plans');
}

export function trackFaqOpen(question: string) {
  pushDataLayer('faq_open', { question });
}

export function trackDemoInteractionOnce(demo: DemoId) {
  if (firedDemos.has(demo)) return;
  firedDemos.add(demo);
  pushDataLayer('demo_interaction', { demo });
}

export function trackScrollDepthOnce(percent: 25 | 50 | 75 | 90) {
  if (firedScrollDepths.has(percent)) return;
  firedScrollDepths.add(percent);
  pushDataLayer('scroll_depth', { percent });
}
