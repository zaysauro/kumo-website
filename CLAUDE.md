# Sistema Kumo — instruções para o Claude Code

## Antes de qualquer trabalho visual (interfaces, landing pages, componentes)

1. Leia, nesta ordem: `docs/design/DESIGN_PHILOSOPHY.md`, `docs/design/LANDING_PAGE_GUIDELINES.md` e `docs/design/DESIGN_SYSTEM.md`.
2. Se o produto já tiver direção aprovada, leia `docs/design/products/<produto>.md` e siga os tokens dele.
3. Consulte `ANIMATION_GUIDELINES.md` e `COMPONENT_GUIDELINES.md` ao implementar movimento e componentes, e `DESIGN_REFERENCES.md` ao propor uma direção nova.
4. Confira `docs/design/ECOSYSTEM.md` para saber qual repositório, projeto Vercel e domínio correspondem ao produto.

## Regras inegociáveis (projeto Kumo Design Evolution)

- O trabalho é **só de apresentação**. Não altere funcionalidades, regras de negócio, banco, schemas, autenticação, APIs, integrações, permissões nem fluxos internos.
- Não invente funcionalidades, números, clientes nem depoimentos. Não altere preços, planos, contatos nem textos legais sem autorização escrita.
- Preserve todos os links, CTAs, formulários, login, checkout, analytics e SEO existentes.
- Um produto por vez: auditoria → direção visual aprovada → branch `redesign/<produto>` → testes → preview → aprovação → produção.
- Antes de mexer em produção, crie a tag `pre-redesign-<produto>` para rollback.
- Nunca publique em produção sem o "aprovado" explícito do responsável.
- Cada produto tem identidade própria. Não replique a aparência de um produto no outro.

## Antes de publicar

Rode o checklist completo de `docs/design/LANDING_PAGE_GUIDELINES.md#checklist-de-publicação` e informe o que passou e o que não passou.
