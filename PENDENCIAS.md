# Pendências — Criativa Presentes e Brindes personalizados

## Obrigatórias antes da publicação

- [ ] Cliente autorizar o uso das mídias públicas baixadas.
- [ ] Cliente confirmar se a foto de perfil pode ser usada como referência visual de marca.
- [ ] Cliente fornecer ou aprovar a logo oficial.
- [ ] Confirmar cidade, endereço, horário e eventual localização no Google Maps.
- [ ] Confirmar o conjunto final de ofertas, incluindo Peças artesanais, Kit Gin e scrapdecor.
- [ ] Confirmar preços, prazos, quantidade mínima, pagamentos, entregas e disponibilidade.
- [ ] Validar texto final de copy e mensagens do WhatsApp.
- [ ] Informar domínio público para `NEXT_PUBLIC_SITE_URL`.

## Mídias

- 12 imagens foram baixadas para referência.
- O Reel `https://www.instagram.com/criativavg/reel/DdHVm7mROf6/` tem capa em `assets/asset_012.jpg`; o arquivo de vídeo está marcado como `unavailable` no manifesto.
- Todas as imagens permanecem com `usage_status = reference_only_pending_authorization`.

## Localização

- Maps não informado na entrada (`maps: sem localização`).
- `mapsUrl`, endereço, cidade, latitude e longitude permanecem pendentes.
- Não criar mapa genérico nem botão “Ir para o local” enquanto não houver dados confirmados.

## Implementação da landing (revisar com a cliente)

- Hero usa `asset_005.jpg` (antes `asset_007.jpg` em `empresa.json`), para não repetir a foto do PreFooter.
- Card "Presentes personalizados" usa `asset_006.jpg`; a galeria ficou com `asset_008`, `asset_011`, `asset_012` e `asset_009`.
- `asset_003.jpg` aparece no destaque e no card de convites (é a única foto de caixa-convite).
- Peças artesanais e Kit Gin estão no site com card tipográfico (sem foto) até a cliente enviar imagens.
- Destaques "Feedbacks" e "scrapdecor" não aparecem no site.
- Copy pública (títulos, FAQ, passos) e mensagens do WhatsApp precisam de aprovação final.
- Sem `NEXT_PUBLIC_SITE_URL`, o sitemap sai vazio e o Open Graph usa o domínio da Vercel (ou localhost em build local).
