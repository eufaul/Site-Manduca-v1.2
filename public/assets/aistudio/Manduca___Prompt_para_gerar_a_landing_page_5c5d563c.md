# Manduca — Prompt para gerar a landing page

Nov 4, 2026 · @Flávio Santos Correia

## Leitura da referência

A referência (captura do rangoja.com, enviada no início da conversa) já é uma página de venda de software para lojistas, não de venda de comida. A estrutura serve quase 1 para 1 para o Manduca. O que muda é o conteúdo de cada bloco e o fato de que o Manduca precisa de mais provas de produto, porque tem mais módulos.

O prompt abaixo usa a referência só como estrutura e ritmo visual. Não copia textos, nome, cores exatas, ícones nem imagens dela.

| Bloco da referência | O que ela faz | Equivalente no Manduca |
| --- | --- | --- |
| Header com CTA amarelo | Logo, 4 links, "Entrar" e botão de teste | Header fixo com CTA "Testar 15 dias grátis" |
| Hero escuro com 3 celulares | Promessa, 2 CTAs, microcopy e selo flutuante | Hero escuro com cardápio, painel e app do entregador |
| Faixa branca de 5 itens com ícone | Prova rápida de benefícios | Faixa de confiança (sem comissão, conta na hora, LGPD) |
| "Como seu cliente vê você" | 2 celulares, 3 checks | Cardápio digital no celular |
| Faixa escura com QR Code | Cartão com QR grande, copy ao lado | QR Code na mesa, balcão e sacola |
| "Já trabalha com iFood?" | Cartão "Gestor" com sino e botão de teste de som | Cozinha em tempo real, com botão que toca a campainha |
| 5 cards de operação | Pedidos, caixa, preparar, entregas, relatórios | Relatórios, clientes e cupons |
| Painel creme com celular de gestor | Pedido pronto, entregador e rota | Entregadores com PIN e rota (Pro) |
| Fluxo em 5 passos numerados | Do pedido ao resultado | Como começar, em 4 passos |
| Preço com 2 cards | Mensal e trimestral, plano destacado | 2 planos com seletor de período e card "Depois da Black Friday" |
| CTA final em cartão verde | Título, texto e botão | CTA final |

Blocos que o Manduca acrescenta e a referência não tem: comparativo de custo com o iFood, montador de marmitas P, M e G, domínio próprio, relatórios com PDF e FAQ.

Decisões de design que eu tomei e você pode trocar:

- **Paleta:** a referência usa verde escuro com amarelo. Para o Manduca, proponho marrom quente escuro com laranja, para não parecer cópia e combinar com o setor de comida.
- **Logo:** não existe ainda, então o prompt manda usar só o nome "Manduca" em texto, como marca provisória.
- **Imagens:** nada de fotos de banco. Os celulares e painéis são montados em código, com dados ilustrativos.

## Prompt, parte 1: papel, objetivo e design system

Copie daqui até o fim da parte 3 para a ferramenta de IA. Exporte o documento em Markdown, se preferir.

### Papel e objetivo

Você é um designer e desenvolvedor front-end sênior, especialista em landing pages de alta conversão para SaaS B2B de pequenas empresas brasileiras. Crie a página principal (rota `/`) do **Manduca**, um SaaS de cardápio digital e gestão de delivery para restaurantes, marmitarias, pizzarias, lanchonetes e rotisserias.

O objetivo único da página é levar o dono do restaurante a clicar em **"Criar minha loja e testar 15 dias grátis"**. Todo bloco deve empurrar para esse clique ou tirar uma objeção. Nada decorativo que não ajude nisso.

### Contexto do produto

- O Manduca cobra assinatura fixa e **não cobra comissão por pedido**. O restaurante vende pelo próprio link e recebe direto no gateway dele ou na chave Pix.
- Planos: **Manduca Básico** (cardápio, painel de pedidos, relatórios, clientes, pagamentos) e **Manduca Pro & Domínio** (tudo do Básico, mais domínio próprio e módulo de entregadores). Períodos: mensal, trimestral e anual.
- Quatro portais já existem: Super Admin, Restaurante (painel Kanban de pedidos com campainha, cardápio, clientes, relatórios), Cliente (cardápio PWA e checkout) e Entregador (app web com PIN).
- O Manduca **não traz clientes novos** nem fornece entregadores. Isso aparece com clareza na página. Não prometa o que o produto não faz.
- Não há clientes pagantes nem depoimentos ainda. Não invente depoimentos, números de clientes, notas, selos de imprensa, logos de clientes ou contadores.

### Público e uso

Dono ou gerente de pequeno restaurante, com pouco tempo e pouca paciência para jargão. Chega principalmente pelo celular, vindo de anúncio no Instagram e no Google. Projete **mobile-first (360 px)**, depois tablet e desktop. Escreva e desenhe para quem lê em 10 segundos.

### Referência visual

A estrutura e o ritmo seguem o de uma landing page de SaaS para lojistas: alternância entre seções escuras e claras, hero escuro com celulares em ângulo, faixa branca de benefícios com ícones, seção com QR Code grande, cartões arredondados com sombra suave e CTA amarelo bem visível. **Não copie** textos, nome, logo, ícones ou imagens de nenhum site existente. Use a referência só como estrutura e energia.

### Design system

**Cores (defina como variáveis CSS e como tokens do Tailwind):**

| Token | Valor | Uso |
| --- | --- | --- |
| `ink` | `#1B110C` | Fundo escuro principal, texto sobre claro |
| `ink-2` | `#2A1A12` | Cartões sobre fundo escuro |
| `brand` | `#F26A1B` | Destaques de texto em fundo claro, ícones, links |
| `brand-strong` | `#C2410C` | Texto pequeno laranja em fundo claro (contraste) |
| `amber` | `#FFB020` | Botão primário e destaque de texto em fundo escuro |
| `cream` | `#FFF7EC` | Fundo de seções suaves |
| `sand` | `#F4E8D6` | Bordas e divisores sobre creme |
| `paper` | `#FFFFFF` | Cartões e faixas claras |
| `ok` | `#1F9D63` | Checks e estados de sucesso |
| `muted-dark` | `#D9C7B8` com 80% de opacidade | Texto secundário sobre fundo escuro |
| `muted-light` | `#6B5B4E` | Texto secundário sobre fundo claro |

**Tipografia (via `next/font/google`):** títulos em **Bricolage Grotesque** peso 800, `letter-spacing: -0.03em`, `line-height: 1.02`; corpo em **Inter** 400 e 500. H1 com `clamp(2.5rem, 6vw, 4.5rem)`, H2 com `clamp(1.9rem, 4vw, 3rem)`. Corpo em 17 px no celular e 18 px no desktop, `line-height: 1.6`.

**Padrão de título:** a segunda parte da frase recebe a cor de destaque (`amber` em fundo escuro, `brand` em fundo claro). Exemplo: "Seu delivery com link próprio e \<destaque>sem comissão por pedido.\</destaque>"

**Componentes a criar e reusar:**

- `Button`: primário (fundo `amber`, texto `ink`, raio 14 px, altura mínima 52 px, sombra suave, seta que desliza no hover), secundário (contorno 1.5 px), tamanhos `md` e `lg`.
- `Eyebrow`: texto em caixa alta, 12 px, `letter-spacing: 0.18em`, cor `brand` ou `amber`.
- `Section`: variantes `dark`, `light`, `cream`; `padding-block` de 80 px (celular) e 112 px (desktop); container de 1160 px.
- `Card`: raio 24 px, borda de 1 px em `sand`, sombra suave; variante escura com fundo `ink-2` e borda branca a 8% de opacidade.
- `CheckItem`: círculo `ok` com check branco e texto.
- `PhoneFrame` e `BrowserFrame`: molduras desenhadas em CSS, com cantos arredondados, entalhe e sombra, para receber mockups de interface montados em código (sem imagens externas).
- `Pill`: etiqueta arredondada para selos como "MAIS VANTAJOSO" e "Mais completo".

**Espaço, movimento e acessibilidade:** raio de 24 px nos cartões e 14 px nos botões; microinterações de 150 a 250 ms; elementos que entram na tela com fade e subida de 12 px, **desativados em `prefers-reduced-motion`**; contraste mínimo AA; foco visível em tudo que clica; alvo de toque de pelo menos 44 px.

**Tom da escrita:** direto, concreto e sem exagero. Use a copy fornecida **exatamente como está**. Não reescreva, não acrescente adjetivos, não use emojis, não use frases de efeito genéricas. O que está entre \[colchetes\] é pendência (veja a parte 3, regra de placeholders).

## Prompt, parte 2A: topo da página (barra, header, hero, faixa, comparativo)

A página tem as seções abaixo, **nesta ordem**, cada uma com `id` para âncora. Use a copy exatamente como está escrita.

### 0. Barra de campanha (fixa no topo, dispensável)

Faixa fina em `ink` com texto `amber` e botão de fechar. Só aparece quando `CAMPAIGN.active` for `true`.

> Black Friday Manduca: preço de lançamento até \[data\]. Os 30 primeiros assinantes mantêm o valor. \[X de 30 vagas preenchidas: só se o contador for real\]

O texto "Os 30 primeiros assinantes mantêm o valor" tem link para `#regras-da-oferta`. O trecho entre colchetes só aparece se `CAMPAIGN.spotsTaken` existir.

### 1. Header (fixo, com fundo desfocado ao rolar)

À esquerda, a marca "Manduca" em texto (Bricolage 800, com um ponto `brand` depois do nome). Links: **Recursos** (`#recursos`), **Planos** (`#planos`), **Perguntas** (`#perguntas`), **Entrar** (`/restaurante/login`) e o botão primário **Testar 15 dias grátis** (`CTA_URL`). No celular, os links vão para um menu hambúrguer em tela cheia, e o botão primário continua visível no header.

### 2. Hero (seção escura, id `inicio`)

**Layout:** em desktop, texto à esquerda (55%) e composição de 3 celulares à direita; em celular, texto primeiro e a composição abaixo, reduzida. Fundo `ink` com brilho radial sutil em `brand` a 18% atrás dos celulares e grade pontilhada a 4% de opacidade.

**Copy:**

- Eyebrow (com ícone de loja, em pílula de contorno `amber`): `Para restaurantes, marmitarias, pizzarias e lanchonetes`
- H1: `Seu delivery com link próprio e sem comissão por pedido.` (destaque `amber` em "sem comissão por pedido.")
- Subtítulo: `Cardápio digital, painel de pedidos com campainha na cozinha, relatórios de vendas e entregadores com rota no celular. A assinatura é fixa, a partir de R$ 49 por mês, e cada venda cai direto na sua conta.`
- CTA primário: `Criar minha loja e testar 15 dias grátis` (seta, link para `CTA_URL`)
- CTA secundário (contorno): `Ver como funciona` (rola até `#recursos`)
- Microcopy com check: `Confirme seu e-mail ou telefone, cadastre os pratos e comece a vender.` O trecho `[Cartão de crédito no cadastro: confirmar]` é placeholder e só aparece se `SIGNUP.cardInfo` tiver texto.

**Composição visual (3 celulares montados em código, sem imagens):**

- Central, maior e na frente: **cardápio do cliente**, com banner, nome da loja "Sua Loja" (ilustrativo), abas de categoria, um cartão de marmita com foto em degradê quente, selo "MAIS VENDIDO", preço e barra fixa "Ver pedido" em `amber`.
- Esquerdo, inclinado -8°: **painel de pedidos Kanban** com 4 colunas (Pendentes, Preparando, Em rota, Entregues) e um cartão piscando com sino.
- Direito, inclinado +8°: **app do entregador** com endereço, botão "Abrir rota" e os 3 botões de etapa.
- Selo flutuante em `amber` com leve rotação, sobre o celular central: `Sem comissão por pedido`.
- Rodapé da composição, em letra pequena: `Imagens ilustrativas.`

### 3. Faixa de confiança (fundo `paper`, logo abaixo do hero)

6 itens em linha com ícone de traço em `brand` e texto de 14 px. No celular, grade de 2 colunas.

1. `Sem comissão por pedido`
2. `Conta liberada na hora`
3. `Pagamento direto na sua conta`
4. `Pedidos em tempo real com alerta sonoro`
5. `Relatórios em PDF`
6. `Dados tratados conforme a LGPD`

### 4. O custo da comissão (fundo `cream`, id `comparativo`)

**Layout:** título e texto à esquerda; à direita um cartão branco com a tabela e, acima dela, um controle deslizante opcional.

**Copy:**

- Eyebrow: `O CUSTO DA COMISSÃO`
- H2: `Quanto o marketplace fica de cada venda sua.`
- Texto: `Quem vende R$ 10.000 por mês pelo plano Básico do iFood, com entrega própria, paga R$ 1.310 entre comissão e mensalidade. No Manduca, o custo é a assinatura, com 50 pedidos ou com 5.000.`

**Tabela (a coluna do Manduca tem destaque em `brand` suave e selo "Manduca"):**

| Vendas no mês | iFood Básico (12% + R$ 110) | Manduca |
| --- | --- | --- |
| R$ 3.000 | R$ 470 | a partir de R$ 49 |
| R$ 5.000 | R$ 710 | a partir de R$ 49 |
| R$ 10.000 | R$ 1.310 | a partir de R$ 49 |
| R$ 20.000 | R$ 2.510 | a partir de R$ 49 |

**Controle deslizante (acréscimo de interação):** rótulo `Quanto você vende por mês pelo marketplace?`, de R$ 1.000 a R$ 30.000, passo de R$ 500, padrão R$ 10.000. Mostre dois valores grandes lado a lado: `iFood Básico` e `Manduca`. Fórmula do iFood: `vendas × 0,12 + (vendas > 1800 ? 110 : 0)`. Valor do Manduca: o preço mensal do plano Básico (variável `PLANS`). A tabela estática continua visível abaixo como referência e como fallback sem JavaScript.

**Nota (12 px, abaixo da tabela):** `Valores da tabela pública do iFood em novembro de 2026: 12% de comissão e R$ 110 de mensalidade para vendas acima de R$ 1.800 por mês, sem contar a taxa de 3,2% sobre pagamentos feitos pelo app. No Manduca, o gateway que você escolher cobra a taxa dele. Os preços do iFood podem mudar.`

**Fechamento (parágrafo destacado em cartão `ink`, texto claro):** `O Manduca não traz clientes novos. Ele serve para vender direto a quem já conhece seu restaurante: pelo Instagram, pelo WhatsApp, pelo QR Code na mesa e na sacola de entrega. Com 12% de comissão, R$ 49 equivalem a R$ 408 em vendas.`

Regras: escreva "iFood" apenas como texto, **sem logo, sem cor da marca e sem imagem**. Não acrescente outros marketplaces.

## Prompt, parte 2B: produto (cardápio, QR Code, marmitas, cozinha, relatórios, clientes)

### 5. Cardápio digital (fundo `paper`, id `recursos`)

**Layout:** dois celulares sobrepostos à esquerda (lista de pratos e modal de personalização) e texto à direita. Em celular, texto primeiro.

**Copy:**

- Eyebrow: `CARDÁPIO DIGITAL`
- H2: `Um link. O cliente abre, escolhe e pede, sem baixar aplicativo.` (destaque `brand` em "sem baixar aplicativo.")
- Texto: `O cardápio abre no celular com fotos, categorias e selos de PROMOÇÃO, MAIS VENDIDO e NOVO. O cliente personaliza o prato, escolhe a forma de pagamento e acompanha o pedido ao vivo.`
- Lista com `CheckItem`:
  - `Preço original riscado nas promoções`
  - `Observação por item ("sem cebola", "feijão separado")`
  - `Item esgotou? Pause com um toque`
  - `Cliente compra como convidado ou cria conta para guardar histórico e endereço`
  - `Acompanhamento do status do pedido em tempo real`
- Itens condicionais (só aparecem se a flag correspondente for `true`, veja a parte 3): `Taxa de entrega calculada no checkout` (`FEATURES.deliveryFeeByDistance`); `Cupom no carrinho`, `Horário de funcionamento automático` e `Talher descartável` (`FEATURES.cartExtras`).

**Mockup:** celular 1 com banner, abas de categoria, cartões de prato com selos e preço riscado; celular 2 com o modal do prato aberto, observação e botão "Adicionar". Dados ilustrativos, com a loja chamada "Sua Loja".

### 5.1 QR Code (faixa escura `ink`, largura total, id `qrcode`)

**Layout:** cartão grande à esquerda com QR Code branco de cantos arredondados sobre fundo `ink-2`; texto à direita. O QR é um SVG decorativo (padrão de módulos com os 3 marcadores de canto), sem apontar para nenhum endereço real. Abaixo do QR, uma pílula `amber` com o texto `Seu QR Code`.

**Copy:**

- Eyebrow `amber`: `QR CODE`
- H2 (branco, destaque `amber`): `QR Code onde o cliente já está.`
- Texto: `Mesa, balcão, sacola de entrega, panfleto, bio do Instagram, status do WhatsApp. Quem já compra de você passa a pedir direto, e o cliente fica na sua base.`
- Seis chips ao lado do texto, um por lugar citado: `Mesa`, `Balcão`, `Sacola de entrega`, `Panfleto`, `Bio do Instagram`, `Status do WhatsApp`.

### 6. Marmitas e pratos com regras (fundo `cream`, id `marmitas`)

**Layout:** texto e tabela à esquerda; **demonstração interativa** à direita, dentro de um `PhoneFrame`.

**Copy:**

- Eyebrow: `MONTADOR DE PRATOS`
- H2: `Marmita P, M e G com limite de proteína e acompanhamento.`
- Texto: `Você define quanto cada tamanho leva. O cliente só monta dentro do limite, e o sistema bloqueia o que passar.`

| Tamanho | Preço | Proteínas | Acompanhamentos |
| --- | --- | --- | --- |
| P | R$ 22,90 | até 1 | até 2 |
| M | R$ 27,90 | até 2 | até 3 |
| G | R$ 34,90 | até 3 | até 4 |

- Legenda da tabela: `(valores ilustrativos)`
- Lista com `CheckItem`: `Adicionais pagos somados ao preço na hora` · `Grupos de escolha obrigatórios ou opcionais` · `Ingrediente em falta? Desative a opção sem mexer no resto do prato`
- Fecho: `Serve também para prato feito, hambúrguer, açaí e pizza em tamanhos.`

**Demonstração interativa (componente `MontadorDemo`):** seletor de tamanho P, M, G (estado local) que altera o preço mostrado e os limites. Duas listas de opções com contador "x de N": proteínas (`Frango grelhado`, `Bife acebolado`, `Filé de peixe`) e acompanhamentos (`Arroz branco`, `Feijão carioca`, `Farofa de bacon`, `Batata frita`). Ao atingir o limite, as opções restantes ficam desabilitadas, com o texto `Limite do tamanho atingido`. Ao trocar para um tamanho menor, descarte as seleções que excedem. O objetivo é o visitante **sentir a trava funcionando**.

### 7. Cozinha em tempo real (fundo `ink`, id `cozinha`)

**Layout:** texto à esquerda; à direita um cartão escuro com o painel Kanban em miniatura (4 colunas) e um sino em círculo `amber`.

**Copy:**

- Eyebrow `amber`: `COZINHA EM TEMPO REAL`
- H2 (branco, destaque `amber`): `O pedido chega e a cozinha ouve.`
- Texto: `O painel organiza os pedidos em quatro colunas: pendentes, preparando, em rota e entregues. Quando entra um pedido, toca uma campainha. Deixe aberto no tablet ou no computador do balcão.`
- Lista com `CheckItem`: `Comanda para impressora térmica de 80mm ou 58mm, sem cabeçalho de navegador` · `Arquive os pedidos entregues para manter a tela limpa; o histórico fica guardado e pesquisável por número ou nome do cliente` · `Botão de teste de som para conferir o alerta antes de abrir a loja`

**Interação:** botão primário `Testar a campainha` dentro do cartão. Ao clicar, toque dois tons curtos com a Web Audio API (587,33 Hz e 880 Hz, onda senoidal com decaimento de cerca de 600 ms, volume baixo) e faça um novo cartão de pedido entrar na coluna "Pendentes" com animação de pulso. O som **só toca após o clique**, por causa da política de autoplay. Inclua um botão de silenciar. Sem Web Audio disponível, mostre só a animação.

### 8. Relatórios (fundo `paper`, id `relatorios`)

**Layout:** texto à esquerda e um dashboard de miniatura à direita, dentro de `BrowserFrame`.

**Copy:**

- Eyebrow: `RELATÓRIOS`
- H2: `Saiba quanto vendeu, o que vendeu e quando.`
- Texto: `O dashboard mostra vendas, número de pedidos, ticket médio, clientes novos e taxa de conversão. Você vê os pratos mais vendidos, a divisão entre Pix, cartão e dinheiro e os horários de pico da cozinha.`
- Lista com `CheckItem`: `Filtros: hoje, últimos 7 dias, últimos 30 dias, este mês ou período personalizado` · `Comparativo com o período anterior, em porcentagem` · `Exportação em PDF com a sua marca`

**Mockup:** 5 cartões de indicador (Vendas, Pedidos, Ticket médio, Clientes novos, Conversão) com variação em verde ou vermelho; gráfico de barras de vendas por dia; lista "Mais vendidos"; rosca de formas de pagamento (Pix, Cartão, Dinheiro); barras de horário de pico. Chips de filtro (`Hoje`, `7 dias`, `30 dias`, `Este mês`, `Personalizado`) que trocam entre 3 conjuntos de dados fictícios. Botão `Exportar PDF` só visual. Legenda: `Dados ilustrativos.`

### 9. Clientes e cupons (fundo `cream`, id `clientes`)

**Layout:** título à esquerda, grade de cartões à direita (2 colunas em desktop, 1 no celular), cada um com ícone.

**Copy:**

- Eyebrow: `CLIENTES E CUPONS`
- H2: `Saiba quem compra de você e traga essa pessoa de volta.`
- Cartões: `Lista de clientes com número de pedidos, total gasto e data da última compra` · `Anotações internas por cliente` · `Cupom exclusivo para um cliente, ligado ao e-mail dele` · `Cadastro duplicado ou de teste? Arquive, restaure depois ou exclua de vez`
- Cartões condicionais: `Cupons para todos os clientes, com validade e limite de uso` (`FEATURES.couponsAll`); `Pixels do Meta, Google e TikTok com monitor de eventos ao vivo` (`FEATURES.pixels`).

**Mockup:** tabela de clientes (Cliente, Pedidos, Total gasto, Última compra) com 4 linhas fictícias, uma linha com menu aberto mostrando `Arquivar` e `Cupom exclusivo`. Legenda: `Dados ilustrativos.`

## Prompt, parte 2C: domínio, entregadores, pagamento e como começar

### 10. Domínio próprio (fundo `ink`, id `dominio`)

**Layout:** à esquerda, um `BrowserFrame` com barra de endereço mostrando um cadeado e `https://pedidos.seurestaurante.com.br`, e dentro o cardápio da loja; à direita, texto e passo a passo vertical.

**Copy:**

- Pílula `amber`: `Plano Pro & Domínio`
- Eyebrow `amber`: `DOMÍNIO PRÓPRIO`
- H2 (branco, destaque `amber`): `Sua loja no seu endereço.`
- Texto: `No plano Pro & Domínio, o cardápio, o login e o cadastro do cliente abrem em um endereço seu, por exemplo pedidos.seurestaurante.com.br, com HTTPS. Sem o endereço do Manduca no caminho.`
- Subtítulo: `Como funciona:`
- Passo a passo numerado:
  1. `Você informa o endereço no painel.`
  2. `Cria um registro CNAME no DNS do seu domínio, apontando para cname.manduca.com.br.`
  3. `Clica em "Verificar domínio". O certificado de segurança é emitido automaticamente.`
- Cartão de código pequeno, fonte monoespaçada, ao lado dos passos: `Tipo: CNAME` · `Nome: pedidos` · `Destino: cname.manduca.com.br`. Ao lado, um selo verde `Ativo (SSL seguro)`.
- Nota: `A propagação pode levar alguns minutos. O registro do domínio é pago por você, a partir de R$ 40 por ano no Registro.br. Ele fica no seu nome.`
- Frase condicional, só se `FEATURES.dnsHelp` tiver texto: `Informar se a equipe ajuda na configuração do DNS.` (substitua pelo texto definido; se vazio, não renderize).

Use sempre um **subdomínio** (`pedidos.`) nos exemplos. Não use o domínio raiz.

### 11. Entregadores (fundo `cream`, painel arredondado grande, id `entregadores`)

**Layout:** painel de 32 px de raio com fundo `cream` e borda `sand`, dentro de uma seção `paper`. À esquerda, celular com o app do entregador; à direita, texto e dois cartões ("O que o entregador vê" e "O que você vê").

**Copy:**

- Pílula `brand` suave: `Plano Pro & Domínio`
- Eyebrow: `ENTREGADORES`
- H2: `Seus entregadores, cada um com PIN, e a rota na mão.`
- Texto: `Cadastre os motoboys do seu restaurante com nome, celular, veículo e PIN de 4 números. O entregador abre o painel no celular, sem baixar aplicativo. Você pode enviar o link pelo WhatsApp com o acesso já embutido.`
- Cartão "O que o entregador vê" (lista com `CheckItem`): `Endereço completo, nome e telefone do cliente` · `Botão que abre a rota no Google Maps ou no Waze` · `Botão que abre o WhatsApp do cliente com mensagem pronta` · `Aviso de cobrança na entrega: dinheiro, com o troco a levar, ou maquininha` · `Três toques: Iniciar rota, Cheguei no local, Finalizar entrega`
- Cartão "O que você vê": `O horário de saída e de chegada de cada entrega, e o status de cada entregador.`
- Aviso em destaque suave (borda `brand`, ícone de informação): `O Manduca organiza a entrega com a sua equipe. Ele não fornece entregadores nem faz a logística.`

**Mockup interativo:** o celular mostra um pedido (endereço fictício, faixa amarela "Cobrar na entrega: dinheiro, levar troco") e **três botões em sequência**. Ao clicar em `Iniciar rota`, ele fica marcado, registra um horário fictício de saída e libera o próximo; depois `Cheguei no local`, depois `Finalizar entrega`. Ao final, um estado "Entrega concluída" com botão `Reiniciar demonstração`. Dados ilustrativos.

### 12. Pagamento direto para você (fundo `paper`, id `pagamento`)

**Layout:** texto à esquerda; à direita um diagrama de fluxo horizontal simples em SVG.

**Copy:**

- Eyebrow: `PAGAMENTO`
- H2: `O dinheiro cai na sua conta.`
- Texto: `Conecte o gateway que você já usa e receba Pix e cartão direto. Integramos com Mercado Pago, Pagar.me, Appmax e Efí Bank. Prefere sem taxa de gateway? Use o Pix direto, com a sua chave e QR Code na tela. Também há pagamento na entrega: dinheiro, com pergunta de troco, ou maquininha.`
- Parágrafo: `O Manduca não cobra percentual sobre as vendas. A taxa do gateway é a que você tem com ele.`
- Frase condicional, só se `FEATURES.pixConfirmation` tiver texto: o texto definido sobre como o restaurante confirma o recebimento do Pix direto.
- Chips de texto (**sem logos de marcas**): `Mercado Pago` · `Pagar.me` · `Appmax` · `Efí Bank` · `Pix direto` · `Pagamento na entrega`.

**Diagrama:** 4 nós ligados por setas: `Cliente` → `Seu cardápio no Manduca` → `Seu gateway ou sua chave Pix` → `Sua conta`. Uma seta pontilhada em `brand` passa por fora do nó do Manduca, rotulada `O dinheiro não passa pelo Manduca`.

### 13. Como começar (fundo `ink`, id `como-funciona`)

**Layout:** título centralizado e 4 cartões numerados em linha (01 a 04), com ícone, título e uma linha de texto, ligados por setas finas. Em celular, empilhados com linha vertical.

**Copy:**

- Eyebrow `amber`: `COMO COMEÇAR`
- H2 (branco, destaque `amber`): `Da conta ao primeiro pedido.`
- Cartões:
  1. `Crie a conta` · `com e-mail ou telefone.`
  2. `Confirme o código.` · `A conta é liberada na hora.`
  3. `Monte o cardápio` · `e configure as formas de pagamento.`
  4. `Divulgue o link` · `e receba o primeiro pedido.`
- Linha condicional, só se `TRIAL.startNote` tiver texto: `Os 15 dias de teste começam na criação da conta.`
- Botão primário centralizado: `Criar minha loja e testar 15 dias grátis`

## Prompt, parte 2D: planos, FAQ, CTA final e rodapé

### 14. Planos (fundo `paper`, id `planos`)

**Layout:** título centralizado; faixa de campanha; seletor de período; dois cartões lado a lado (empilhados no celular); depois o cartão de preços futuros e o bloco de regras. O cartão **Manduca Pro & Domínio** é o destacado: fundo `ink-2`, borda `amber` e pílula `amber` "Mais completo". O cartão **Manduca Básico** é branco com contorno.

**Copy do topo:**

- Eyebrow: `PLANOS`
- H2: `Dois planos, três formas de pagar e nenhuma comissão por pedido.`
- Subtítulo: `15 dias grátis em qualquer plano. Quanto maior o período, menor o valor por mês.`

**Faixa de campanha (cartão com borda `amber`, ícone de etiqueta, só se `CAMPAIGN.active`):**

- Título: `Preço de lançamento Black Friday`
- Texto: `Estamos abrindo o Manduca. Os valores desta página valem até [data]. Os 30 primeiros assinantes mantêm o valor do plano contratado enquanto a assinatura estiver ativa e em dia.` Link: `Ver regras da oferta` (rola até `#regras-da-oferta`). O contador "X de 30 vagas preenchidas" só aparece se `CAMPAIGN.spotsTaken` existir.

**Seletor de período:** controle segmentado com `Mensal`, `Trimestral` e `Anual`, padrão **Anual**. Etiquetas pequenas: `10%` no Trimestral e `15%` no Anual. A troca anima o número do preço (150 ms) e atualiza os dois cartões ao mesmo tempo. Dispare o evento `select_period`.

**Dados dos planos (fonte única de verdade em `src/config/plans.ts`; formate em BRL com vírgula):**

| Plano | Período | Preço cobrado | Por mês | Economia |
| --- | --- | --- | --- | --- |
| Básico | Mensal | R$ 49,00 | R$ 49,00 |  |
| Básico | Trimestral | R$ 132,30 | R$ 44,10 | R$ 14,70 (10%) |
| Básico | Anual | R$ 499,80 | R$ 41,65 | R$ 88,20 (15%, quase 2 meses) |
| Pro & Domínio | Mensal | R$ 69,00 | R$ 69,00 |  |
| Pro & Domínio | Trimestral | R$ 186,30 | R$ 62,10 | R$ 20,70 (10%) |
| Pro & Domínio | Anual | R$ 703,80 | R$ 58,65 | R$ 124,20 (15%, quase 2 meses) |

No cartão mostre: preço do período em destaque (com "por mês", "por trimestre" ou "por ano"), a linha `Por mês: R$ X` quando o período não for mensal, a linha de economia e o botão `Testar 15 dias grátis` (primário no Pro, secundário no Básico), todos com `CTA_URL` e o parâmetro `?plan=basico|pro&period=mensal|trimestral|anual`.

**Cartão Manduca Básico:** subtítulo `Para quem quer vender direto pelo link do Manduca.` Lista:

- `Cardápio digital no link do Manduca`
- `Painel de pedidos em tempo real, com pedidos ilimitados`
- `Impressão de comanda térmica (80mm e 58mm)`
- `Clientes com histórico e métricas`
- `Gateways próprios e Pix direto`
- Condicional (`FEATURES.reportsInBasic`): `Relatórios de vendas com exportação em PDF`
- Itens negados, em cinza com ícone de cadeado: `Sem domínio próprio e sem módulo de entregadores`

**Cartão Manduca Pro & Domínio:** subtítulo `Para quem tem entrega própria e quer o próprio endereço na loja.` Lista:

- `Tudo do Básico`
- `Domínio próprio com HTTPS (registro pago por você)`
- `Módulo de entregadores com PIN e rota no Google Maps ou Waze`

**Cartão "Depois da Black Friday" (só se `CAMPAIGN.futurePricesConfirmed` for `true`):**

- Título: `Os valores mudam depois da campanha.`
- Texto: `A partir de [data], o Manduca passa a custar o valor de lista abaixo. Quem assinar agora paga o valor de campanha, e os 30 primeiros o mantêm nas condições das regras da oferta.`
- Tabela (sem riscado nos valores futuros; apenas duas colunas de números):

| Plano e período | Agora | A partir de \[data\] |
| --- | --- | --- |
| Básico mensal | R$ 49,00 | R$ 69,00 |
| Básico trimestral | R$ 132,30 | R$ 186,30 |
| Básico anual | R$ 499,80 | R$ 703,80 |
| Pro & Domínio mensal | R$ 69,00 | R$ 89,00 |
| Pro trimestral | R$ 186,30 | R$ 240,30 |
| Pro anual | R$ 703,80 | R$ 907,80 |

- Fecho: `No mensal, são R$ 20 a menos por mês nos dois planos. No anual, R$ 204 a menos por ano.`

**Regras da oferta (acordeão, id `regras-da-oferta`):**

1. `Vale para as 30 primeiras assinaturas pagas contratadas entre [início] e [fim].`
2. `O assinante mantém o valor do plano e do período contratado enquanto a assinatura estiver ativa e em dia.`
3. `O benefício deixa de valer se houver suspensão do uso da plataforma por mais de [X dias], cancelamento, banimento ou suspensão da conta pelo Manduca.`
4. `Quem perde o benefício e volta a assinar paga o preço vigente.`
5. Condicional (`OFFER_RULES.planChange`): regra sobre troca de plano ou de período.
6. Condicional (`OFFER_RULES.nonFounders`): regra sobre o valor para quem assina na campanha sem estar entre os 30.

### 15. Perguntas frequentes (fundo `cream`, id `perguntas`)

**Layout:** título à esquerda e acordeão à direita, usando `<details>` e `<summary>` (funciona sem JavaScript), uma pergunta aberta por vez em desktop. Eyebrow `PERGUNTAS`; H2 `Perguntas frequentes`.

1. **Vocês cobram comissão sobre os pedidos?** `Não. Você paga só a assinatura. O valor de cada venda é seu. O gateway cobra a taxa dele, e o Pix direto não passa por gateway.`
2. **Como funciona o teste de 15 dias?** `Você cria a conta, confirma o e-mail ou o telefone e usa o plano escolhido por 15 dias.` + condicional `TRIAL.endNote` (cartão e o que acontece no fim do teste).
3. **Qual a diferença entre os planos?** `O Básico tem cardápio, painel de pedidos, relatórios, clientes e pagamentos, no link do Manduca. O Pro soma domínio próprio e módulo de entregadores.`
4. **Preciso saber mexer com DNS para usar o domínio próprio?** `Só precisa criar um registro CNAME no painel onde você registrou o domínio. O painel do Manduca mostra o passo a passo e verifica se funcionou.` + condicional `FEATURES.dnsHelp`.
5. **O dinheiro das vendas passa pelo Manduca?** `Não. O pagamento vai direto para o seu gateway ou para a sua chave Pix.`
6. **O Manduca fornece entregadores?** `Não. Você cadastra os entregadores do seu restaurante e define um PIN para cada um.`
7. **Preciso instalar algum aplicativo?** `Não. O cliente abre o cardápio no navegador, o motoboy usa o link no celular e o painel roda no computador ou no tablet.`
8. **Qual impressora eu preciso?** `Qualquer impressora térmica de 80mm ou 58mm que imprima pelo navegador.`
9. **Funciona junto com outros canais de venda?** `Sim. O Manduca é o seu canal próprio. Hoje não há integração de pedidos com marketplaces: os pedidos do Manduca aparecem só no painel do Manduca.`
10. **Os dados dos meus clientes são meus?** `A base de clientes é do seu restaurante. O cliente pode baixar os próprios dados e pedir a exclusão da conta, como a LGPD prevê.`
11. **Como funciona o preço travado da Black Friday?** `Os 30 primeiros assinantes pagantes da campanha mantêm o valor do plano enquanto a assinatura estiver ativa e em dia. Suspensão do uso por mais de [X dias], cancelamento, banimento ou suspensão da conta fazem perder o benefício.`
12. **Os valores vão mudar?** `Sim, a partir de [data]. O quadro "Depois da Black Friday" mostra os valores de lista.`
13. **Posso trocar de plano ou de período?** `[Definir.]` (somente se `FAQ.planChange` tiver texto)
14. **Posso cancelar?** `[Definir para mensal, trimestral e anual.]` (somente se `FAQ.cancel` tiver texto)

Gere também o JSON-LD `FAQPage` a partir das perguntas **efetivamente renderizadas**, sem placeholders.

### 16. CTA final (fundo `paper`, cartão `ink` grande e arredondado, id `comecar`)

Cartão de 40 px de raio, ícone de relógio em círculo `amber`, brilho radial sutil.

- H2 (branco, destaque `amber`): `Seu cardápio no ar hoje.`
- Texto: `Crie a conta, confirme o código e teste o Manduca por 15 dias com seus pratos e seus clientes. Os valores de lançamento valem até [data].` (a segunda frase só aparece se `CAMPAIGN.active`)
- Botão primário `lg`: `Criar minha loja grátis`

### 17. Rodapé (fundo `ink`)

Marca "Manduca" em texto, links `Termos de Uso`, `Política de Privacidade` e `Regras da oferta`, o e-mail de suporte (`SUPPORT_EMAIL`, pendente) e `© 2026 Manduca`. Sem selos, sem logos de terceiros, sem "feito por".

## Prompt, parte 3: stack, interações, SEO, rastreamento e aceite

### Stack e integração com o app existente

- **Stack:** Next.js (App Router, versão 16.x), React 19, TypeScript em modo estrito e Tailwind CSS v4 (tokens da parte 1 via `@theme`). Fontes com `next/font/google`. Ícones com `lucide-react`. Sem outras bibliotecas de UI. Animações com CSS e `IntersectionObserver`.
- **Rota:** a página vive em `src/app/page.tsx` (rota `/`), com componentes em `src/components/landing/` e dados em `src/config/`.
- **Hosts:** o middleware já identifica o restaurante pelo cabeçalho `host` para servir o cardápio em domínios próprios. Mantenha isso. Nos hosts `manduca.com.br` e `www.manduca.com.br`, a rota `/` mostra **a landing page**; em qualquer outro host (domínio de restaurante), a rota `/` continua mostrando o cardápio daquele restaurante.
- **Rotas que não podem quebrar:** `/admin`, `/restaurante`, `/restaurante/login`, `/cliente/login`, `/entregador` e `/api/*`.
- **Links:** `Entrar` vai para `/restaurante/login`. Todo CTA de cadastro usa a constante `CTA_URL` (padrão `/cadastro`, rota ainda a confirmar).

### Arquivos de configuração (o conteúdo que muda sem mexer nos componentes)

- `src/config/plans.ts`: os planos, períodos e preços da tabela da parte 2D, mais os preços futuros (`future`) e o desconto de cada período.
- `src/config/landing.ts`, com:
  - `CAMPAIGN`: `active`, `endsOn`, `spotsTaken`, `suspensionDays`, `futurePricesConfirmed`.
  - `SIGNUP`: `cardInfo`. `TRIAL`: `startNote`, `endNote`.
  - `FEATURES`: `deliveryFeeByDistance`, `cartExtras`, `couponsAll`, `pixels`, `reportsInBasic`, `dnsHelp`, `pixConfirmation`.
  - `OFFER_RULES`: `planChange`, `nonFounders`. `FAQ`: `planChange`, `cancel`. `SUPPORT_EMAIL`, `CTA_URL`.
- **Valores padrão:** todas as flags de recursos a confirmar (`FEATURES.*`) começam em `false` ou vazias. A página só promete o que estiver ligado.

### Regra dos placeholders

Tudo que, na copy, está entre \[colchetes\] é pendência de negócio. Não invente o conteúdo. Crie o componente `PendingText`: em desenvolvimento, mostra o trecho com fundo amarelo e rótulo `PENDENTE`; em produção, **omite o elemento**. Uma pergunta do FAQ cuja resposta é só placeholder some em produção. Crie o script `npm run check:pending`, que lista todas as pendências ainda não resolvidas.

### Interações (todas funcionam em celular e com teclado)

- Header com fundo desfocado após 8 px de rolagem; menu hambúrguer com foco preso e fechamento por `Esc`.
- Rolagem suave para âncoras com deslocamento de 80 px (header fixo).
- Entrada dos blocos com fade e subida de 12 px, uma vez só, desligada em `prefers-reduced-motion`.
- Barra de campanha dispensável (guarde a escolha em `sessionStorage`, dentro de `try/catch`).
- Demonstrações: `MontadorDemo`, teste da campainha, controle deslizante do comparativo, mockup do entregador, filtros do dashboard e seletor de período dos planos. Todas usam dados fictícios locais e **nenhuma chamada de rede**.

### Rastreamento (dataLayer)

Empurre eventos para `window.dataLayer`:

| Evento | Quando | Parâmetros |
| --- | --- | --- |
| `cta_click` | Qualquer botão de cadastro | `location` (header, hero, como-funciona, planos, final), `plan`, `period` |
| `select_period` | Troca do seletor de planos | `period` |
| `view_plans` | Seção de planos 50% visível, uma vez |  |
| `faq_open` | Abertura de pergunta | `question` |
| `demo_interaction` | Primeiro uso de cada demonstração | `demo` (montador, campainha, entrega, comparativo, dashboard) |
| `scroll_depth` | 25, 50, 75 e 90% | `percent` |

Carregue o Google Tag Manager com `next/script` só se `NEXT_PUBLIC_GTM_ID` existir, e **somente depois do consentimento de marketing**, se o app já tiver o banner de cookies. Não coloque Meta Pixel, GA4 nem TikTok direto no código: eles entram pelo GTM.

### SEO

- `lang="pt-BR"`, um único H1, hierarquia de títulos correta.
- `metadata` com o título e a descrição da copy, URL canônica `https://manduca.com.br`, Open Graph e Twitter Card, com imagem gerada por `opengraph-image.tsx` (fundo `ink`, marca e a frase do H1).
  - Título: `Manduca | Cardápio digital e gestão de delivery sem comissão por pedido`
  - Descrição: `Cardápio digital, painel de pedidos com alerta sonoro, relatórios, entregadores com rota e domínio próprio. Sem comissão por pedido. 15 dias grátis. A partir de R$ 49/mês.`
- JSON-LD `SoftwareApplication` (categoria `BusinessApplication`, oferta em `BRL` com o menor preço visível) e `FAQPage`. Os preços do JSON-LD devem ser **iguais** aos visíveis.
- `robots.ts` e `sitemap.ts`.

### Limites de honestidade (obrigatórios)

- Sem depoimentos, notas, contadores de clientes, logos de clientes, selos ou números que não estejam na copy.
- Sem cronômetro de contagem regressiva, a menos que `CAMPAIGN.endsOn` exista e seja uma data real. Escassez só com número real.
- Todo mockup traz a legenda `Imagem ilustrativa` ou `Dados ilustrativos`.
- Marcas de terceiros aparecem só como texto (`iFood`, `Mercado Pago`, `Pagar.me`, `Appmax`, `Efí Bank`, `Google Maps`, `Waze`, `WhatsApp`), nunca como logo.
- Não afirme integração com marketplaces, entrega própria do Manduca, nem pagamento passando pelo Manduca.
- Não use superlativos ("o melhor", "líder", "número 1").

### Desempenho e acessibilidade

- Meta no celular: LCP abaixo de 2,5 s, CLS abaixo de 0,1, Lighthouse acima de 90 em desempenho, acessibilidade, boas práticas e SEO.
- Nenhuma imagem externa. Mockups em JSX e SVG. Hero renderizado no servidor.
- Contraste AA, foco visível, `aria-expanded` no menu, no seletor e nos acordeões, `alt` ou `aria-hidden` em todo ícone e SVG, alvos de toque de 44 px.

### Como entregar

1. Comece criando a configuração, os tokens e os componentes base (`Button`, `Eyebrow`, `Section`, `Card`, `CheckItem`, `PhoneFrame`, `BrowserFrame`, `Pill`, `PendingText`).
2. Depois monte as seções na ordem do prompt.
3. Não faça perguntas. Onde houver dúvida, use o padrão descrito aqui e registre a decisão em um `README` curto, com a lista de pendências e como alterar planos, campanha e flags.

### Critérios de aceite

- [ ] Todas as 17 seções existem, na ordem e com os `id` indicados.
- [ ] Toda a copy bate **letra por letra** com a deste documento, sem texto inventado.
- [ ] Nenhum \[colchete\] aparece em produção; `npm run check:pending` lista o que falta.
- [ ] Os 6 preços e os 6 valores futuros saem de `plans.ts`, e o seletor de período atualiza os dois cartões.
- [ ] As 6 demonstrações funcionam em celular e sem erros no console.
- [ ] O som da campainha só toca após clique.
- [ ] Página legível e sem rolagem horizontal em 360 px.
- [ ] As rotas `/admin`, `/restaurante`, `/entregador` e os domínios próprios continuam funcionando.
- [ ] Metas do Lighthouse atingidas no celular.
- [ ] Nenhum logo, foto de banco ou imagem externa na página.

## Pendências antes de gerar a página

1. **Imagem de referência.** Usei a captura do rangoja.com enviada no início da conversa. Não vi um segundo anexo nesta mensagem. Se a referência for outra, reenvie e eu ajusto a seção "Leitura da referência" e o layout.
2. **Rota de cadastro.** O prompt usa `/cadastro` como `CTA_URL`. A documentação não descreve essa rota (só o cadastro de restaurantes pelo Super Admin). Confirme com o dev qual é a rota real do autocadastro antes de publicar.
3. **Paleta e logo.** Propus marrom quente e laranja em vez do verde e amarelo da referência, e marca só em texto. Se a Agência CF já tem direção visual para o Manduca, troque os tokens da parte 1.
4. **Flags de recurso.** Hoje `FEATURES.*` começam desligadas. Ligue cada uma só depois de confirmar que existe: frete por distância no Básico, extras do carrinho, cupons para todos, pixels, relatórios no Básico, ajuda com DNS e confirmação do Pix direto.
5. **Campanha.** Faltam: datas de início e fim, quantidade de dias de suspensão que faz perder o benefício, regra para quem assina sem estar entre os 30, troca de plano e política de cancelamento.
6. **Preços futuros.** O cartão "Depois da Black Friday" só aparece com `futurePricesConfirmed` em `true`. Os valores trimestral e anual futuros assumem os mesmos 10% e 15%.
7. **E-mail de suporte.** `SUPPORT_EMAIL` está sem valor.
8. **Revisão jurídica.** Vale um advogado ler a nota do comparativo com o iFood e as regras da oferta antes de publicar.

**Como enviar para a ferramenta de IA.** O prompt é longo. Em ferramentas com limite de tamanho, envie em três rodadas: (1) partes 1 e 3 mais as seções 0 a 4; (2) seções 5 a 9; (3) seções 10 a 17. Em ferramentas de código como o Claude Code, cole tudo de uma vez.
