import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

interface PendingRegistration {
  ownerName: string;
  email: string;
  document: string;
  storeName: string;
  businessType: string;
  phone: string;
  address: string;
  plan: string;
  period: string;
  code: string;
}

function manducaAuthApiPlugin(): Plugin {
  const pendingByEmail = new Map<string, PendingRegistration>();

  return {
    name: 'manduca-auth-api',
    configureServer(server) {
      server.middlewares.use('/api/auth/register-restaurant', (req, res, next) => {
        if (req.method !== 'POST') {
          next();
          return;
        }

        let rawBody = '';
        req.on('data', (chunk) => {
          rawBody += chunk;
        });

        req.on('end', () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const body = JSON.parse(rawBody || '{}');
            const action = body.action;

            if (action === 'send_code') {
              const email = String(body.email || '').trim().toLowerCase();
              const storeName = String(body.storeName || '').trim();
              const ownerName = String(body.ownerName || '').trim();
              const doc = String(body.document || '').replace(/\D/g, '');
              const phone = String(body.phone || '').replace(/\D/g, '');
              const address = String(body.address || '').trim();
              const password = String(body.password || '');

              if (!storeName || storeName.length < 2) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Informe o nome do restaurante (mínimo 2 caracteres).' }));
                return;
              }
              if (!ownerName || ownerName.split(/\s+/).length < 2) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Informe o nome e sobrenome completos do responsável.' }));
                return;
              }
              if (!email || !email.includes('@')) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Informe um e-mail corporativo ou comercial válido.' }));
                return;
              }
              if (doc.length !== 11 && doc.length !== 14) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.' }));
                return;
              }
              if (phone.length < 10 || phone.length > 11) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Informe um WhatsApp comercial válido com DDD.' }));
                return;
              }
              if (!address || address.length < 5) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Informe o endereço físico completo da loja.' }));
                return;
              }
              if (!password || password.length < 6) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'A senha deve ter no mínimo 6 caracteres.' }));
                return;
              }

              pendingByEmail.set(email, {
                ownerName,
                email,
                document: doc,
                storeName,
                businessType: String(body.businessType || 'Hamburgueria'),
                phone,
                address,
                plan: String(body.plan || 'nivel_2'),
                period: String(body.period || 'mensal'),
                code: '123456',
              });

              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  message: 'Código de verificação enviado para o seu e-mail.',
                })
              );
              return;
            }

            if (action === 'verify_and_create') {
              const email = String(body.email || '').trim().toLowerCase();
              const code = String(body.code || '').trim();

              if (code.length !== 6) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Digite o código de 6 dígitos.' }));
                return;
              }

              const record = pendingByEmail.get(email);
              if (code !== '123456' && (!record || record.code !== code)) {
                res.statusCode = 400;
                res.end(
                  JSON.stringify({
                    success: false,
                    error: 'Código de verificação inválido ou expirado. Use 123456 para teste.',
                  })
                );
                return;
              }

              const storeName = record?.storeName || 'Restaurante Manduca';
              const slug =
                storeName
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '') || 'meu-restaurante';

              const user = {
                id: `usr_${Date.now()}`,
                name: record?.ownerName || 'Gestor Manduca',
                email,
                role: 'restaurant_owner',
                restaurantSlug: slug,
              };

              const restaurant = {
                id: `rest_${Date.now()}`,
                name: storeName,
                slug,
                businessType: record?.businessType || 'Hamburgueria',
                document: record?.document || '',
                phone: record?.phone || '',
                address: record?.address || '',
                plan: record?.plan || 'nivel_2',
                trialDays: 15,
                trialEndsAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
              };

              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  user,
                  restaurant,
                  redirectUrl: '/restaurante',
                })
              );
              return;
            }

            res.statusCode = 400;
            res.end(JSON.stringify({ success: false, error: 'Ação inválida.' }));
          } catch {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: 'Erro interno ao processar o cadastro.' }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), manducaAuthApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        'next/link': path.resolve(__dirname, './src/shims/next-link.tsx'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
