/* =========================================================================
   CONSERTO DA IA (18/10-a) — Jurídico versão Replit
   O app foi feito para conversar com um SERVIDOR (Replit) que respondia "aos
   pouquinhos" (streaming). Sem o servidor, o "modo offline" dele respondia de
   outro jeito, e por isso:
     - o Chat Livre repetia sempre a mesma frase (a pergunta chegava VAZIA);
     - as ações (Corrigir, Resumir, Minuta…) perdiam as instruções e o histórico.
   Este arquivo faz o papel do servidor, aqui dentro do aparelho:
     - monta as mesmas instruções que o servidor montava (ações, esforço, histórico,
       ementas, modelos personalizados);
     - manda para a SUA chave (a "Própria" ou a de Configurações);
     - devolve a resposta aos pouquinhos, do jeito que as telas esperam.
   As chaves ficam só no aparelho e vão direto para a empresa da IA.
   ========================================================================= */
(function () {
  'use strict';
const SYSTEM_PROMPT_BASE = `Voce e uma assistente juridica especializada em Direito brasileiro. Produza documentos COMPLETOS, EXTENSOS e PRONTOS PARA USO IMEDIATO.

REGRAS ABSOLUTAS:
1. DOCUMENTO COMPLETO E EXTENSO — nunca resuma, nunca corte, nunca omita. Escreva o documento inteiro do inicio ao fim. O advogado copia e cola direto no Word.
2. ESTRUTURA OBRIGATORIA para peticoes e minutas: Endereçamento → Qualificação das partes → Dos Fatos (detalhado) → Do Direito (com fundamentacao legal) → Dos Pedidos → Local, data e assinatura.
3. FUNDAMENTACAO ROBUSTA — cite artigos de lei, numeros de lei, doutrina, principios. Desenvolva cada argumento em paragrafos proprios.
4. Base-se EXCLUSIVAMENTE no texto fornecido. Nao invente fatos. Se faltar dado: [INFORMAR: descricao]. Se ha ementas selecionadas, CITE-AS literalmente.
5. MANTENHA nomes, CPFs, numeros, dados pessoais EXATAMENTE como estao. NAO altere nenhum dado.
6. TEXTO PURO sem markdown. NAO use asteriscos (*), hashtags (#), tracos (---), nem nenhuma sintaxe markdown. Para titulos, escreva em CAIXA ALTA. Para negrito, escreva em CAIXA ALTA. Paragrafos separados por linha em branco. Cada paragrafo em uma unica linha continua (sem quebras no meio da frase).
7. CADA PARAGRAFO maximo 5 linhas. Nunca junte varios argumentos num bloco so. Separe cada ideia em paragrafo proprio.
8. NUNCA produza um rascunho curto. O MINIMO ABSOLUTO para qualquer minuta ou peticao e 15 PAGINAS completas (aproximadamente 7.500 palavras). Desenvolva extensamente cada secao: fatos com narrativa cronologica detalhada, fundamentacao juridica com multiplos artigos e jurisprudencia, teses subsidiarias, pedidos detalhados e fundamentados individualmente.
9. PROIBIDO entregar texto com menos de 15 paginas em minutas e peticoes. Se necessario, aprofunde argumentacao, inclua mais jurisprudencia, desenvolva teses alternativas e subsidiarias, detalhe cada pedido com fundamentacao propria.
10. FORMATACAO DO TEXTO:
   - Titulos e subtitulos: CAIXA ALTA, negrito, centralizado, sem recuo.
   - Paragrafos do corpo: justificados, recuo de 4cm na primeira linha, espacamento 1.5.
   - Citacoes (ementas, artigos, sumulas): recuo 4cm dos dois lados, justificado, fonte 10pt, espacamento simples, italico.
   - Assinatura do advogado: negrito, CAIXA ALTA, centralizado.
   - Data e cidade: alinhados a direita.
   - "Nestes termos, pede deferimento": alinhado a esquerda, sem recuo.
   - OAB e nome do advogado: centralizado.
11. EMENTAS: quando citar ementa de jurisprudencia, COPIE O TEXTO COMPLETO da ementa — nao resuma, nao corte. Se a ementa selecionada for a base do argumento, cite na integra como citacao longa ABNT (recuo 4cm dos dois lados, fonte 10pt, espacamento simples, justificado). Apos a citacao, inclua sempre a referencia completa: (Tribunal, Numero do Processo, Relator, Data).`;

const ACTION_PROMPTS = {
  resumir:
    "Elabore RESUMO ESTRUTURADO do documento com as seguintes secoes, CADA UMA em bloco separado por linha em branco:\n\n1. NATUREZA DA DEMANDA\n[descricao]\n\n2. FATOS PRINCIPAIS\n[datas, nomes, valores]\n\n3. FUNDAMENTOS JURIDICOS\n[bases legais e argumentos]\n\n4. CONCLUSAO E PEDIDO\n[resultado pretendido]\n\nNao omita detalhes. Cada topico deve iniciar em nova linha apos linha em branco.\n\nDOCUMENTO:\n{{textos}}",
  revisar:
    "Analise erros gramaticais, concordancia, logica juridica. Sugira melhorias de redacao. Aponte omissoes/contradicoes.\n\nTEXTO:\n{{textos}}",
  refinar:
    "Reescreva elevando linguagem para padrao de tribunais superiores. Melhore fluidez e vocabulario juridico.\n\nTEXTO:\n{{textos}}",
  simplificar:
    "Traduza para linguagem simples e acessivel, mantendo rigor tecnico. Cliente leigo deve entender.\n\nTEXTO:\n{{textos}}",
  minuta:
    "Elabore PETICAO/MINUTA JURIDICA COMPLETA, EXTENSA E PROFISSIONAL com NO MINIMO 15 PAGINAS (7.500+ palavras). Inclua OBRIGATORIAMENTE todas as secoes abaixo, desenvolvendo CADA UMA extensamente:\n\nEXMO(A). SR(A). DR(A). JUIZ(A) DE DIREITO DA ... VARA DE ... DA COMARCA DE ...\n\n[QUALIFICACAO COMPLETA DAS PARTES com todos os dados]\n\nDOS FATOS\n[Narrativa EXTENSA, detalhada e cronologica dos fatos — minimo 8 paragrafos desenvolvidos, com datas, valores, circunstancias e contexto completo]\n\nDO DIREITO\n[Fundamentacao juridica ROBUSTA com citacao de artigos de lei, codigos, leis especificas, principios constitucionais, doutrina e jurisprudencia — minimo 12 paragrafos com multiplas teses principais e subsidiarias]\n\nDA JURISPRUDENCIA\n[Citacao de precedentes relevantes de tribunais superiores e regionais — minimo 5 julgados com ementa]\n\nDOS DANOS / DA RESPONSABILIDADE (quando aplicavel)\n[Desenvolvimento detalhado da teoria da responsabilidade civil/penal aplicavel]\n\nDOS PEDIDOS\n[Lista numerada e DETALHADA de todos os pedidos, cada um com fundamentacao propria — minimo 8 pedidos]\n\nDO VALOR DA CAUSA\n[Fundamentacao do valor atribuido]\n\n[Data e assinatura]\n\nATENCAO: O documento DEVE ter no minimo 15 PAGINAS COMPLETAS. E PROIBIDO entregar rascunho curto ou resumido. Desenvolva extensamente cada secao como uma peticao real de escritorio de advocacia.\n\nINFORMACOES:\n{{textos}}",
  analisar:
    "Elabore ANALISE JURIDICA com as seguintes secoes, CADA UMA separada por linha em branco:\n\n1. RISCOS PROCESSUAIS\n[analise dos riscos]\n\n2. TESES FAVORAVEIS E CONTRARIAS\n[argumentos pro e contra]\n\n3. JURISPRUDENCIA APLICAVEL\n[precedentes relevantes]\n\n4. PROXIMOS PASSOS\n[recomendacoes de atuacao]\n\nCada secao deve iniciar em nova linha apos linha em branco.\n\nDOCUMENTO:\n{{textos}}",
  "modo-estrito":
    "Corrija APENAS erros gramaticais e de estilo. Nao altere estrutura ou conteudo.\n\nTEXTO:\n{{textos}}",
  "modo-redacao":
    "Melhore o texto tornando-o mais profissional e persuasivo, mantendo todos dados e fatos.\n\nTEXTO:\n{{textos}}",
  "modo-interativo":
    "Identifique lacunas e pontos que precisam complementacao pelo advogado.\n\nTEXTO:\n{{textos}}",
};

  const ls = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
  const lsTxt = (k) => { try { return (localStorage.getItem(k) || '').trim(); } catch { return ''; } };
  const PREFIXOS = [
    ['sk-or-', 'https://openrouter.ai/api/v1', 'openrouter/auto'],
    ['gsk_', 'https://api.groq.com/openai/v1', 'llama-3.3-70b-versatile'],
    ['pplx-', 'https://api.perplexity.ai', 'sonar-pro'],
    ['AIza', 'https://generativelanguage.googleapis.com/v1beta/openai', 'gemini-2.5-flash'],
    ['xai-', 'https://api.x.ai/v1', 'grok-2-latest'],
    ['sk-', 'https://api.openai.com/v1', 'gpt-4o-mini'],
  ];

  // qual chave usar: a enviada pela tela → a "Própria" → as de Configurações
  function escolherChave(b) {
    let key = (b.customKey || b.apiKey || lsTxt('custom_api_key') || lsTxt('code_api_key') || '').trim();
    let url = (b.customKey || b.apiKey) ? (b.customUrl || b.apiUrl || '') : (lsTxt('custom_api_key') ? lsTxt('custom_api_url') : lsTxt('code_api_url'));
    let model = (b.customKey || b.apiKey) ? (b.customModel || b.apiModel || '') : (lsTxt('custom_api_key') ? lsTxt('custom_api_model') : lsTxt('code_api_model'));
    url = (url || '').trim(); model = (model || '').trim();
    const cfg = ls('apk_ai_config', {});
    if (!key && cfg.gemini_api_key) { key = cfg.gemini_api_key; url = ''; model = ''; }
    if (!key && cfg.openai_api_key) { key = cfg.openai_api_key; url = 'https://api.openai.com/v1'; model = 'gpt-4o-mini'; }
    if (!key && cfg.demo_api_key && cfg.demo_api_url) { key = cfg.demo_api_key; url = cfg.demo_api_url; model = cfg.demo_api_model || 'gpt-4o-mini'; }
    if (!key && cfg.perplexity_api_key) { key = cfg.perplexity_api_key; url = ''; model = ''; }
    if (!key) return null;
    const p = PREFIXOS.find(([pre]) => key.startsWith(pre));
    // a URL tem que combinar com a chave (não mandar chave do Groq para outro lugar)
    if (p && !(url && url.includes(new URL(p[1]).hostname))) { url = p[1]; model = p[2]; }
    if (!url) url = 'https://api.openai.com/v1';
    url = url.replace(/\/chat\/completions\/?$/, '').replace(/\/$/, '');
    return { key, url, model: model || (p ? p[2] : 'gpt-4o-mini') };
  }

  const linha = (o) => 'data: ' + JSON.stringify(o) + '\n\n';
  const enc = new TextEncoder();

  // chama a IA e devolve no formato que as telas leem ("data: {text}")
  function responder(msgs, b) {
    const ch = escolherChave(b || {});
    const corpo = new ReadableStream({
      async start(ctrl) {
        const manda = (o) => ctrl.enqueue(enc.encode(linha(o)));
        if (!ch) { manda({ text: '⚠️ Nenhuma chave de IA configurada. Toque em "Própria" (ou em Configurações) e cole a sua chave — Gemini (AIza…) é grátis.' }); manda({ done: true }); ctrl.close(); return; }
        try {
          const r = await origFetch(ch.url + '/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + ch.key },
            body: JSON.stringify({ model: ch.model, messages: msgs, stream: true, temperature: 0.4 }),
          });
          if (!r.ok) {
            const t = await r.text().catch(() => '');
            const m = r.status === 401 || r.status === 403 ? 'Chave inválida ou bloqueada. Confira a chave em "Própria".'
              : r.status === 429 ? 'Limite da chave atingido agora. Espere um pouco ou use outra chave.'
              : 'Erro da IA (' + r.status + '): ' + t.slice(0, 200);
            manda({ text: '⚠️ ' + m }); manda({ done: true }); ctrl.close(); return;
          }
          const leitor = r.body.getReader(), dec = new TextDecoder(); let buf = '', algo = false;
          for (;;) {
            const { done, value } = await leitor.read(); if (done) break;
            buf += dec.decode(value, { stream: true });
            const ls2 = buf.split('\n'); buf = ls2.pop() || '';
            for (const l of ls2) {
              const s = l.trim(); if (!s.startsWith('data:')) continue;
              const d = s.slice(5).trim(); if (!d || d === '[DONE]') continue;
              try { const j = JSON.parse(d); const t = j.choices && j.choices[0] && ((j.choices[0].delta && j.choices[0].delta.content) || (j.choices[0].message && j.choices[0].message.content)); if (t) { algo = true; manda({ text: t }); } } catch {}
            }
          }
          if (!algo) manda({ text: '⚠️ A IA não devolveu texto. Tente de novo ou troque de chave.' });
        } catch (e) { manda({ text: '⚠️ Sem conexão com a IA (' + (e && e.message || e) + '). Confira a internet.' }); }
        manda({ done: true }); ctrl.close();
      },
    });
    return new Response(corpo, { status: 200, headers: { 'Content-Type': 'text/event-stream' } });
  }

  const ESFORCO = { 1: 'ESFORCO: RAPIDO. Direto e objetivo.', 2: 'ESFORCO: BASICO. Pontos principais.', 3: 'ESFORCO: DETALHADO. Analise completa.', 4: 'ESFORCO: PROFUNDO. Fundamentacao robusta, nuances, legislacao.', 5: 'ESFORCO: EXAUSTIVO. Todos os angulos, teses, jurisprudencia.' };
  const esforco = (b) => { const e = typeof b.effortLevel === 'number' ? Math.min(5, Math.max(1, b.effortLevel)) : 3; return '\n\n' + ESFORCO[e] + '\n' + (b.verbosity === 'curta' ? 'TAMANHO: CONCISO. Direto ao ponto.' : 'TAMANHO: COMPLETO. Desenvolva cada argumento.'); };
  function ementas(ids) {
    if (!Array.isArray(ids) || !ids.length) return '';
    const todas = ls('apk_ementas', []); const sel = todas.filter((e) => ids.includes(e.id));
    if (!sel.length) return '';
    return '\n\nJURISPRUDÊNCIA DE REFERÊNCIA SELECIONADA PELO ADVOGADO (use como fundamentação; resuma a tese, mas PRESERVE EXATAMENTE a fonte: tribunal, processo, relator, data):\n\n' +
      sel.map((e, i) => 'EMENTA ' + (i + 1) + ' [' + (e.categoria || '') + '] - ' + (e.titulo || '') + ':\n' + (e.texto || '')).join('\n\n');
  }
  function historico(rc) {
    if (!Array.isArray(rc) || !rc.length) return '';
    return '\n\n--- HISTÓRICO DO ADVOGADO (para contexto) ---\n' + rc.map((it, i) => '[' + (i + 1) + '] Ação: ' + (it.acao || 'consulta') + '\nPergunta: ' + (it.pergunta || '') + '\nResposta: ' + (it.resposta || '')).join('\n\n') +
      '\n--- FIM DO HISTÓRICO ---\nQuando o advogado pedir algo sobre o conteúdo anterior, USE o histórico acima. Nunca diga que não tem a informação se ela está no histórico.';
  }

  // ── as 3 rotas que o servidor fazia ────────────────────────────────────────
  function processar(b) {
    let modelo = ACTION_PROMPTS[b.action];
    if (b.customActionId) { const ca = ls('apk_custom_actions', []).find((x) => x.id === b.customActionId); if (ca) modelo = (ca.prompt || '') + '\n\n{{textos}}'; }
    if (!modelo) modelo = '{{textos}}';
    const texto = String(b.text || '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
    return responder([
      { role: 'system', content: SYSTEM_PROMPT_BASE + esforco(b) + historico(b.recentContext) + ementas(b.ementaIds) },
      { role: 'user', content: modelo.replace('{{textos}}', texto) },
    ], b);
  }
  function refinar(b) {
    const sistema = 'Voce e uma assistente juridica especializada. Seu papel e construir e ajustar documentos juridicos brasileiros.\n\n' +
      (b.originalText ? 'TEXTO BASE:\n---\n' + String(b.originalText).slice(0, 15000) + '\n---\n' : '') + ementas(b.ementaIds) +
      '\n\nMODOS: 1. CONSTRUCAO (faz minuta/peticao/recurso): documento INTEIRO, com todas as secoes; dado ausente = [CAMPO A PREENCHER]. 2. EXPANSAO: mais argumentacao juridica. 3. AJUSTE (muda/corrige/altera X): documento COMPLETO com a alteracao, sem encurtar. 4. PERGUNTA juridica: responda direto, sem repetir o documento.\n\nREGRAS: Mantenha dados pessoais exatos. Use o historico da conversa. Nao invente fatos. Texto puro, sem markdown (sem * e #); titulos em CAIXA ALTA; paragrafos curtos com uma linha em branco entre eles.' + esforco(b);
    const msgs = [{ role: 'system', content: sistema }];
    const hist = Array.isArray(b.chatHistory) ? b.chatHistory.filter((m) => (m.role === 'user' || m.role === 'assistant') && String(m.content || '').trim()) : [];
    if (hist.length) hist.forEach((m) => msgs.push({ role: m.role, content: String(m.content) }));
    else if (b.previousResult || b.originalText) msgs.push({ role: 'user', content: 'DOCUMENTO ATUAL:\n' + (b.previousResult || b.originalText) }, { role: 'assistant', content: 'Entendido. Qual ajuste deseja?' });
    const ult = msgs[msgs.length - 1];
    if (b.instruction && !(ult.role === 'user' && ult.content === b.instruction)) msgs.push({ role: 'user', content: b.instruction });
    return responder(msgs, b);
  }
  function chatLivre(b) {
    const msgs = [{ role: 'system', content: 'Você é um assistente inteligente versátil. Responda com precisão, clareza e profundidade.\n\nREGRAS:\n1. Responda de forma completa e direta — nunca corte a resposta no meio\n2. Quando gerar código, retorne o código INTEIRO e funcional\n3. Responda em português, salvo se o usuário escrever em outro idioma\n4. Use o histórico da conversa: lembre do que já foi dito\n5. Se não entender o pedido, peça esclarecimento' }];
    (Array.isArray(b.history) ? b.history : []).forEach((h) => { const c = String(h.content || '').trim(); if (c) msgs.push({ role: h.role === 'assistant' ? 'assistant' : 'user', content: c }); });
    const msg = String(b.message || '').trim();
    if (msg && !msgs.some((m) => m.role === 'user' && m.content === msg)) msgs.push({ role: 'user', content: msg });
    return responder(msgs, b);
  }

  // ── liga por cima do "modo offline" do app (só estas 3 rotas; o resto continua igual) ──
  const origFetch = window.fetch.bind(window);
  window.fetch = async function (input, init) {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input && input.url || '';
    const rota = (url.match(/\/api\/(ai\/process|ai\/refine|code-assistant)(?:[?#]|$)/) || [])[1];
    if (!rota || ((init && init.method) || 'GET').toUpperCase() !== 'POST') return origFetch(input, init);
    let b = {}; try { b = JSON.parse((init && init.body) || '{}'); } catch {}
    if (rota === 'ai/process') return processar(b);
    if (rota === 'ai/refine') return refinar(b);
    return chatLivre(b);
  };
  window.__consertoIA = { escolherChave, versao: '18/10-a' };
})();
