# Manduca — Landing Page

Página principal (`/`) do **Manduca**, SaaS de cardápio digital e gestão de delivery sem comissão por pedido.

## Como alterar planos, campanha e flags

Toda a configuração de negócio fica centralizada em dois arquivos:

1. **`src/config/plans.ts`**:
   - Define os planos **Manduca Básico** (`basico`) e **Manduca Pro & Domínio** (`pro`).
   - Contém os valores cobrados, valores mensais equivalentes e economia dos períodos **Mensal**, **Trimestral** (`10%`) e **Anual** (`15%`), além da tabela de preços futuros (`FUTURE_PRICE_TABLE`).

2. **`src/config/landing.ts`**:
   - `CAMPAIGN`: controla `active`, `startsOn`, `endsOn`, `spotsTaken`, `suspensionDays` e `futurePricesConfirmed`.
   - `SIGNUP.cardInfo`: define o aviso sobre cartão de crédito no cadastro.
   - `TRIAL`: controla `startNote` e `endNote`.
   - `FEATURES`: flags condicionais (`deliveryFeeByDistance`, `cartExtras`, `couponsAll`, `pixels`, `reportsInBasic`, `dnsHelp`, `pixConfirmation`). Todas iniciam desligadas (`false` ou `''`).
   - `OFFER_RULES` e `FAQ`: textos pendentes sobre troca de plano/período, regra fora dos 30 primeiros e política de cancelamento.
   - `SUPPORT_EMAIL` e `CTA_URL` (padrão `/cadastro`).

## Verificação de pendências

Para listar no terminal todas as pendências de negócio ainda não preenchidas:

```bash
npm run check:pending
```

Para inspecionar visualmente os marcadores `PENDENTE` na interface durante o desenvolvimento, acesse `/?pending=1`. Por padrão (e em produção), qualquer trecho pendente entre colchetes é omitido automaticamente pelo componente `PendingText`.
