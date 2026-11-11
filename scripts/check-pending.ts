import { getPendingItems, FEATURES } from '../src/config/landing';

const pending = getPendingItems();
const unresolved = pending.filter((item) => !item.resolved);

console.log('=== Manduca Landing Page — Verificação de Pendências ===\n');

if (unresolved.length === 0) {
  console.log('Nenhuma pendência encontrada! Todos os campos estão definidos.');
} else {
  console.log(`${unresolved.length} pendência(s) de negócio aguardando definição em src/config/landing.ts:\n`);
  unresolved.forEach((item, index) => {
    console.log(`${String(index + 1).padStart(2, '0')}. [${item.key}] — ${item.description}`);
  });
}

console.log('\n=== Status das Flags Condicionais (FEATURES) ===\n');
Object.entries(FEATURES).forEach(([key, val]) => {
  console.log(`- FEATURES.${key}: ${JSON.stringify(val)}`);
});
