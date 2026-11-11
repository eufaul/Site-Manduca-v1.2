export interface CampaignConfig {
  active: boolean;
  startsOn: string;
  endsOn: string;
  spotsTaken: number | null;
  suspensionDays: string;
  futurePricesConfirmed: boolean;
}

export interface SignupConfig {
  cardInfo: string;
}

export interface TrialConfig {
  startNote: string;
  endNote: string;
}

export interface FeaturesConfig {
  deliveryFeeByDistance: boolean;
  cartExtras: boolean;
  couponsAll: boolean;
  pixels: boolean;
  reportsInBasic: boolean;
  dnsHelp: string;
  pixConfirmation: string;
}

export interface OfferRulesConfig {
  planChange: string;
  nonFounders: string;
}

export interface FaqConfig {
  planChange: string;
  cancel: string;
}

export const CAMPAIGN: CampaignConfig = {
  active: true,
  startsOn: '',
  endsOn: '',
  spotsTaken: null,
  suspensionDays: '',
  futurePricesConfirmed: false,
};

export const SIGNUP: SignupConfig = {
  cardInfo: '',
};

export const TRIAL: TrialConfig = {
  startNote: '',
  endNote: '',
};

export const FEATURES: FeaturesConfig = {
  deliveryFeeByDistance: false,
  cartExtras: false,
  couponsAll: false,
  pixels: false,
  reportsInBasic: false,
  dnsHelp: '',
  pixConfirmation: '',
};

export const OFFER_RULES: OfferRulesConfig = {
  planChange: '',
  nonFounders: '',
};

export const FAQ: FaqConfig = {
  planChange: '',
  cancel: '',
};

export const SUPPORT_EMAIL = '';

export const CTA_URL = '/cadastro';

export interface PendingFieldItem {
  key: string;
  description: string;
  resolved: boolean;
  currentValue: unknown;
}

export function getPendingItems(): PendingFieldItem[] {
  return [
    {
      key: 'CAMPAIGN.startsOn',
      description: 'Data de início da campanha Black Friday ([início])',
      resolved: Boolean(CAMPAIGN.startsOn.trim()),
      currentValue: CAMPAIGN.startsOn,
    },
    {
      key: 'CAMPAIGN.endsOn',
      description: 'Data de término da campanha Black Friday ([data] / [fim])',
      resolved: Boolean(CAMPAIGN.endsOn.trim()),
      currentValue: CAMPAIGN.endsOn,
    },
    {
      key: 'CAMPAIGN.spotsTaken',
      description: 'Contador real de vagas preenchidas (X de 30 vagas preenchidas)',
      resolved: typeof CAMPAIGN.spotsTaken === 'number',
      currentValue: CAMPAIGN.spotsTaken,
    },
    {
      key: 'CAMPAIGN.suspensionDays',
      description: 'Quantidade de dias de suspensão que faz perder o benefício ([X dias])',
      resolved: Boolean(CAMPAIGN.suspensionDays.trim()),
      currentValue: CAMPAIGN.suspensionDays,
    },
    {
      key: 'CAMPAIGN.futurePricesConfirmed',
      description: 'Confirmação da tabela "Depois da Black Friday"',
      resolved: Boolean(CAMPAIGN.futurePricesConfirmed),
      currentValue: CAMPAIGN.futurePricesConfirmed,
    },
    {
      key: 'SIGNUP.cardInfo',
      description: 'Confirmação sobre exigência de cartão de crédito no cadastro',
      resolved: Boolean(SIGNUP.cardInfo.trim()),
      currentValue: SIGNUP.cardInfo,
    },
    {
      key: 'TRIAL.startNote',
      description: 'Nota sobre início dos 15 dias de teste',
      resolved: Boolean(TRIAL.startNote.trim()),
      currentValue: TRIAL.startNote,
    },
    {
      key: 'TRIAL.endNote',
      description: 'Nota no FAQ sobre cartão e o que acontece no fim do teste de 15 dias',
      resolved: Boolean(TRIAL.endNote.trim()),
      currentValue: TRIAL.endNote,
    },
    {
      key: 'OFFER_RULES.planChange',
      description: 'Regra da oferta sobre troca de plano ou de período',
      resolved: Boolean(OFFER_RULES.planChange.trim()),
      currentValue: OFFER_RULES.planChange,
    },
    {
      key: 'OFFER_RULES.nonFounders',
      description: 'Regra da oferta sobre valor para quem assina fora dos 30 primeiros',
      resolved: Boolean(OFFER_RULES.nonFounders.trim()),
      currentValue: OFFER_RULES.nonFounders,
    },
    {
      key: 'FAQ.planChange',
      description: 'Resposta da pergunta "Posso trocar de plano ou de período?"',
      resolved: Boolean(FAQ.planChange.trim()),
      currentValue: FAQ.planChange,
    },
    {
      key: 'FAQ.cancel',
      description: 'Resposta da pergunta "Posso cancelar?" (mensal, trimestral e anual)',
      resolved: Boolean(FAQ.cancel.trim()),
      currentValue: FAQ.cancel,
    },
    {
      key: 'SUPPORT_EMAIL',
      description: 'E-mail oficial de suporte exibido no rodapé',
      resolved: Boolean(SUPPORT_EMAIL.trim()),
      currentValue: SUPPORT_EMAIL,
    },
  ];
}
