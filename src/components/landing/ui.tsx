import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Lock } from 'lucide-react';

export const PendingModeContext = createContext<{
  showPending: boolean;
  setShowPending: (val: boolean) => void;
}>({
  showPending: false,
  setShowPending: () => {},
});

export function usePendingMode() {
  return useContext(PendingModeContext);
}

interface PendingTextProps {
  value?: string | null;
  placeholder: string;
  prefix?: string;
  suffix?: string;
}

export function PendingText({
  value,
  placeholder,
  prefix = '',
  suffix = '',
}: PendingTextProps) {
  const { showPending } = usePendingMode();
  const trimmed = typeof value === 'string' ? value.trim() : '';

  if (trimmed) {
    return (
      <>
        {prefix}
        {trimmed}
        {suffix}
      </>
    );
  }

  if (!showPending) {
    return null;
  }

  const cleanLabel = placeholder.replace(/^\[|\]$/g, '');

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-amber/30 border border-amber px-2 py-0.5 text-xs font-medium text-ink align-middle mx-1">
      <span className="rounded bg-amber px-1 py-0.2 text-[10px] font-bold tracking-wider uppercase text-ink">
        PENDENTE
      </span>
      <span>{cleanLabel}</span>
    </span>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline-dark';
  size?: 'md' | 'lg';
  href?: string;
  withArrow?: boolean;
  onNavigate?: (href: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  withArrow = false,
  onNavigate,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'group inline-flex items-center justify-center gap-2.5 rounded-[14px] min-h-[52px] font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber whitespace-nowrap shrink-0 cursor-pointer select-none';

  const sizeStyles =
    size === 'lg'
      ? 'px-7 py-4 text-[17px] lg:text-[18px]'
      : 'px-5 py-3 text-[15px] lg:text-[16px]';

  const variantStyles = {
    primary:
      'bg-amber text-ink font-semibold shadow-[0_6px_20px_rgba(255,176,32,0.24)] hover:bg-[#ffba3b] active:translate-y-[1px]',
    secondary:
      'border-[1.5px] border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink/5 active:translate-y-[1px]',
    'outline-dark':
      'border-[1.5px] border-paper/25 bg-transparent text-paper hover:border-amber hover:text-amber active:translate-y-[1px]',
  }[variant];

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={(e) => {
          if (onNavigate) {
            onNavigate(href, e);
          }
        }}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}

interface EyebrowProps {
  tone?: 'brand' | 'amber';
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ tone = 'brand', children, className = '' }: EyebrowProps) {
  const colorClass = tone === 'amber' ? 'text-amber' : 'text-brand-strong';
  return (
    <p
      className={`text-[12px] font-semibold uppercase tracking-[0.18em] ${colorClass} ${className}`}
    >
      {children}
    </p>
  );
}

interface SectionProps {
  id?: string;
  variant?: 'dark' | 'light' | 'cream';
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  variant = 'light',
  className = '',
  containerClassName = '',
  children,
}: SectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const bgStyles = {
    dark: 'bg-ink text-paper',
    light: 'bg-paper text-ink',
    cream: 'bg-cream text-ink',
  }[variant];

  return (
    <section
      id={id}
      ref={ref}
      className={`py-[80px] lg:py-[112px] ${bgStyles} ${className}`}
    >
      <div
        className={`mx-auto w-full max-w-[1160px] px-4 sm:px-6 reveal-block ${
          visible ? 'is-visible' : ''
        } ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

interface CardProps {
  variant?: 'light' | 'dark' | 'cream';
  className?: string;
  children: React.ReactNode;
}

export function Card({ variant = 'light', className = '', children }: CardProps) {
  const styles = {
    light:
      'bg-paper text-ink border border-sand shadow-[0_10px_30px_rgba(27,17,12,0.04)]',
    cream:
      'bg-cream text-ink border border-sand shadow-[0_10px_30px_rgba(27,17,12,0.03)]',
    dark: 'bg-ink-2 text-paper border border-white/8 shadow-[0_16px_40px_rgba(0,0,0,0.28)]',
  }[variant];

  return <div className={`rounded-[24px] p-6 sm:p-8 ${styles} ${className}`}>{children}</div>;
}

interface CheckItemProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export function CheckItem({ children, dark = false, className = '' }: CheckItemProps) {
  return (
    <li className={`flex items-start gap-3 ${className}`}>
      <span
        aria-hidden="true"
        className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ok text-paper"
      >
        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
      </span>
      <span className={dark ? 'text-paper/90' : 'text-ink'}>{children}</span>
    </li>
  );
}

interface PillProps {
  tone?: 'amber' | 'brand' | 'ok' | 'outline-amber';
  children: React.ReactNode;
  className?: string;
}

export function Pill({ tone = 'amber', children, className = '' }: PillProps) {
  const toneClass = {
    amber: 'bg-amber text-ink font-semibold',
    brand: 'bg-brand/15 text-brand-strong border border-brand/25 font-semibold',
    ok: 'bg-ok/15 text-ok border border-ok/30 font-semibold',
    'outline-amber': 'border border-amber/60 bg-ink-2/90 text-amber font-medium',
  }[tone];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs tracking-wide whitespace-nowrap shrink-0 ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
}

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  darkBezel?: boolean;
}

export function PhoneFrame({
  children,
  className = '',
  innerClassName = '',
  darkBezel = true,
}: PhoneFrameProps) {
  return (
    <div
      className={`relative mx-auto rounded-[36px] p-2.5 shadow-[0_24px_56px_rgba(12,7,5,0.35)] ${
        darkBezel
          ? 'bg-[#140C08] border border-white/15'
          : 'bg-ink border border-ink/20'
      } ${className}`}
    >
      {/* Top Speaker / Notch */}
      <div
        aria-hidden="true"
        className="mx-auto mb-2 h-1.5 w-14 rounded-full bg-white/15"
      />
      <div
        className={`overflow-hidden rounded-[26px] bg-paper text-ink ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}

interface BrowserFrameProps {
  url: string;
  secure?: boolean;
  highlightUrl?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function BrowserFrame({
  url,
  secure = true,
  highlightUrl = false,
  children,
  className = '',
}: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-[24px] border border-sand bg-paper shadow-[0_20px_50px_rgba(27,17,12,0.12)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-sand bg-cream px-4 py-3">
        <div aria-hidden="true" className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
        </div>
        <div
          className={`flex flex-1 items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-mono truncate ${
            highlightUrl
              ? 'border-ok/40 bg-paper text-ink font-medium shadow-xs'
              : 'border-sand bg-paper/80 text-muted-light'
          }`}
        >
          {secure && <Lock aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-ok" />}
          <span className="truncate">{url}</span>
        </div>
      </div>
      <div className="bg-paper text-ink">{children}</div>
    </div>
  );
}

export interface BrandLogoProps {
  variant?: 'branco' | 'escuro' | 'laranja';
  withTagline?: boolean;
  withIcon?: boolean;
  className?: string;
}

export function BrandLogo({
  variant = 'branco',
  withTagline = false,
  withIcon = false,
  className = '',
}: BrandLogoProps) {
  const srcMap = withTagline
    ? {
        branco: '/assets/aistudio/manduca-tagline-branco_e1776525.svg',
        escuro: '/assets/aistudio/manduca-tagline-escuro_e7a31096.svg',
        laranja: '/assets/aistudio/manduca-tagline-laranja_80b2fb59.svg',
      }
    : {
        branco: '/assets/aistudio/manduca-branco_dc771929.svg',
        escuro: '/assets/aistudio/manduca-escuro_79204966.svg',
        laranja: '/assets/aistudio/manduca-laranja_41c0a139.svg',
      };

  return (
    <span className="inline-flex items-center gap-2.5 shrink-0">
      {withIcon && (
        <img
          src="/assets/aistudio/favicon_3d72de0c.svg"
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
          className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg shrink-0 select-none"
        />
      )}
      <img
        src={srcMap[variant]}
        alt="Manduca"
        width={withTagline ? 196 : 152}
        height={withTagline ? 46 : 28}
        className={`w-auto select-none ${
          withTagline ? 'h-9 sm:h-11' : 'h-6 sm:h-7'
        } ${className}`}
      />
    </span>
  );
}

