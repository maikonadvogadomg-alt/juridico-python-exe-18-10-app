# ⚖️ Assistente Jurídico — programa .exe de UM arquivo só (Python)

Igual ao do Replit: **um arquivo só**. Você dá dois cliques, a janela preta liga o app e ele abre numa janela própria.

## Como gerar o .exe (o GitHub monta, você não precisa instalar nada)
1. Mande esta pasta inteira para um repositório **novo** no GitHub (Mini SK → abrir o .zip como projeto → 🐙 GitHub).
2. No site do GitHub, nesse repositório: aba **Actions** → **Programa .exe (Python, um arquivo só)** → **Run workflow**.
3. Espere uns 5 minutos. O GitHub monta o .exe e **confere se ele liga** antes de entregar.
4. Ficou ✔ verde: vá em **Releases** (na página inicial do repositório, à direita) → baixe **Assistente-Juridico.exe**.

## Como usar no computador
- Dois cliques no **Assistente-Juridico.exe**.
- Se o Windows avisar "O Windows protegeu o computador": **Mais informações → Executar assim mesmo** (acontece com todo programa novo sem assinatura paga).
- Abre a janela preta (pode minimizar) e o app numa janela própria.
- **Para desligar:** feche a janela preta.
- Clicar de novo com ele já ligado só abre a janela outra vez.

## Seus dados
Ficam guardados no navegador do computador, presos ao endereço `127.0.0.1:7740`. Por isso a porta é fixa: **não mude**, senão o app abre vazio.
As chaves de IA ficam só no seu computador.

## O que tem aqui
- `abrir.py` — o programinha que liga o app (é o que vira o .exe)
- `www/` — o Assistente Jurídico já montado (o mesmo que abre pelo index)
- `icone.ico` — o ícone
- `.github/workflows/exe-python.yml` — a receita que o GitHub usa para montar
