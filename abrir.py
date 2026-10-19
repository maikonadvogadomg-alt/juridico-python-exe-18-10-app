# -*- coding: utf-8 -*-
"""
ASSISTENTE JURÍDICO — programa de um arquivo só (.exe), feito em Python.

Funciona igual ao do Replit: você dá dois cliques, abre uma janela preta
que "liga" o app, e ele aparece numa janela própria (Edge/Chrome em modo app).
O site inteiro (pasta www) vai guardado DENTRO do .exe.

- Porta fixa (7740): é ela que guarda os seus dados. Não mude.
- Só o próprio computador acessa (127.0.0.1). Ninguém de fora entra.
- Se já estiver ligado, clicar de novo só abre a janela outra vez.
- Para fechar de vez: feche a janela preta.
"""
import os, sys, socket, shutil, subprocess, threading, webbrowser, mimetypes
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)   # janela preta do Windows: acentos e emojis sem travar
except Exception:
    pass

NOME = 'Assistente Jurídico'
PORTA = int(os.environ.get('PORTA', '7740'))
ENDERECO = 'http://127.0.0.1:%d/' % PORTA

# onde está a pasta www: dentro do .exe (PyInstaller) ou ao lado deste arquivo
BASE = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(BASE, 'www')

for ext, tipo in {'.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
                  '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.wasm': 'application/wasm',
                  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon'}.items():
    mimetypes.add_type(tipo, ext)


class Pagina(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=SITE, **k)

    def send_head(self):
        # endereço sem arquivo (ex.: /processos) → index.html, como a Netlify faz
        caminho = self.translate_path(self.path)
        if not os.path.exists(caminho) and '.' not in os.path.basename(self.path.split('?')[0]):
            self.path = '/index.html'
        return super().send_head()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def log_message(self, *a):
        pass   # não enche a janela preta de mensagens


def ja_ligado():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        return s.connect_ex(('127.0.0.1', PORTA)) == 0


def abrir_janela():
    if os.environ.get('SEM_ABRIR'):
        return
    # janela própria, sem barra de endereço: Edge (todo Windows tem) ou Chrome em "modo app"
    candidatos = [shutil.which('msedge'), shutil.which('chrome'),
                  r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
                  r'C:\Program Files\Microsoft\Edge\Application\msedge.exe',
                  r'C:\Program Files\Google\Chrome\Application\chrome.exe',
                  os.path.expandvars(r'%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe')]
    for c in candidatos:
        if c and os.path.isfile(c):
            try:
                subprocess.Popen([c, '--app=' + ENDERECO, '--window-size=1200,850'])
                return
            except OSError:
                pass
    webbrowser.open(ENDERECO)   # sem Edge/Chrome: abre no navegador normal


def main():
    if not os.path.isfile(os.path.join(SITE, 'index.html')):
        print('❌ Não achei o site (pasta www) dentro do programa.')
        input('Aperte Enter para fechar…')
        return
    if ja_ligado():
        print('✅ Já estava ligado. Abrindo a janela…')
        abrir_janela()
        return
    try:
        srv = ThreadingHTTPServer(('127.0.0.1', PORTA), Pagina)
    except OSError:
        print('❌ A porta %d está ocupada por outro programa.' % PORTA)
        input('Aperte Enter para fechar…')
        return
    if os.name == 'nt':
        os.system('title ' + NOME + ' (deixe esta janela aberta)')
    print('━' * 52)
    print('  ⚖️  %s — LIGADO' % NOME)
    print('━' * 52)
    print('  Abrindo a janela do app…  (se não abrir, use: %s)' % ENDERECO)
    print('  Pode minimizar esta janela preta.')
    print('  Para DESLIGAR: feche esta janela.')
    print('━' * 52)
    threading.Timer(0.6, abrir_janela).start()
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == '__main__':
    main()
