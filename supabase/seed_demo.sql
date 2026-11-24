-- =====================================================
-- ScentHub: dados de demonstração (reviews, comments, favorites)
-- Rode APÓS ter usuários criados no Supabase Auth
-- =====================================================

-- -----------------------------------------------------
-- 1. CRIAR USUÁRIOS DE TESTE (rode no Supabase SQL Editor)
-- -----------------------------------------------------
-- Nota: No Supabase, usuários são criados via Auth (signup).
-- Este script assume que já existem usuários com estes emails.
-- Se não existirem, crie-os manualmente no painel Auth ou via signup no site.
--
-- Exemplo de usuários para criar:
-- maria@exemplo.com / senha123
-- joao@exemplo.com / senha123
-- ana@exemplo.com / senha123
-- pedro@exemplo.com / senha123
-- carla@exemplo.com / senha123

-- -----------------------------------------------------
-- 2. BUSCAR IDs DOS USUÁRIOS (ajuste conforme necessário)
-- -----------------------------------------------------
-- Substitua os UUIDs abaixo pelos IDs reais dos usuários criados
-- SELECT id, email FROM auth.users WHERE email IN (...);

-- Para este script, use placeholders que você vai substituir:
-- \set user_maria 'uuid-da-maria'
-- \set user_joao 'uuid-do-joao'
-- \set user_ana 'uuid-da-ana'
-- \set user_pedro 'uuid-do-pedro'
-- \set user_carla 'uuid-da-carla'

-- Como o psql do Supabase não suporta \set, vamos usar INSERT com subquery:
-- Ajuste os emails para os que você criou.

-- -----------------------------------------------------
-- 3. AVALIAÇÕES (reviews) - 1 a 5 estrelas
-- -----------------------------------------------------

-- Sauvage (amber) - muito popular
INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'sauvage', 5 FROM auth.users WHERE email = 'maria@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'sauvage', 4 FROM auth.users WHERE email = 'joao@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'sauvage', 5 FROM auth.users WHERE email = 'ana@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'sauvage', 4 FROM auth.users WHERE email = 'pedro@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Le Male (doce/âmbar)
INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'le-male', 5 FROM auth.users WHERE email = 'maria@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'le-male', 4 FROM auth.users WHERE email = 'carla@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'le-male', 3 FROM auth.users WHERE email = 'joao@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- A*Men (doce/gourmand)
INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'a-men', 5 FROM auth.users WHERE email = 'ana@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'a-men', 4 FROM auth.users WHERE email = 'pedro@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Boss Bottled (amadeirado/especiado)
INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'boss-bottled', 4 FROM auth.users WHERE email = 'joao@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'boss-bottled', 5 FROM auth.users WHERE email = 'carla@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'boss-bottled', 4 FROM auth.users WHERE email = 'maria@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Cool Water (aquático/aromático)
INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'cool-water', 4 FROM auth.users WHERE email = 'pedro@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'cool-water', 3 FROM auth.users WHERE email = 'ana@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Bleu de Chanel (amadeirado/aromático)
INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'bleu-de-chanel', 5 FROM auth.users WHERE email = 'maria@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'bleu-de-chanel', 4 FROM auth.users WHERE email = 'joao@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'bleu-de-chanel', 5 FROM auth.users WHERE email = 'ana@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Aventus (frutado/fumado) - nicho, avaliações altas
INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'aventus', 5 FROM auth.users WHERE email = 'carla@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'aventus', 5 FROM auth.users WHERE email = 'pedro@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Terre d'Hermès (mineral/amadeirado)
INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'terre-d-hermes', 4 FROM auth.users WHERE email = 'ana@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'terre-d-hermes', 5 FROM auth.users WHERE email = 'maria@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Dior Homme (íris/amadeirado)
INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'dior-homme', 4 FROM auth.users WHERE email = 'joao@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'dior-homme', 3 FROM auth.users WHERE email = 'carla@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Acqua di Giò (aquático/fresco)
INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'acqua-di-gio', 4 FROM auth.users WHERE email = 'pedro@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'acqua-di-gio', 4 FROM auth.users WHERE email = 'maria@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.reviews (user_id, perfume_id, rating)
SELECT id, 'acqua-di-gio', 3 FROM auth.users WHERE email = 'ana@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- -----------------------------------------------------
-- 4. COMENTÁRIOS (comments) - textos variados
-- -----------------------------------------------------

-- Sauvage
INSERT INTO public.comments (user_id, perfume_id, content)
SELECT id, 'sauvage', 'O melhor custo-benefício que existe. Dura o dia todo no escritório e ainda sinto no outro dia de manhã. O ambroxan dá aquela assinatura limpa e masculina que todo mundo elogia.'
FROM auth.users WHERE email = 'maria@exemplo.com'
ON CONFLICT DO NOTHING;

INSERT INTO public.comments (user_id, perfume_id, content)
SELECT id, 'sauvage', 'Comprei no escuro e não me arrependo. É versátil, serve pra ir na academia ou num jantar. A projeção é forte nas primeiras 2h, depois fica rente à pele.'
FROM auth.users WHERE email = 'joao@exemplo.com'
ON CONFLICT DO NOTHING;

INSERT INTO public.comments (user_id, perfume_id, content)
SELECT id, 'sauvage', 'Já é meu terceiro frasco. A reformulação de 2021 assustou, mas continua excelente. O segredo é não exagerar: 2 borrifadas no pescoço e 1 no pulso.'
FROM auth.users WHERE email = 'ana@exemplo.com'
ON CONFLICT DO NOTHING;

-- Le Male
INSERT INTO public.comments (user_id, perfume_id, rating)
SELECT id, 'le-male', 'Clássico absoluto. A baunilha e fava-tonka dominam, mas a lavanda e menta no início dão frescor. Uso no inverno e outono, no verão fica muito doce pra mim.'
FROM auth.users WHERE email = 'maria@exemplo.com'
ON CONFLICT DO NOTHING;

INSERT INTO public.comments (user_id, perfume_id, content)
SELECT id, 'le-male', 'O frasco é icônico, mas o cheiro é que prende. Docinho na medida, não enjoa. Minha esposa adora quando uso. Dura 8h+ na minha pele.'
FROM auth.users WHERE email = 'carla@exemplo.com'
ON CONFLICT DO NOTHING;

-- A*Men
INSERT INTO public.comments (user_id, perfume_id, content)
SELECT id, 'a-men', 'Diferente de tudo que já cheirei. O café/torrone no topo chama atenção, depois vem o caramelo e baunilha. Não é pra todo mundo, mas quem gosta, ama. Performance de nicho.'
FROM auth.users WHERE email = 'ana@exemplo.com'
ON CONFLICT DO NOTHING;

INSERT INTO public.comments (user_id, perfume_id, content)
SELECT id, 'a-men', 'Uso à noite em encontros. É marcante, deixa rastro. Cuidado com a dosagem: 1 borrifada basta. A fixação é absurda, acordou no outro dia ainda cheirando.'
FROM auth.users WHERE email = 'pedro@exemplo.com'
ON CONFLICT DO NOTHING;

-- Bleu de Chanel
INSERT INTO public.comments (user_id, perfume_id, content)
SELECT id, 'bleu-de-chanel', 'O "terno e gravata" dos perfumes. Elegante, limpo, versátil. Uso no trabalho todo dia. O incenso no fundo dá profundidade sem pesar. Versão EDP dura mais.'
FROM auth.users WHERE email = 'maria@exemplo.com'
ON CONFLICT DO NOTHING;

INSERT INTO public.comments (user_id, perfume_id, content)
SELECT id, 'bleu-de-chanel', 'Seguro. Não tem erro. Presentei meu pai e ele usou o frasco todo. Não é o mais único, mas é o mais usável da coleção.'
FROM auth.users WHERE email = 'joao@exemplo.com'
ON CONFLICT DO NOTHING;

-- Aventus
INSERT INTO public.comments (user_id, perfume_id, content)
SELECT id, 'aventus', 'O abacaxi na abertura é viciante. Depois vem a bétula defumada que equilibra. Caro, mas entendo o hype. Comprei decant primeiro pra testar.'
FROM auth.users WHERE email = 'carla@exemplo.com'
ON CONFLICT DO NOTHING;

INSERT INTO public.comments (user_id, perfume_id, content)
SELECT id, 'aventus', 'Lote 2023 é mais suave que os antigos, mas ainda excelente. A performance caiu um pouco (8h vs 12h dos lotes 2015-2018), mas a assinatura continua lá.'
FROM auth.users WHERE email = 'pedro@exemplo.com'
ON CONFLICT DO NOTHING;

-- Terre d'Hermès
INSERT INTO public.comments (user_id, perfume_id, content)
SELECT id, 'terre-d-hermes', 'Mineral, terroso, elegante. A laranja abre com brilho, o vetiver e cedro seguram a base. É um perfume "pensante", não grita. Uso em reuniões importantes.'
FROM auth.users WHERE email = 'ana@exemplo.com'
ON CONFLICT DO NOTHING;

INSERT INTO public.comments (user_id, perfume_id, content)
SELECT id, 'terre-d-hermes', 'A versão Eau Intense Vetiver é mais verde e dura mais. O original é mais laranja/terra. Tenho os dois pra ocasiões diferentes.'
FROM auth.users WHERE email = 'maria@exemplo.com'
ON CONFLICT DO NOTHING;

-- Dior Homme
INSERT INTO public.comments (user_id, perfume_id, content)
SELECT id, 'dior-homme', 'A íris com cacau é genial. Doce mas não gourmand, pó mas não velho. A reformulação 2020 tirou um pouco da performance, mas continua bom. O 2011 era besta.'
FROM auth.users WHERE email = 'joao@exemplo.com'
ON CONFLICT DO NOTHING;

-- Acqua di Giò
INSERT INTO public.comments (user_id, perfume_id, content)
SELECT id, 'acqua-di-gio', 'Meu verão em frasco. Marinho, limão, jasmim... aquele cheiro de praia cara. Não projeta muito, mas fica rente à pele o dia todo. Recompro todo ano.'
FROM auth.users WHERE email = 'pedro@exemplo.com'
ON CONFLICT DO NOTHING;

INSERT INTO public.comments (user_id, perfume_id, content)
SELECT id, 'acqua-di-gio', 'Profundo: a versão Profumo (com incenso e patchouli) dura muito mais e funciona à noite. O original é só dia/verão. Tenho os 3: original, Profumo, Absolu.'
FROM auth.users WHERE email = 'maria@exemplo.com'
ON CONFLICT DO NOTHING;

-- -----------------------------------------------------
-- 5. FAVORITOS (favorites)
-- -----------------------------------------------------

-- Maria: gosta de âmbar, doce, amadeirado
INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'sauvage' FROM auth.users WHERE email = 'maria@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'le-male' FROM auth.users WHERE email = 'maria@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'bleu-de-chanel' FROM auth.users WHERE email = 'maria@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'terre-d-hermes' FROM auth.users WHERE email = 'maria@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'acqua-di-gio' FROM auth.users WHERE email = 'maria@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- João: clássicos, amadeirados
INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'sauvage' FROM auth.users WHERE email = 'joao@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'boss-bottled' FROM auth.users WHERE email = 'joao@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'bleu-de-chanel' FROM auth.users WHERE email = 'joao@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'dior-homme' FROM auth.users WHERE email = 'joao@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Ana: gourmand, íris, nicho
INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'a-men' FROM auth.users WHERE email = 'ana@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'aventus' FROM auth.users WHERE email = 'ana@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'dior-homme' FROM auth.users WHERE email = 'ana@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'terre-d-hermes' FROM auth.users WHERE email = 'ana@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Pedro: frescos, aquáticos
INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'cool-water' FROM auth.users WHERE email = 'pedro@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'acqua-di-gio' FROM auth.users WHERE email = 'pedro@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'aventus' FROM auth.users WHERE email = 'pedro@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'bleu-de-chanel' FROM auth.users WHERE email = 'pedro@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Carla: doce, feminino/unissex
INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'le-male' FROM auth.users WHERE email = 'carla@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'boss-bottled' FROM auth.users WHERE email = 'carla@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

INSERT INTO public.favorites (user_id, perfume_id)
SELECT id, 'aventus' FROM auth.users WHERE email = 'carla@exemplo.com'
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- -----------------------------------------------------
-- 6. ATUALIZAR STATS (opcional - a view perfume_stats faz isso automaticamente)
-- -----------------------------------------------------
-- A view public.perfume_stats recalcula automaticamente.
-- Se quiser forçar refresh do cache da aplicação:
-- NOTIFY perfumes; -- ou reinicie o servidor Next.js