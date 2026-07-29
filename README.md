# Site institucional — YXZ Soluções Educacionais

Este pacote contém uma landing page institucional responsiva para a YXZ Soluções Educacionais / YXZ Robótica.

## Arquivos principais

- `index.html` — página principal
- `styles.css` — estilos, responsividade e animações
- `script.js` — menu mobile, animações, filtros de portfólio, contadores e formulário
- `obrigado.html` — página de confirmação opcional para integração com formulário
- `assets/` — logomarca e imagens otimizadas extraídas/adaptadas dos materiais fornecidos

## Como publicar

Você pode publicar como site estático em plataformas como Netlify, Vercel, GitHub Pages ou servidor próprio.

### Opção simples
Envie todos os arquivos para o servidor e abra `index.html`.

### Formulário
Por padrão, o formulário gera um e-mail preenchido para:

`administrativo@yxzrobotica.com.br`

O HTML também já está marcado com `data-netlify="true"`, o que facilita uma futura integração com Netlify Forms. Para usar envio nativo por Netlify, remova ou ajuste o listener de `submit` no `script.js`.

## Identidade visual

A página usa:
- logomarca baseada no material enviado: `YXZROBOTIC Educação Tecnológica`;
- fontes via CSS baseadas nos documentos: League Spartan, Open Sans, Rubik e Bungee, com fallbacks do sistema;
- paleta moderna inspirada nos materiais: roxo, laranja, amarelo, ciano e branco.

Nenhum arquivo de fonte foi embutido no pacote.
