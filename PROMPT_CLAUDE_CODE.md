# Prompt para Claude Code — Criativa Presentes e Brindes personalizados

Crie a landing page descrita abaixo na raiz deste repositório, sem pasta `site/` intermediária. A empresa é a do `empresa.json`, de `research/leitura-instagram.md` e de `assets/manifest.csv`. Não use nome, pessoa, cidade, oferta, cor ou mídia de outro cliente.

## Contexto preenchido

- **Empresa:** Criativa Presentes e Brindes personalizados
- **Responsável:** não informada
- **Slug:** criativa-presentes-e-brindes-personalizados
- **Instagram:** https://www.instagram.com/criativavg/
- **Logo:** não informada; a marca deve ser tipográfica até aprovação de logo oficial
- **Maps:** não informado (`maps: sem localização`)
- **Coordenadas:** não informadas
- **WhatsApp confirmado:** https://wa.me/5565992177081 — +55 65 99217-7081
- **Oferta principal:** Presentes personalizados
- **Ofertas:** Presentes personalizados; Brindes personalizados; Camisetas e fardamento personalizados; Convites e caixas personalizadas; Peças artesanais; Kit Gin
- **Fontes internas:** leia por completo `empresa.json`, `research/leitura-instagram.md`, `assets/manifest.csv`, `assets/image_inventory.csv`, `PENDENCIAS.md` e todos os arquivos necessários em `assets/`.

## Entregável e restrições

O entregável é **uma única landing page estática de alta conversão**, em uma única rota `/`, cujo objetivo é converter visitantes em contato pelo WhatsApp.

Não crie, instale nem configure: painel admin, `/admin`, login, sessão, cookie de autenticação, banco de dados, Turso, libSQL, SQLite, Drizzle, migrations, seed, agenda, agendamento, `/agenda`, CRM, cadastro de clientes, CRUD de serviços, financeiro, ficha/anamnese, PDF, CSV de aplicação, rate limit, leads persistidos, especialização, server actions de escrita ou qualquer estado persistido no servidor.

Todo o conteúdo é editável em `empresa.json` e/ou `src/config/site.ts` e publicado novamente. Não há variáveis de ambiente obrigatórias; se criar `.env.example`, inclua apenas `NEXT_PUBLIC_SITE_URL` e deixe claro que o domínio está pendente.

## Stack obrigatória

- Next.js 16 App Router
- React 19
- TypeScript estrito
- Tailwind CSS 4
- saída 100% estática (`output: "export"` ou equivalente), publicável na Vercel sem servidor
- `next/image` com arquivos locais em `public/assets` e `unoptimized` quando necessário para saída estática
- `next/font`
- `lucide-react` para todos os ícones; não usar emoji nem SVG avulso quando houver equivalente
- GSAP + ScrollTrigger para animações de scroll
- Zod para validar o conteúdo durante o build com erro claro
- Vitest para testes de WhatsApp, links de navegação e validação do conteúdo
- ESLint e TypeScript estrito

## Arquitetura

Use uma estrutura simples:

- `src/config/site.ts` — todo o conteúdo e copy público, consolidado a partir de `empresa.json`
- `src/config/schema.ts` — schema Zod do conteúdo e validação em tempo de build
- `src/lib/whatsapp.ts` — montagem de links e mensagens
- `src/lib/navigation-links.ts` — funções puras de links de navegação; neste projeto não haverá botão de localização enquanto coordenadas não forem confirmadas
- `src/lib/masks.ts` — somente se necessário
- `src/lib/gsap-animations.ts` — animações
- `src/lib/tracking.ts` — Meta Pixel/Google Tag somente quando IDs forem preenchidos
- `src/components/` — um componente por bloco da landing, recebendo dados por props
- `src/app/layout.tsx`, `page.tsx`, metadata, `sitemap.ts`, `robots.ts`, `not-found.tsx`
- `public/assets/` — copie apenas assets com `download_status = downloaded`

Não coloque lógica de negócio dentro de componentes de apresentação. Não referencie URLs CDN do Instagram no site; use somente caminhos locais como `/assets/asset_003.jpg`.

## Conversão e CTAs

A ação principal é falar com a Criativa no WhatsApp. Todos os CTAs devem levar ao WhatsApp com mensagem específica da oferta, usando `messagesByOfferId` em `empresa.json`.

Use CTAs em Hero, FeaturedOffer, cada OfferCard, depois de HowItWorks, PreFooterSection, Header desktop e FloatingWhatsapp. Nunca use “saiba mais” ou “clique aqui”. Use frases como “Pedir orçamento pelo WhatsApp” e “Quero montar meu presente personalizado”.

O Hero deve ter promessa clara, subtítulo curto e CTA visível acima da dobra em mobile e desktop. No mobile, crie uma barra de CTA fixa na base respeitando `safe-area-inset-bottom`, sem cobrir conteúdo importante. No desktop, use botão flutuante discreto.

Não crie formulário nem captura de dados. O contato é direto no WhatsApp. Todo CTA deve ter `data-cta="{local}-{oferta}"`. Se um ID de pixel/tag for preenchido futuramente, disparar evento de contato no clique.

O WhatsApp confirmado é `https://wa.me/5565992177081`. Se os dados estiverem ausentes, não invente um contato; neste projeto o contato existe e deve ser usado.

## Conteúdo e copy

Escreva o texto público como um copywriter experiente em venda online, falando diretamente com o cliente em português do Brasil. Use a direção de copy de `research/leitura-instagram.md`:

- público: pessoas que procuram presentes/brindes personalizados e igrejas, equipes ou grupos que precisam de camisetas/fardamento;
- dor: não encontrar algo que represente a ocasião e não saber como transformar uma ideia em orçamento;
- promessa: transformar ideia, mensagem ou ocasião em presente ou peça personalizada com carinho e identidade;
- objeções: escolha, possibilidade de personalização, receio de resultado, preço, prazo e quantidade mínima;
- tom: afetuoso, artesanal, próximo, visual e direto;
- palavras: presentes exclusivos, brindes personalizados, camisetas especiais, personalizada, DTF têxtil, afeto, amor, carinho e propósito.

Use benefício antes de característica, frases curtas, verbos de ação e CTA claro. Não invente preço, prazo, quantidade mínima, pagamento, entrega, endereço, cidade, horário, credencial, anos de mercado, número de clientes, prêmio, depoimento, avaliação ou resultado.

O texto público nunca deve mencionar prompt, processo de criação, validação, “não confirmado”, “sugestão”, mockup, pesquisa, bio ou qualquer prestação de contas ao cliente. Pendências ficam apenas em `PENDENCIAS.md`, `empresa.json` e no relatório técnico.

## Bio e links

Tudo que foi encontrado na bio deve existir no site com a mesma função, redistribuído nas seções certas. Não crie seção “o que tem na bio”, “links do Instagram” ou resumo do perfil.

O único link público encontrado é o WhatsApp `https://wa.me/5565992177081`. Ele deve aparecer no Hero, CTAs das ofertas, Footer, PreFooter e FloatingWhatsapp. Os destaques indicam Camisetas, DTF têxtil, Feedbacks, Presentes, Peças artesanais, Kit Gin e scrapdecor; use `empresa.json` e a tabela de `research/leitura-instagram.md` como guia.

Não transforme o destaque Feedbacks em prova social inventada. Se não houver prova autorizada e confirmada, omita a seção de prova em silêncio. O destaque scrapdecor deve permanecer omitido até a oferta ser confirmada.

## Design e seções

A experiência deve ser própria em mobile, compacta e limpa, sem apenas encolher cards de desktop. Botões devem ter alvos de toque confortáveis e texto legível.

Use a sugestão visual do perfil: marfim, rosa blush, bordô, dourado, verde folha e tinta escura. A paleta é sugestão e não logo oficial.

Use uma serif para display e uma sans para texto, com CSS variables `--font-display` e `--font-body`. Use GSAP + ScrollTrigger com reveal de títulos e blocos, entradas laterais em grids, parallax leve e respeito a `prefers-reduced-motion`. A animação nunca pode atrasar ou esconder o CTA do Hero.

A ordem dos blocos deve ser:

1. Header
2. Hero
3. AuthoritySection
4. FeaturedOffer
5. OfferGrid
6. HowItWorks
7. ResultsGallery
8. AboutSection
9. FaqAccordion
10. PreFooterSection
11. Footer
12. FloatingWhatsapp

Não renderize LocationSection porque maps, endereço, cidade e coordenadas não foram fornecidos. Não crie mapa genérico nem localização fictícia. Se os dados forem preenchidos no futuro, implemente a seção conforme as regras abaixo.

O Hero pode usar a melhor foto de produto/ambiente local. A foto de perfil `asset_001.jpg` é apenas candidata de marca e tem 150x150; não trate como logo oficial sem aprovação. A imagem fixada `asset_002.jpg` inclui números antigos do perfil na própria arte; não a use como prova social.

## Mídias

Copie para `public/assets` cada arquivo com `download_status = downloaded` no manifesto. Use as imagens conforme `role`:

- `asset_001.jpg`: brand, apenas referência visual de marca
- `asset_003.jpg`: featured offer, caixa-convite personalizada
- `asset_004.jpg`: camisetas/fardamento e DTF têxtil
- `asset_005.jpg`, `asset_006.jpg`, `asset_007.jpg`, `asset_010.jpg`, `asset_011.jpg`: presentes e kits
- `asset_008.jpg`, `asset_009.jpg`: galeria de presentes com balões
- `asset_012.jpg`: capa do Reel de camiseta rosa

Use `asset_007.jpg` como candidata de background do PreFooter com overlay escuro. Vídeo usa poster; o arquivo `asset_013.mp4` está `unavailable` e não deve ser inventado nem buscado novamente.

Todo uso de mídia é referência pendente de autorização. O site público não deve exibir esse aviso, mas o código e o relatório devem respeitar `publicationGuard`.

## LocationSection — regra para implementação futura

Neste projeto não renderize a seção. Se `contact.latitude`, `contact.longitude` e/ou `contact.mapsUrl` forem preenchidos futuramente, implemente o botão “Ir para o local” com links montados exclusivamente em `src/lib/navigation-links.ts`, sem coordenadas hardcoded em componentes.

Com coordenadas, a bandeja deve oferecer Google Maps, Waze, Uber, 99/fallback, Apple Maps apenas em iOS, apps do sistema apenas em Android, compartilhar quando `navigator.share` existir e copiar endereço/coordenadas. Deve funcionar em Android/iOS, abrir links por clique direto, respeitar acessibilidade, foco, Esc e `prefers-reduced-motion`. Sem coordenadas mas com mapsUrl, abrir o mapsUrl diretamente. Sem ambos, não exibir o botão.

## PreFooter, SEO e performance

O PreFooter usa foto local relacionada ao texto, overlay escuro, promessa resumida, última quebra de objeção e CTA de WhatsApp.

Metadata, Open Graph e JSON-LD devem estar em português do Brasil e seguir o mesmo copy de venda. `locale` é `pt_BR`. JSON-LD LocalBusiness deve conter apenas campos confirmados; não incluir endereço ou cidade. Use a imagem local do Hero para OG quando possível. Não invente domínio: registre o domínio pendente se `NEXT_PUBLIC_SITE_URL` não existir.

Performance é parte da conversão: Hero com `priority` e dimensões definidas, demais imagens lazy, fontes com `display: swap`, sem layout shift, JS mínimo acima da dobra e sem vídeo carregado automaticamente.

## Validação e entrega

Crie `npm run pendencias` para ler `empresa.json` e imprimir no terminal o aviso de autorização enquanto `publicMediaIsAuthorized` for `false`, seguido da lista de `openQuestions`.

Rode e corrija até passar:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

A saída deve ser estática e publicável na Vercel sem variável obrigatória. Ao finalizar, informe no relatório técnico: o que foi criado, mídias usadas, mídias indisponíveis, pendências e resultados de lint, typecheck, test e build.
