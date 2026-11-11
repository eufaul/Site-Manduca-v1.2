import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Info,
  KeyRound,
  MapPin,
  MessageSquare,
  Navigation,
  RotateCcw,
  Share2,
  ShieldCheck,
  ShoppingBag,
  UserPlus,
  UtensilsCrossed,
} from 'lucide-react';
import { CTA_URL, FEATURES, TRIAL } from '../../config/landing';
import { trackCtaClick, trackDemoInteractionOnce } from '../../config/tracking';
import {
  Button,
  Card,
  CheckItem,
  Eyebrow,
  Pill,
  Section,
} from './ui';
import ManducaCelularEntregador from '../ManducaCelularEntregador';

interface NavigationProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function CustomDomainSection() {
  const steps = [
    'Você informa o endereço no painel.',
    'Cria um registro CNAME no DNS do seu domínio, apontando para cname.manduca.com.br.',
    'Clica em "Verificar domínio". O certificado de segurança é emitido automaticamente.',
  ];

  return (
    <Section id="dominio" variant="dark">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left: Custom Domain Configuration Panel Screenshot */}
        <div className="lg:col-span-6">
          <div className="relative w-full overflow-hidden rounded-[28px] bg-white shadow-2xl ring-1 ring-white/15">
            <div className="relative w-full -m-[1.4%] w-[102.8%]">
              <img
                src="/assets/aistudio/image_7f151461.png"
                width={660}
                height={641}
                alt="Painel de Configuração de Domínio Próprio e Apontamento DNS do Manduca"
                decoding="async"
                draggable={false}
                className="block w-full h-auto select-none"
              />

              {/* Privacy blur overlays hiding sensitive links, domain, and server IP */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute rounded-md backdrop-blur-[5px] bg-white/40"
                style={{
                  left: '4.6%',
                  top: '14.2%',
                  width: '56.2%',
                  height: '2.8%',
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute rounded-md backdrop-blur-[6px] bg-white/45"
                style={{
                  left: '10.1%',
                  top: '27.6%',
                  width: '17.8%',
                  height: '3.1%',
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute rounded-md backdrop-blur-[6px] bg-white/45"
                style={{
                  left: '52.0%',
                  top: '58.6%',
                  width: '20.6%',
                  height: '2.8%',
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute rounded-md backdrop-blur-[6px] bg-white/45"
                style={{
                  left: '52.0%',
                  top: '67.5%',
                  width: '13.6%',
                  height: '2.8%',
                }}
              />
            </div>
          </div>
        </div>

        {/* Right: Copy + Vertical Step-by-Step + DNS Code Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div>
              <Pill tone="amber">Plano Pro &amp; Domínio</Pill>
            </div>
            <Eyebrow tone="amber">DOMÍNIO PRÓPRIO</Eyebrow>
            <h2 className="heading-h2 text-paper">
              Sua loja <span className="text-amber">no seu endereço.</span>
            </h2>
          </div>

          <p className="text-muted-dark">
            No plano Pro &amp; Domínio, o cardápio, o login e o cadastro do cliente abrem em um endereço seu, por exemplo pedidos.seurestaurante.com.br, com HTTPS. Sem o endereço do Manduca no caminho.
          </p>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-paper">Como funciona:</h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <ol className="md:col-span-7 space-y-3">
                {steps.map((step, idx) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber text-xs font-bold text-ink tabular-nums mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-sm sm:text-base text-paper/90">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              {/* Monospace DNS Code Card + SSL Badge */}
              <div className="md:col-span-5 rounded-2xl border border-white/12 bg-ink-2 p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-dark">
                    DNS
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-ok/20 border border-ok/40 px-2.5 py-0.5 text-[11px] font-semibold text-ok">
                    <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
                    <span>Ativo (SSL seguro)</span>
                  </span>
                </div>
                <div className="space-y-1 font-mono text-xs text-paper/95">
                  <div>
                    <span className="text-muted-dark">Tipo:</span> CNAME
                  </div>
                  <div>
                    <span className="text-muted-dark">Nome:</span> pedidos
                  </div>
                  <div className="break-all">
                    <span className="text-muted-dark">Destino:</span>{' '}
                    cname.manduca.com.br
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-dark leading-relaxed">
            A propagação pode levar alguns minutos. O registro do domínio é pago por você, a partir de R$ 40 por ano no Registro.br. Ele fica no seu nome.
          </p>

          {Boolean(FEATURES.dnsHelp.trim()) && (
            <p className="text-xs sm:text-sm text-amber">
              {FEATURES.dnsHelp.trim()}
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}

export function DriversSection() {
  return (
    <Section id="entregadores" variant="light">
      <div className="rounded-[32px] border border-sand bg-cream p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left: Realistic Animated Driver iPhone Mockup */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <ManducaCelularEntregador />
          </div>

          {/* Right: Copy + 2 Cards + Disclaimer */}
          <div className="order-1 lg:order-2 lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div>
                <Pill tone="brand">Plano Pro &amp; Domínio</Pill>
              </div>
              <Eyebrow>ENTREGADORES</Eyebrow>
              <h2 className="heading-h2 text-ink">
                Seus entregadores, cada um com PIN,{' '}
                <span className="text-brand">e a rota na mão.</span>
              </h2>
            </div>

            <p className="text-muted-light">
              Cadastre os motoboys do seu restaurante com nome, celular, veículo e PIN de 4 números. O entregador abre o painel no celular, sem baixar aplicativo. Você pode enviar o link pelo WhatsApp com o acesso já embutido.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <Card variant="light" className="!p-6 space-y-3">
                <h3 className="font-bold text-base text-ink">
                  O que o entregador vê
                </h3>
                <ul className="space-y-2.5 text-sm sm:text-base">
                  <CheckItem>
                    Endereço completo, nome e telefone do cliente
                  </CheckItem>
                  <CheckItem>
                    Botão que abre a rota no Google Maps ou no Waze
                  </CheckItem>
                  <CheckItem>
                    Botão que abre o WhatsApp do cliente com mensagem pronta
                  </CheckItem>
                  <CheckItem>
                    Aviso de cobrança na entrega: dinheiro, com o troco a levar, ou maquininha
                  </CheckItem>
                  <CheckItem>
                    Três toques: Iniciar rota, Cheguei no local, Finalizar entrega
                  </CheckItem>
                </ul>
              </Card>

              <Card variant="light" className="!p-6 space-y-2">
                <h3 className="font-bold text-base text-ink">O que você vê</h3>
                <p className="text-sm sm:text-base text-muted-light">
                  O horário de saída e de chegada de cada entrega, e o status de cada entregador.
                </p>
              </Card>
            </div>

            {/* Soft Highlight Notice */}
            <div className="flex items-start gap-3 rounded-2xl border border-brand/50 bg-paper p-4 text-sm text-ink">
              <Info
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-brand"
              />
              <p className="font-medium">
                O Manduca organiza a entrega com a sua equipe. Ele não fornece entregadores nem faz a logística.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

const PaymentIco = ({ d, size = 20 }: { d: React.ReactNode; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d}
  </svg>
);

const PAYMENT_ICONS = {
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.6-3.4 4.5-5 8-5s6.4 1.6 8 5" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3 10h18M7 14.5h4" />
    </>
  ),
  bank: (
    <>
      <path d="M3 9.5 12 4.5l9 5" />
      <path d="M5.5 10v7.5M10 10v7.5M14 10v7.5M18.5 10v7.5M3.5 20h17" />
    </>
  ),
  store: (
    <>
      <path d="M4 9.5 5.6 5h12.8L20 9.5" />
      <path d="M4.5 9.5h15V19h-15zM9.5 19v-4.5h5V19" />
    </>
  ),
  order: (
    <>
      <path d="M6.5 3.5h11v17l-2.75-1.8L12 20.5l-2.75-1.8-2.75 1.8z" />
      <path d="M9.5 8h5M9.5 11.5h5" />
    </>
  ),
  pix: (
    <>
      <path d="M12 3.5 20.5 12 12 20.5 3.5 12z" />
      <path d="M8.5 12h7" />
    </>
  ),
  cash: (
    <>
      <rect x="2.5" y="6.5" width="19" height="11" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
};

const PAYMENT_GATEWAYS = ['Mercado Pago', 'Pagar.me', 'Appmax', 'Efí Bank'];

const paymentCss = `
.mpg{--o:#F04A00;--o2:#FF7A3D;--os:#FFF2EA;--ink:#1B1714;--mut:#6E665E;--ln:#ECE4DB;--g:#11834A;--gs:#EAF6EF;
  --bg:#FBF8F4;--card:#fff;color:var(--ink)}
.mpg *{box-sizing:border-box}
.mpg-wrap{max-width:1160px;margin:0 auto;display:grid;gap:clamp(36px,5vw,72px);align-items:center}
@media (min-width:980px){.mpg-wrap{grid-template-columns:minmax(0,5fr) minmax(0,7fr)}}

.mpg-lead{margin:18px 0 0;font-size:clamp(16px,1.6vw,18px);line-height:1.6;color:var(--mut);max-width:46ch}
.mpg-lead strong{color:var(--ink);font-weight:600}
.mpg-chips{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0 0;padding:0;list-style:none}
.mpg-chips li{font-size:13.5px;font-weight:600;padding:8px 13px;border-radius:999px;background:var(--card);
  border:1px solid var(--ln);color:var(--ink);white-space:nowrap}
.mpg-opts{margin:26px 0 0;padding:0;list-style:none;display:grid;gap:14px}
.mpg-opts li{display:grid;grid-template-columns:40px 1fr;gap:14px;align-items:start}
.mpg-opts .mpg-ic{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:var(--os);color:var(--o)}
.mpg-opts strong{display:block;font-size:15.5px;font-weight:700;line-height:1.35}
.mpg-opts span{display:block;font-size:14.5px;line-height:1.5;color:var(--mut);margin-top:2px}
.mpg-zero{margin-top:28px;display:flex;gap:16px;align-items:center;padding:16px 18px;border-radius:16px;
  background:var(--ink);color:#fff}
.mpg-zero-n{flex:none;font-size:34px;font-weight:800;letter-spacing:-.03em;line-height:1;color:var(--o2)}
.mpg-zero p{margin:0;font-size:14.5px;line-height:1.5;color:rgba(255,255,255,.72)}
.mpg-zero strong{color:#fff;font-weight:600}

/* ---------- card / diagrama ---------- */
.mpg-card{container-type:inline-size;margin:0;background:var(--card);border:1px solid var(--ln);border-radius:24px;
  padding:clamp(18px,3vw,28px);box-shadow:0 1px 0 rgba(27,23,20,.03),0 24px 60px -28px rgba(60,35,10,.22)}
.mpg-cap{display:flex;justify-content:space-between;align-items:center;gap:12px;padding-bottom:16px;margin-bottom:22px;
  border-bottom:1px solid var(--ln)}
.mpg-cap span{font-size:13px;color:var(--mut)}
.mpg-cap b{font-size:15px;font-weight:700;font-variant-numeric:tabular-nums}

.mpg-flow{display:grid;column-gap:0;row-gap:14px;
  grid-template-columns:minmax(92px,.9fr) minmax(44px,1fr) minmax(150px,1.35fr) minmax(44px,1fr) minmax(150px,1.3fr);
  grid-template-rows:1fr 1fr;
  grid-template-areas:"c m1 g m2 r" "c d1 mm d2 r"}
.mpg-n{position:relative;border-radius:16px;border:1px solid var(--ln);background:#fff;padding:14px;
  display:flex;flex-direction:column;justify-content:center;gap:4px;min-width:0}
.mpg-n .mpg-ni{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:#F5F1EC;color:var(--ink);margin-bottom:6px}
.mpg-n b{font-size:14.5px;font-weight:700;line-height:1.25}
.mpg-n small{font-size:12.5px;line-height:1.4;color:var(--mut)}
.mpg-n--c{grid-area:c;align-items:flex-start}
.mpg-n--g{grid-area:g;border-color:#FFD2BB;background:linear-gradient(180deg,#FFF7F2,#fff)}
.mpg-n--g .mpg-ni{background:var(--o);color:#fff}
.mpg-n--m{grid-area:mm;border-style:dashed;border-color:#D9D1C8;background:#FCFBF9}
.mpg-n--m .mpg-ni{background:#EFEAE4;color:var(--mut)}
.mpg-tag{align-self:flex-start;margin-top:6px;font-size:11.5px;font-weight:700;padding:3px 8px;border-radius:999px;
  background:#EFEAE4;color:var(--mut);white-space:nowrap}

.mpg-r{grid-area:r;display:flex;flex-direction:column;gap:14px;min-width:0}
.mpg-r .mpg-n{flex:1}
.mpg-n--acc{border-color:#BFE3CD;background:var(--gs)}
.mpg-n--acc .mpg-ni{background:var(--g);color:#fff}
.mpg-amt{font-size:17px;font-weight:800;color:var(--g);font-variant-numeric:tabular-nums;letter-spacing:-.01em}
.mpg-n--acc:after{content:"";position:absolute;inset:-1px;border-radius:16px;border:2px solid var(--g);opacity:0;
  animation:mpg-ring 3s ease-out infinite;animation-delay:2.1s;pointer-events:none}

/* conectores */
.mpg-c{position:relative;min-height:44px}
.mpg-c--m1{grid-area:m1}.mpg-c--m2{grid-area:m2}.mpg-c--d1{grid-area:d1}.mpg-c--d2{grid-area:d2}
.mpg-l{position:absolute;left:8px;right:10px;top:50%;height:2px;margin-top:-1px;border-radius:2px;background:var(--o)}
.mpg-l:after{content:"";position:absolute;right:-2px;top:50%;width:8px;height:8px;margin-top:-4px;
  border-top:2px solid var(--o);border-right:2px solid var(--o);transform:rotate(45deg)}
.mpg-c--d1 .mpg-l,.mpg-c--d2 .mpg-l{background:repeating-linear-gradient(90deg,#C9C0B6 0 6px,transparent 6px 11px)}
.mpg-c--d1 .mpg-l:after,.mpg-c--d2 .mpg-l:after{border-color:#C9C0B6}
.mpg-lb{position:absolute;left:50%;bottom:calc(50% + 8px);transform:translateX(-50%);white-space:nowrap;
  font-size:11.5px;font-weight:700;color:var(--o);font-variant-numeric:tabular-nums}
.mpg-c--d1 .mpg-lb,.mpg-c--d2 .mpg-lb{color:#9A9189;font-weight:600}
.mpg-run{position:absolute;left:8px;right:10px;top:50%;height:0;animation:mpg-x 3s cubic-bezier(.55,0,.35,1) infinite;opacity:0}
.mpg-c--m2 .mpg-run{animation-delay:1.05s}
.mpg-run i{position:absolute;left:-5px;top:-5px;width:10px;height:10px;border-radius:50%;background:var(--o);
  box-shadow:0 0 0 4px rgba(240,74,0,.18)}

@keyframes mpg-x{0%{transform:translate3d(0,0,0);opacity:0}6%{opacity:1}34%{opacity:1}40%{transform:translate3d(100%,0,0);opacity:0}100%{transform:translate3d(100%,0,0);opacity:0}}
@keyframes mpg-y{0%{transform:translate3d(0,0,0);opacity:0}6%{opacity:1}34%{opacity:1}40%{transform:translate3d(0,100%,0);opacity:0}100%{transform:translate3d(0,100%,0);opacity:0}}
@keyframes mpg-ring{0%{opacity:.55;transform:scale(1)}40%{opacity:0;transform:scale(1.04)}100%{opacity:0;transform:scale(1.04)}}

.mpg-legend{display:flex;flex-wrap:wrap;gap:8px 20px;margin-top:20px;font-size:12.5px;color:var(--mut)}
.mpg-legend span{display:inline-flex;align-items:center;gap:8px}
.mpg-legend i{width:22px;height:0;border-top:2px solid var(--o)}
.mpg-legend i.d{border:0;height:2px;background:repeating-linear-gradient(90deg,#C9C0B6 0 5px,transparent 5px 9px)}

.mpg-led{margin:20px 0 0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border:1px solid var(--ln);border-radius:16px;overflow:hidden}
.mpg-led div{padding:14px 16px;border-left:1px solid var(--ln);min-width:0}
.mpg-led div:first-child{border-left:0;background:var(--os)}
.mpg-led dt{font-size:12px;color:var(--mut);line-height:1.35}
.mpg-led dd{margin:4px 0 0;font-size:15px;font-weight:700;line-height:1.3}
.mpg-led div:first-child dd{color:var(--o);font-size:18px;font-variant-numeric:tabular-nums}

/* ---------- diagrama vertical (card estreito) ---------- */
@container (max-width:560px){
  .mpg-flow{column-gap:12px;row-gap:0;grid-template-columns:1fr 1fr;grid-template-rows:auto 56px auto 56px auto;
    grid-template-areas:"c c" "m1 d1" "g mm" "m2 d2" "r r"}
  .mpg-n--c{flex-direction:row;align-items:center;gap:12px}
  .mpg-n--c .mpg-ni{margin:0}
  .mpg-r{flex-direction:row;gap:12px}
  .mpg-l{left:50%;right:auto;top:6px;bottom:10px;width:2px;height:auto;margin:0 0 0 -1px}
  .mpg-l:after{right:auto;top:auto;bottom:-2px;left:50%;margin:0 0 0 -4px;transform:rotate(135deg)}
  .mpg-c--d1 .mpg-l,.mpg-c--d2 .mpg-l{background:repeating-linear-gradient(180deg,#C9C0B6 0 6px,transparent 6px 11px)}
  .mpg-lb{left:calc(50% + 10px);bottom:auto;top:50%;transform:translateY(-50%)}
  .mpg-run{left:50%;right:auto;top:6px;bottom:10px;width:0;height:auto;animation-name:mpg-y}
  .mpg-run i{left:-5px;top:-5px}
  .mpg-led{grid-template-columns:1fr}
  .mpg-led div{border-left:0;border-top:1px solid var(--ln);display:flex;justify-content:space-between;align-items:baseline;gap:12px}
  .mpg-led div:first-child{border-top:0}
  .mpg-led dd{margin:0;text-align:right}
}
@container (max-width:360px){
  .mpg-n{padding:12px}
  .mpg-n small{font-size:12px}
}
@media (prefers-reduced-motion:reduce){.mpg-run,.mpg-n--acc:after{animation:none;display:none}}
.mpg-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
`;

export function DirectPaymentSection() {
  return (
    <Section id="pagamento" variant="light">
      <div className="mpg">
        <style dangerouslySetInnerHTML={{ __html: paymentCss }} />
        <div className="mpg-wrap">
          <div>
            <div className="space-y-3">
              <Eyebrow>PAGAMENTO</Eyebrow>
              <h2 id="mpg-title" className="heading-h2 text-ink">
                O dinheiro cai <span className="text-brand">na sua conta.</span>
              </h2>
            </div>

            <p className="mpg-lead">
              Conecte o gateway que você já usa e receba <strong>Pix e cartão direto</strong>. Integramos com:
            </p>

            <ul className="mpg-chips">
              {PAYMENT_GATEWAYS.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>

            <ul className="mpg-opts">
              <li>
                <span className="mpg-ic">
                  <PaymentIco d={PAYMENT_ICONS.pix} />
                </span>
                <div>
                  <strong>Prefere sem taxa de gateway? Pix direto.</strong>
                  <span>Com a sua chave e QR Code na tela.</span>
                </div>
              </li>
              <li>
                <span className="mpg-ic">
                  <PaymentIco d={PAYMENT_ICONS.cash} />
                </span>
                <div>
                  <strong>Pagamento na entrega</strong>
                  <span>Dinheiro, com pergunta de troco, ou maquininha.</span>
                </div>
              </li>
            </ul>

            <div className="mpg-zero">
              <span className="mpg-zero-n">0%</span>
              <p>
                <strong>O Manduca não cobra percentual sobre as vendas.</strong> A taxa do gateway é a que você tem com ele.
              </p>
            </div>

            {Boolean(FEATURES.pixConfirmation.trim()) && (
              <p className="mt-4 text-sm text-muted-light">
                {FEATURES.pixConfirmation.trim()}
              </p>
            )}
          </div>

          <figure className="mpg-card">
            <figcaption className="mpg-cap">
              <span>Exemplo · pedido #1042</span>
              <b>R$ 62,80</b>
            </figcaption>
            <p className="mpg-sr">
              O cliente paga R$ 62,80 pelo seu gateway ou Pix, e o valor cai inteiro na sua conta. O Manduca só recebe os
              dados do pedido e envia a comanda para a sua cozinha. Comissão do Manduca: R$ 0,00.
            </p>

            <div className="mpg-flow" aria-hidden="true">
              <div className="mpg-n mpg-n--c">
                <span className="mpg-ni">
                  <PaymentIco d={PAYMENT_ICONS.user} size={18} />
                </span>
                <div>
                  <b>Cliente</b>
                  <br />
                  <small>paga no checkout</small>
                </div>
              </div>

              <div className="mpg-c mpg-c--m1">
                <span className="mpg-l" />
                <span className="mpg-lb">R$ 62,80</span>
                <span className="mpg-run">
                  <i />
                </span>
              </div>
              <div className="mpg-n mpg-n--g">
                <span className="mpg-ni">
                  <PaymentIco d={PAYMENT_ICONS.card} size={18} />
                </span>
                <b>Seu gateway ou Pix</b>
                <small>Conta em seu nome</small>
              </div>
              <div className="mpg-c mpg-c--m2">
                <span className="mpg-l" />
                <span className="mpg-lb">R$ 62,80</span>
                <span className="mpg-run">
                  <i />
                </span>
              </div>

              <div className="mpg-c mpg-c--d1">
                <span className="mpg-l" />
                <span className="mpg-lb">pedido</span>
              </div>
              <div className="mpg-n mpg-n--m">
                <span className="mpg-ni">
                  <PaymentIco d={PAYMENT_ICONS.order} size={18} />
                </span>
                <b>Manduca</b>
                <small>Organiza o pedido</small>
                <span className="mpg-tag">Não recebe o valor</span>
              </div>
              <div className="mpg-c mpg-c--d2">
                <span className="mpg-l" />
                <span className="mpg-lb">comanda</span>
              </div>

              <div className="mpg-r">
                <div className="mpg-n mpg-n--acc">
                  <span className="mpg-ni">
                    <PaymentIco d={PAYMENT_ICONS.bank} size={18} />
                  </span>
                  <b>Sua conta</b>
                  <span className="mpg-amt">+ R$ 62,80</span>
                </div>
                <div className="mpg-n">
                  <span className="mpg-ni">
                    <PaymentIco d={PAYMENT_ICONS.store} size={18} />
                  </span>
                  <b>Sua cozinha</b>
                  <small>Pedido #1042</small>
                </div>
              </div>
            </div>

            <div className="mpg-legend" aria-hidden="true">
              <span>
                <i />
                Dinheiro
              </span>
              <span>
                <i className="d" />
                Dados do pedido
              </span>
            </div>

            <dl className="mpg-led">
              <div>
                <dt>Comissão do Manduca</dt>
                <dd>R$ 0,00</dd>
              </div>
              <div>
                <dt>Taxa do gateway</dt>
                <dd>A do seu contrato</dd>
              </div>
              <div>
                <dt>Prazo de recebimento</dt>
                <dd>O do seu gateway</dd>
              </div>
            </dl>
          </figure>
        </div>
      </div>
    </Section>
  );
}

export function HowToStartSection({ onNavigate }: NavigationProps) {
  const steps = [
    {
      num: '01',
      icon: UserPlus,
      title: 'Crie a conta',
      text: 'com e-mail ou telefone.',
    },
    {
      num: '02',
      icon: KeyRound,
      title: 'Confirme o código.',
      text: 'A conta é liberada na hora.',
    },
    {
      num: '03',
      icon: UtensilsCrossed,
      title: 'Monte o cardápio',
      text: 'e configure as formas de pagamento.',
    },
    {
      num: '04',
      icon: Share2,
      title: 'Divulgue o link',
      text: 'e receba o primeiro pedido.',
    },
  ];

  return (
    <Section id="como-funciona" variant="dark">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <Eyebrow tone="amber">COMO COMEÇAR</Eyebrow>
        <h2 className="heading-h2 text-paper">
          Da conta <span className="text-amber">ao primeiro pedido.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.num} className="relative flex flex-col">
              <Card variant="dark" className="flex-1 flex flex-col justify-between !p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-sm font-bold text-amber">
                    {step.num}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/15 text-amber">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="heading-display text-xl text-paper mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-dark">{step.text}</p>
                </div>
              </Card>

              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:flex absolute -right-3.5 lg:-right-4 top-1/2 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center rounded-full bg-ink border border-white/15 text-amber"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {Boolean(TRIAL.startNote.trim()) && (
        <p className="mt-8 text-center text-sm text-muted-dark">
          Os 15 dias de teste começam na criação da conta.
        </p>
      )}

      <div className="mt-10 flex justify-center">
        <Button
          href={CTA_URL}
          size="lg"
          withArrow
          onNavigate={(href, e) => {
            trackCtaClick({ location: 'como-funciona' });
            onNavigate(href, e);
          }}
        >
          Criar minha loja e testar 15 dias grátis
        </Button>
      </div>
    </Section>
  );
}
