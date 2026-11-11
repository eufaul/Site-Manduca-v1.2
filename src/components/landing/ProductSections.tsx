import React, { useState } from 'react';
import {
  Archive,
  BarChart3,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  FileDown,
  FileSpreadsheet,
  Layers,
  Leaf,
  MoreVertical,
  Printer,
  QrCode,
  Sparkles,
  StickyNote,
  Tag,
  Ticket,
  Users,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { FEATURES } from '../../config/landing';
import { formatBRL } from '../../config/plans';
import { trackDemoInteractionOnce } from '../../config/tracking';
import {
  BrowserFrame,
  Button,
  Card,
  CheckItem,
  Eyebrow,
  PhoneFrame,
  Pill,
  Section,
} from './ui';
import ManducaDoisCelulares from '../ManducaDoisCelulares';
import ManducaUmCelular from '../ManducaUmCelular';

export function DigitalMenuSection() {
  return (
    <Section id="recursos" variant="light">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left on Desktop, Second on Mobile: Two Overlapping Phones */}
        <div className="order-2 lg:order-1 lg:col-span-6">
          <ManducaDoisCelulares />
        </div>

        {/* Right on Desktop, First on Mobile: Copy */}
        <div className="order-1 lg:order-2 lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <Eyebrow>CARDÁPIO DIGITAL</Eyebrow>
            <h2 className="heading-h2 text-ink">
              Um link. O cliente abre, escolhe e pede,{' '}
              <span className="text-brand">sem baixar aplicativo.</span>
            </h2>
          </div>

          <p className="text-muted-light">
            O cardápio abre no celular com fotos, categorias e selos de PROMOÇÃO, MAIS VENDIDO e NOVO. O cliente personaliza o prato, escolhe a forma de pagamento e acompanha o pedido ao vivo.
          </p>

          <ul className="space-y-3">
            <CheckItem>Preço original riscado nas promoções</CheckItem>
            <CheckItem>
              Observação por item (&ldquo;sem cebola&rdquo;, &ldquo;feijão separado&rdquo;)
            </CheckItem>
            <CheckItem>Item esgotou? Pause com um toque</CheckItem>
            <CheckItem>
              Cliente compra como convidado ou cria conta para guardar histórico e endereço
            </CheckItem>
            <CheckItem>
              Acompanhamento do status do pedido em tempo real
            </CheckItem>

            {FEATURES.deliveryFeeByDistance && (
              <CheckItem>Taxa de entrega calculada no checkout</CheckItem>
            )}
            {FEATURES.cartExtras && (
              <>
                <CheckItem>Cupom no carrinho</CheckItem>
                <CheckItem>Horário de funcionamento automático</CheckItem>
                <CheckItem>Talher descartável</CheckItem>
              </>
            )}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function QrCodeSection() {
  const places = [
    'Mesa',
    'Balcão',
    'Sacola de entrega',
    'Panfleto',
    'Bio do Instagram',
    'Status do WhatsApp',
  ];

  // Decorative 9x9 internal grid pattern for the middle of the QR code
  const decorativeMatrix = [
    [1, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 0, 1],
    [1, 1, 0, 0, 1, 1, 0],
    [0, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1],
    [0, 1, 0, 1, 0, 1, 0],
    [1, 1, 1, 0, 1, 0, 1],
  ];

  return (
    <Section id="qrcode" variant="dark">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        {/* Left: Decorative QR Code Card */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <Card
            variant="dark"
            className="flex flex-col items-center justify-center p-8 w-full max-w-[340px]"
          >
            <div className="rounded-3xl bg-paper p-5 shadow-lg">
              <svg
                aria-hidden="true"
                viewBox="0 0 120 120"
                className="h-44 w-44 text-ink"
                fill="currentColor"
              >
                {/* Top-Left Finder */}
                <rect x="8" y="8" width="32" height="32" rx="6" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="17" y="17" width="14" height="14" rx="3" />

                {/* Top-Right Finder */}
                <rect x="80" y="8" width="32" height="32" rx="6" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="89" y="17" width="14" height="14" rx="3" />

                {/* Bottom-Left Finder */}
                <rect x="8" y="80" width="32" height="32" rx="6" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="17" y="89" width="14" height="14" rx="3" />

                {/* Decorative Modules */}
                {decorativeMatrix.map((row, rIdx) =>
                  row.map((cell, cIdx) =>
                    cell ? (
                      <rect
                        key={`${rIdx}-${cIdx}`}
                        x={46 + cIdx * 9}
                        y={46 + rIdx * 9}
                        width="6.5"
                        height="6.5"
                        rx="2"
                      />
                    ) : null
                  )
                )}
                <rect x="48" y="12" width="7" height="7" rx="2" />
                <rect x="60" y="12" width="7" height="7" rx="2" />
                <rect x="48" y="24" width="7" height="7" rx="2" />
                <rect x="12" y="48" width="7" height="7" rx="2" />
                <rect x="24" y="58" width="7" height="7" rx="2" />
              </svg>
            </div>

            <div className="mt-5">
              <Pill tone="amber">Seu QR Code</Pill>
            </div>
          </Card>
        </div>

        {/* Right: Copy and Place Chips */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <Eyebrow tone="amber">QR CODE</Eyebrow>
            <h2 className="heading-h2 text-paper">
              QR Code <span className="text-amber">onde o cliente já está.</span>
            </h2>
          </div>

          <p className="text-muted-dark max-w-2xl">
            Mesa, balcão, sacola de entrega, panfleto, bio do Instagram, status do WhatsApp. Quem já compra de você passa a pedir direto, e o cliente fica na sua base.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-1">
            {places.map((place) => (
              <span
                key={place}
                className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-ink-2 px-4 py-2.5 text-sm font-medium text-paper"
              >
                <QrCode aria-hidden="true" className="h-4 w-4 text-amber" />
                <span>{place}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export function MarmitaBuilderSection() {
  return (
    <Section id="marmitas" variant="cream">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left: Copy + Table */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <Eyebrow>MONTADOR DE PRATOS</Eyebrow>
            <h2 className="heading-h2 text-ink">
              Marmita P, M e G{' '}
              <span className="text-brand">
                com limite de proteína e acompanhamento.
              </span>
            </h2>
          </div>

          <p className="text-muted-light">
            Você define quanto cada tamanho leva. O cliente só monta dentro do limite, e o sistema bloqueia o que passar.
          </p>

          <div className="overflow-hidden rounded-2xl border border-sand bg-paper">
            <table className="w-full text-left border-collapse text-sm sm:text-base tabular-nums">
              <thead>
                <tr className="border-b border-sand bg-cream/60 text-xs sm:text-sm text-muted-light">
                  <th className="py-3 px-4 font-semibold">Tamanho</th>
                  <th className="py-3 px-4 font-semibold">Preço</th>
                  <th className="py-3 px-4 font-semibold">Proteínas</th>
                  <th className="py-3 px-4 font-semibold">Acompanhamentos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand">
                <tr>
                  <td className="py-3 px-4 font-bold text-ink">P</td>
                  <td className="py-3 px-4 text-ink">R$ 22,90</td>
                  <td className="py-3 px-4 text-muted-light">até 1</td>
                  <td className="py-3 px-4 text-muted-light">até 2</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-ink">M</td>
                  <td className="py-3 px-4 text-ink">R$ 27,90</td>
                  <td className="py-3 px-4 text-muted-light">até 2</td>
                  <td className="py-3 px-4 text-muted-light">até 3</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-ink">G</td>
                  <td className="py-3 px-4 text-ink">R$ 34,90</td>
                  <td className="py-3 px-4 text-muted-light">até 3</td>
                  <td className="py-3 px-4 text-muted-light">até 4</td>
                </tr>
              </tbody>
            </table>
            <div className="border-t border-sand bg-cream/30 px-4 py-2 text-xs text-muted-light">
              (valores ilustrativos)
            </div>
          </div>

          <ul className="space-y-3">
            <CheckItem>Adicionais pagos somados ao preço na hora</CheckItem>
            <CheckItem>Grupos de escolha obrigatórios ou opcionais</CheckItem>
            <CheckItem>
              Ingrediente em falta? Desative a opção sem mexer no resto do prato
            </CheckItem>
          </ul>

          <p className="text-sm font-medium text-muted-light">
            Serve também para prato feito, hambúrguer, açaí e pizza em tamanhos.
          </p>
        </div>

        {/* Right: Single Animated Phone Mockup */}
        <div className="lg:col-span-6">
          <ManducaUmCelular />
        </div>
      </div>
    </Section>
  );
}

interface KdsNewOrder {
  code: string;
  time: string;
  payment: string;
  customer: string;
  address: string;
  phone: string;
  generalObs: string;
  itemTitle: string;
  price: string;
  details: string;
  itemObs: string;
  isNew?: boolean;
}

interface KdsPrepOrder {
  code: string;
  time: string;
  customer: string;
  address: string;
  generalObs: string;
  itemTitle: string;
  itemObs: string;
  driver: string;
}

interface KdsRouteOrder {
  code: string;
  customer: string;
  address: string;
  driver: string;
  total: string;
}

interface KdsDeliveredOrder {
  code: string;
  customer: string;
  address: string;
  total: string;
}

export function RealtimeKitchenSection() {
  const [muted, setMuted] = useState(false);
  const [ringing, setRinging] = useState(false);
  const [archivedCount, setArchivedCount] = useState(2);

  const [newOrders, setNewOrders] = useState<KdsNewOrder[]>([
    {
      code: '#FR-4771',
      time: '18:43',
      payment: 'Cartão',
      customer: 'Mariana Souza',
      address: 'Alameda Santos, 1220 - Apto 82, Cerqueira ...',
      phone: '(11) 98451-2299',
      generalObs: 'Obs geral: Deixar na portaria com o seu Zé.',
      itemTitle: '1x Sua Marmita Personalizada',
      price: 'R$ 26.90',
      details:
        '• Média (M - 650g) • Frango Grelhado Acebolado • Carne de Panela Desfiada • Arroz Branco Soltinho • Feijão Carioca Caseiro',
      itemObs: 'Obs item: Capricha no tempero!',
    },
    {
      code: '#FR-2044',
      time: '18:43',
      payment: 'Cartão',
      customer: 'Mariana Souza',
      address: 'Alameda Santos, 1220 - Apto 82, Cerqueira ...',
      phone: '(11) 98451-2299',
      generalObs: 'Obs geral: Deixar na portaria com o seu Zé.',
      itemTitle: '1x Sua Marmita Personalizada',
      price: 'R$ 26.90',
      details:
        '• Média (M - 650g) • Frango Grelhado Acebolado • Carne de Panela Desfiada • Arroz Branco Soltinho • Feijão Carioca Caseiro',
      itemObs: 'Obs item: Capricha no tempero!',
    },
  ]);

  const [prepOrders, setPrepOrders] = useState<KdsPrepOrder[]>([
    {
      code: '#FR-1634',
      time: '18:42',
      customer: 'Mariana Souza',
      address: 'Alameda Santos, 1220 - Apto 82, Cerqueira ...',
      generalObs: 'Deixar na portaria com o seu Zé.',
      itemTitle: '1x Sua Marmita Personalizada',
      itemObs: 'Obs: Capricha no tempero!',
      driver: 'Rodrigo Alves (🛵 Em Rota)',
    },
    {
      code: '#FR-3786',
      time: '18:42',
      customer: 'Mariana Souza',
      address: 'Alameda Santos, 1220 - Apto 82, Cerqueira ...',
      generalObs: 'Deixar na portaria com o seu Zé.',
      itemTitle: '1x Sua Marmita Personalizada',
      itemObs: 'Obs: Capricha no tempero!',
      driver: 'Rodrigo Alves (🛵 Em Rota)',
    },
  ]);

  const [routeOrders, setRouteOrders] = useState<KdsRouteOrder[]>([
    {
      code: '#FR-3220',
      customer: 'Mariana Souza',
      address: 'Alameda Santos, 1220 - Apto 82, Cerqueira ...',
      driver: 'Rodrigo Alves (🛵 Em',
      total: 'R$ 31.90',
    },
  ]);

  const [deliveredOrders, setDeliveredOrders] = useState<KdsDeliveredOrder[]>([
    {
      code: '#FR-2758',
      customer: 'Cliente Teste Manduca',
      address: 'Av. Paulista, 1000 - Apto 42, Bela Vista',
      total: 'R$ 65,80',
    },
    {
      code: '#FR-4658',
      customer: 'Carlos Eduardo (Frango Real)',
      address: 'Rua das Flores, 120 - Centro',
      total: 'R$ 32,90',
    },
    {
      code: '#FR-4040',
      customer: 'Carlos Eduardo (Frango Real)',
      address: 'Rua das Flores, 120 - Centro',
      total: 'R$ 25,80',
    },
    {
      code: '#FR-8303',
      customer: 'Carlos Eduardo (Frango Real)',
      address: 'Rua das Flores, 120 - Centro',
      total: 'R$ 34,90',
    },
    {
      code: '#FR-1080',
      customer: 'Rafael Moreira',
      address: 'Alameda Itu, 480 - Jardim Paulista',
      total: 'R$ 29,90',
    },
  ]);

  const playBellSound = () => {
    if (muted || typeof window === 'undefined') return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    try {
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Tone 1: 587.33 Hz (D5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now);
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.58);

      // Tone 2: 880 Hz (A5)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.16);
      gain2.gain.setValueAtTime(0.14, now + 0.16);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.76);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.16);
      osc2.stop(now + 0.8);
    } catch {
      // Fallback silently to visual animation only
    }
  };

  const handleTestBell = () => {
    trackDemoInteractionOnce('campainha');
    playBellSound();
    setRinging(true);
    setTimeout(() => setRinging(false), 700);
  };

  const handleSimulateOrder = () => {
    trackDemoInteractionOnce('campainha');
    playBellSound();
    setRinging(true);
    setTimeout(() => setRinging(false), 700);

    const randomNum = Math.floor(1000 + Math.random() * 8999);
    const nextOrder: KdsNewOrder = {
      code: `#FR-${randomNum}`,
      time: 'Agora',
      payment: 'Pix',
      customer: 'Lucas Oliveira',
      address: 'Rua das Flores, 120 - Ap 42, Centro',
      phone: '(11) 99123-4567',
      generalObs: 'Obs geral: Tocar o interfone 42.',
      itemTitle: '1x Sua Marmita Personalizada',
      price: 'R$ 27.90',
      details:
        '• Média (M - 650g) • Frango Assado na Brasa • Sobrecoxa Desossada • Arroz Branco Soltinho',
      itemObs: 'Obs item: Feijão separado, por favor.',
      isNew: true,
    };

    setNewOrders((prev) => [
      nextOrder,
      ...prev.slice(0, 2).map((o) => ({ ...o, isNew: false })),
    ]);
  };

  const handleAcceptOrder = (code: string) => {
    trackDemoInteractionOnce('campainha');
    const target = newOrders.find((o) => o.code === code);
    if (!target) return;
    setNewOrders((prev) => prev.filter((o) => o.code !== code));
    setPrepOrders((prev) => [
      {
        code: target.code,
        time: target.time,
        customer: target.customer,
        address: target.address,
        generalObs: target.generalObs.replace(/^Obs geral:\s*/i, ''),
        itemTitle: target.itemTitle,
        itemObs: target.itemObs.replace(/^Obs item:\s*/i, 'Obs: '),
        driver: 'Rodrigo Alves (🛵 Em Rota)',
      },
      ...prev,
    ]);
  };

  const handleReadyForDelivery = (code: string) => {
    trackDemoInteractionOnce('campainha');
    const target = prepOrders.find((o) => o.code === code);
    if (!target) return;
    setPrepOrders((prev) => prev.filter((o) => o.code !== code));
    setRouteOrders((prev) => [
      {
        code: target.code,
        customer: target.customer,
        address: target.address,
        driver: 'Rodrigo Alves (🛵 Em',
        total: 'R$ 31.90',
      },
      ...prev,
    ]);
  };

  const handleConfirmDelivery = (code: string) => {
    trackDemoInteractionOnce('campainha');
    const target = routeOrders.find((o) => o.code === code);
    if (!target) return;
    setRouteOrders((prev) => prev.filter((o) => o.code !== code));
    setDeliveredOrders((prev) => [
      {
        code: target.code,
        customer: target.customer,
        address: target.address,
        total: 'R$ 31,90',
      },
      ...prev,
    ]);
  };

  const handleArchiveSingle = (code: string) => {
    trackDemoInteractionOnce('campainha');
    setDeliveredOrders((prev) => prev.filter((o) => o.code !== code));
    setArchivedCount((c) => c + 1);
  };

  const handleArchiveAllDelivered = () => {
    trackDemoInteractionOnce('campainha');
    if (deliveredOrders.length === 0) return;
    setArchivedCount((c) => c + deliveredOrders.length);
    setDeliveredOrders([]);
  };

  const totalKanbanCount =
    newOrders.length +
    prepOrders.length +
    routeOrders.length +
    deliveredOrders.length;

  return (
    <Section id="cozinha" variant="dark">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        {/* Top / Left: Copy */}
        <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <Eyebrow tone="amber">COZINHA EM TEMPO REAL</Eyebrow>
            <h2 className="heading-h2 text-paper">
              O pedido chega{' '}
              <span className="text-amber">e a cozinha ouve.</span>
            </h2>
            <p className="text-muted-dark">
              O painel organiza os pedidos em quatro colunas: pendentes, preparando, em rota e entregues. Quando entra um pedido, toca uma campainha. Deixe aberto no tablet ou no computador do balcão.
            </p>
          </div>

          <div className="lg:col-span-6">
            <ul className="space-y-3">
              <CheckItem dark>
                Comanda para impressora térmica de 80mm ou 58mm, sem cabeçalho de navegador
              </CheckItem>
              <CheckItem dark>
                Arquive os pedidos entregues para manter a tela limpa; o histórico fica guardado e pesquisável por número ou nome do cliente
              </CheckItem>
              <CheckItem dark>
                Botão de teste de som para conferir o alerta antes de abrir a loja
              </CheckItem>
            </ul>
          </div>
        </div>

        {/* Full-Width KDS Kanban Panel matching the real system screenshot */}
        <div className="lg:col-span-12">
          <div className="rounded-[24px] bg-[#F8FAFC] p-3 sm:p-5 text-[#0F172A] shadow-2xl border border-slate-200/80 space-y-3.5">
            {/* Top Bar 1: Kanban Tabs + Arquivar Entregues */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-slate-200/90 bg-white px-3.5 py-2.5 shadow-2xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-xl bg-[#0F172A] px-3.5 py-2 text-xs font-bold text-white shadow-2xs">
                  <Layers aria-hidden="true" className="h-3.5 w-3.5 text-white" />
                  <span>Kanban da Cozinha ({totalKanbanCount})</span>
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600">
                  <Archive aria-hidden="true" className="h-3.5 w-3.5 text-slate-500" />
                  <span>Pedidos Arquivados ({archivedCount})</span>
                </span>
              </div>

              <button
                type="button"
                onClick={handleArchiveAllDelivered}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#059669] hover:bg-[#047857] px-3.5 py-2 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer"
              >
                <Archive aria-hidden="true" className="h-3.5 w-3.5" />
                <span>Arquivar Entregues ({deliveredOrders.length})</span>
              </button>
            </div>

            {/* Top Bar 2: Central Sonora KDS & Impressão Térmica */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:px-4 shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] text-[#EA580C] transition-transform duration-200 ${
                    ringing ? 'scale-110 rotate-12 ring-2 ring-[#F59E0B]/40' : ''
                  }`}
                >
                  <Volume2 aria-hidden="true" className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-[#0F172A] text-sm sm:text-[15px]">
                      Central Sonora KDS &amp; Impressão Térmica
                    </span>
                    {muted ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
                        <VolumeX aria-hidden="true" className="h-3 w-3" />
                        <span>Silenciado</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[11px] font-bold text-[#15803D]">
                        <Volume2 aria-hidden="true" className="h-3 w-3" />
                        <span>Som Ativado</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Toque de campainha automático quando um pedido novo chega na cozinha.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  aria-pressed={muted}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-[#F8FAFC] hover:bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  {muted ? (
                    <>
                      <Volume2 aria-hidden="true" className="h-3.5 w-3.5 text-[#059669]" />
                      <span>Ativar Som</span>
                    </>
                  ) : (
                    <>
                      <VolumeX aria-hidden="true" className="h-3.5 w-3.5 text-slate-500" />
                      <span>Silenciar Cozinha</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleTestBell}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] px-3.5 py-2 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer"
                >
                  <Bell aria-hidden="true" className="h-3.5 w-3.5" />
                  <span>Testar Campainha</span>
                </button>

                <button
                  type="button"
                  onClick={handleSimulateOrder}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] px-3.5 py-2 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer"
                >
                  <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-[#F59E0B]" />
                  <span>Simular Novo Pedido</span>
                </button>
              </div>
            </div>

            {/* 4 Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 items-start">
              {/* Column 1: Novos */}
              <div className="rounded-2xl bg-[#F1F5F9]/90 border border-slate-200/80 p-3 space-y-3">
                <div className="flex items-center gap-2 px-0.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="font-extrabold text-[#0F172A] text-[13px]">
                    Novos ({newOrders.length})
                  </span>
                </div>

                <div className="space-y-3">
                  {newOrders.map((order) => (
                    <div
                      key={order.code}
                      className={`rounded-2xl border-2 border-[#FBBF24] bg-white p-3.5 shadow-2xs space-y-2.5 transition-all ${
                        order.isNew ? 'ring-2 ring-[#F59E0B]/50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-extrabold text-[#0F172A] text-sm tabular-nums">
                            {order.code}
                          </div>
                          <div className="text-[11px] text-slate-400 tabular-nums">
                            {order.time}
                          </div>
                        </div>
                        <span className="rounded-full bg-[#0F172A] px-2.5 py-0.5 text-[10px] font-bold text-white">
                          {order.payment}
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <div className="font-bold text-[#0F172A] text-xs">
                          {order.customer}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {order.address}
                        </div>
                        <div className="text-[11px] text-slate-400 tabular-nums">
                          {order.phone}
                        </div>
                      </div>

                      <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-2 text-[11px] font-semibold text-[#B45309] leading-snug">
                        📌 {order.generalObs}
                      </div>

                      <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-[#F8FAFC] px-2.5 py-1.5 text-[11px] font-semibold text-slate-600">
                        <Leaf aria-hidden="true" className="h-3.5 w-3.5 text-[#16A34A] shrink-0" />
                        <span>Sem talheres (Dispensado)</span>
                      </div>

                      <div className="pt-1 border-t border-slate-100 space-y-1.5">
                        <div className="flex items-baseline justify-between gap-2 text-xs font-bold text-[#0F172A]">
                          <span>{order.itemTitle}</span>
                          <span className="tabular-nums shrink-0">{order.price}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {order.details}
                        </p>
                        <div className="rounded-lg bg-[#FFF7ED] px-2 py-1 text-[10px] font-semibold italic text-[#C2410C]">
                          {order.itemObs}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleAcceptOrder(order.code)}
                          className="flex-1 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] py-2 px-3 text-xs font-bold text-white text-center shadow-2xs transition-colors cursor-pointer"
                        >
                          Aceitar e Preparar
                        </button>
                        <button
                          type="button"
                          aria-label={`Imprimir comanda ${order.code}`}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer"
                        >
                          <Printer aria-hidden="true" className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Em Preparo */}
              <div className="rounded-2xl bg-[#F1F5F9]/90 border border-slate-200/80 p-3 space-y-3">
                <div className="flex items-center gap-2 px-0.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
                  <span className="font-extrabold text-[#0F172A] text-[13px]">
                    Em Preparo ({prepOrders.length})
                  </span>
                </div>

                <div className="space-y-3">
                  {prepOrders.map((order) => (
                    <div
                      key={order.code}
                      className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-extrabold text-[#0F172A] text-sm tabular-nums">
                            {order.code}
                          </div>
                          <div className="text-[11px] text-slate-400 tabular-nums">
                            {order.time}
                          </div>
                        </div>
                        <button
                          type="button"
                          aria-label={`Imprimir comanda ${order.code}`}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 cursor-pointer"
                        >
                          <Printer aria-hidden="true" className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="space-y-0.5">
                        <div className="font-bold text-[#0F172A] text-xs">
                          {order.customer}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {order.address}
                        </div>
                      </div>

                      <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-1.5 text-[11px] font-semibold text-[#B45309]">
                        📌 {order.generalObs}
                      </div>

                      <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-[#F8FAFC] px-2.5 py-1.5 text-[11px] font-semibold text-slate-600">
                        <Leaf aria-hidden="true" className="h-3.5 w-3.5 text-[#16A34A] shrink-0" />
                        <span>Sem talheres</span>
                      </div>

                      <div className="pt-1 border-t border-slate-100 space-y-1.5">
                        <div className="text-xs font-semibold text-[#0F172A]">
                          {order.itemTitle}
                        </div>
                        <div className="rounded-lg bg-[#FFF7ED] px-2 py-1 text-[10px] font-semibold italic text-[#C2410C]">
                          {order.itemObs}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-1.5 pt-1 text-[11px]">
                        <span className="font-medium text-slate-600 shrink-0">
                          🛵 Motoboy:
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-lg border border-[#A855F7] bg-[#FAF5FF] px-2 py-1 text-[10px] font-bold text-[#6B21A8] truncate">
                          <span className="truncate">{order.driver}</span>
                          <ChevronDown aria-hidden="true" className="h-3 w-3 shrink-0" />
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleReadyForDelivery(order.code)}
                        className="w-full rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] py-2 px-3 text-xs font-bold text-white text-center shadow-2xs transition-colors cursor-pointer"
                      >
                        Pronto p/ Entrega
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Em Rota */}
              <div className="rounded-2xl bg-[#F1F5F9]/90 border border-slate-200/80 p-3 space-y-3">
                <div className="flex items-center gap-2 px-0.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#A855F7]" />
                  <span className="font-extrabold text-[#0F172A] text-[13px]">
                    Em Rota ({routeOrders.length})
                  </span>
                </div>

                <div className="space-y-3">
                  {routeOrders.map((order) => (
                    <div
                      key={order.code}
                      className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-extrabold text-[#0F172A] text-sm tabular-nums">
                          {order.code}
                        </span>
                        <span className="text-[11px] font-bold text-[#9333EA]">
                          Com motoboy
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <div className="font-bold text-[#0F172A] text-xs">
                          {order.customer}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {order.address}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-1.5 rounded-xl border border-slate-200 bg-[#F8FAFC] p-2 text-[11px]">
                        <span className="text-slate-600 truncate">🛵 Motobo...</span>
                        <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 truncate">
                          <span className="truncate">{order.driver}</span>
                          <ChevronDown aria-hidden="true" className="h-3 w-3 shrink-0" />
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-[#F8FAFC] px-2.5 py-1.5 text-[11px] font-semibold text-slate-600">
                        <Leaf aria-hidden="true" className="h-3.5 w-3.5 text-[#16A34A] shrink-0" />
                        <span>Sem talheres</span>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="font-bold text-slate-700">
                          Total a receber:
                        </span>
                        <span className="font-extrabold text-[#0F172A] tabular-nums">
                          {order.total}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleConfirmDelivery(order.code)}
                        className="w-full rounded-xl bg-[#059669] hover:bg-[#047857] py-2 px-3 text-xs font-bold text-white text-center shadow-2xs transition-colors cursor-pointer"
                      >
                        Confirmar Entrega
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 4: Entregues */}
              <div className="rounded-2xl bg-[#F1F5F9]/90 border border-slate-200/80 p-3 space-y-3">
                <div className="flex items-center justify-between gap-2 px-0.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                    <span className="font-extrabold text-[#0F172A] text-[13px]">
                      Entregues ({deliveredOrders.length})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleArchiveAllDelivered}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#86EFAC] bg-[#DCFCE7] hover:bg-[#BBF7D0] px-2 py-0.5 text-[10px] font-bold text-[#15803D] cursor-pointer"
                  >
                    <Archive aria-hidden="true" className="h-3 w-3" />
                    <span>Arquivar</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {deliveredOrders.map((order) => (
                    <div
                      key={order.code}
                      className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-700 text-xs tabular-nums">
                          {order.code}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#059669]">
                          <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" />
                          <span>Entregue</span>
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <div className="font-bold text-[#0F172A] text-xs">
                          {order.customer}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {order.address}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="font-extrabold text-[#0F172A] text-xs tabular-nums">
                          {order.total}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleArchiveSingle(order.code)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-[#F1F5F9] hover:bg-slate-200 px-2.5 py-1 text-[10px] font-semibold text-slate-600 transition-colors cursor-pointer"
                        >
                          <Archive aria-hidden="true" className="h-3 w-3" />
                          <span>Arquivar</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

type ReportFilter = 'Hoje' | '7 dias' | '30 dias' | 'Este mês' | 'Personalizado';

interface ReportDataset {
  kpis: {
    label: string;
    value: string;
    delta: string;
    positive: boolean;
  }[];
  dailyBars: { day: string; pct: number }[];
  topDishes: { name: string; qty: number }[];
  payments: { method: string; pct: number; color: string }[];
  peakHours: { hour: string; pct: number }[];
}

const REPORT_DATASETS: Record<'d1' | 'd2' | 'd3', ReportDataset> = {
  d1: {
    kpis: [
      { label: 'Vendas', value: 'R$ 1.480', delta: '+14%', positive: true },
      { label: 'Pedidos', value: '46', delta: '+9%', positive: true },
      { label: 'Ticket médio', value: 'R$ 32,17', delta: '+4%', positive: true },
      { label: 'Clientes novos', value: '11', delta: '+18%', positive: true },
      { label: 'Conversão', value: '38%', delta: '-2%', positive: false },
    ],
    dailyBars: [
      { day: 'Seg', pct: 45 },
      { day: 'Ter', pct: 58 },
      { day: 'Qua', pct: 70 },
      { day: 'Qui', pct: 64 },
      { day: 'Sex', pct: 92 },
      { day: 'Sáb', pct: 100 },
      { day: 'Dom', pct: 78 },
    ],
    topDishes: [
      { name: 'Marmita Executiva M', qty: 19 },
      { name: 'Parmegiana Artesanal', qty: 14 },
      { name: 'Marmita G', qty: 9 },
    ],
    payments: [
      { method: 'Pix', pct: 62, color: '#1F9D63' },
      { method: 'Cartão', pct: 28, color: '#F26A1B' },
      { method: 'Dinheiro', pct: 10, color: '#FFB020' },
    ],
    peakHours: [
      { hour: '11h–12h', pct: 65 },
      { hour: '12h–13h', pct: 100 },
      { hour: '13h–14h', pct: 52 },
    ],
  },
  d2: {
    kpis: [
      { label: 'Vendas', value: 'R$ 8.940', delta: '+19%', positive: true },
      { label: 'Pedidos', value: '284', delta: '+15%', positive: true },
      { label: 'Ticket médio', value: 'R$ 31,48', delta: '+3%', positive: true },
      { label: 'Clientes novos', value: '64', delta: '+22%', positive: true },
      { label: 'Conversão', value: '41%', delta: '+5%', positive: true },
    ],
    dailyBars: [
      { day: 'Seg', pct: 52 },
      { day: 'Ter', pct: 60 },
      { day: 'Qua', pct: 74 },
      { day: 'Qui', pct: 80 },
      { day: 'Sex', pct: 96 },
      { day: 'Sáb', pct: 90 },
      { day: 'Dom', pct: 72 },
    ],
    topDishes: [
      { name: 'Marmita Executiva M', qty: 118 },
      { name: 'Feijoada Individual', qty: 76 },
      { name: 'Parmegiana Artesanal', qty: 54 },
    ],
    payments: [
      { method: 'Pix', pct: 58, color: '#1F9D63' },
      { method: 'Cartão', pct: 32, color: '#F26A1B' },
      { method: 'Dinheiro', pct: 10, color: '#FFB020' },
    ],
    peakHours: [
      { hour: '11h–12h', pct: 72 },
      { hour: '12h–13h', pct: 100 },
      { hour: '19h–20h', pct: 68 },
    ],
  },
  d3: {
    kpis: [
      { label: 'Vendas', value: 'R$ 34.620', delta: '+24%', positive: true },
      { label: 'Pedidos', value: '1.080', delta: '+21%', positive: true },
      { label: 'Ticket médio', value: 'R$ 32,05', delta: '+2%', positive: true },
      { label: 'Clientes novos', value: '215', delta: '+16%', positive: true },
      { label: 'Conversão', value: '43%', delta: '+4%', positive: true },
    ],
    dailyBars: [
      { day: 'Seg', pct: 55 },
      { day: 'Ter', pct: 63 },
      { day: 'Qua', pct: 78 },
      { day: 'Qui', pct: 84 },
      { day: 'Sex', pct: 98 },
      { day: 'Sáb', pct: 100 },
      { day: 'Dom', pct: 82 },
    ],
    topDishes: [
      { name: 'Marmita Executiva M', qty: 462 },
      { name: 'Parmegiana Artesanal', qty: 290 },
      { name: 'Marmita G', qty: 198 },
    ],
    payments: [
      { method: 'Pix', pct: 65, color: '#1F9D63' },
      { method: 'Cartão', pct: 27, color: '#F26A1B' },
      { method: 'Dinheiro', pct: 8, color: '#FFB020' },
    ],
    peakHours: [
      { hour: '11h–12h', pct: 78 },
      { hour: '12h–13h', pct: 100 },
      { hour: '19h–20h', pct: 74 },
    ],
  },
};

export function ReportsSection() {
  const [activeFilter, setActiveFilter] = useState<ReportFilter>('30 dias');
  const [pdfFeedback, setPdfFeedback] = useState(false);

  const filters: ReportFilter[] = [
    'Hoje',
    '7 dias',
    '30 dias',
    'Este mês',
    'Personalizado',
  ];

  const datasetKey =
    activeFilter === 'Hoje'
      ? 'd1'
      : activeFilter === '7 dias'
      ? 'd2'
      : 'd3';
  const data = REPORT_DATASETS[datasetKey];

  return (
    <Section id="relatorios" variant="light">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left: Copy */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <Eyebrow>RELATÓRIOS</Eyebrow>
            <h2 className="heading-h2 text-ink">
              Saiba quanto vendeu,{' '}
              <span className="text-brand">o que vendeu e quando.</span>
            </h2>
          </div>

          <p className="text-muted-light">
            O dashboard mostra vendas, número de pedidos, ticket médio, clientes novos e taxa de conversão. Você vê os pratos mais vendidos, a divisão entre Pix, cartão e dinheiro e os horários de pico da cozinha.
          </p>

          <ul className="space-y-3">
            <CheckItem>
              Filtros: hoje, últimos 7 dias, últimos 30 dias, este mês ou período personalizado
            </CheckItem>
            <CheckItem>
              Comparativo com o período anterior, em porcentagem
            </CheckItem>
            <CheckItem>Exportação em PDF com a sua marca</CheckItem>
          </ul>
        </div>

        {/* Right: Dashboard inside BrowserFrame */}
        <div className="lg:col-span-7">
          <BrowserFrame url="https://manduca.com.br/restaurante/relatorios">
            <div className="p-4 sm:p-5 space-y-4 text-xs">
              {/* Filter Chips + Export PDF Button */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand pb-3">
                <div
                  role="group"
                  aria-label="Filtrar período do relatório"
                  className="flex flex-wrap gap-1.5"
                >
                  {filters.map((f) => {
                    const active = activeFilter === f;
                    return (
                      <button
                        key={f}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setActiveFilter(f);
                          trackDemoInteractionOnce('dashboard');
                        }}
                        className={`min-h-[36px] rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                          active
                            ? 'bg-ink text-amber font-semibold'
                            : 'bg-cream text-muted-light hover:text-ink border border-sand'
                        }`}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    trackDemoInteractionOnce('dashboard');
                    setPdfFeedback(true);
                    setTimeout(() => setPdfFeedback(false), 2000);
                  }}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-sand bg-cream px-3 py-1 text-xs font-semibold text-ink hover:bg-sand/60 cursor-pointer"
                >
                  <FileDown aria-hidden="true" className="h-3.5 w-3.5 text-brand" />
                  <span>{pdfFeedback ? 'PDF ilustrativo' : 'Exportar PDF'}</span>
                </button>
              </div>

              {/* 5 Indicator Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {data.kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-xl border border-sand bg-cream/50 p-2.5 tabular-nums"
                  >
                    <div className="text-[10px] text-muted-light truncate">
                      {kpi.label}
                    </div>
                    <div className="font-bold text-sm text-ink mt-0.5">
                      {kpi.value}
                    </div>
                    <div
                      className={`text-[10px] font-semibold mt-0.5 ${
                        kpi.positive ? 'text-ok' : 'text-brand-strong'
                      }`}
                    >
                      {kpi.delta}
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Bar Chart: Vendas por dia */}
                <div className="rounded-xl border border-sand bg-paper p-3">
                  <div className="font-semibold text-ink mb-2">
                    Vendas por dia
                  </div>
                  <div className="flex items-end justify-between gap-1.5 h-24 pt-2">
                    {data.dailyBars.map((bar) => (
                      <div
                        key={bar.day}
                        className="flex flex-1 flex-col items-center gap-1"
                      >
                        <div className="w-full bg-cream rounded-t h-16 flex items-end">
                          <div
                            className="w-full rounded-t bg-brand transition-all duration-200"
                            style={{ height: `${bar.pct}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-light">
                          {bar.day}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Dishes */}
                <div className="rounded-xl border border-sand bg-paper p-3">
                  <div className="font-semibold text-ink mb-2">
                    Mais vendidos
                  </div>
                  <div className="space-y-2">
                    {data.topDishes.map((dish, idx) => (
                      <div
                        key={dish.name}
                        className="flex items-center justify-between rounded-lg bg-cream/60 px-2.5 py-1.5 tabular-nums"
                      >
                        <span className="truncate font-medium text-ink">
                          {idx + 1}. {dish.name}
                        </span>
                        <span className="font-bold text-brand-strong ml-2">
                          {dish.qty} un.
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Methods Donut */}
                <div className="rounded-xl border border-sand bg-paper p-3 flex items-center gap-3">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 36 36"
                    className="h-16 w-16 shrink-0 -rotate-90"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#F4E8D6"
                      strokeWidth="5"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#1F9D63"
                      strokeWidth="5"
                      strokeDasharray={`${data.payments[0].pct} 100`}
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#F26A1B"
                      strokeWidth="5"
                      strokeDasharray={`${data.payments[1].pct} 100`}
                      strokeDashoffset={`-${data.payments[0].pct}`}
                    />
                  </svg>
                  <div className="flex-1 space-y-1 tabular-nums">
                    <div className="font-semibold text-ink">
                      Formas de pagamento
                    </div>
                    {data.payments.map((p) => (
                      <div
                        key={p.method}
                        className="flex items-center justify-between text-[11px]"
                      >
                        <span className="text-muted-light">{p.method}</span>
                        <span className="font-semibold text-ink">{p.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Peak Hours */}
                <div className="rounded-xl border border-sand bg-paper p-3">
                  <div className="font-semibold text-ink mb-2">
                    Horários de pico
                  </div>
                  <div className="space-y-2 tabular-nums">
                    {data.peakHours.map((pk) => (
                      <div key={pk.hour} className="space-y-0.5">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-muted-light">{pk.hour}</span>
                          <span className="font-semibold text-ink">
                            {pk.pct}%
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-cream overflow-hidden">
                          <div
                            className="h-full rounded-full bg-amber"
                            style={{ width: `${pk.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </BrowserFrame>

          <p className="mt-2.5 text-xs text-muted-light text-right">
            Dados ilustrativos.
          </p>
        </div>
      </div>
    </Section>
  );
}

export function CustomersAndCouponsSection() {
  const [openMenuRow, setOpenMenuRow] = useState<number>(1);

  const customers = [
    {
      name: 'Ana Paula Ribeiro',
      orders: 14,
      total: 'R$ 418,60',
      lastPurchase: 'Ontem',
    },
    {
      name: 'Bruno Carvalho',
      orders: 9,
      total: 'R$ 269,10',
      lastPurchase: 'Há 3 dias',
    },
    {
      name: 'Camila Mendes',
      orders: 6,
      total: 'R$ 184,00',
      lastPurchase: 'Há 6 dias',
    },
    {
      name: 'Diego Nascimento',
      orders: 3,
      total: 'R$ 92,70',
      lastPurchase: 'Há 12 dias',
    },
  ];

  const featureCards = [
    {
      icon: Users,
      text: 'Lista de clientes com número de pedidos, total gasto e data da última compra',
    },
    {
      icon: StickyNote,
      text: 'Anotações internas por cliente',
    },
    {
      icon: Ticket,
      text: 'Cupom exclusivo para um cliente, ligado ao e-mail dele',
    },
    {
      icon: Archive,
      text: 'Cadastro duplicado ou de teste? Arquive, restaure depois ou exclua de vez',
    },
    ...(FEATURES.couponsAll
      ? [
          {
            icon: Tag,
            text: 'Cupons para todos os clientes, com validade e limite de uso',
          },
        ]
      : []),
    ...(FEATURES.pixels
      ? [
          {
            icon: BarChart3,
            text: 'Pixels do Meta, Google e TikTok com monitor de eventos ao vivo',
          },
        ]
      : []),
  ];

  return (
    <Section id="clientes" variant="cream">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        {/* Left: Title + Mockup Table */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <Eyebrow>CLIENTES E CUPONS</Eyebrow>
            <h2 className="heading-h2 text-ink">
              Saiba quem compra de você{' '}
              <span className="text-brand">e traga essa pessoa de volta.</span>
            </h2>
          </div>

          <Card variant="light" className="!p-4 sm:!p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm tabular-nums">
                <thead>
                  <tr className="border-b border-sand text-muted-light">
                    <th className="py-2.5 pr-2 font-semibold">Cliente</th>
                    <th className="py-2.5 px-2 font-semibold">Pedidos</th>
                    <th className="py-2.5 px-2 font-semibold">Total gasto</th>
                    <th className="py-2.5 pl-2 font-semibold">Última compra</th>
                    <th className="py-2.5 pl-2 text-right font-semibold">
                      <span className="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand">
                  {customers.map((c, idx) => (
                    <tr key={c.name} className="relative">
                      <td className="py-3 pr-2 font-medium text-ink">
                        {c.name}
                      </td>
                      <td className="py-3 px-2 text-muted-light">{c.orders}</td>
                      <td className="py-3 px-2 font-semibold text-ink">
                        {c.total}
                      </td>
                      <td className="py-3 pl-2 text-muted-light">
                        {c.lastPurchase}
                      </td>
                      <td className="py-3 pl-2 text-right relative">
                        <button
                          type="button"
                          aria-label={`Ações para ${c.name}`}
                          aria-expanded={openMenuRow === idx}
                          onClick={() =>
                            setOpenMenuRow((prev) => (prev === idx ? -1 : idx))
                          }
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-cream text-muted-light hover:text-ink cursor-pointer"
                        >
                          <MoreVertical aria-hidden="true" className="h-4 w-4" />
                        </button>

                        {openMenuRow === idx && (
                          <div className="absolute right-8 top-2 z-20 flex items-center gap-1.5 rounded-xl border border-sand bg-paper p-1.5 shadow-lg">
                            <span className="inline-flex items-center gap-1 rounded-lg bg-brand/15 px-2.5 py-1 text-[11px] font-semibold text-brand-strong whitespace-nowrap">
                              <Ticket aria-hidden="true" className="h-3 w-3" />
                              Cupom exclusivo
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-lg bg-cream px-2.5 py-1 text-[11px] font-medium text-ink whitespace-nowrap">
                              <Archive aria-hidden="true" className="h-3 w-3" />
                              Arquivar
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <p className="text-xs text-muted-light">Dados ilustrativos.</p>
        </div>

        {/* Right: Feature Cards Grid (2 columns on desktop, 1 on mobile) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featureCards.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.text} variant="light" className="!p-6 space-y-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand-strong">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <p className="text-[15px] font-medium leading-snug text-ink">
                  {item.text}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
