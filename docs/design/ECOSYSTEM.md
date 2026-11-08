# Inventário do Ecossistema — Sistema Kumo

> Levantamento de 08/11/2026 (Vercel, time `bruno-02a0`; GitHub `zaysauro`). Atualize sempre que um produto, domínio ou repositório mudar.

| Produto | Domínio | Projeto Vercel | Repositório | Stack | Produção em 08/11/2026 | Landing |
|---|---|---|---|---|---|---|
| **Kumo** (institucional) | `sistemakumo.com.br`, `www.` | `kumo-website` | `zaysauro/kumo-website` (público) | HTML/CSS/JS estático + 1 função serverless (Neon) | `36d7785`, 31/10 | `/` — [auditoria](audits/kumo-website.md) |
| **Kumo Sites** | `sistemakumo.com.br/sites` | `kumo-website` | idem | estático | idem | `/sites` (página própria, com preços) |
| **Kumo CRM** | `crm.sistemakumo.com.br` | `crm-imobiliario` | `zaysauro/crm-imobiliario` (privado) | Next.js | `83e3f50`, 10/10 | a auditar |
| **Meu Caixa** | `meucaixa.sistemakumo.com.br` | `meu-caixa` | `zaysauro/MeuCaixa` (privado) | Next.js | `138c1d6`, 11/10 | a auditar |
| **MeuPedido** | `meupedido.sistemakumo.com.br` | `meupedido` | `zaysauro/MeuPedido` (público) | Next.js | `479bb47`, 19/10 (branch de homologação `codex/multidevice-homologacao-20261022` em staging) | a auditar |
| **MeuSebo** | — (em desenvolvimento) | `meusebo` (sem domínio Kumo) | — | — | — | ainda não existe |
| Kumo Lab (jogos) | `sistemakumo.com.br/jogos` | `kumo-website` | `zaysauro/kumo-website` | estático + `/api/ranking` | — | fora do escopo |
| NaBagagem | `nasbagagens.sistemakumo.com.br` | (não confirmado) | — | — | — | listado em `/projetos` |

## Observações

- `amparo-crm` é **outro** projeto: não serve o domínio do Kumo CRM.
- `kumo-studio-ai` existe no GitHub e localmente (`~/Documents/ChatGPT/kumo-studio-ai`), sem projeto nem domínio na Vercel.
- Os projetos usam **Vercel SSO Protection** nos domínios `*.vercel.app` (exceto os domínios próprios). Os previews exigem login no time.
- A identidade atual do institucional (azul-marinho `#1E3A5F`, Manrope + DM Sans) está isolada em `institutional-theme.css`; o MeuPedido já tem uma identidade própria ("forest and charcoal").
