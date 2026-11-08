# Filosofia de Design — Sistema Kumo

> Leia este documento antes de qualquer trabalho visual em um produto Kumo.
> Ele define **o que** buscamos. Os outros documentos definem **como**.

## 1. O que o Sistema Kumo é (e não é)

O Sistema Kumo é um **ecossistema** de produtos de software brasileiros: Kumo CRM, Meu Caixa, MeuPedido, MeuSebo, Kumo Sites e os que vierem. **Não é uma marca única aplicada em todo lugar.**

- A **marca Kumo** (nuvem, "Soluções em Tecnologia") assina o ecossistema: o site institucional, a Área do cliente e o rodapé dos produtos.
- Cada **produto** tem personalidade, paleta e voz próprias, pensadas para o seu público.
- O que une os produtos é a **qualidade**, e não a aparência: mesmo rigor de tipografia, espaçamento, acessibilidade, desempenho e honestidade.

Teste: se trocarmos os logos de duas landing pages Kumo e ninguém perceber, falhamos.

## 2. Princípios

### 2.1 Clareza antes de impressão
O visitante precisa entender em 5 segundos **o que é, para quem é e o que fazer agora**. Efeitos visuais vêm depois, e só quando reforçam essa mensagem.

### 2.2 Um acento, bem usado
Produtos de primeira linha usam uma única cor cromática, reservada para a ação principal: o cobalto da Mercury, o laranja da Brex, o coral da Raycast. O resto da interface é neutro. **Cor é pontuação, não decoração.**

### 2.3 Hierarquia pela tipografia, não pelo volume
Títulos fortes não precisam ser pesados. A tipografia de referência (Vercel 450, Mercury 480, Steep 400, ElevenLabs 300) fala com autoridade em peso médio ou leve e com espaçamento entre letras ajustado. Negrito 800 com tracking agressivo é sinal de template.

### 2.4 Profundidade por tom, não por sombra
As superfícies se separam por degraus de tom (canvas → card → card elevado) e por linhas finas (hairlines). Sombra é exceção, usada em elementos que realmente flutuam, como modais e menus.

### 2.5 Mostrar o produto real
A demonstração visual deve refletir a interface real do produto: telas reais ou recriações fiéis. **Nunca** inventar funcionalidades nem números que pareçam resultados de clientes. Dados ilustrativos devem ser plausíveis e nunca vendidos como prova.

### 2.6 Movimento com propósito
Cada animação responde a uma pergunta: *o que ela explica?* Ela pode revelar uma sequência, mostrar uma relação de causa e efeito, guiar o olhar ou dar retorno a uma ação. Se a resposta for "fica bonito", corte. Ver [ANIMATION_GUIDELINES.md](ANIMATION_GUIDELINES.md).

### 2.7 Rápido e acessível é parte do design
Uma página linda que demora 4s para mostrar o título, ou que quebra no celular, é uma página ruim. Desempenho, responsividade e acessibilidade são critérios de aprovação, não "melhorias para depois".

### 2.8 Brasileiro, sem caricatura
O público é o pequeno e médio empresário brasileiro: corretor, dono de restaurante, lojista, livreiro. Falamos português claro e direto, sem jargão de startup traduzido. A sofisticação está na execução, não em parecer estrangeiro.

## 3. O que evitar (sinais de "feito por IA")

- Gradiente roxo-azul genérico ou "mesh" sem relação com a marca
- Hero com cartões de dashboard flutuando em órbita, sem relação com o que o produto faz
- Grades de 3 ou 6 cards idênticos com ícone, título e frase
- Todos os títulos no mesmo padrão: rótulo pequeno + display gigante + parágrafo
- Ícones decorativos sem função
- Números de seção (01, 02, 03…) usados como enfeite, sem um percurso real
- Botões "Saiba mais →" repetidos
- Seções com a mesma altura e o mesmo ritmo, do início ao fim
- Textos vagos ("soluções inovadoras", "transforme seu negócio")
- Animação de entrada em tudo, que atrasa a leitura

## 4. Critério de pronto

Uma landing page só está pronta quando:

1. Comunica proposta, público e próximo passo acima da dobra, no desktop **e** no celular.
2. Tem identidade reconhecível sem o logo.
3. Passa no [checklist de qualidade](LANDING_PAGE_GUIDELINES.md#checklist-de-publicação).
4. Preserva 100% dos links, integrações e informações comerciais da versão anterior.
5. Foi aprovada pelo responsável antes de ir para produção.
