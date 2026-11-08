# Auditoria — kumo-website (sistemakumo.com.br)

Data: 08/11/2026 · Fase 7, passos 1–3 (auditoria, estrutura, integrações). Nenhum código foi alterado.

## 1. Identificação

| Item | Valor |
|---|---|
| Domínios | `sistemakumo.com.br`, `www.sistemakumo.com.br` |
| Projeto Vercel | `kumo-website` (`prj_0GLKAnXzTPHiannzzjRBy1D6oEfN`), time `bruno-02a0` |
| Repositório | `github.com/zaysauro/kumo-website` (público), branch `main` |
| Produção atual | commit `36d7785` (31/10/2026) — deploy `dpl_6ZnWQSHXTx1jdjXUw9QM2hS2sUT7` |
| Stack | HTML/CSS/JS estático, sem build. Uma função serverless (`api/ranking.js`) com Neon Postgres |
| Config | `vercel.json`: `cleanUrls`, sem barra final, cabeçalhos de segurança |

**Rollback:** cada deploy anterior continua disponível na Vercel. Antes de publicar o redesign, criar a tag `v-pre-redesign` em `36d7785`.

## 2. Mapa de rotas

| Rota | Papel | Observação |
|---|---|---|
| `/` (`index.html`) | Landing institucional do ecossistema | Alvo do redesign |
| `/sites` (`sites.html` + `sites.css`) | Landing do **Kumo Sites** (com preços) | Landing de produto própria, com identidade separada |
| `/projetos` | Vitrine de projetos (CloseCircle, NaBagagem, Tally) | Links externos |
| `/jogos` + 11 páginas de jogos | **Kumo Lab** (arcade) | Fora do escopo visual; só preservar |
| `/termos`, `/privacidade` | Páginas legais | Só preservar |
| `/api/ranking` | Ranking dos jogos (Neon, `ARCADE_DATABASE_URL`) | **Não tocar** |

Outro subdomínio ligado ao site: `nasbagagens.sistemakumo.com.br` (linkado em `/projetos`, servido pela Vercel).

## 3. Estrutura atual da home (desktop 1440px, ~8.200px de altura)

1. Header fixo: logo, 7 links, alternância claro/escuro, "Área do cliente" (abre modal), CTA "Falar com a Kumo"
2. Hero: título de 3 linhas animado (92px) e um "palco" com 3 cartões de UI flutuantes (CRM, Meu Caixa, Automação) em órbita ao redor do logo
3. Faixa de posicionamento (01–04)
4. "01 — O problema" (texto)
5. "02 — Produtos": grade 2×2 com mockups em HTML de CRM, Meu Caixa, MeuPedido e MeuSebo (em desenvolvimento)
6. "03 — Kumo Sites": bloco escuro de promoção com preço
7. "03 — Serviços": lista de 4 itens (**numeração 03 repetida**)
8. "04 — Como trabalhamos": 4 passos em linha
9. "05 — A Kumo": manifesto
10. Faixa "Área do cliente"
11. "06 — Contato": WhatsApp e e-mail
12. Footer com 3 colunas

## 4. Integrações e conteúdo comercial a preservar (Fase 5)

| Elemento | Destino / valor |
|---|---|
| Kumo CRM | `https://crm.sistemakumo.com.br` (via `PRODUCT_URLS.crm` em `script.js`) |
| Meu Caixa | `https://meucaixa.sistemakumo.com.br` (via `PRODUCT_URLS.pdv`) |
| MeuPedido | `https://meupedido.sistemakumo.com.br`; na Área do cliente, `/login` |
| MeuSebo | sem link ("Em desenvolvimento"; `href="#"`) |
| Kumo Sites | `/sites`, com preços de **R$ 79,90 / 129,90 / 199,90 por mês** |
| WhatsApp | `wa.me/5541997084653` (com mensagens pré-preenchidas por plano em `/sites`) |
| E-mail | `kumosoftwares@gmail.com` (também no JSON-LD) |
| Promessa comercial | "Sem fidelidade. Cancele a qualquer momento, sem burocracia." |
| Comportamentos | modal da Área do cliente (focus trap, ESC), tema escuro salvo em `localStorage` (`kumo-theme`), menu mobile, reveal com suporte a `prefers-reduced-motion` |
| SEO | title, description, canonical no domínio sem www, Open Graph, JSON-LD Organization, `sitemap.xml`, `robots.txt` |

Nenhuma página da home tem formulário, checkout ou autenticação própria. A conversão acontece por **links de saída** (produtos, WhatsApp e e-mail).

## 5. Problemas encontrados

### Bugs (afetam o uso)
- **Menu mobile quebrado.** Com o menu aberto em 375px, os 7 links ficam lado a lado numa linha de 1.164px e só "Produtos" e "Criação de Sites" aparecem. Causa: `.desktop-nav.mobile-open` não define `flex-direction: column` (`styles.css:237`).
- **Header apertado entre ~800 e 1100px.** Os links quebram em 2–3 linhas ("Criação / de / Sites") porque o header tem 7 links e 3 ações.
- **Prévia ao compartilhar.** `og:image` aponta para um SVG, que WhatsApp, LinkedIn e Facebook não exibem.

### Acessibilidade
- O `aria-label` do H1 ("Tecnologia que deixa…") é diferente do texto visível ("Software que deixa…").
- O cartão do MeuSebo é um link para `#`: parece clicável, mas não leva a lugar nenhum.
- Os produtos abrem em nova aba sem aviso, e o comportamento muda conforme o link (o MeuPedido do footer abre na mesma aba).

### Design e apresentação
- **Hierarquia:** a numeração editorial (01–06) se repete no "03", e há 10 seções com o mesmo ritmo de rótulo pequeno, display grande e texto. A página fica longa e monótona: ~8.200px no desktop e ~10.900px no mobile.
- **Identidade:** o azul-marinho com DM Sans e Manrope é correto, mas genérico. O logo em nuvem é o único elemento proprietário, e não há um sistema de forma, cor ou movimento que diferencie a Kumo.
- **Hero:** o palco com cartões flutuantes e órbitas é o padrão mais comum de SaaS feito por template. Os números ("R$ 482 mil", "128 leads") são ilustrativos e não mostram nada real.
- **Produtos:** os 4 mockups em HTML são bons como ilustração, mas os 4 cartões têm o mesmo peso. Não há hierarquia entre produto pronto e "em desenvolvimento", e cada produto tem só uma frase de proposta de valor.
- **Prova social:** não há depoimentos, clientes, números reais nem casos.
- **Kumo Sites** aparece três vezes na home (seção própria, item de serviço e footer) e compete com os produtos.
- **CSS:** três arquivos sobrepostos (`styles.css` com 43KB, `institutional-theme.css` cheio de `!important` e `product-cards.css`). Os tokens não estão centralizados, o que dificulta evoluir com segurança.
- **README desatualizado:** ainda manda "conectar o domínio".

### Desempenho
- HTML de 23,6KB, servido do cache da Vercel em ~0,08s. O `kumo-logo.svg` tem 35KB e aparece 4 vezes na página, mas é baixado uma vez só.
- O hero depende de animações de entrada de 0,9s com atraso. Recomendo deixar o H1 visível já no primeiro paint para não prejudicar o LCP. (Não medi o LCP real: o navegador de teste estava em segundo plano.)

## 6. O que já funciona bem (manter)
- Um único objeto `PRODUCT_URLS` centraliza os links dos produtos.
- `prefers-reduced-motion` é respeitado e há skip-link, `:focus-visible` e focus trap no modal.
- Página estática e leve, sem framework: ótimo ponto de partida para desempenho.
- Os mockups de produto são feitos em HTML/CSS, não em imagem, então são nítidos e leves.

## 7. Próximos passos
1. Estudar as referências e montar a biblioteca permanente em `/docs/design/` (Fase 1–2).
2. Propor uma direção visual própria para a home do ecossistema e separá-la da identidade de cada produto (Fase 4).
3. Redesenhar em uma branch (`redesign/home`) e validar no preview da Vercel, sem tocar em `/api`, nos jogos nem nas páginas legais.
