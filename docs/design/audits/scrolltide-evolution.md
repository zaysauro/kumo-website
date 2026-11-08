# Kumo Visual Evolution (Scrolltide): auditoria e plano

Data: 08/11/2026. Etapa 1 e Etapa 2. **Nenhum código foi alterado.**
Fontes: Vercel (time `bruno-02a0`), GitHub (`zaysauro`, com acesso confirmado aos privados) e clones de leitura de cada repositório.

## 1. Projetos encontrados

| Projeto pedido | Repositório | Projeto Vercel | Domínio de produção | Stack | Produção atual |
|---|---|---|---|---|---|
| Portal Sistema Kumo | `zaysauro/kumo-website` | `kumo-website` | sistemakumo.com.br | HTML/CSS/JS estático + 1 função (Neon, ranking dos jogos) | `e74aa6e` (docs); site = `36d7785` |
| Checkout — Meu Caixa | `zaysauro/MeuCaixa` (privado) | `meu-caixa` | meucaixa.sistemakumo.com.br | Next 15, React 19, Supabase, Recharts, **Asaas (produção)** | `138c1d6` (11/10) |
| Checkout — Kumo CRM | `zaysauro/crm-imobiliario` (privado) | `crm-imobiliario` | crm.sistemakumo.com.br | Next 15, React 19, Supabase, **Asaas (produção)** | `83e3f50` (10/10) |
| Checkout — MeuPedido | `zaysauro/MeuPedido` | `meupedido` | meupedido.sistemakumo.com.br | Next 15, React 19, Neon, Better Auth | `479bb47` (19/10) |
| Nasbagagens | `zaysauro/NaBagagem-Web` | `nabagagemweb` | nasbagagens.sistemakumo.com.br | **Produção vem da branch `stabilization-launch`** (Next 16, Tailwind 4, Neon Auth, S3, Leaflet) — a `main` está 26 commits atrás, com outra stack (Supabase) | `6d9da0d` (14/10) |
| RealmBook | `zaysauro/socialrpg` | `socialrpg` | socialrpg.vercel.app (sem domínio Kumo) | Next 16, React 19, Neon + Neon Auth, CSS próprio, Vitest/Playwright | `bb69567` (02/11) |
| Kumo Data Studio | **não existe** | — | — | — | — |
| Amparo CRM | `zaysauro/Amparo` (privado) | `amparo-crm` | amparo-crm-livid.vercel.app | Next 15, React 19, Supabase, Tailwind 3, SheetJS | `fbd5be2` (06/11) |

Projeto semelhante ao Data Studio: só o `local_data_lake`, um indexador Python para Windows (PDF/Excel → SQLite/Excel). Não é web, então pode servir de referência, mas não de base. O projeto Vercel `frontend` (deploy por CLI, sem Git) não tem relação identificada.

## 2. Onde cada referência se aplica

| Referência (o que ela é no Scrolltide) | Onde existe no Kumo | Arquivos |
|---|---|---|
| **Glass Tabs**: seletor de abas com uma "lente" de vidro que desliza, comprime e assenta (WebGL + mola) | Portal: seletor de segmento e Área do cliente. Sistemas com abas reais: Amparo (carteira de leads, relatórios, simulador) e CRM (simulador) | `Amparo/components/leads-carteira.tsx`, `Amparo/app/relatorios`, `Amparo/app/simulador`, `crm-imobiliario/app/simulador` |
| **Morph Navbar**: uma pílula que se abre e se redimensiona entre painéis, com conteúdo que troca com desfoque | Cards de produtos do portal | `kumo-website/index.html` (versão em produção) |
| **Receipt Printer**: seção de preços em que uma impressora térmica imprime o valor, com o recibo destacável | Meu Caixa: modal de pagamento e comprovante da venda. MeuPedido: PDV e comprovante. CRM e Meu Caixa: telas de assinatura (Asaas) | `MeuCaixa/src/app/dashboard/vendas/components/{PaymentModal,SaleReceipt}.tsx`, `MeuPedido/src/app/(app)/{pdv,comprovante,assinatura}`, `crm-imobiliario/app/assinar`, `MeuCaixa/.../configuracoes/upgrade` |
| **Tear Ticket**: bilhete de trem com canhoto picotado que se rasga | Viagens, roteiros e compartilhamento do Nasbagagens | `app/dashboard/trips/[id]`, `app/viagem/[id]`, `app/compartilhar/[token]`, `app/dashboard` (branch `stabilization-launch`) |
| **Sienna Bridge**: rodapé que é uma gravura viva em siena queimada | Linguagem visual geral do RealmBook | `socialrpg/app/style.css` (30KB) e `app/page.tsx` |
| **Unfurl**: botão de pergaminho que se enrola, desenrola e recebe um selo de cera (Three.js) | "Quests" do RealmBook. **Atenção: não existe entidade de quest** (ver Riscos) | `socialrpg/app/page.tsx` |
| **Sales Console**: dashboard com dial em arco, histograma e receita por fonte, sobre fundo neutro quente | Kumo Data Studio (novo) | — |
| **People Directory**: dashboard de RH com funil, agenda, tabela e matriz de presença, sobre amarelo-claro | Amparo: equipe e carteiras | `Amparo/app/administracao/{equipe,carteiras}`, `components/dashboard-team*.tsx` |

**Implementação:** os prompts do Scrolltide são pagos e não serão copiados. As versões Kumo serão próprias, construídas a partir do comportamento observado. As que no original usam WebGL ou Three.js (Glass Tabs, Receipt Printer, Tear Ticket, Unfurl) serão refeitas com CSS, SVG e JS leve, sem WebGL. No portal estático: CSS e JS puros. Nos apps Next: CSS e, só onde a física de mola fizer diferença (Glass Tabs, Morph), a biblioteca `motion`, de ~18KB, adicionada apenas ao app que a usar.

## 3. Riscos identificados

1. **Os previews do Amparo usam o banco de produção.** `NEXT_PUBLIC_SUPABASE_URL` e a chave anon valem para produção, preview e development. Um preview isola o visual, mas **quem fizer login nele lê e grava dados reais** dos corretores. O repositório tem um script de homologação (`npm run supabase:homologation`) que vale investigar.
2. **Os previews do Meu Caixa e do CRM não têm variáveis.** Todas estão só em produção, incluindo `ASAAS_ENV=production`. Um preview de branch não consegue autenticar nem abrir o checkout. Testar o Receipt Printer exige ambiente local com dados de exemplo, e **nunca as chaves reais do Asaas**.
3. **Na Vercel, a `main` publica direto em produção** (Amparo, CRM, Meu Caixa, MeuPedido, RealmBook, portal). Push em branch gera apenas preview. Nenhum merge em `main` sem aprovação.
4. **Há trabalho em andamento nos mesmos repositórios:**
   - Amparo, `feat/presenca-roleta-qr`, atualizado em 07/11, com migrações já aplicadas;
   - MeuPedido, `codex/multidevice-homologacao-20261022`;
   - NaBagagem, `neon-migration-foundation`.

   Risco de conflito nesses três.
5. **No Nasbagagens, a produção não sai da `main`.** O trabalho precisa partir de `stabilization-launch` (`6d9da0d`), ou corre o risco de ressuscitar código antigo.
6. **O RealmBook não tem quests.** Existem narrações fixadas do mestre, o formulário "Objetivo narrativo concluído / Conceder recompensa" e as conquistas. Criar quests seria uma funcionalidade nova, com mudança de banco, o que é proibido sem autorização.
7. **O redesign "Nuvem e Sol" do portal foi rejeitado.** A branch `redesign/home` deve ser descartada (ou mantida só como histórico), e o novo trabalho parte da produção atual.
8. **O CRM imobiliário tem clientes pagantes.** Glass Tabs no simulador mexe em interface de produção. Proponho deixá-lo para depois do teste no Amparo.
9. **O RealmBook está todo em 2 arquivos grandes** (`page.tsx` com 37KB e `style.css` com 30KB, minificados). O redesign mexe quase só no CSS, mas é uma área frágil.

## 4. Plano (um produto por vez, cada um com aprovação)

| Etapa | Repositório · base | Branch | Entrega | Validação | Publicação |
|---|---|---|---|---|---|
| 3 | kumo-website · `main` (produção) | `visual/glass-morph` | Glass Tabs no seletor de segmento e na Área do cliente; Morph Cards nos produtos (identidade atual mantida) | local + preview | merge após o seu "aprovado" |
| 4 | MeuCaixa · `main` | `visual/receipt-printer` | Recibo "impresso" no modal de pagamento e no comprovante de venda (só na tela; o PDF não muda) | local com dados de exemplo; testes existentes | após aprovação |
| 4b | MeuPedido · `main` | `visual/receipt-printer` | Comprovante e fechamento de conta no PDV | local | após aprovação |
| 4c | CRM e Meu Caixa · assinatura | idem | Resumo do plano como recibo, sem tocar em valores nem no Asaas | local | após aprovação |
| 5 | NaBagagem-Web · `stabilization-launch` | `visual/tear-ticket` | Viagens e roteiros como bilhetes | local + preview | após aprovação |
| 6 | socialrpg · `main` | `visual/sienna-unfurl` | Atmosfera Sienna; pergaminhos Unfurl nos elementos existentes | testes Vitest + Playwright | após aprovação |
| 7 | **novo** `kumo-data-studio` | `main` | App funcional (abaixo) | testes com planilhas reais | só após validar |
| 8 | Amparo · `main` (`fbd5be2`) | `visual/people-directory` | Equipe e carteiras no estilo People Directory | **só preview ou local; nunca merge** | **proibido** |

**Preservação:** antes de cada etapa, tag `pre-visual-<produto>` no commit de produção. Sem reset, sem force-push e sem rollback sem autorização. Cada PR lista os arquivos tocados, e nenhum deles pode ser de `api/`, `supabase/`, `migrations/`, `database/`, `lib/db*`, auth ou billing.

### Kumo Data Studio: arquitetura proposta (v1)
- **Stack:** Next 15 + React 19 + TypeScript, igual aos outros produtos.
- **Planilhas no navegador:** a leitura acontece no próprio navegador do usuário, com SheetJS (pelo CDN oficial, como no Amparo) dentro de um Web Worker. Os dados não saem da máquina do usuário na v1.
- **Inferência de tipos:** datas, números, moeda BRL, categorias e identificadores, com heurísticas testadas.
- **Sugestão automática** de KPIs e gráficos (ex.: série temporal quando houver data e valor; ranking quando houver categoria e valor).
- **Recharts**, a biblioteca que o Meu Caixa já usa, com filtros cruzados.
- **Salvamento local** (IndexedDB), atualização por nova planilha com as mesmas colunas e exportação em PNG, CSV e PDF.
- **Compartilhamento por link** fica para a v2, com banco Neon próprio e independente.
- Repositório e projeto Vercel novos (precisam da sua autorização para serem criados).

## 5. Decisões pendentes
1. **Amparo:** preview só para olhar, sem login; local com dados de exemplo; ou configurar um Supabase de homologação para a branch (mexe em configuração).
2. **RealmBook:** onde aplicar o Unfurl, já que não há quests.
3. **Kumo Data Studio:** autorizar a criação de `zaysauro/kumo-data-studio` e do projeto Vercel.
4. **Portal:** apagar a branch `redesign/home`.
5. **Glass Tabs no CRM imobiliário (produção):** agora ou só depois do teste no Amparo.

## 6. Decisões tomadas (08/11/2026)
1. **Amparo:** teste visual **local, com dados de exemplo**. Nada de preview com login, nada de deploy.
2. **RealmBook:** Unfurl aplicado aos elementos que já existem (narração fixada, objetivo concluído com recompensa, conquistas). Nenhuma quest nova.
3. **Kumo Data Studio:** autorizada a criação de `zaysauro/kumo-data-studio` (privado) e de um projeto Vercel próprio na Etapa 7.
4. **Portal:** a Etapa 3 parte da produção atual (`e74aa6e`), com a identidade atual. A branch `redesign/home` fica só como histórico.
5. **Cores de produto usadas nos cards** (tiradas do CSS de cada app): CRM `#2563eb`, Meu Caixa `#16803c`, MeuPedido `#173b2b` / `#0c100d`, MeuSebo sépia `#8A5A3C` (provisória).
