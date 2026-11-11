'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Crown,
  Eye,
  EyeOff,
  FileText,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  User,
  Utensils,
  AlertCircle,
  Zap,
} from 'lucide-react';

const BUSINESS_CATEGORIES = [
  'Hamburgueria',
  'Marmitaria',
  'Pizzaria',
  'Pastelaria',
  'Japonês',
  'Açaí & Sorveteria',
  'Restaurante Brasileiro',
  'Padaria & Confeitaria',
  'Lanchonete & Porções',
  'Outro',
];

interface PlanDefinition {
  id: 'nivel_1' | 'nivel_2';
  shortLabel: string;
  name: string;
  badge: string;
  popular?: boolean;
  referencePrice: string;
  description: string;
  features: { text: string; highlight?: boolean }[];
}

const MANDUCA_PLANS: Record<'nivel_1' | 'nivel_2', PlanDefinition> = {
  nivel_1: {
    id: 'nivel_1',
    shortLabel: 'Plano 1',
    name: 'Manduca Essencial',
    badge: '15 Dias Grátis • Plano Essencial',
    popular: false,
    referencePrice: '49,00',
    description: 'Estrutura essencial para digitalizar o cardápio e operar a cozinha sem comissões.',
    features: [
      { text: 'Cardápio digital QR Code ilimitado' },
      { text: '0% de taxas por pedido', highlight: true },
      { text: 'Painel KDS de Cozinha com alertas sonoros', highlight: true },
      { text: 'Impressão térmica e gestão de pedidos' },
    ],
  },
  nivel_2: {
    id: 'nivel_2',
    shortLabel: 'Plano 2',
    name: 'Manduca Pro & Domínio',
    badge: '⭐ 15 Dias Grátis do Plano Pro',
    popular: true,
    referencePrice: '69,00',
    description: 'Operação completa com domínio próprio, frota de entregadores e automação no WhatsApp.',
    features: [
      { text: 'Tudo do Plano 1 (Manduca Essencial)' },
      { text: 'Domínio Próprio (seurestaurante.com.br)', highlight: true },
      {
        text: 'Equipe de Entregadores & Motoboys Terceiros (Uber Direct, 99, iFood, Foody)',
        highlight: true,
      },
      { text: 'Disparo automático de mensagens no WhatsApp', highlight: true },
      { text: 'Cupons de desconto & Pixel de Marketing' },
    ],
  },
};

function formatCpfCnpj(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 14);
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

function formatPhoneBR(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  colorClass: string;
  textClass: string;
} {
  if (!password) {
    return {
      score: 0,
      label: 'Mínimo 6 caracteres',
      colorClass: 'bg-slate-200',
      textClass: 'text-slate-400',
    };
  }
  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 1;

  if (password.length < 6) {
    return {
      score: 1,
      label: 'Muito curta (mín. 6 caracteres)',
      colorClass: 'bg-red-500',
      textClass: 'text-red-600',
    };
  }
  if (score <= 2) {
    return {
      score: 2,
      label: 'Força razoável',
      colorClass: 'bg-amber-500',
      textClass: 'text-amber-600',
    };
  }
  if (score === 3) {
    return {
      score: 3,
      label: 'Boa segurança',
      colorClass: 'bg-orange-600',
      textClass: 'text-orange-600',
    };
  }
  return {
    score: 4,
    label: 'Senha forte e segura',
    colorClass: 'bg-emerald-600',
    textClass: 'text-emerald-600',
  };
}

export default function CadastroRestaurantePage() {
  const [step, setStep] = useState<1 | 2>(1);

  // Plan Selection State ('nivel_2' recommended default)
  const [selectedPlan, setSelectedPlan] = useState<'nivel_1' | 'nivel_2'>('nivel_2');

  // Step 1 Form State
  const [storeName, setStoreName] = useState('');
  const [businessType, setBusinessType] = useState('Hamburgueria');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  // Step 2 OTP State
  const [otpCode, setOtpCode] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const otpInputRef = useRef<HTMLInputElement | null>(null);

  // UI Feedback State
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  // Optional URL query sync (?plan=basico|nivel_1|pro|nivel_2)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get('plan');

    if (planParam === 'nivel_1' || planParam === 'basico') {
      setSelectedPlan('nivel_1');
    } else if (planParam === 'nivel_2' || planParam === 'pro') {
      setSelectedPlan('nivel_2');
    }
  }, []);

  // Auto-focus OTP input & manage 60s countdown on Step 2
  useEffect(() => {
    if (step === 2) {
      const focusTimeout = setTimeout(() => {
        otpInputRef.current?.focus();
      }, 80);
      return () => clearTimeout(focusTimeout);
    }
  }, [step]);

  useEffect(() => {
    if (step !== 2 || resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const cleanDoc = document.replace(/\D/g, '');
  const cleanPhone = phone.replace(/\D/g, '');
  const passwordStrength = getPasswordStrength(password);
  const activePlanObj = MANDUCA_PLANS[selectedPlan];

  const validateStep1 = (): string | null => {
    if (storeName.trim().length < 2) {
      return 'Informe o nome do restaurante ou loja (mínimo de 2 letras).';
    }
    if (!businessType.trim()) {
      return 'Selecione a categoria gastronômica do seu restaurante.';
    }
    if (ownerName.trim().split(/\s+/).length < 2) {
      return 'Informe o nome e sobrenome completos do responsável.';
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return 'Informe um e-mail comercial válido.';
    }
    if (cleanDoc.length !== 11 && cleanDoc.length !== 14) {
      return 'Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.';
    }
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      return 'Informe um número de WhatsApp comercial válido com DDD.';
    }
    if (address.trim().length < 6) {
      return 'Informe o endereço físico completo da loja.';
    }
    if (password.length < 6) {
      return 'A senha deve possuir no mínimo 6 caracteres.';
    }
    if (!acceptedTerms) {
      return 'Você precisa aceitar os Termos de Uso e a Política de Privacidade para continuar.';
    }
    return null;
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');

    const validationError = validateStep1();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register-restaurant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_code',
          ownerName,
          email: email.trim().toLowerCase(),
          document: document.replace(/\D/g, ''),
          storeName,
          businessType,
          phone: phone.replace(/\D/g, ''),
          address,
          password,
          plan: selectedPlan,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStep(2);
        setResendTimer(60);
        setInfoMessage('Enviamos um código de segurança de 6 dígitos para o seu e-mail.');
      } else {
        setError(
          data.error || 'Não foi possível enviar o código de verificação. Verifique os dados.'
        );
      }
    } catch {
      setError('Erro de conexão com o servidor. Tente novamente em instantes.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendTimer > 0 || resending) return;
    setError('');
    setInfoMessage('');
    setResending(true);

    try {
      const res = await fetch('/api/auth/register-restaurant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_code',
          ownerName,
          email: email.trim().toLowerCase(),
          document: document.replace(/\D/g, ''),
          storeName,
          businessType,
          phone: phone.replace(/\D/g, ''),
          address,
          password,
          plan: selectedPlan,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResendTimer(60);
        setInfoMessage('Novo código de 6 dígitos enviado com sucesso!');
      } else {
        setError(data.error || 'Não foi possível reenviar o código.');
      }
    } catch {
      setError('Erro ao reenviar código. Tente novamente.');
    } finally {
      setResending(false);
    }
  };

  const handleVerifyAndCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');

    const cleanCode = otpCode.replace(/\D/g, '').trim();
    if (cleanCode.length !== 6) {
      setError('Digite os 6 dígitos do código de segurança enviado para o seu e-mail.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register-restaurant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify_and_create',
          email: email.trim().toLowerCase(),
          code: otpCode.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        try {
          localStorage.setItem('saas_current_user', JSON.stringify(data.user));
          if (data.restaurant) {
            localStorage.setItem('saas_restaurant', JSON.stringify(data.restaurant));
            if (data.restaurant.slug) {
              localStorage.setItem(
                `saas_restaurant_${data.restaurant.slug}`,
                JSON.stringify(data.restaurant)
              );
            }
          }
          window.dispatchEvent(new Event('saas:auth_change'));
        } catch {
          // Ignore storage quota / private mode errors
        }

        const targetUrl = data.redirectUrl || '/restaurante';
        window.history.pushState({}, '', targetUrl);
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(
          data.error || 'Código inválido ou expirado. Verifique os dígitos informados.'
        );
      }
    } catch {
      setError('Não foi possível validar o código no momento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#1B110C] selection:bg-orange-600 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-[#F4E8D6] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              aria-label="Manduca - Voltar à Página Inicial"
              className="inline-flex items-center gap-2.5 focus:outline-none"
            >
              <img
                src="/assets/aistudio/favicon_3d72de0c.svg"
                alt=""
                aria-hidden="true"
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl shrink-0"
              />
              <img
                src="/assets/aistudio/manduca-escuro_79204966.svg"
                alt="Manduca"
                className="h-6 sm:h-7 w-auto"
              />
            </Link>
            <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-orange-50 border border-orange-200/80 px-3 py-1 text-xs font-semibold text-orange-700">
              <Sparkles className="h-3.5 w-3.5 text-orange-600" />
              15 Dias de Teste Grátis • 0% Comissão
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/restaurante/login"
              className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors"
            >
              Já possui uma conta?{' '}
              <span className="text-orange-600 underline underline-offset-4 font-bold">
                Entrar
              </span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#F4E8D6] bg-[#FFF7EC] px-3 py-2 text-xs sm:text-sm font-semibold text-[#1B110C] hover:border-orange-300 hover:bg-orange-50/70 transition-all"
            >
              <ArrowLeft className="h-4 w-4 text-orange-600" />
              <span className="hidden sm:inline">Voltar à Página Inicial</span>
              <span className="sm:hidden">Início</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Split Layout */}
      <main className="flex-1 py-6 sm:py-10 lg:py-12 px-3.5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Value Proposition & Trust Architecture */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 order-2 lg:order-1">
              <div className="rounded-3xl bg-[#1B110C] text-white p-6 sm:p-8 shadow-[0_24px_60px_rgba(27,17,12,0.16)] border border-white/10 relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-orange-600/20 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-500/15 blur-3xl"
                />

                <div className="relative space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 border border-amber-400/30 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                    <Zap className="h-3.5 w-3.5 text-amber-400" />
                    15 Dias Grátis • Sem Cartão Agora
                  </div>

                  <div className="space-y-3">
                    <h2 className="heading-display text-2xl sm:text-3xl lg:text-[34px] text-white leading-[1.08]">
                      Sua operação completa sem pagar{' '}
                      <span className="text-amber-400">nenhum centavo de comissão.</span>
                    </h2>
                    <p className="text-sm sm:text-base text-[#D9C7B8] leading-relaxed">
                      Configure seu cardápio digital, receba pedidos na cozinha em tempo real e
                      receba Pix e cartão direto na conta da sua empresa.
                    </p>
                  </div>

                  {/* Dynamic Active Plan Summary Card inside Left Column */}
                  <div className="rounded-2xl bg-gradient-to-br from-orange-600/20 via-amber-500/10 to-transparent border border-amber-400/30 p-4 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                        Plano Escolhido para Teste
                      </span>
                      <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">
                        15 Dias Totalmente Grátis
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="font-bold text-white text-base">
                        {activePlanObj.shortLabel} ({activePlanObj.name})
                      </p>
                      <p className="font-extrabold text-amber-400 text-base tabular-nums">
                        Ref.: R$ {activePlanObj.referencePrice}
                        <span className="text-xs font-normal text-[#D9C7B8]">/mês</span>
                      </p>
                    </div>
                    <p className="text-xs text-[#D9C7B8]/90">
                      Teste grátis por 15 dias sem compromisso. Você só escolhe a forma e o ciclo de
                      pagamento (Mensal, Trimestral ou Anual) ao final do período de testes.
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3.5 pt-2 border-t border-white/10">
                    {[
                      {
                        title: 'Cardápio Digital + QR Code Ilimitado',
                        desc: 'Link próprio para WhatsApp, Instagram e atendimento presencial nas mesas.',
                      },
                      {
                        title: 'Painel KDS de Cozinha & Impressão Térmica',
                        desc: 'Campainha sonora na cozinha e impressão de comandas em tempo real.',
                      },
                      {
                        title: 'Domínio Próprio & Notificações WhatsApp',
                        desc: 'Endereço exclusivo seurestaurante.com.br e avisos automáticos de pedido.',
                      },
                      {
                        title: 'Equipe de Entregadores & Motoboys Terceiros',
                        desc: 'Frota própria com rota otimizada ou integração Uber Direct, 99, iFood e Foody.',
                      },
                    ].map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400">
                          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                        </span>
                        <div>
                          <p className="text-sm font-bold text-white">{item.title}</p>
                          <p className="text-xs text-[#D9C7B8]/80 leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Direct Payment Guarantee Pill */}
                  <div className="rounded-2xl bg-[#2A1A12] border border-white/10 p-4 flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-[#1B110C] font-extrabold text-sm">
                      0%
                    </div>
                    <div className="text-xs leading-relaxed text-[#D9C7B8]">
                      <strong className="text-white block text-sm">
                        Sem cartão de crédito no cadastro
                      </strong>
                      Você decide o ciclo de pagamento apenas quando os 15 dias de teste terminarem.
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Support Card */}
              <div className="rounded-2xl border border-[#F4E8D6] bg-white p-5 shadow-xs flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-[#1B110C]">
                    Seus clientes e dados são 100% seus
                  </p>
                  <p className="text-xs text-[#6B5B4E] leading-relaxed">
                    Ambiente criptografado em conformidade com a LGPD. Exporte sua base de clientes
                    e histórico de vendas quando quiser.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: 2-Step Registration & OTP Card */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="rounded-3xl border border-[#F4E8D6] bg-white p-5 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(27,17,12,0.06)]">
                {/* Stepper Header */}
                <div className="mb-7 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-900">
                      <Clock className="h-3.5 w-3.5 text-orange-600" />
                      {step === 1
                        ? 'Etapa 1 de 2 • Escolha o Plano para Testar e Cadastre sua Loja'
                        : 'Etapa 2 de 2 • Validação de Segurança (OTP)'}
                    </span>
                    <span className="text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-200/70 rounded-full px-3 py-0.5">
                      {activePlanObj.name} • 15 Dias Grátis
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="grid grid-cols-2 gap-2">
                    <div
                      className={`h-2 rounded-full transition-colors duration-300 ${
                        step >= 1 ? 'bg-orange-600' : 'bg-slate-200'
                      }`}
                    />
                    <div
                      className={`h-2 rounded-full transition-colors duration-300 ${
                        step === 2 ? 'bg-orange-600' : 'bg-slate-200'
                      }`}
                    />
                  </div>

                  {step === 1 ? (
                    <div className="space-y-1.5 pt-1">
                      <h1 className="heading-display text-2xl sm:text-3xl text-[#1B110C]">
                        Criar minha conta grátis no Manduca
                      </h1>
                      <p className="text-sm text-[#6B5B4E]">
                        Escolha qual plano deseja testar por 15 dias grátis e cadastre os dados do
                        seu restaurante.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1.5 pt-1">
                      <h1 className="heading-display text-2xl sm:text-3xl text-[#1B110C]">
                        Confirme seu código de segurança
                      </h1>
                      <p className="text-sm text-[#6B5B4E]">
                        Enviamos um código de 6 dígitos para{' '}
                        <strong className="text-[#1B110C] font-semibold">
                          {email.trim().toLowerCase()}
                        </strong>
                        . Insira abaixo para ativar os 15 dias grátis da loja{' '}
                        <strong className="text-[#1B110C] font-semibold">{storeName}</strong> no{' '}
                        <strong className="text-orange-600 font-semibold">
                          {activePlanObj.name}
                        </strong>
                        .
                      </p>
                    </div>
                  )}
                </div>

                {/* Error Alert */}
                {error && (
                  <div
                    role="alert"
                    className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/90 p-4 text-xs sm:text-sm font-medium text-red-800"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
                    <div className="flex-1">{error}</div>
                  </div>
                )}

                {/* Info Alert */}
                {infoMessage && !error && (
                  <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 text-xs sm:text-sm font-medium text-emerald-900">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                    <div className="flex-1">{infoMessage}</div>
                  </div>
                )}

                {step === 1 ? (
                  /* ==================== STEP 1 FORM ==================== */
                  <form onSubmit={handleSendCode} className="space-y-6" noValidate>
                    {/* 🎯 1. SELETOR DE PLANOS (APENAS ESCOLHA DO PLANO PARA TESTAR 15 DIAS) */}
                    <div className="space-y-4 rounded-3xl border border-[#F4E8D6] bg-[#FFF7EC]/60 p-4 sm:p-5">
                      <div className="space-y-1">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-600 block">
                          1. Qual plano você deseja testar por 15 dias grátis?
                        </span>
                        <p className="text-xs sm:text-sm font-medium text-[#6B5B4E]">
                          Teste grátis por 15 dias. Sem necessidade de cartão de crédito no
                          cadastro. Você decide o ciclo de pagamento apenas ao final do teste.
                        </p>
                      </div>

                      {/* 2 Clickable Plan Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        {(['nivel_1', 'nivel_2'] as const).map((planKey) => {
                          const plan = MANDUCA_PLANS[planKey];
                          const isSelected = selectedPlan === planKey;
                          const isPro = planKey === 'nivel_2';

                          return (
                            <div
                              key={plan.id}
                              role="radio"
                              aria-checked={isSelected}
                              tabIndex={0}
                              onClick={() => setSelectedPlan(planKey)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setSelectedPlan(planKey);
                                }
                              }}
                              className={`relative flex flex-col justify-between rounded-2xl p-4 sm:p-5 cursor-pointer select-none transition-all duration-200 ${
                                isSelected
                                  ? isPro
                                    ? 'ring-2 ring-orange-500 bg-gradient-to-b from-orange-50/90 via-amber-50/40 to-white border border-orange-400 shadow-[0_14px_34px_rgba(242,106,27,0.16)] scale-[1.01]'
                                    : 'ring-2 ring-orange-500 bg-white border border-orange-400 shadow-[0_12px_28px_rgba(27,17,12,0.08)] scale-[1.01]'
                                  : isPro
                                  ? 'border border-amber-300/90 bg-gradient-to-b from-amber-50/40 to-white hover:border-orange-300 hover:shadow-md'
                                  : 'border border-slate-200 bg-white hover:border-orange-300 hover:shadow-md'
                              }`}
                            >
                              <div className="space-y-3.5">
                                {/* Top Badge + Selection Radio Indicator */}
                                <div className="flex items-center justify-between gap-2">
                                  <span
                                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-extrabold tracking-wide ${
                                      isPro
                                        ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-2xs'
                                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                                    }`}
                                  >
                                    {isPro && <Star className="h-3 w-3 fill-white text-white" />}
                                    {plan.badge}
                                  </span>

                                  <span
                                    className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                                      isSelected
                                        ? 'border-orange-600 bg-orange-600 text-white'
                                        : 'border-slate-300 bg-white'
                                    }`}
                                  >
                                    {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                                  </span>
                                </div>

                                {/* Plan Title & Subtitle */}
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    {isPro && (
                                      <Crown className="h-4 w-4 text-orange-600 shrink-0" />
                                    )}
                                    <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600">
                                      {plan.shortLabel}
                                    </span>
                                  </div>
                                  <h3 className="font-extrabold text-base sm:text-lg text-[#1B110C] mt-0.5">
                                    {plan.name}
                                  </h3>
                                  <p className="text-xs text-[#6B5B4E] mt-0.5 leading-snug">
                                    {plan.description}
                                  </p>
                                </div>

                                {/* Reference Price */}
                                <div className="pt-1 pb-2 border-b border-slate-200/80">
                                  <div className="flex items-baseline gap-1.5">
                                    <span className="text-[11px] font-semibold uppercase tracking-wide text-[#6B5B4E]">
                                      Valor de referência:
                                    </span>
                                    <span className="heading-display text-xl sm:text-2xl font-extrabold text-[#1B110C] tabular-nums">
                                      R$ {plan.referencePrice}
                                    </span>
                                    <span className="text-xs font-semibold text-[#6B5B4E]">
                                      /mês
                                    </span>
                                  </div>
                                  <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                                    R$ 0,00 hoje • 15 dias de teste totalmente grátis
                                  </p>
                                </div>

                                {/* Feature List */}
                                <ul className="space-y-2 text-xs">
                                  {plan.features.map((feat) => (
                                    <li key={feat.text} className="flex items-start gap-2">
                                      <span
                                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                                          isPro
                                            ? 'bg-orange-100 text-orange-700'
                                            : 'bg-emerald-100 text-emerald-700'
                                        }`}
                                      >
                                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                                      </span>
                                      <span
                                        className={`leading-snug ${
                                          feat.highlight
                                            ? 'font-bold text-[#1B110C]'
                                            : 'text-[#6B5B4E]'
                                        }`}
                                      >
                                        {feat.text}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                                <span
                                  className={
                                    isSelected ? 'text-orange-600' : 'text-slate-500'
                                  }
                                >
                                  {isSelected
                                    ? '✓ Selecionado para 15 dias grátis'
                                    : 'Testar este plano por 15 dias'}
                                </span>
                                {isPro && (
                                  <span className="text-[11px] font-extrabold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-md">
                                    Recomendado
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Visible 15-Day Trial Rule Callout */}
                      <div className="rounded-2xl border border-amber-300/80 bg-white/90 px-4 py-3 flex items-start sm:items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-orange-600">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-[#1B110C] leading-snug">
                          <strong>Teste grátis por 15 dias.</strong> Sem necessidade de cartão de
                          crédito no cadastro. Você decide o ciclo de pagamento (Mensal, Trimestral
                          ou Anual) apenas ao final do teste diretamente no painel.
                        </p>
                      </div>
                    </div>

                    {/* Section: Dados da Loja e do Gestor */}
                    <div className="space-y-4 pt-1">
                      <div className="border-b border-slate-100 pb-2">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-600 block">
                          2. Dados do Restaurante e do Gestor
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* 1. storeName */}
                        <div className="sm:col-span-1">
                          <label
                            htmlFor="storeName"
                            className="block text-xs font-bold uppercase tracking-wider text-[#1B110C] mb-1.5"
                          >
                            Nome do Restaurante / Loja *
                          </label>
                          <div className="relative">
                            <Store className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                              id="storeName"
                              name="storeName"
                              type="text"
                              required
                              minLength={2}
                              value={storeName}
                              onChange={(e) => setStoreName(e.target.value)}
                              placeholder="Ex.: Brasa & Burger Artesanal"
                              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-9 py-3 text-sm text-[#1B110C] placeholder:text-slate-400 focus:border-orange-600 focus:bg-white focus:outline-none focus:ring-3 focus:ring-orange-500/15 transition-all"
                            />
                            {storeName.trim().length >= 2 && (
                              <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
                            )}
                          </div>
                        </div>

                        {/* 2. businessType */}
                        <div className="sm:col-span-1">
                          <label
                            htmlFor="businessType"
                            className="block text-xs font-bold uppercase tracking-wider text-[#1B110C] mb-1.5"
                          >
                            Categoria Gastronômica *
                          </label>
                          <div className="relative">
                            <Utensils className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <select
                              id="businessType"
                              name="businessType"
                              value={businessType}
                              onChange={(e) => setBusinessType(e.target.value)}
                              className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-8 py-3 text-sm font-medium text-[#1B110C] focus:border-orange-600 focus:bg-white focus:outline-none focus:ring-3 focus:ring-orange-500/15 transition-all cursor-pointer"
                            >
                              {BUSINESS_CATEGORIES.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Quick Category Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {['Hamburgueria', 'Marmitaria', 'Pizzaria', 'Pastelaria', 'Japonês'].map(
                          (cat) => {
                            const active = businessType === cat;
                            return (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => setBusinessType(cat)}
                                className={`rounded-xl px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                                  active
                                    ? 'bg-orange-600 text-white shadow-xs'
                                    : 'bg-[#FFF7EC] text-[#6B5B4E] hover:bg-orange-100/70 hover:text-[#1B110C] border border-[#F4E8D6]'
                                }`}
                              >
                                {cat}
                              </button>
                            );
                          }
                        )}
                      </div>

                      {/* 3. ownerName & 4. email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="ownerName"
                            className="block text-xs font-bold uppercase tracking-wider text-[#1B110C] mb-1.5"
                          >
                            Nome e Sobrenome do Responsável *
                          </label>
                          <div className="relative">
                            <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                              id="ownerName"
                              name="ownerName"
                              type="text"
                              required
                              value={ownerName}
                              onChange={(e) => setOwnerName(e.target.value)}
                              placeholder="Ex.: Rodrigo Alves"
                              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-9 py-3 text-sm text-[#1B110C] placeholder:text-slate-400 focus:border-orange-600 focus:bg-white focus:outline-none focus:ring-3 focus:ring-orange-500/15 transition-all"
                            />
                            {ownerName.trim().split(/\s+/).length >= 2 && (
                              <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
                            )}
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-bold uppercase tracking-wider text-[#1B110C] mb-1.5"
                          >
                            E-mail Corporativo / Comercial *
                          </label>
                          <div className="relative">
                            <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              autoComplete="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="contato@seurestaurante.com.br"
                              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-9 py-3 text-sm text-[#1B110C] placeholder:text-slate-400 focus:border-orange-600 focus:bg-white focus:outline-none focus:ring-3 focus:ring-orange-500/15 transition-all"
                            />
                            {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && (
                              <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 5. document (CPF/CNPJ) & 6. phone (WhatsApp) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label
                              htmlFor="document"
                              className="block text-xs font-bold uppercase tracking-wider text-[#1B110C]"
                            >
                              CPF ou CNPJ *
                            </label>
                            {cleanDoc.length > 0 && (
                              <span className="text-[11px] font-semibold text-orange-600">
                                {cleanDoc.length <= 11 ? 'Formato CPF' : 'Formato CNPJ'}
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <FileText className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                              id="document"
                              name="document"
                              type="text"
                              inputMode="numeric"
                              required
                              value={document}
                              onChange={(e) => setDocument(formatCpfCnpj(e.target.value))}
                              placeholder="00.000.000/0000-00 ou CPF"
                              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-9 py-3 text-sm font-mono text-[#1B110C] placeholder:font-sans placeholder:text-slate-400 focus:border-orange-600 focus:bg-white focus:outline-none focus:ring-3 focus:ring-orange-500/15 transition-all"
                            />
                            {(cleanDoc.length === 11 || cleanDoc.length === 14) && (
                              <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
                            )}
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-xs font-bold uppercase tracking-wider text-[#1B110C] mb-1.5"
                          >
                            WhatsApp Comercial (com DDD) *
                          </label>
                          <div className="relative">
                            <Phone className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              inputMode="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(formatPhoneBR(e.target.value))}
                              placeholder="(11) 99999-9999"
                              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-9 py-3 text-sm font-mono text-[#1B110C] placeholder:font-sans placeholder:text-slate-400 focus:border-orange-600 focus:bg-white focus:outline-none focus:ring-3 focus:ring-orange-500/15 transition-all"
                            />
                            {cleanPhone.length >= 10 && cleanPhone.length <= 11 && (
                              <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 7. address */}
                      <div>
                        <label
                          htmlFor="address"
                          className="block text-xs font-bold uppercase tracking-wider text-[#1B110C] mb-1.5"
                        >
                          Endereço Físico Completo da Loja *
                        </label>
                        <div className="relative">
                          <MapPin className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            id="address"
                            name="address"
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Rua, Número, Bairro, Cidade - UF"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-9 py-3 text-sm text-[#1B110C] placeholder:text-slate-400 focus:border-orange-600 focus:bg-white focus:outline-none focus:ring-3 focus:ring-orange-500/15 transition-all"
                          />
                          {address.trim().length >= 6 && (
                            <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
                          )}
                        </div>
                      </div>

                      {/* 8. password + Show/Hide + Strength Indicator */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-xs font-bold uppercase tracking-wider text-[#1B110C]"
                          >
                            Senha de Acesso ao Painel *
                          </label>
                          <span className={`text-xs font-semibold ${passwordStrength.textClass}`}>
                            {passwordStrength.label}
                          </span>
                        </div>

                        <div className="relative">
                          <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mínimo de 6 caracteres"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-12 py-3 text-sm text-[#1B110C] placeholder:text-slate-400 focus:border-orange-600 focus:bg-white focus:outline-none focus:ring-3 focus:ring-orange-500/15 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>

                        {/* 4-bar strength meter */}
                        <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                passwordStrength.score >= level
                                  ? passwordStrength.colorClass
                                  : 'bg-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 9. Terms & Privacy Checkbox */}
                    <div className="rounded-2xl border border-[#F4E8D6] bg-[#FFF7EC]/70 p-3.5 sm:p-4">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={acceptedTerms}
                          onChange={(e) => setAcceptedTerms(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer accent-orange-600"
                        />
                        <span className="text-xs sm:text-sm text-[#6B5B4E] leading-relaxed">
                          Li e concordo com os{' '}
                          <Link
                            href="/termos"
                            className="font-bold text-[#1B110C] underline decoration-orange-500/60 underline-offset-2 hover:text-orange-600"
                          >
                            Termos de Uso
                          </Link>{' '}
                          e com a{' '}
                          <Link
                            href="/privacidade"
                            className="font-bold text-[#1B110C] underline decoration-orange-500/60 underline-offset-2 hover:text-orange-600"
                          >
                            Política de Privacidade
                          </Link>{' '}
                          do Manduca.
                        </span>
                      </label>
                    </div>

                    {/* Resumo do Plano Escolhido & Garantia de 15 Dias Grátis (Logo Acima do Botão) */}
                    <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-r from-orange-50/90 via-amber-50/70 to-orange-50/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-extrabold uppercase tracking-wider text-orange-700">
                            Plano Selecionado:
                          </span>
                          <span className="font-extrabold text-sm text-[#1B110C]">
                            {activePlanObj.shortLabel} — {activePlanObj.name}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-emerald-900 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          Teste grátis por 15 dias. Sem necessidade de cartão de crédito no
                          cadastro. Você decide o ciclo de pagamento apenas ao final do teste.
                        </p>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <div className="text-xs text-[#6B5B4E]">Cobrança no cadastro:</div>
                        <div className="text-base sm:text-lg font-extrabold text-emerald-700 tabular-nums">
                          R$ 0,00{' '}
                          <span className="text-xs font-normal text-[#6B5B4E]">
                            (15 dias grátis)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 10. Submit Action Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-4 text-sm sm:text-base font-extrabold text-white shadow-[0_12px_30px_rgba(242,106,27,0.32)] hover:from-orange-700 hover:to-amber-600 active:translate-y-[1px] disabled:opacity-65 disabled:pointer-events-none transition-all cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Enviando código de segurança...</span>
                        </>
                      ) : (
                        <>
                          <span>Criar Minha Conta Grátis • Iniciar 15 Dias de Teste</span>
                          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1 text-xs text-[#6B5B4E]">
                      <span className="inline-flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[2.5]" />
                        15 dias totalmente grátis
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[2.5]" />
                        Sem cartão de crédito agora
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[2.5]" />
                        0% de taxas por pedido
                      </span>
                    </div>
                  </form>
                ) : (
                  /* ==================== STEP 2: OTP VERIFICATION ==================== */
                  <form onSubmit={handleVerifyAndCreate} className="space-y-6" noValidate>
                    {/* Summary Badge of Registered Store, Selected Plan & Email */}
                    <div className="rounded-2xl border border-[#F4E8D6] bg-[#FFF7EC] p-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1B110C]">
                            {storeName || 'Seu Restaurante'} ({businessType})
                          </p>
                          <p className="text-xs text-[#6B5B4E]">
                            {email.trim().toLowerCase()} •{' '}
                            <strong className="text-orange-700">
                              {activePlanObj.name} (15 Dias Grátis)
                            </strong>
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setError('');
                          setInfoMessage('');
                          setStep(1);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-orange-200 bg-white px-3 py-1.5 text-xs font-bold text-orange-700 hover:bg-orange-50 transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Corrigir e-mail/dados
                      </button>
                    </div>

                    {/* Centered High-Contrast 6-Digit Input */}
                    <div className="space-y-3 text-center">
                      <label
                        htmlFor="otpCode"
                        className="block text-xs font-bold uppercase tracking-widest text-[#1B110C]"
                      >
                        Digite o Código de 6 Dígitos
                      </label>

                      <div className="relative max-w-xs mx-auto">
                        <KeyRound className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-600" />
                        <input
                          ref={otpInputRef}
                          id="otpCode"
                          name="otpCode"
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) =>
                            setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))
                          }
                          placeholder="000000"
                          className="w-full rounded-2xl border-2 border-orange-500/80 bg-white pl-11 pr-4 py-4 text-center font-mono text-2xl sm:text-3xl font-extrabold tracking-[0.38em] text-[#1B110C] placeholder:text-slate-300 focus:border-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500/20 shadow-sm transition-all"
                        />
                      </div>

                      {/* Demo Hint for Testing */}
                      <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-xl border border-amber-300/80 bg-amber-50 px-3.5 py-2 text-xs font-medium text-amber-950">
                        <span>
                          Código de teste: <strong className="font-mono font-bold">123456</strong>{' '}
                          ou o código recebido no e-mail
                        </span>
                        <button
                          type="button"
                          onClick={() => setOtpCode('123456')}
                          className="rounded-lg bg-amber-500/25 px-2 py-0.5 text-[11px] font-bold text-amber-950 hover:bg-amber-500/40 transition-colors cursor-pointer"
                        >
                          Preencher 123456
                        </button>
                      </div>
                    </div>

                    {/* Submit OTP Button */}
                    <button
                      type="submit"
                      disabled={loading || otpCode.trim().length < 6}
                      className="group relative flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-4 text-sm sm:text-base font-extrabold text-white shadow-[0_12px_30px_rgba(242,106,27,0.32)] hover:from-orange-700 hover:to-amber-600 active:translate-y-[1px] disabled:opacity-60 disabled:pointer-events-none transition-all cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Validando código e criando sua loja...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="h-5 w-5" />
                          <span>Validar Código e Acessar Painel</span>
                          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    {/* Resend Timer & Back Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-[#6B5B4E]">
                        {resendTimer > 0 ? (
                          <span>
                            Reenviar código disponível em{' '}
                            <strong className="font-mono font-bold text-[#1B110C]">
                              {resendTimer}s
                            </strong>
                          </span>
                        ) : (
                          <span>Não recebeu o e-mail de confirmação?</span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={resendTimer > 0 || resending}
                          onClick={handleResendCode}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-[#1B110C] hover:border-orange-300 hover:bg-orange-50 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
                        >
                          <RefreshCw className={`h-3.5 w-3.5 ${resending ? 'animate-spin' : ''}`} />
                          <span>{resending ? 'Reenviando...' : 'Reenviar Código'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setError('');
                            setInfoMessage('');
                            setStep(1);
                          }}
                          className="text-xs font-semibold text-slate-500 hover:text-[#1B110C] underline underline-offset-4 cursor-pointer"
                        >
                          Corrigir e-mail/dados
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Consistent Minimal Footer */}
      <footer className="border-t border-[#F4E8D6] bg-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B5B4E]">
          <div className="flex items-center gap-2">
            <img
              src="/assets/aistudio/favicon_3d72de0c.svg"
              alt=""
              aria-hidden="true"
              className="h-5 w-5 rounded-md"
            />
            <span className="font-semibold text-[#1B110C]">Manduca Tecnologia Gastronômica</span>
            <span>• Todos os direitos reservados.</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 font-medium">
            <Link href="/termos" className="hover:text-orange-600 transition-colors">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="hover:text-orange-600 transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/restaurante/login" className="hover:text-orange-600 transition-colors">
              Login do Restaurante
            </Link>
            <Link href="/" className="hover:text-orange-600 transition-colors">
              Voltar à Página Inicial
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
