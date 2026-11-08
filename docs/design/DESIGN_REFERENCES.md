# Referências de Design — Sistema Kumo

> Repertório estudado em 08/11/2026. Use como fonte de **princípios**, nunca como molde para copiar.
> Não reproduza layouts, ilustrações, fontes proprietárias nem identidades de terceiros.

## 1. Fontes de referência

| Fonte | O que oferece | Quando consultar |
|---|---|---|
| [styles.refero.design](https://styles.refero.design) | Sistemas de design extraídos de produtos reais (DESIGN.md com tokens de cor, tipo, espaçamento, raio e componentes) | Ao definir a identidade de um produto |
| [scrolltide.co](https://scrolltide.co) | Biblioteca de templates com scroll, seções, componentes e shaders | Ao planejar a narrativa e as interações de scroll |
| [navbar.gallery](https://navbar.gallery) | Navegação por tipo: estática, dropdown, mega menu, sidebar, busca, anúncio, tela cheia, breadcrumb | Ao desenhar header e menu mobile |
| [footer.design](https://footer.design) | Rodapés por estilo: tipográfico, letra pequena, ilustrativo, grid, flat, animado | Ao desenhar o rodapé |
| [cta.gallery](https://cta.gallery) | CTAs reais, filtráveis por setor e modo claro/escuro | Ao desenhar CTAs intermediários e o final |

## 2. Produtos reais estudados (Refero)

### Mercury: "banco alpino na hora azul" (tema escuro)
- Canvas quase preto `#171721`, cards um tom acima `#1e1e2a`, **um único cobalto** `#5266eb`, só no CTA "Open account".
- Display com peso 480 ("nem negrito, nem leve") e tracking levemente **positivo**: soa arquitetônico.
- Cards planos, sem borda nem sombra; separação pelo degrau de tom. Raio de 12px nos cards e pílula (32–40px) em botões e navegação.
- Hero com fotografia atmosférica em tela cheia; a interface do produto aparece depois.
- Grade de 4px, largura máxima de 1200px, gap de 72px entre seções e padding de 32px nos cards.
- **Lição para a Kumo:** num produto financeiro (Meu Caixa), confiança vem de contenção. Um acento só, muito espaço, nada gritando.

### Brex: "concreto branco, uma única brasa" (tema claro)
- Branco puro com Inter de tracking negativo (−0,01 a −0,03em) e uma serifada de display para a emoção.
- Laranja `#ff5900` em toda ação primária, link e aba ativa. Nunca decorativo.
- **Moldura escura:** barra de anúncio `#15191e` e rodapé `#000710` deixam o corpo branco mais alto.
- **Lição:** escuro no início e no fim, claro no meio, sem precisar de gradiente.

### Vercel: "terminal tipografado em papel branco"
- Monocromático disciplinado: `#fafafa` → `#ebebeb` → `#171717`. Cor só em gradientes pontuais do hero.
- Geist Sans no hero com peso 450 e tracking −0,06em; **Geist Mono** em rótulos e metadados (11–13px, caixa alta).
- Botões com raio de 6px; profundidade por tom e borda hairline.
- **Lição:** fonte mono em metadados (preços, códigos, horários) dá precisão técnica sem esforço.

### Steep: "analytics serifado em papel quente"
- Títulos serifados com peso 400 em 44, 64 e 90px; **um único acento pêssego** `#fbe1d1` com texto marrom `#5d2a1a`.
- Telas do produto apresentadas como **artefatos flutuando ao redor do título**, e não dentro de uma moldura de dashboard.
- Cards grandes com raio de 24px e sombras quase invisíveis.
- **Lição:** a serifada pode dar a um software de gestão um tom editorial e humano. Bom para o MeuSebo (livros).

### Superhuman: "dashboard editorial na hora dourada"
- Canvas pergaminho `#f2f0eb`, nunca branco puro. CTA em vinho escuro `#421d24` e violeta só em links.
- Uma única faixa escura (`#0c4243`) para contar história no meio da página.
- Fotografia cinematográfica no hero, com cartões de interface translúcidos por cima.
- **Lição:** um fundo quente diferencia na hora de qualquer SaaS branco e azul.

### Cursor: "ateliê de pergaminho iluminado por brasas"
- Pergaminho `#f7f7f4`, tinta `#26251e` (nunca preto puro) e acento brasa `#f54e00` **só em links e ênfases**, nunca preenchendo botão.
- Três famílias: gótica de display com peso 400, Garamond para subtítulos editoriais e mono para código e rótulos.
- Cantos retos de 4px em tudo.

### Raycast: "central de comando à meia-noite, coral neon"
- 98% acromático em `#040506`; coral `#ff6363` só no logo, na arte do hero e em selos.
- Cards com borda hairline e sombra interna de "tecla", que parecem pressionáveis.
- O hero quebra o sistema com uma arte de gradiente grande; o resto da página volta à austeridade.
- **Lição:** concentrar toda a ousadia num único momento (o hero) e manter o resto sóbrio.

### ElevenLabs: "caderno Bauhaus em papel casca de ovo"
- Off-white `#fdfcfc`, faixas taupe `#f5f3f1`, preto puro como único contraste forte.
- Display "sussurrado" com peso 300 e tracking −0,02em; botões em pílula total (9999px) e cards com raio de 20px.
- Os acentos (violeta e laranja) **só aparecem dentro dos visuais do produto**, nunca no chrome da interface.

## 3. Padrões transversais (o que os melhores têm em comum)

1. **Cor racionada:** 1 acento (no máximo 2), com papel definido por escrito.
2. **Canvas não é branco puro:** off-white quente ou frio e quase-preto com matiz.
3. **Peso médio no display** (300–480) com tracking calibrado. O tamanho faz a hierarquia, não o negrito.
4. **Duas famílias, no máximo três:** display com personalidade, sans neutra para o texto e mono opcional para metadados.
5. **Profundidade por degraus de tom e hairlines**, sem pilhas de sombra.
6. **Sistema de raio coerente:** escolher cantos retos (4–6px), suaves (12px) ou pílula, e manter a escolha.
7. **Grade de 4px**, largura de 1120–1240px e espaço generoso entre seções (72–128px).
8. **Um momento de ousadia por página** (geralmente o hero); o resto, disciplina.
9. **Moldura escura** (barra de anúncio ou rodapé) para enquadrar um corpo claro.
10. **O produto como protagonista visual:** recortes reais da interface, não ilustrações genéricas.

## 4. Padrões por componente

### Navegação (navbar.gallery)
- **Mega menu por público** (como na Orchid: "Para fundadores", "Para investidores", "Para corretores"). Útil para a home Kumo, que atende segmentos diferentes: imobiliárias, comércio, restaurantes e livrarias.
- **Menu mobile em tela cheia** com tipografia grande **em coluna única** e contato no rodapé do menu.
- **Header que vira vidro** (backdrop-blur) ao rolar; transparente sobre o hero.
- No máximo 5 itens no primeiro nível; o resto vai para submenus ou para o rodapé.

### Scroll e narrativa (Scrolltide)
- Cada template conta **uma história contínua** ligada ao tema: a trajetória que "se desenha" até a Lua no SELENE, a capa que sai de cima do carro no VALMORA. O scroll é a linha do tempo da narrativa.
- Categorias úteis: hero, landing page, 3D, background (shaders), seções (features, pricing, contato, CTA, footer) e telas de UI.
- **Lição:** o movimento deve contar *a história do produto*. Por exemplo, o pedido que atravessa salão, cozinha e caixa no MeuPedido. Não deve ser um efeito genérico.

### Rodapés (footer.design)
- **Wordmark gigante sangrando** a borda (TROVE, NOTHIN', DECIMALS): assinatura forte e barata.
- **Rodapé que é o CTA final** ("Let's talk production"): une a última chamada com a navegação.
- Rodapé de produto escuro com colunas densas e letra pequena, mais institucional.

### CTAs (cta.gallery)
- O CTA final **mostra o fluxo do produto** (Bannerbear: entrada → etapas → resultado) em vez de repetir o slogan.
- **Redutor de risco** junto ao botão ("sem cartão de crédito", "sem fidelidade", "cancele quando quiser").
- Uma ação primária e no máximo uma secundária, como link de texto.

## 5. Como usar este repertório

1. Defina o **público e o sentimento** do produto antes de abrir qualquer referência.
2. Escolha 2–3 referências por **princípio** ("quero a contenção da Mercury", "quero o papel quente do Steep"), nunca por aparência.
3. Registre na direção visual do produto **qual princípio veio de onde** e **o que é próprio da Kumo**.
4. Não use fontes pagas (Söhne, Signifier, Geist Pro…) sem licença. Prefira alternativas abertas do Google Fonts ou fontes do próprio sistema.
