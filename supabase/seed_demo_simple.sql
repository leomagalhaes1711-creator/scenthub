-- =====================================================
-- ScentHub: seed demo SIMPLES (rode após criar usuários)
-- =====================================================

-- PASSO 1: Crie 5 usuários no site (signup) ou no painel Supabase Auth:
-- maria@exemplo.com
-- joao@exemplo.com
-- ana@exemplo.com
-- pedro@exemplo.com
-- carla@exemplo.com

-- PASSO 2: Pegue os UUIDs deles:
SELECT id, email FROM auth.users WHERE email IN (
  'maria@exemplo.com',
  'joao@exemplo.com',
  'ana@exemplo.com',
  'pedro@exemplo.com',
  'carla@exemplo.com'
);

-- PASSO 3: Substitua os UUIDs abaixo pelos retornados acima
-- Exemplo: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'

-- ============================================
-- COLE AQUI OS UUIDs REAIS (copie da query acima)
-- ============================================

-- \set user_maria 'UUID_DA_MARIA_AQUI'
-- \set user_joao  'UUID_DO_JOAO_AQUI'
-- \set user_ana   'UUID_DA_ANA_AQUI'
-- \set user_pedro 'UUID_DO_PEDRO_AQUI'
-- \set user_carla 'UUID_DA_CARLA_AQUI'

-- Como o Supabase SQL Editor não aceita \set, faça INSERT direto:
-- Substitua 'UUID_DA_MARIA_AQUI' pelo UUID real da Maria, etc.

-- -----------------------------------------------------
-- AVALIAÇÕES
-- -----------------------------------------------------

-- Sauvage
INSERT INTO public.reviews (user_id, perfume_id, rating) VALUES
  ('UUID_DA_MARIA_AQUI', 'sauvage', 5),
  ('UUID_DO_JOAO_AQUI', 'sauvage', 4),
  ('UUID_DA_ANA_AQUI', 'sauvage', 5),
  ('UUID_DO_PEDRO_AQUI', 'sauvage', 4)
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Le Male
INSERT INTO public.reviews (user_id, perfume_id, rating) VALUES
  ('UUID_DA_MARIA_AQUI', 'le-male', 5),
  ('UUID_DA_CARLA_AQUI', 'le-male', 4),
  ('UUID_DO_JOAO_AQUI', 'le-male', 3)
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- A*Men
INSERT INTO public.reviews (user_id, perfume_id, rating) VALUES
  ('UUID_DA_ANA_AQUI', 'a-men', 5),
  ('UUID_DO_PEDRO_AQUI', 'a-men', 4)
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Boss Bottled
INSERT INTO public.reviews (user_id, perfume_id, rating) VALUES
  ('UUID_DO_JOAO_AQUI', 'boss-bottled', 4),
  ('UUID_DA_CARLA_AQUI', 'boss-bottled', 5),
  ('UUID_DA_MARIA_AQUI', 'boss-bottled', 4)
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Cool Water
INSERT INTO public.reviews (user_id, perfume_id, rating) VALUES
  ('UUID_DO_PEDRO_AQUI', 'cool-water', 4),
  ('UUID_DA_ANA_AQUI', 'cool-water', 3)
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Bleu de Chanel
INSERT INTO public.reviews (user_id, perfume_id, rating) VALUES
  ('UUID_DA_MARIA_AQUI', 'bleu-de-chanel', 5),
  ('UUID_DO_JOAO_AQUI', 'bleu-de-chanel', 4),
  ('UUID_DA_ANA_AQUI', 'bleu-de-chanel', 5)
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Aventus
INSERT INTO public.reviews (user_id, perfume_id, rating) VALUES
  ('UUID_DA_CARLA_AQUI', 'aventus', 5),
  ('UUID_DO_PEDRO_AQUI', 'aventus', 5)
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Terre d'Hermès
INSERT INTO public.reviews (user_id, perfume_id, rating) VALUES
  ('UUID_DA_ANA_AQUI', 'terre-d-hermes', 4),
  ('UUID_DA_MARIA_AQUI', 'terre-d-hermes', 5)
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Dior Homme
INSERT INTO public.reviews (user_id, perfume_id, rating) VALUES
  ('UUID_DO_JOAO_AQUI', 'dior-homme', 4),
  ('UUID_DA_CARLA_AQUI', 'dior-homme', 3)
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- Acqua di Giò
INSERT INTO public.reviews (user_id, perfume_id, rating) VALUES
  ('UUID_DO_PEDRO_AQUI', 'acqua-di-gio', 4),
  ('UUID_DA_MARIA_AQUI', 'acqua-di-gio', 4),
  ('UUID_DA_ANA_AQUI', 'acqua-di-gio', 3)
ON CONFLICT (user_id, perfume_id) DO NOTHING;

-- -----------------------------------------------------
-- COMENTÁRIOS
-- -----------------------------------------------------

INSERT INTO public.comments (user_id, perfume_id, content) VALUES
  ('UUID_DA_MARIA_AQUI', 'sauvage', 'O melhor custo-benefício. Dura o dia todo e ainda sinto no outro dia. Ambroxan limpo e masculino.'),
  ('UUID_DO_JOAO_AQUI', 'sauvage', 'Versátil: academia ou jantar. Projeção forte nas 2h iniciais, depois rente à pele.'),
  ('UUID_DA_ANA_AQUI', 'sauvage', 'Terceiro frasco. Reforma de 2021 assustou mas continua excelente. 2 borrifadas bastam.'),

  ('UUID_DA_MARIA_AQUI', 'le-male', 'Clássico absoluto. Baunilha/fava-tonka dominam, lavanda/menta dão frescor. Inverno/outono.'),
  ('UUID_DA_CARLA_AQUI', 'le-male', 'Docinho na medida, não enjoa. Minha esposa adora. Dura 8h+ na pele.'),

  ('UUID_DA_ANA_AQUI', 'a-men', 'Diferente de tudo. Café/torrone no topo, caramelo/baunilha depois. Performance de nicho.'),
  ('UUID_DO_PEDRO_AQUI', 'a-men', 'Uso à noite em encontros. Marcante, deixa rastro. 1 borrifada basta. Fixação absurda.'),

  ('UUID_DA_MARIA_AQUI', 'bleu-de-chanel', 'O "terno e gravata". Elegante, limpo, versátil. Uso no trabalho. Incenso no fundo.'),
  ('UUID_DO_JOAO_AQUI', 'bleu-de-chanel', 'Seguro, não tem erro. Presentei meu pai e ele usou o frasco todo.'),

  ('UUID_DA_CARLA_AQUI', 'aventus', 'Abacaxi viciante na abertura, bétula defumada equilibra. Caro mas entendo o hype.'),
  ('UUID_DO_PEDRO_AQUI', 'aventus', 'Lote 2023 mais suave que antigos, mas assinatura lá. 8h vs 12h dos lotes 2015-2018.'),

  ('UUID_DA_ANA_AQUI', 'terre-d-hermes', 'Mineral, terroso, elegante. Laranja abre, vetiver/cedro seguram. Perfume "pensante".'),
  ('UUID_DA_MARIA_AQUI', 'terre-d-hermes', 'Eau Intense Vetiver é mais verde e dura mais. Original mais laranja/terra.'),

  ('UUID_DO_JOAO_AQUI', 'dior-homme', 'Íris com cacau genial. Doce mas não gourmand. Reforma 2020 tirou performance.'),

  ('UUID_DO_PEDRO_AQUI', 'acqua-di-gio', 'Verão em frasco. Marinho, limão, jasmim. Não projeta muito, fica rente à pele.'),
  ('UUID_DA_MARIA_AQUI', 'acqua-di-gio', 'Profumo (incenso/patchouli) dura mais e funciona à noite. Tenho os 3.')

ON CONFLICT DO NOTHING;

-- -----------------------------------------------------
-- FAVORITOS
-- -----------------------------------------------------

INSERT INTO public.favorites (user_id, perfume_id) VALUES
  -- Maria: âmbar, doce, amadeirado
  ('UUID_DA_MARIA_AQUI', 'sauvage'),
  ('UUID_DA_MARIA_AQUI', 'le-male'),
  ('UUID_DA_MARIA_AQUI', 'bleu-de-chanel'),
  ('UUID_DA_MARIA_AQUI', 'terre-d-hermes'),
  ('UUID_DA_MARIA_AQUI', 'acqua-di-gio'),

  -- João: clássicos, amadeirados
  ('UUID_DO_JOAO_AQUI', 'sauvage'),
  ('UUID_DO_JOAO_AQUI', 'boss-bottled'),
  ('UUID_DO_JOAO_AQUI', 'bleu-de-chanel'),
  ('UUID_DO_JOAO_AQUI', 'dior-homme'),

  -- Ana: gourmand, íris, nicho
  ('UUID_DA_ANA_AQUI', 'a-men'),
  ('UUID_DA_ANA_AQUI', 'aventus'),
  ('UUID_DA_ANA_AQUI', 'dior-homme'),
  ('UUID_DA_ANA_AQUI', 'terre-d-hermes'),

  -- Pedro: frescos, aquáticos
  ('UUID_DO_PEDRO_AQUI', 'cool-water'),
  ('UUID_DO_PEDRO_AQUI', 'acqua-di-gio'),
  ('UUID_DO_PEDRO_AQUI', 'aventus'),
  ('UUID_DO_PEDRO_AQUI', 'bleu-de-chanel'),

  -- Carla: doce, unissex
  ('UUID_DA_CARLA_AQUI', 'le-male'),
  ('UUID_DA_CARLA_AQUI', 'boss-bottled'),
  ('UUID_DA_CARLA_AQUI', 'aventus')

ON CONFLICT (user_id, perfume_id) DO NOTHING;