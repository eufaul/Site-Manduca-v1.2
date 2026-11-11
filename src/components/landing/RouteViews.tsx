import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, KeyRound, Lock, LogOut, Sparkles, Store, Truck } from 'lucide-react';
import CadastroRestaurantePage from '../../app/cadastro/page';
import { BrandLogo, Button, Card } from './ui';

interface RouteViewProps {
  path: string;
  search: string;
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function RouteViews({ path, onNavigate }: RouteViewProps) {
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState<{
    name?: string;
    slug?: string;
    businessType?: string;
    phone?: string;
    address?: string;
  } | null>(null);
  const [currentUser, setCurrentUser] = useState<{
    name?: string;
    email?: string;
  } | null>(null);

  useEffect(() => {
    const syncAuth = () => {
      try {
        const rawRest = localStorage.getItem('saas_restaurant');
        const rawUser = localStorage.getItem('saas_current_user');
        setCurrentRestaurant(rawRest ? JSON.parse(rawRest) : null);
        setCurrentUser(rawUser ? JSON.parse(rawUser) : null);
      } catch {
        setCurrentRestaurant(null);
        setCurrentUser(null);
      }
    };
    syncAuth();
    window.addEventListener('saas:auth_change', syncAuth);
    return () => window.removeEventListener('saas:auth_change', syncAuth);
  }, [path]);

  const goHome = (e?: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate('/', e);
  };

  if (path.startsWith('/cadastro')) {
    return <CadastroRestaurantePage />;
  }

  if (path.startsWith('/entregador')) {
    return (
      <div className="min-h-screen bg-ink text-paper py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-md space-y-6">
          <div className="flex items-center justify-between">
            <a
              href="/"
              onClick={goHome}
              aria-label="Manduca - Página inicial"
              className="inline-flex items-center"
            >
              <BrandLogo variant="branco" withIcon />
            </a>
            <a
              href="/"
              onClick={goHome}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-dark hover:text-amber"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              <span>Página inicial</span>
            </a>
          </div>

          <Card variant="dark" className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber text-ink">
                <Truck aria-hidden="true" className="h-6 w-6" />
              </div>
              <div>
                <h1 className="heading-display text-xl text-paper">
                  Acesso do Entregador
                </h1>
                <p className="text-xs text-muted-dark">
                  Informe seu PIN de 4 números
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder="0000"
                className="w-full rounded-xl border border-white/15 bg-ink px-4 py-3 text-center font-mono text-2xl tracking-[0.4em] text-amber focus:border-amber focus:outline-none"
              />
              <Button
                onClick={() => setSubmitted(true)}
                className="w-full"
              >
                Acessar entregas
              </Button>
              {submitted && (
                <p className="text-xs text-center text-amber">
                  Demonstração: use a seção Entregadores na página inicial para testar o fluxo completo.
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (path === '/termos' || path === '/privacidade') {
    const isTerms = path === '/termos';
    return (
      <div className="min-h-screen bg-cream text-ink py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex items-center justify-between">
            <a
              href="/"
              onClick={goHome}
              aria-label="Manduca - Página inicial"
              className="inline-flex items-center"
            >
              <BrandLogo variant="escuro" withIcon />
            </a>
            <a
              href="/"
              onClick={goHome}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-light hover:text-ink"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              <span>Voltar para a página inicial</span>
            </a>
          </div>

          <Card variant="light" className="space-y-4">
            <h1 className="heading-display text-2xl sm:text-3xl text-ink">
              {isTerms ? 'Termos de Uso' : 'Política de Privacidade e LGPD'}
            </h1>
            <p className="text-sm text-muted-light leading-relaxed">
              {isTerms
                ? 'O Manduca é uma plataforma de cardápio digital e gestão de pedidos por assinatura fixa, sem comissão sobre as vendas. O restaurante é responsável pelo cardápio, preparo, preços, recebimento no próprio gateway ou chave Pix e entrega com sua própria equipe.'
                : 'A base de clientes pertence ao restaurante. Os dados são tratados conforme a Lei Geral de Proteção de Dados (LGPD). O cliente final pode baixar os próprios dados e solicitar a exclusão da conta a qualquer momento.'}
            </p>
          </Card>
        </div>
      </div>
    );
  }

  if (path === '/restaurante' && currentRestaurant) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] text-[#1B110C] py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex items-center justify-between">
            <a
              href="/"
              onClick={goHome}
              aria-label="Manduca - Página inicial"
              className="inline-flex items-center"
            >
              <BrandLogo variant="escuro" withIcon />
            </a>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.removeItem('saas_current_user');
                    localStorage.removeItem('saas_restaurant');
                    window.dispatchEvent(new Event('saas:auth_change'));
                  } catch {}
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-sand bg-white px-3 py-2 text-xs font-semibold text-muted-light hover:text-ink cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sair
              </button>
              <a
                href="/"
                onClick={goHome}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-light hover:text-ink"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                <span>Voltar para o site</span>
              </a>
            </div>
          </div>

          <Card variant="light" className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand pb-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-sm">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-orange-600">
                    <Sparkles className="h-3.5 w-3.5" />
                    Teste Grátis de 15 Dias Ativo
                  </span>
                  <h1 className="heading-display text-2xl sm:text-3xl text-ink">
                    {currentRestaurant.name}
                  </h1>
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-bold text-emerald-700">
                Loja Criada & Verificada
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="rounded-2xl border border-sand bg-cream/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-light">
                  Responsável
                </p>
                <p className="font-bold text-ink mt-1">{currentUser?.name || 'Gestor'}</p>
                <p className="text-xs text-muted-light truncate">{currentUser?.email}</p>
              </div>
              <div className="rounded-2xl border border-sand bg-cream/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-light">
                  Categoria
                </p>
                <p className="font-bold text-ink mt-1">
                  {currentRestaurant.businessType || 'Restaurante'}
                </p>
                <p className="text-xs text-muted-light">Plano Pro & Domínio</p>
              </div>
              <div className="rounded-2xl border border-sand bg-cream/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-light">
                  Link do Cardápio
                </p>
                <p className="font-mono text-xs font-bold text-orange-600 mt-1 truncate">
                  manduca.com.br/{currentRestaurant.slug}
                </p>
                <p className="text-xs text-muted-light">Pronto para receber pedidos</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Button href="/" onNavigate={onNavigate}>
                Explorar Recursos na Página Inicial
              </Button>
              <Button
                variant="secondary"
                href="/cadastro"
                onNavigate={onNavigate}
              >
                Voltar ao Cadastro
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Default Login View (/restaurante/login, /restaurante, /admin, /cliente/login)
  return (
    <div className="min-h-screen bg-ink text-paper py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-md space-y-6">
        <div className="flex items-center justify-between">
          <a
            href="/"
            onClick={goHome}
            aria-label="Manduca - Página inicial"
            className="inline-flex items-center"
          >
            <BrandLogo variant="branco" withIcon />
          </a>
          <a
            href="/"
            onClick={goHome}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-dark hover:text-amber"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            <span>Voltar para o site</span>
          </a>
        </div>

        <Card variant="dark" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber text-ink">
              {path.startsWith('/admin') ? (
                <KeyRound aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Store aria-hidden="true" className="h-5 w-5" />
              )}
            </div>
            <div>
              <h1 className="heading-display text-xl text-paper">
                {path.startsWith('/admin')
                  ? 'Portal Super Admin'
                  : path.startsWith('/cliente')
                  ? 'Acesso do Cliente'
                  : 'Painel do Restaurante'}
              </h1>
              <p className="text-xs text-muted-dark">
                Entre com seu e-mail e senha
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-paper/90 mb-1"
              >
                E-mail
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="voce@seurestaurante.com.br"
                className="w-full rounded-xl border border-white/15 bg-ink px-4 py-3 text-sm text-paper focus:border-amber focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="login-pass"
                className="block text-xs font-semibold text-paper/90 mb-1"
              >
                Senha
              </label>
              <input
                id="login-pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/15 bg-ink px-4 py-3 text-sm text-paper focus:border-amber focus:outline-none"
              />
            </div>

            <Button type="submit" className="w-full">
              <Lock aria-hidden="true" className="h-4 w-4 mr-1" />
              Entrar
            </Button>

            {submitted && (
              <p className="rounded-xl bg-amber/15 border border-amber/30 p-3 text-xs text-amber">
                Ainda não tem uma loja cadastrada?{' '}
                <a
                  href="/cadastro"
                  onClick={(e) => onNavigate('/cadastro', e)}
                  className="underline font-bold"
                >
                  Teste 15 dias grátis aqui
                </a>
                .
              </p>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}
