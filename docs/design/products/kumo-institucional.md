# Kumo institucional: direção "Nuvem e Sol"

Aprovada em 08/11/2026. Proposta visual: https://claude.ai/artifact/4HU7ywn5xWpVpJBtgKoLjo

## Ideia
A Kumo é a nuvem que reúne os produtos; o sol marca a ação. O azul-marinho da marca vira tinta sobre um fundo de névoa clara. Uma única cor quente (sol) é reservada para a ação principal. Cada produto aparece com a própria cor.

## Público e trabalho da página
Dono ou gestor de pequeno e médio negócio brasileiro (imobiliária, comércio, restaurante, livraria) e quem procura um site ou um sistema sob medida. A página precisa, em ordem: dizer o que a Kumo faz, levar cada visitante ao produto do seu segmento e abrir conversa comercial (WhatsApp ou e-mail).

## Tokens (implementados em `home.css`)

| Token | Claro | Escuro | Papel |
|---|---|---|---|
| `--surface-canvas` | `#F3F6F8` névoa | `#0B1A2E` | fundo |
| `--surface-raised` | `#E6ECF1` | `#12253D` | faixas e cards |
| `--surface-overlay` | `#FFFFFF` | `#172C47` | menus, modal, molduras |
| `--surface-inverse` | `#0F2440` | `#06111F` | faixa Kumo Sites e rodapé |
| `--text-primary` | `#0F2440` | `#E8EEF4` | texto |
| `--text-secondary` | `#3E4C5E` | `#B5C3D1` | apoio |
| `--text-tertiary` | `#5B6878` | `#8C9DB0` | legendas |
| `--link` | `#2B5C8A` | `#9DC7EC` | links |
| `--accent` (sol) | `#F4C24D` | `#F4C24D` | **só** a ação principal, o sublinhado do título e o preço destacado |

Contraste: tinta sobre névoa 14,4:1; tinta sobre sol 9,4:1; o sol sobre névoa (1,5:1) exige uma borda de tinta de 1,5px no botão.

Cores de produto (**provisórias** até a direção de cada produto): CRM `#3B6EA8`, Meu Caixa `#2F8F6B`, MeuPedido `#2E5B45`, MeuSebo `#8A5A3C`, Kumo Sites = sol.

## Tipografia
- Display: **Bricolage Grotesque** 500–600, tracking −0,02 a −0,035em
- Texto: **Instrument Sans** 400–600
- Dados: **Geist Mono** 400–500 (preços, domínios, rótulos)

## Forma
Raios 6 / 12 / 20px, com pílula para botões e chips. Sem sombras, exceto em menus e modal.

## Estrutura da home
1. Header: Produtos ▾ (por público), Kumo Sites, Sob medida, A Kumo · tema · Área do cliente · CTA
2. Hero: título atual + seletor "Qual é o seu negócio?" (momento de ousadia)
3. Produtos: uma linha por produto, alternando lados
4. Kumo Sites: única faixa escura, com os 3 preços oficiais
5. Sob medida: serviços + linha do tempo do processo
6. A Kumo: manifesto
7. Contato + rodapé com o wordmark

Jogos e Projetos ficam no rodapé (decisão aprovada).

## Movimento
Nuvem desenhada uma vez no hero (≤ 800ms, depois do título); troca do seletor em 280ms; linha do processo ligada ao scroll (`animation-timeline: view()`) com fallback estático. Sem tilt, órbitas nem revelação em todos os parágrafos.
