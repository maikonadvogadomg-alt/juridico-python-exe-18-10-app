# 📋 Plano do projeto: Juridico-Python-EXE-18-10

_Gerado em 18/10/2026, 22:55:09 — sem IA, lendo os arquivos._

## 📊 Visão geral
| Item | Valor |
|---|---|
| Arquivos | 25 |
| Linhas | 58.866 |
| Telas/páginas | 19 |
| Rotas do backend | 0 |
| Chamadas do app | 48 |
| Tabelas do banco | 0 |
| Variáveis de ambiente | 0 |

**Linguagens:** JavaScript (11), Imagem (3), Outros (2), HTML (2), Imagem SVG (2), YAML (1), Python (1), Ícone (1), Markdown (1), CSS (1)

## 💡 O que fazer (em ordem)
1. 🧹 Tirar a Replit de 2 arquivo(s) (🏗️ Preparar → Fazer tudo)
2. 🔌 O app chama 47 endereço(s) que o backend deste projeto NÃO tem — veja "O que falta no backend"
3. 📝 Criar um README.md explicando como rodar
4. 🚫 Criar .gitignore (não mandar node_modules ao GitHub)

## 🚀 Por onde começa
- `www/index.html`

## 📱 Telas e páginas
| Endereço | Arquivo |
|---|---|
| `/` | www/assets/index-BTbp-g6q.js |
| `/jurisprudencia` | www/assets/index-BTbp-g6q.js |
| `/playground` | www/assets/index-BTbp-g6q.js |
| `/token` | www/assets/index-BTbp-g6q.js |
| `/comparador` | www/assets/index-BTbp-g6q.js |
| `/auditoria` | www/assets/index-BTbp-g6q.js |
| `/consulta` | www/assets/index-BTbp-g6q.js |
| `/painel` | www/assets/index-BTbp-g6q.js |
| `/corporativo` | www/assets/index-BTbp-g6q.js |
| `/pdpj` | www/assets/index-BTbp-g6q.js |
| `/tramitacao` | www/assets/index-BTbp-g6q.js |
| `/filtrador` | www/assets/index-BTbp-g6q.js |
| `/previdenciario` | www/assets/index-BTbp-g6q.js |
| `/robo-djen` | www/assets/index-BTbp-g6q.js |
| `/codigo` | www/assets/index-BTbp-g6q.js |
| `/comunicacoes` | www/assets/index-BTbp-g6q.js |
| `/configuracoes` | www/assets/index-BTbp-g6q.js |
| `www/auditoria.html` | www/auditoria.html |
| `www/index.html` | www/index.html |

## 🖥️ Rotas do backend
_Nenhum encontrado._

## 📡 O que o app pede ao servidor
| Método | Endereço | Onde |
|---|---|---|
| POST | `/chat/completions` | www/assets/index-BTbp-g6q.js |
| POST | `/api/code/run` | www/assets/index-BTbp-g6q.js |
| POST | `/api/tts` | www/assets/index-BTbp-g6q.js |
| POST | `/api/voice-chat` | www/assets/index-BTbp-g6q.js |
| POST | `/api/doc-templates/upload-docx` | www/assets/index-BTbp-g6q.js |
| POST | `/api/export/word-with-template` | www/assets/index-BTbp-g6q.js |
| POST | `/api/jurisprudencia/buscar` | www/assets/index-BTbp-g6q.js |
| POST | `/api/code-assistant` | www/assets/index-BTbp-g6q.js |
| POST | `/api/upload/transcribe` | www/assets/index-BTbp-g6q.js |
| POST | `/api/ai/process` | www/assets/index-BTbp-g6q.js |
| POST | `/api/ai/refine` | www/assets/index-BTbp-g6q.js |
| POST | `/api/upload/extract-text` | www/assets/index-BTbp-g6q.js |
| POST | `/api/git-push` | www/assets/index-BTbp-g6q.js |
| GET | `/api/jwt/status` | www/assets/index-BTbp-g6q.js |
| POST | `/api/jwt/generate` | www/assets/index-BTbp-g6q.js |
| POST | `/api/datajud/consulta` | www/assets/index-BTbp-g6q.js |
| POST | `/api/datajud/consulta-oab` | www/assets/index-BTbp-g6q.js |
| GET | `/api/corporativo/advogado/cpf/${A}` | www/assets/index-BTbp-g6q.js |
| GET | `/api/corporativo/advogado/oab/${c}/${A}` | www/assets/index-BTbp-g6q.js |
| GET | `/api/corporativo/magistrados/${w}` | www/assets/index-BTbp-g6q.js |
| GET | `/api/pdpj/status` | www/assets/index-BTbp-g6q.js |
| POST | `/api/pdpj/test-connection` | www/assets/index-BTbp-g6q.js |
| POST | `/api/pdpj/comunicacoes` | www/assets/index-BTbp-g6q.js |
| POST | `/api/pdpj/representados` | www/assets/index-BTbp-g6q.js |
| POST | `/api/pdpj/habilitacao` | www/assets/index-BTbp-g6q.js |
| POST | `/api/pdpj/pessoa` | www/assets/index-BTbp-g6q.js |
| GET | `/api/tramitacao/test` | www/assets/index-BTbp-g6q.js |
| GET | `/api/tramitacao/clientes?page=${c}&per_page=20` | www/assets/index-BTbp-g6q.js |
| GET | `/api/tramitacao/clientes/${h.id}` | www/assets/index-BTbp-g6q.js |
| GET | `/api/tramitacao/usuarios` | www/assets/index-BTbp-g6q.js |
| GET | `/api/djen/config` | www/assets/index-BTbp-g6q.js |
| POST | `/api/djen/gerar-token` | www/assets/index-BTbp-g6q.js |
| GET | `/api/pesquisa/oab?${E}` | www/assets/index-BTbp-g6q.js |
| GET | `/api/pesquisa/processo?${E}` | www/assets/index-BTbp-g6q.js |
| POST | `/api/cnj/comunicacoes` | www/assets/index-BTbp-g6q.js |
| POST | `/api/settings/test-ai-key` | www/assets/index-BTbp-g6q.js |
| GET | `/api/snippets` | www/assets/index-BTbp-g6q.js |
| GET | `/api/custom-actions` | www/assets/index-BTbp-g6q.js |
| GET | `/api/ementas` | www/assets/index-BTbp-g6q.js |
| GET | `/api/ai-history` | www/assets/index-BTbp-g6q.js |
| GET | `/api/prompt-templates` | www/assets/index-BTbp-g6q.js |
| GET | `/api/doc-templates` | www/assets/index-BTbp-g6q.js |
| GET | `/api/processos` | www/assets/index-BTbp-g6q.js |
| GET | `/api/settings/tramitacao_token` | www/assets/index-BTbp-g6q.js |
| GET | `/api/tramitacao/notas` | www/assets/index-BTbp-g6q.js |
| GET | `/api/tramitacao/publicacoes` | www/assets/index-BTbp-g6q.js |
| GET | `/api/djen/clientes` | www/assets/index-BTbp-g6q.js |
| GET | `/api/djen/publicacoes` | www/assets/index-BTbp-g6q.js |

## 🔌 O que falta no backend
O app chama estes endereços, mas **nenhuma rota deste projeto responde**. Ou o backend ficou na Replit, ou está em outro projeto. Para recriar, cada linha vira uma rota:

| Método | Endereço | Quem chama |
|---|---|---|
| POST | `/api/code/run` | www/assets/index-BTbp-g6q.js |
| POST | `/api/tts` | www/assets/index-BTbp-g6q.js |
| POST | `/api/voice-chat` | www/assets/index-BTbp-g6q.js |
| POST | `/api/doc-templates/upload-docx` | www/assets/index-BTbp-g6q.js |
| POST | `/api/export/word-with-template` | www/assets/index-BTbp-g6q.js |
| POST | `/api/jurisprudencia/buscar` | www/assets/index-BTbp-g6q.js |
| POST | `/api/code-assistant` | www/assets/index-BTbp-g6q.js |
| POST | `/api/upload/transcribe` | www/assets/index-BTbp-g6q.js |
| POST | `/api/ai/process` | www/assets/index-BTbp-g6q.js |
| POST | `/api/ai/refine` | www/assets/index-BTbp-g6q.js |
| POST | `/api/upload/extract-text` | www/assets/index-BTbp-g6q.js |
| POST | `/api/git-push` | www/assets/index-BTbp-g6q.js |
| GET | `/api/jwt/status` | www/assets/index-BTbp-g6q.js |
| POST | `/api/jwt/generate` | www/assets/index-BTbp-g6q.js |
| POST | `/api/datajud/consulta` | www/assets/index-BTbp-g6q.js |
| POST | `/api/datajud/consulta-oab` | www/assets/index-BTbp-g6q.js |
| GET | `/api/corporativo/advogado/cpf/${A}` | www/assets/index-BTbp-g6q.js |
| GET | `/api/corporativo/advogado/oab/${c}/${A}` | www/assets/index-BTbp-g6q.js |
| GET | `/api/corporativo/magistrados/${w}` | www/assets/index-BTbp-g6q.js |
| GET | `/api/pdpj/status` | www/assets/index-BTbp-g6q.js |
| POST | `/api/pdpj/test-connection` | www/assets/index-BTbp-g6q.js |
| POST | `/api/pdpj/comunicacoes` | www/assets/index-BTbp-g6q.js |
| POST | `/api/pdpj/representados` | www/assets/index-BTbp-g6q.js |
| POST | `/api/pdpj/habilitacao` | www/assets/index-BTbp-g6q.js |
| POST | `/api/pdpj/pessoa` | www/assets/index-BTbp-g6q.js |
| GET | `/api/tramitacao/test` | www/assets/index-BTbp-g6q.js |
| GET | `/api/tramitacao/clientes` | www/assets/index-BTbp-g6q.js |
| GET | `/api/tramitacao/clientes/${h.id}` | www/assets/index-BTbp-g6q.js |
| GET | `/api/tramitacao/usuarios` | www/assets/index-BTbp-g6q.js |
| GET | `/api/djen/config` | www/assets/index-BTbp-g6q.js |
| POST | `/api/djen/gerar-token` | www/assets/index-BTbp-g6q.js |
| GET | `/api/pesquisa/oab` | www/assets/index-BTbp-g6q.js |
| GET | `/api/pesquisa/processo` | www/assets/index-BTbp-g6q.js |
| POST | `/api/cnj/comunicacoes` | www/assets/index-BTbp-g6q.js |
| POST | `/api/settings/test-ai-key` | www/assets/index-BTbp-g6q.js |
| GET | `/api/snippets` | www/assets/index-BTbp-g6q.js |
| GET | `/api/custom-actions` | www/assets/index-BTbp-g6q.js |
| GET | `/api/ementas` | www/assets/index-BTbp-g6q.js |
| GET | `/api/ai-history` | www/assets/index-BTbp-g6q.js |
| GET | `/api/prompt-templates` | www/assets/index-BTbp-g6q.js |
| GET | `/api/doc-templates` | www/assets/index-BTbp-g6q.js |
| GET | `/api/processos` | www/assets/index-BTbp-g6q.js |
| GET | `/api/settings/tramitacao_token` | www/assets/index-BTbp-g6q.js |
| GET | `/api/tramitacao/notas` | www/assets/index-BTbp-g6q.js |
| GET | `/api/tramitacao/publicacoes` | www/assets/index-BTbp-g6q.js |
| GET | `/api/djen/clientes` | www/assets/index-BTbp-g6q.js |
| GET | `/api/djen/publicacoes` | www/assets/index-BTbp-g6q.js |

## 🗄️ Banco de dados
_Nenhuma tabela encontrada._

## 🔐 Variáveis de ambiente (configurar no servidor)
_Nenhuma._

## 🤖 IA usada
- generativelanguage.googleapis.com
- api.openai.com
- api.groq.com
- openrouter.ai
- api.anthropic.com
- console.groq.com
- platform.openai.com
- api.openrouter.ai

## 🌐 Serviços de fora que ele acessa
- aistudio.google.com
- api.anthropic.com
- api.groq.com
- api.openai.com
- api.openrouter.ai
- api.perplexity.ai
- api.together.xyz
- api.x.ai
- cdnjs.cloudflare.com
- comunicaapi.pje.jus.br
- console.groq.com
- datajud-wiki.cnj.jus.br
- elevenlabs.io
- generativelanguage.googleapis.com
- goo.gl
- huggingface.co
- ns.adobe.com
- openrouter.ai
- perplexity.ai
- planilha.tramitacaointeligente.com.br
- platform.openai.com
- prosemirror.net
- purl.oclc.org
- radix-ui.com
- stuk.github.io
- together.ai
- unpkg.com
- virtserver.swaggerhub.com
- www.apache.org
- www.perplexity.ai
- www.xfa.org

## 🧹 Arquivos com coisa da Replit
- abrir.py
- www/conserto-ia.js

## 🔁 Roteiro para recriar fora da Replit
1. Importar o projeto no Mini SK e tocar em 🏗️ Preparar → ✅ Fazer tudo (tira a Replit, cria os arquivos que faltam).
2. Backend: escolher onde ele vai ficar ligado (Render/Railway grátis) — ou pedir à IA para transformar as rotas em funções do Netlify/Vercel, usando a tabela "O que falta no backend".
3. Testar a prévia; se der erro, 🤖 Mandar os erros para a IA.
4. App: 📲 Instalável (PWA), 📦 APK ou 🖥️ Desktop (.exe) pelo 🏗️ Preparar.

## 🌳 Árvore de arquivos
```
├─ 📁 .github/
│  └─ 📁 workflows/
│     └─ exe-python.yml
├─ 📁 www/
│  ├─ 📁 assets/
│  │  ├─ _commonjs-dynamic-modules-TDtrdbi3.js
│  │  ├─ app-unico.js
│  │  ├─ index-B-XLeRRI.css
│  │  ├─ index-BTbp-g6q.js
│  │  ├─ index-Btye5XlG.js
│  │  ├─ mammoth.browser-BPa7Y1iS.js
│  │  ├─ pdf-gh-BrLFn.js
│  │  ├─ pdf.worker-BgryrOlp.mjs
│  │  ├─ tiptap-DRvc6u7f.js
│  │  ├─ ui-BFodMM-g.js
│  │  └─ vendor-I2kAlhUy.js
│  ├─ _redirects
│  ├─ auditoria.html
│  ├─ conserto-ia.js
│  ├─ favicon.svg
│  ├─ icon-192.png
│  ├─ icon-512.png
│  ├─ icon.svg
│  ├─ index.html
│  ├─ manifest.webmanifest
│  └─ opengraph.jpg
├─ abrir.py
├─ icone.ico
└─ LEIA-ME.md
```
