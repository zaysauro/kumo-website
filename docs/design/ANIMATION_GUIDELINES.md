# Diretrizes de Animação — Sistema Kumo

> Movimento é linguagem. Cada animação precisa explicar algo: uma sequência, uma relação, um estado ou um retorno.
> Se ela só "fica bonita", não entra.

## 1. Quando animar

| Animar ✅ | Não animar ❌ |
|---|---|
| Mostrar o fluxo real do produto (pedido → cozinha → caixa) | Todo parágrafo surgindo com fade ao rolar |
| Responder a uma ação (hover, clique, envio) | Título principal que demora para aparecer |
| Mudança de estado (menu abrindo, aba trocando) | Elementos flutuando em loop infinito sem significado |
| Guiar o olhar para o próximo passo | Parallax em texto (prejudica a leitura) |
| Revelar dados de forma progressiva (contadores com números **reais**) | Contadores com números inventados |

## 2. Tokens de tempo e curva

```css
:root {
  --dur-instant: 100ms;  /* retorno de toque, mudança de cor */
  --dur-fast: 180ms;     /* hover, foco, toggles */
  --dur-base: 280ms;     /* menus, abas, cards */
  --dur-slow: 480ms;     /* entradas de seção, transições grandes */
  --dur-story: 800ms;    /* sequências narrativas (no máximo 1 por seção) */

  --ease-out: cubic-bezier(.22, 1, .36, 1);      /* entradas: chega rápido, assenta suave */
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);   /* trocas de estado */
  --ease-spring: cubic-bezier(.34, 1.56, .64, 1);/* microinterações lúdicas (com moderação) */
}
```

- Interações de UI: ≤ 300ms. Ninguém deve esperar a interface.
- Atraso entre itens em cascata: 40–80ms, **no máximo 5 itens**. Depois disso, o grupo entra todo de uma vez.
- Distância de entrada: 8–24px. Deslocamentos grandes parecem amadores.

## 3. Regras técnicas

1. **Anime só `transform` e `opacity`** (e `filter` com cuidado). Nunca `width`, `height`, `top` nem `margin`.
2. **Acima da dobra:** o `h1` e o CTA principal ficam visíveis no primeiro paint. Pode-se animar um *detalhe* (sublinhado, ilustração), mas nunca esconder o conteúdo principal.
3. **Reveal on scroll:** o conteúdo nasce **visível no HTML**. O JavaScript adiciona a classe que esconde só quando suporta `IntersectionObserver`, e o elemento é revelado uma única vez (`unobserve`).
4. **Scroll-driven:** prefira CSS nativo (`animation-timeline: view()` / `scroll()`) com `@supports`. Sem suporte, mostre o estado final. Use GSAP/Lenis só quando a narrativa exigir e carregue sob demanda.
5. **3D e WebGL:** só com papel narrativo claro. Carregamento preguiçoso (após o LCP, `IntersectionObserver`), imagem estática de fallback, pausa fora da tela (`visibilitychange` e observer) e desligado em `prefers-reduced-motion` e em aparelhos fracos (`navigator.hardwareConcurrency <= 4` ou `deviceMemory <= 4`).
6. **Loops infinitos:** no máximo 1 por tela, sutil, e pausados com `prefers-reduced-motion`.
7. **Smooth scroll sequestrado (scroll-jacking):** proibido em landing pages comerciais. O usuário controla a rolagem.

## 4. Movimento reduzido (obrigatório)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

E no JavaScript: `matchMedia('(prefers-reduced-motion: reduce)')` desliga parallax, tilt, 3D e contadores, que passam a mostrar direto o estado final.

## 5. Microinterações padrão

| Elemento | Comportamento |
|---|---|
| Botão primário | hover: escurece o acento em 6–8% e sobe 1px (`translateY(-1px)`) em `--dur-fast`; ativo: volta a 0 e `scale(.98)` |
| Link de texto | sublinhado que cresce da esquerda (`scaleX`) em `--dur-fast` |
| Card clicável | hover: borda vai para `--line-strong` e eleva para o nível 1; **sem** tilt 3D por padrão |
| Menu mobile | painel entra com `opacity` + `translateY(-8px → 0)` em `--dur-base`; links em cascata de 40ms |
| FAQ (`<details>`) | rotação do ícone em `--dur-fast`; altura via `interpolate-size: allow-keywords` com fallback instantâneo |
| Header | ganha fundo e blur depois de 16px de scroll, em `--dur-base` |

## 6. Teste antes de publicar

- [ ] Recarregar a página com o cache vazio: o título aparece imediatamente?
- [ ] Ativar "Reduzir movimento" no sistema: a página continua completa e legível?
- [ ] No celular médio (ou CPU 4× mais lenta no DevTools), a rolagem fica em 60fps?
- [ ] Nenhuma animação bloqueia um clique ou atrasa a leitura?
