# Identidade — Home do ecossistema Kumo (sistemakumo.com.br)

Aplicada em 2026-11-14 (branch `redesign/home`). Vale só para a home; `/sites`, `/projetos`, `/jogos` e páginas legais mantêm o CSS antigo (`styles.css`).

## Ideia
Kumo é "nuvem" em japonês. A home usa a lógica de papel e tinta: fundo de papel claro, tinta azul-marinho da marca e um único carimbo vermelhão para a ação principal. A vitrine do ecossistema é um **índice** (produto → para quem), não cartões flutuando.

## Tokens (em `home.css`)
| Papel | Claro | Escuro |
|---|---|---|
| Canvas | `#F4F1EA` | `#0E1420` |
| Raised | `#FBF9F5` | `#151D2C` |
| Sunken | `#ECE7DD` | `#0A0F18` |
| Inverse (faixa Kumo Sites) | `#14213A` | `#F1EEE7` |
| Texto primário / secundário / terciário | `#14213A` / `#4A5468` / `#586172` | `#EDE9E1` / `#B3BAC6` / `#959DAB` |
| Acento (só ação principal e ênfase do H1) | `#B83A18` | `#EC7A55` (texto escuro sobre ele) |

Cores de produto, usadas **só como marcador** (quadradinho, filete, sublinhado): CRM `#2F5DA8`, Meu Caixa `#1F7A55`, MeuPedido `#C27A12`, Kumo Sites `#14213A`, MeuSebo `#7A4E2D`.

## Tipografia
- Display: **Fraunces** 400/500 (serifada, eixo óptico). Títulos em peso 400, tracking −0.02 a −0.035em.
- Corpo: **Inter** 400/500/600.

## Forma
Família *suave*: 6 / 10 / 16px, botões em pílula. Separação por tom e hairline; sombra só no modal.

## Movimento
O topo nunca anima. Seções abaixo da dobra entram com opacidade + 14px, uma vez. Hover do índice desenha a linha na cor do produto. Tudo desligado com `prefers-reduced-motion`.

## Contraste conferido (WCAG AA)
Terciário sobre canvas 5,5:1 e sobre sunken 5,1:1; branco sobre acento 5,7:1; tema escuro ≥ 6:1.
