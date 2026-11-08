# Diretrizes de Componentes — Sistema Kumo

> Regras para os componentes de **landing pages**. Os componentes internos dos produtos (dashboards, formulários do sistema) **não são alterados** por este trabalho.
> Todos os valores vêm dos tokens semânticos de [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

## Header e navegação

- **Estrutura:** logo à esquerda; até **5 links** no centro; à direita, "Entrar" (texto) e **1 CTA primário**.
- Mais de 5 destinos: agrupe num dropdown ou mega menu (ex.: "Produtos ▾" com os produtos organizados **por público**).
- **Altura:** 64–72px no desktop e 56–64px no mobile. Fixo (`position: sticky`), transparente sobre o hero e com fundo e blur depois de rolar.
- **Menu mobile:**
  - painel em tela cheia ou gaveta, com links **em coluna única** (`flex-direction: column`);
  - tipografia de 28–40px, CTA primário e contato ao fim;
  - `aria-expanded` e `aria-controls` no botão; trava o scroll do `body`; fecha com ESC, ao clicar num link e ao passar para o desktop;
  - foco preso dentro do menu enquanto estiver aberto.
- **Teste obrigatório** do header em **320, 375, 768, 1024, 1280 e 1440px**: nenhum item quebra linha.
- Âncoras internas compensam a altura do header com `scroll-margin-top`.

## Botões

| Variante | Uso | Regra |
|---|---|---|
| **Primário** | A ação principal da página/seção | Fundo `--accent`. **No máximo 1 por tela visível** |
| **Secundário** | Alternativa real (ex.: "Ver planos") | Contorno ou `--surface-raised`. Nunca compete em peso com o primário |
| **Texto** | Ações terciárias, "Saiba mais" | Link com sublinhado animado |

- Altura mínima de 44px; padding horizontal de 20–28px.
- O rótulo diz **o que acontece**: "Testar o Meu Caixa", "Falar no WhatsApp", "Ver planos". Evite "Saiba mais", "Clique aqui" e "Começar" sem objeto.
- Setas (→ ↗) só quando indicam direção real: ↗ para links externos, → para avançar.
- Links externos e de WhatsApp: `rel="noopener"`; se abrirem nova aba, avise para leitores de tela.

## Cards

- Use card **só quando o conteúdo é uma unidade clicável ou comparável** (produto, plano, depoimento).
- Para listas de benefícios, prefira **listas tipográficas**, tabelas, layouts alternados ou bento com tamanhos variados. Nunca 6 cards idênticos.
- Card clicável: a área inteira é o link (um único `<a>`), com hover sutil e foco visível.
- Padding: `--space-5` no mobile e `--space-6` no desktop. Raio da família do produto.

## Demonstração do produto

- Mostre a **interface real**: captura otimizada, recriação fiel em HTML/CSS ou vídeo curto (MP4/WebM, sem som, `playsinline`, com pôster).
- Recriações em HTML devem refletir telas que **existem**. Não mostre módulos que o produto não tem.
- Dados de exemplo devem ser plausíveis e neutros, sem nomes de clientes reais e sem métricas que pareçam resultado comprovado.
- Molde de janela (barra com 3 bolinhas) é opcional. Prefira recortes focados na parte que importa.

## Pricing

- Preços **copiados exatamente** da fonte oficial vigente. Nunca altere valores, nomes de planos nem condições sem autorização por escrito.
- De 2 a 4 planos, com no máximo um destacado ("Recomendado") por **cor de superfície**, não por tamanho exagerado.
- Preço em números tabulares; período explícito ("/mês"); o que está incluso em lista com ✓ textual ou ícone acessível.
- Notas e condições logo abaixo, em `--text-small`. Nunca escondidas.
- CTA de cada plano mantém o destino original (ex.: WhatsApp com a mensagem pré-preenchida do plano).

## Depoimentos e prova social

- **Só depoimentos reais e autorizados**, com nome, papel e empresa. Sem depoimento real, **omita a seção**; não invente.
- Formato preferido: citação curta (≤ 40 palavras) + foto ou iniciais + nome/empresa.
- Logos de clientes só com permissão.

## FAQ

- `<details>`/`<summary>` nativos (acessíveis sem JavaScript).
- De 5 a 8 perguntas reais de venda: preço, contrato, suporte, migração, segurança, prazo.
- Use JSON-LD `FAQPage` quando as respostas forem estáveis.

## Formulários (quando existirem)

- **Preserve exatamente** `action`, `method`, os `name` dos campos, os campos ocultos, os scripts de envio e as integrações.
- Label visível em todo campo (o placeholder não substitui o label).
- Erros em texto, junto ao campo, com `aria-describedby`; nunca só pela cor.
- `autocomplete` e `inputmode` corretos (`tel`, `email`, `numeric`).

## CTA final

- Uma frase de valor, **1 botão primário** e no máximo 1 alternativa em texto.
- Redutor de risco ao lado do botão, com a condição **real** do produto (ex.: "Sem fidelidade. Cancele quando quiser.").
- Pode ser fundido ao rodapé (padrão "rodapé-CTA").

## Rodapé

- Colunas: Produto(s) · Empresa · Suporte/Contato · Legal. Links reais apenas.
- Inclui: "Um produto Sistema Kumo" (selo do ecossistema) nos produtos; contato comercial; termos e privacidade; ©.
- Assinatura visual opcional: wordmark grande sangrando a borda, em cor de superfície (não compete com o conteúdo).
- No mobile: colunas viram lista ou acordeão; áreas de toque ≥ 44px.
