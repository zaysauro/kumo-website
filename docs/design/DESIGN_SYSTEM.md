# Sistema de Design — Sistema Kumo

> O sistema tem **duas camadas**:
> 1. **Fundação comum** (este documento): escalas, grade, regras de acessibilidade e a estrutura dos tokens. Vale para todos os produtos.
> 2. **Identidade do produto**: cor, tipografia, raio e voz de cada produto. Fica em `docs/design/products/<produto>.md` e preenche os tokens semânticos abaixo.
>
> Produtos compartilham a *estrutura*, não os *valores*.

## 1. Estrutura de tokens

Todo produto define os tokens **semânticos** abaixo como CSS custom properties em `:root`, com variante escura quando houver tema escuro. Componentes **só usam tokens semânticos**, nunca valores hexadecimais diretos.

```css
:root {
  /* Superfícies: do fundo para a frente */
  --surface-canvas: ;   /* fundo da página (evitar #fff puro) */
  --surface-raised: ;   /* cards, faixas alternadas: 1 degrau acima */
  --surface-overlay: ;  /* menus, modais, popovers */
  --surface-inverse: ;  /* faixas escuras / moldura (header de anúncio, rodapé) */

  /* Texto */
  --text-primary: ;     /* títulos e corpo principal (evitar #000 puro) */
  --text-secondary: ;   /* descrições, corpo de apoio */
  --text-tertiary: ;    /* legendas, metadados (contraste mínimo de 4.5:1 no canvas) */
  --text-on-accent: ;   /* texto sobre o acento */
  --text-on-inverse: ;

  /* Acento: UM papel principal */
  --accent: ;           /* SÓ a ação primária e o estado ativo */
  --accent-hover: ;
  --accent-soft: ;      /* fundo tênue para destaques, selos */

  /* Linhas */
  --line-subtle: ;      /* hairlines entre blocos */
  --line-strong: ;      /* bordas de inputs, divisões fortes */
  --focus-ring: ;       /* anel de foco, contraste mínimo de 3:1 */

  /* Status: usar só em contexto funcional */
  --success: ; --warning: ; --danger: ;

  /* Tipografia */
  --font-display: ;
  --font-body: ;
  --font-mono: ;        /* opcional: preços, códigos, metadados */

  /* Forma */
  --radius-sm: ; --radius-md: ; --radius-lg: ; --radius-pill: 9999px;
}
```

## 2. Espaçamento (comum a todos)

Base de **4px**. Use somente valores da escala:

| Token | px | Uso típico |
|---|---|---|
| `--space-1` | 4 | ícone ↔ texto |
| `--space-2` | 8 | itens dentro de um grupo |
| `--space-3` | 12 | gap entre elementos de um card |
| `--space-4` | 16 | padding de botão e input, margem lateral no mobile |
| `--space-5` | 24 | padding de card no mobile, gap de grade |
| `--space-6` | 32 | padding de card no desktop |
| `--space-7` | 48 | entre título de seção e conteúdo |
| `--space-8` | 64 | entre seções no mobile |
| `--space-9` | 96 | entre seções no desktop |
| `--space-10` | 128 | respiro de seções de destaque |

**Regra:** o espaço *entre* grupos deve ser visivelmente maior que o espaço *dentro* dos grupos (proximidade).

## 3. Grade e layout

- Largura máxima do conteúdo: **1200px** (`--container`). Texto corrido: **no máximo 68 caracteres** por linha (~640px).
- Margem lateral: `clamp(16px, 5vw, 48px)`.
- Grade de 12 colunas no desktop, 6 no tablet e 4 no celular. Gap: `--space-5`.
- Breakpoints (mobile-first): `640px`, `960px`, `1200px`. Só adicionar outros quando o conteúdo exigir.
- **Proibido** rolagem horizontal em qualquer largura a partir de 320px.

## 4. Tipografia

### Escala
Escala fluida com `clamp()`, razão de ~1.25. Valores de referência:

| Token | Mobile → Desktop | Altura de linha | Tracking |
|---|---|---|---|
| `--text-display` | 44 → 80px | 1.0–1.05 | −0.03 a −0.04em |
| `--text-h1` | 36 → 56px | 1.05–1.1 | −0.025em |
| `--text-h2` | 28 → 40px | 1.1–1.15 | −0.02em |
| `--text-h3` | 20 → 24px | 1.25 | −0.01em |
| `--text-body-lg` | 18 → 20px | 1.5 | 0 |
| `--text-body` | 16px | 1.55 | 0 |
| `--text-small` | 14px | 1.45 | 0 |
| `--text-caption` | 12–13px | 1.4 | +0.02em (se em caixa alta: +0.08em) |

### Regras
- **No máximo 2 famílias** por produto, mais a mono opcional. Carregue só os pesos usados (normalmente 3).
- Display em **peso 400–600**. Peso 700+ só se a família for leve por natureza.
- Corpo nunca abaixo de 16px no mobile.
- `font-display: swap` e `<link rel="preload">` só para a fonte do display.
- Prefira fontes abertas (Google Fonts) ou do sistema; fontes pagas só com licença.
- Números tabulares (`font-variant-numeric: tabular-nums`) em preços, métricas e tabelas.

## 5. Cor

- **Contraste (WCAG 2.2 AA):** texto normal ≥ 4.5:1; texto grande (≥ 24px, ou ≥ 18,66px negrito) e componentes de UI ≥ 3:1.
- O **acento** é usado em até ~5% da área visível. Se tudo for acento, nada é.
- Gradientes só como **atmosfera** (fundo do hero, faixa de destaque), feitos com as cores do produto. Nunca roxo-azul genérico.
- Tema escuro: não basta inverter. Redefina as superfícies como degraus de tom, reduza a saturação do acento se ele vibrar e confira o contraste de novo.
- Respeite `prefers-color-scheme` e, se houver alternância manual, persista a escolha.

## 6. Forma e elevação

- Cada produto escolhe **uma família de raios** e não a mistura:
  - *Preciso*: 4 / 6 / 8px
  - *Suave*: 8 / 12 / 20px
  - *Amigável*: 12 / 20 / pílula
- Elevação em 3 níveis, no máximo:
  - `0`: plano (padrão; separação por tom e linha)
  - `1`: `0 1px 2px rgb(0 0 0 / .06), 0 4px 16px rgb(0 0 0 / .06)` (cards flutuantes, header ao rolar)
  - `2`: `0 12px 40px rgb(0 0 0 / .16)` (modais, menus)

## 7. Iconografia e imagem

- Um único conjunto de ícones por produto (ex.: Lucide, Phosphor), com o mesmo traço e o mesmo tamanho base (20 ou 24px).
- Ícone só quando ajuda a reconhecer algo. Nunca como enfeite de card.
- Capturas e recriações do produto: SVG/HTML quando possível; senão AVIF ou WebP com `width`/`height` definidos e `loading="lazy"` abaixo da dobra.
- Imagem de compartilhamento (`og:image`): **PNG ou JPG de 1200×630**. SVG não aparece no WhatsApp nem no LinkedIn.

## 8. Acessibilidade (obrigatório)

- HTML semântico: um `h1` por página, títulos em ordem, `nav`/`main`/`footer`, listas reais.
- O `aria-label` nunca contradiz o texto visível (WCAG 2.5.3).
- Foco visível em todo elemento interativo (`:focus-visible`, anel ≥ 3:1).
- Área de toque ≥ 44×44px no mobile.
- Links que abrem nova aba avisam: texto oculto "(abre em nova aba)" ou ícone com rótulo.
- Nada clicável sem destino. Item "em breve" não é link.
- `prefers-reduced-motion`: ver [ANIMATION_GUIDELINES.md](ANIMATION_GUIDELINES.md).
- Skip link "Pular para o conteúdo" no topo.

## 9. Desempenho (orçamento por landing page)

| Métrica | Meta (mobile, 4G) |
|---|---|
| LCP | ≤ 2,0s |
| CLS | ≤ 0,05 |
| INP | ≤ 200ms |
| JS próprio | ≤ 50KB gzip (sem contar bibliotecas de 3D, que só carregam sob demanda) |
| Fontes | ≤ 3 arquivos WOFF2 |
| Peso total acima da dobra | ≤ 500KB |

O título principal (LCP) **aparece no primeiro paint**: não pode depender de JavaScript nem de animação de entrada para ficar visível.
