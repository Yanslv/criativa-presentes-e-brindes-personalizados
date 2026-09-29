# Pacote da landing page — Criativa Presentes e Brindes personalizados

Este pacote reúne a leitura pública do Instagram, os dados estruturados da empresa, as mídias de referência e o prompt para o Claude Code criar uma landing page estática de alta conversão.

## Como usar

1. Descompacte este arquivo.
2. Abra o **Claude Code** na raiz desta pasta.
3. Envie exatamente:

> Leia PROMPT_CLAUDE_CODE.md e crie o projeto na raiz do repositório. Rode lint, typecheck, test e build.

O projeto deve ser criado diretamente na raiz do repositório, sem uma pasta `site/` intermediária.

## Arquivos

- `PROMPT_CLAUDE_CODE.md` — instruções completas e preenchidas para o Claude Code.
- `empresa.json` — conteúdo estruturado da empresa, ofertas, copy, contatos e pendências.
- `research/leitura-instagram.md` — leitura do perfil público, fontes, direção de copy e tabela de mapeamento da bio para o site.
- `assets/manifest.csv` — fonte, papel e status de cada mídia.
- `assets/image_inventory.csv` — inventário técnico das imagens.
- `assets/` — mídias públicas baixadas para referência local.
- `PENDENCIAS.md` — checklist interno de revisão antes da publicação.

## Atenção antes de publicar

As imagens e informações do perfil foram coletadas como material de referência. A publicação depende de revisão humana e autorização da cliente, conforme `empresa.json` e `PENDENCIAS.md`. O pacote não contém localização: endereço, cidade, Maps e coordenadas permanecem pendentes.
