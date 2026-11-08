# Diretrizes de Landing Pages — Sistema Kumo

> Processo e estrutura para (re)construir a landing page de um produto Kumo.
> **Regra de ouro:** muda a *apresentação*, nunca o *produto*.

## 1. Regras inegociáveis

**Não alterar:** funcionalidades, regras de negócio, bancos de dados, schemas, autenticação, APIs (`/api/*`), integrações, permissões, fluxos operacionais nem componentes internos do produto.

**Não inventar:** funcionalidades, números, clientes, depoimentos, selos ou prêmios.

**Não modificar sem autorização escrita:** preços, nomes de planos, condições comerciais, contatos (WhatsApp, e-mail) e textos legais.

**Preservar:** todos os destinos de links e CTAs, formulários, checkout, login, scripts de analytics/pixel, SEO (title, description, canonical, JSON-LD, sitemap) e rotas existentes (inclusive as que não fazem parte da landing).

## 2. Processo (um produto por vez)

1. **Auditoria:** capturar a página atual no desktop e no celular e registrar seções, links, CTAs, integrações, preços e problemas (`docs/design/audits/<produto>.md`).
2. **Inventário a preservar:** tabela de cada destino e integração, para conferir no fim.
3. **Direção visual:** público, sentimento, referências por princípio, paleta, tipografia, raio e o "momento de ousadia" (`docs/design/products/<produto>.md`). **Aprovação do responsável antes de codar.**
4. **Branch:** `redesign/<produto>`; nunca direto na `main`. Antes, criar a tag `pre-redesign-<produto>` no commit de produção (rollback).
5. **Desenvolvimento** seguindo este documento e o [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).
6. **Teste:** desktop (1280 e 1440) e celular (375 e 320), links e CTAs, integrações e o [checklist](#checklist-de-publicação).
7. **Preview da Vercel** compartilhado para aprovação.
8. **Publicação** só após o "aprovado" explícito. Registrar a versão aprovada (tag `approved-<produto>-AAAA-MM-DD`).

## 3. Estrutura de referência

Nem toda página precisa de todas as seções, e **a ordem e o formato devem variar entre produtos**. Esta é uma lista de verificação, não um template.

| # | Seção | Pergunta que responde | Notas |
|---|---|---|---|
| 1 | Header | Onde estou, como entro, como falo com alguém? | ver [COMPONENT_GUIDELINES.md](COMPONENT_GUIDELINES.md#header-e-navegação) |
| 2 | Hero | O que é, para quem é e por que agora? | título ≤ 10 palavras; subtítulo ≤ 25; 1 CTA primário + 1 secundário; visual do produto real |
| 3 | Proposta de valor | Que dor resolve? | linguagem do cliente ("perdi um lead no WhatsApp"), não do fornecedor |
| 4 | Demonstração | Como é usar? | o "momento de ousadia" costuma morar aqui; scroll-driven se contar o fluxo |
| 5 | Funcionalidades | O que exatamente faz? | agrupadas por tarefa do usuário, não por módulo técnico |
| 6 | Benefícios | O que muda na rotina? | resultados qualitativos honestos; métricas só se reais |
| 7 | Diferenciais | Por que este e não outro? | concretos ("sem fidelidade", "suporte pelo WhatsApp") |
| 8 | Casos de uso | Serve para mim? | por perfil de cliente |
| 9 | Pricing | Quanto custa? | valores oficiais, exatos |
| 10 | FAQ | E se…? | objeções reais de venda |
| 11 | CTA final | Qual o próximo passo? | redutor de risco real |
| 12 | Rodapé | Onde mais posso ir? | selo "Um produto Sistema Kumo" |

### Anti-repetição
- Não use o mesmo esqueleto de seção (rótulo + display + parágrafo + grid) mais de 2 vezes seguidas.
- Alterne a **densidade**: seção densa → seção respirada → faixa de impacto.
- Alterne o **alinhamento**: centralizado, assimétrico, tela cheia.
- Varie o **fundo**: canvas → raised → inverse (no máximo 1–2 faixas escuras por página).

## 4. Hero: critérios

- O título responde "o que é" sem precisar do subtítulo.
- O visual mostra o **produto** (não abstrações) ou uma cena do **contexto do cliente**.
- No celular, título + subtítulo + CTA cabem na primeira tela de 375×667.
- Sem carrossel no hero.

## 5. Texto

- Português do Brasil, frases curtas, voz ativa, segunda pessoa ("você").
- Verbos concretos: "organize", "venda", "receba", em vez de "potencialize" ou "revolucione".
- Nenhum título genérico que sirva para qualquer empresa.
- Números com formatação brasileira (R$ 79,90; 1.200).

## 6. SEO técnico

- `title` ≤ 60 caracteres, `description` ≤ 155, ambos únicos por página.
- `canonical` coerente com o domínio preferido (com ou sem www) e redirecionamento do outro.
- `og:image` em PNG ou JPG de 1200×630; `og:title` e `og:description`; `twitter:card`.
- JSON-LD apropriado: `Organization` na home e `SoftwareApplication` ou `Service` + `Offer` nos produtos.
- `lang="pt-BR"`, `sitemap.xml` atualizado e imagens com `alt` descritivo.

## Checklist de publicação

### Preservação
- [ ] Todos os links e CTAs da versão anterior existem e apontam para o mesmo destino
- [ ] Formulários, login, checkout e integrações testados de ponta a ponta
- [ ] Preços, planos, contatos e textos legais idênticos à fonte oficial
- [ ] Rotas não relacionadas (ex.: `/api`, jogos, páginas legais) intactas
- [ ] Analytics e pixels presentes

### Qualidade
- [ ] Sem rolagem horizontal entre 320 e 1920px
- [ ] Header sem quebra de linha em 320, 375, 768, 1024, 1280 e 1440px
- [ ] Menu mobile abre, lista os links em coluna, fecha (ESC, clique, link) e prende o foco
- [ ] Título e CTA visíveis no primeiro paint, sem esperar animação
- [ ] Lighthouse mobile: Performance ≥ 90, Acessibilidade ≥ 95, Boas práticas ≥ 95, SEO ≥ 95
- [ ] Contraste AA conferido nos temas claro e escuro
- [ ] Navegação completa só pelo teclado
- [ ] "Reduzir movimento" ativado: a página continua completa
- [ ] `og:image` aparece no preview do WhatsApp
- [ ] Nenhum link para `#` nem item clicável sem destino

### Identidade
- [ ] A página é reconhecível sem o logo
- [ ] Não repete a estrutura de outra landing Kumo
- [ ] Nenhum item da lista "O que evitar" de [DESIGN_PHILOSOPHY.md](DESIGN_PHILOSOPHY.md#3-o-que-evitar-sinais-de-feito-por-ia)
