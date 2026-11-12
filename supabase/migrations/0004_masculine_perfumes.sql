-- =====================================================
-- ScentHub: 20 perfumes masculinos
-- As notas são um rascunho: confirmar na informação oficial
-- das marcas. Linhas marcadas com "confirmar" têm menos certeza.
-- =====================================================

-- 1. Marcas ---------------------------------------------
insert into public.brands (id, name, country) values
  ('dior', 'Dior', 'França'),
  ('guerlain', 'Guerlain', 'França'),
  ('davidoff', 'Davidoff', 'Suíça'),
  ('jean-paul-gaultier', 'Jean Paul Gaultier', 'França'),
  ('giorgio-armani', 'Giorgio Armani', 'Itália'),
  ('mugler', 'Mugler', 'França'),
  ('hugo-boss', 'Hugo Boss', 'Alemanha'),
  ('chanel', 'Chanel', 'França'),
  ('hermes', 'Hermès', 'França'),
  ('paco-rabanne', 'Paco Rabanne', 'França'),
  ('dolce-gabbana', 'Dolce & Gabbana', 'Itália'),
  ('creed', 'Creed', 'Reino Unido'),
  ('versace', 'Versace', 'Itália')
on conflict (id) do nothing;

-- 2. Perfumes -------------------------------------------
insert into public.perfumes
  (id, name, brand_id, release_year, perfumer, description) values
  ('eau-sauvage', 'Eau Sauvage', 'dior', 1966, 'Edmond Roudnitska',
   'Um clássico de 1966, fresco e cítrico, com um fundo de musgo.'),
  ('habit-rouge', 'Habit Rouge', 'guerlain', 1965, 'Jean-Paul Guerlain',
   'Oriental inspirado na equitação, com laranja e especiarias a abrir e couro e baunilha no fundo.'),
  ('fahrenheit', 'Fahrenheit', 'dior', 1988, 'Jean-Louis Sieuzac',
   'Um perfume pouco convencional, que junta flores e couro numa assinatura quente e marcante.'),
  ('cool-water', 'Cool Water', 'davidoff', 1988, 'Pierre Bourdon',
   'Fresco, aromático e marinho, fez escola entre os perfumes aquáticos.'),
  ('le-male', 'Le Male', 'jean-paul-gaultier', 1995, 'Francis Kurkdjian',
   'Lavanda e menta a abrir, baunilha e fava-tonka a fechar: um aromático doce que marcou o género.'),
  ('acqua-di-gio', 'Acqua di Giò Pour Homme', 'giorgio-armani', 1996, 'Alberto Morillas',
   'Fresco e marinho, com cítricos a abrir e madeiras e almíscar no fundo. Um clássico de verão.'),
  ('a-men', 'A*Men', 'mugler', 1996, 'Jacques Huclier',
   'Gourmand e invulgar, mistura lavanda, menta e especiarias com baunilha e caramelo.'),
  ('boss-bottled', 'Boss Bottled', 'hugo-boss', 1998, 'Annick Menardo',
   'Maçã e especiarias no início, madeiras no fundo. Pensado para o dia a dia.'),
  ('allure-homme-sport', 'Allure Homme Sport', 'chanel', 2004, 'Jacques Polge',
   'Fresco, cítrico e marinho, uma versão desportiva do universo Allure.'),
  ('armani-code', 'Armani Code Pour Homme', 'giorgio-armani', 2004, null,
   'Especiado e elegante, com anis-estrelado a abrir e couro e tabaco no fundo.'),
  ('dior-homme', 'Dior Homme', 'dior', 2005, 'Olivier Polge',
   'Íris e couro numa interpretação elegante e pouco óbvia do perfume masculino.'),
  ('terre-d-hermes', 'Terre d''Hermès', 'hermes', 2006, 'Jean-Claude Ellena',
   'Mineral e amadeirado, com laranja e pimenta a abrir e vetiver e cedro no fundo.'),
  ('1-million', '1 Million', 'paco-rabanne', 2008, 'Christophe Raynaud, Michel Girard e Olivier Pescheux',
   'Doce e especiado, com toranja, canela e couro, pensado para dar nas vistas.'),
  ('the-one-for-men', 'The One for Men', 'dolce-gabbana', 2008, 'Christophe Raynaud',
   'Oriental especiado com tabaco e âmbar, de caráter elegante e quente.'),
  ('bleu-de-chanel', 'Bleu de Chanel', 'chanel', 2010, 'Jacques Polge',
   'Aromático e amadeirado, com cítricos frescos e um fundo de incenso e cedro. Versátil.'),
  ('aventus', 'Aventus', 'creed', 2010, 'Olivier Creed',
   'Frutado e fumado, com abacaxi e bétula. Um dos perfumes de nicho mais falados da última década.'),
  ('eros', 'Eros', 'versace', 2012, 'Aurélien Guichard',
   'Fresco e doce, com menta e maçã verde a abrir e baunilha a fechar. Intenso e marcante.'),
  ('invictus', 'Invictus', 'paco-rabanne', 2013, null,
   'Marinho e amadeirado, com toranja e notas aquáticas a abrir e um fundo de madeiras e âmbar-cinzento.'),
  ('sauvage', 'Sauvage', 'dior', 2015, 'François Demachy',
   'Fresco e picante, com bergamota e pimenta a abrir e um fundo de ambroxan.'),
  ('ultra-male', 'Ultra Male', 'jean-paul-gaultier', 2015, null,
   'Doce e gourmand, com pera e lavanda a abrir e baunilha a fechar.')
on conflict (id) do nothing;

-- 3. Notas novas (as categorias têm de ser exatamente estas 10) --
insert into public.notes (id, name, category) values
  ('toranja', 'Toranja', 'Cítrico'),
  ('laranja', 'Laranja', 'Cítrico'),
  ('tangerina', 'Tangerina', 'Cítrico'),
  ('menta', 'Menta', 'Aromático'),
  ('alecrim', 'Alecrim', 'Aromático'),
  ('coentro', 'Coentro', 'Especiado'),
  ('canela', 'Canela', 'Especiado'),
  ('noz-moscada', 'Noz-moscada', 'Especiado'),
  ('gengibre', 'Gengibre', 'Especiado'),
  ('anis-estrelado', 'Anis-estrelado', 'Especiado'),
  ('maca-verde', 'Maçã verde', 'Verde'),
  ('abacaxi', 'Abacaxi', 'Doce'),
  ('groselha-negra', 'Groselha-negra', 'Doce'),
  ('pera', 'Pera', 'Doce'),
  ('flor-de-laranjeira', 'Flor de laranjeira', 'Floral'),
  ('iris', 'Íris', 'Floral'),
  ('violeta', 'Violeta', 'Floral'),
  ('patchouli', 'Patchouli', 'Amadeirado'),
  ('fava-tonka', 'Fava-tonka', 'Doce'),
  ('almiscar', 'Almíscar', 'Âmbar'),
  ('ambar-cinzento', 'Âmbar-cinzento', 'Âmbar'),
  ('benjoim', 'Benjoim', 'Âmbar'),
  ('tabaco', 'Tabaco', 'Fumado'),
  ('cacau', 'Cacau', 'Doce'),
  ('notas-marinhas', 'Notas marinhas', 'Aquático'),
  ('betula', 'Bétula', 'Fumado'),
  ('guaiaco', 'Guaiaco', 'Amadeirado')
on conflict (id) do nothing;

-- 4. Pirâmide de cada perfume ---------------------------
insert into public.perfume_notes (perfume_id, note_id, type) values
  -- Eau Sauvage (confirmar)
  ('eau-sauvage', 'limao', 'top'), ('eau-sauvage', 'bergamota', 'top'), ('eau-sauvage', 'alecrim', 'top'),
  ('eau-sauvage', 'jasmim', 'heart'),
  ('eau-sauvage', 'musgo', 'base'), ('eau-sauvage', 'vetiver', 'base'), ('eau-sauvage', 'almiscar', 'base'),
  -- Habit Rouge (confirmar)
  ('habit-rouge', 'laranja', 'top'), ('habit-rouge', 'bergamota', 'top'),
  ('habit-rouge', 'canela', 'heart'), ('habit-rouge', 'rosa', 'heart'),
  ('habit-rouge', 'couro', 'base'), ('habit-rouge', 'baunilha', 'base'), ('habit-rouge', 'sandalo', 'base'),
  -- Fahrenheit (confirmar)
  ('fahrenheit', 'tangerina', 'top'), ('fahrenheit', 'limao', 'top'), ('fahrenheit', 'bergamota', 'top'),
  ('fahrenheit', 'violeta', 'heart'), ('fahrenheit', 'noz-moscada', 'heart'), ('fahrenheit', 'jasmim', 'heart'),
  ('fahrenheit', 'couro', 'base'), ('fahrenheit', 'vetiver', 'base'), ('fahrenheit', 'almiscar', 'base'),
  -- Cool Water
  ('cool-water', 'lavanda', 'top'), ('cool-water', 'menta', 'top'), ('cool-water', 'coentro', 'top'), ('cool-water', 'notas-marinhas', 'top'),
  ('cool-water', 'geranio', 'heart'), ('cool-water', 'jasmim', 'heart'), ('cool-water', 'sandalo', 'heart'),
  ('cool-water', 'almiscar', 'base'), ('cool-water', 'ambar', 'base'), ('cool-water', 'cedro', 'base'), ('cool-water', 'musgo', 'base'),
  -- Le Male
  ('le-male', 'lavanda', 'top'), ('le-male', 'menta', 'top'), ('le-male', 'bergamota', 'top'), ('le-male', 'cardamomo', 'top'),
  ('le-male', 'flor-de-laranjeira', 'heart'), ('le-male', 'canela', 'heart'),
  ('le-male', 'baunilha', 'base'), ('le-male', 'fava-tonka', 'base'), ('le-male', 'ambar', 'base'), ('le-male', 'sandalo', 'base'), ('le-male', 'cedro', 'base'),
  -- Acqua di Giò Pour Homme
  ('acqua-di-gio', 'bergamota', 'top'), ('acqua-di-gio', 'limao', 'top'), ('acqua-di-gio', 'tangerina', 'top'),
  ('acqua-di-gio', 'notas-marinhas', 'heart'), ('acqua-di-gio', 'jasmim', 'heart'),
  ('acqua-di-gio', 'almiscar', 'base'), ('acqua-di-gio', 'cedro', 'base'), ('acqua-di-gio', 'patchouli', 'base'), ('acqua-di-gio', 'musgo', 'base'),
  -- A*Men (confirmar)
  ('a-men', 'lavanda', 'top'), ('a-men', 'bergamota', 'top'), ('a-men', 'menta', 'top'), ('a-men', 'coentro', 'top'),
  ('a-men', 'patchouli', 'heart'),
  ('a-men', 'baunilha', 'base'), ('a-men', 'caramelo', 'base'), ('a-men', 'fava-tonka', 'base'),
  -- Boss Bottled
  ('boss-bottled', 'maca-verde', 'top'), ('boss-bottled', 'limao', 'top'), ('boss-bottled', 'bergamota', 'top'),
  ('boss-bottled', 'geranio', 'heart'), ('boss-bottled', 'canela', 'heart'),
  ('boss-bottled', 'baunilha', 'base'), ('boss-bottled', 'sandalo', 'base'), ('boss-bottled', 'cedro', 'base'), ('boss-bottled', 'vetiver', 'base'),
  -- Allure Homme Sport (confirmar)
  ('allure-homme-sport', 'laranja', 'top'), ('allure-homme-sport', 'tangerina', 'top'), ('allure-homme-sport', 'notas-marinhas', 'top'),
  ('allure-homme-sport', 'pimenta', 'heart'), ('allure-homme-sport', 'cedro', 'heart'),
  ('allure-homme-sport', 'fava-tonka', 'base'), ('allure-homme-sport', 'baunilha', 'base'), ('allure-homme-sport', 'almiscar', 'base'), ('allure-homme-sport', 'vetiver', 'base'),
  -- Armani Code Pour Homme (confirmar)
  ('armani-code', 'limao', 'top'), ('armani-code', 'bergamota', 'top'),
  ('armani-code', 'anis-estrelado', 'heart'), ('armani-code', 'guaiaco', 'heart'),
  ('armani-code', 'couro', 'base'), ('armani-code', 'tabaco', 'base'), ('armani-code', 'fava-tonka', 'base'),
  -- Dior Homme
  ('dior-homme', 'lavanda', 'top'), ('dior-homme', 'bergamota', 'top'), ('dior-homme', 'salva', 'top'),
  ('dior-homme', 'iris', 'heart'), ('dior-homme', 'ambar', 'heart'), ('dior-homme', 'cacau', 'heart'),
  ('dior-homme', 'couro', 'base'), ('dior-homme', 'vetiver', 'base'), ('dior-homme', 'patchouli', 'base'),
  -- Terre d'Hermès
  ('terre-d-hermes', 'laranja', 'top'), ('terre-d-hermes', 'toranja', 'top'),
  ('terre-d-hermes', 'pimenta', 'heart'), ('terre-d-hermes', 'patchouli', 'heart'), ('terre-d-hermes', 'geranio', 'heart'),
  ('terre-d-hermes', 'vetiver', 'base'), ('terre-d-hermes', 'cedro', 'base'), ('terre-d-hermes', 'benjoim', 'base'),
  -- 1 Million
  ('1-million', 'toranja', 'top'), ('1-million', 'menta', 'top'), ('1-million', 'tangerina', 'top'),
  ('1-million', 'canela', 'heart'), ('1-million', 'rosa', 'heart'),
  ('1-million', 'ambar', 'base'), ('1-million', 'couro', 'base'), ('1-million', 'patchouli', 'base'),
  -- The One for Men
  ('the-one-for-men', 'toranja', 'top'), ('the-one-for-men', 'coentro', 'top'),
  ('the-one-for-men', 'gengibre', 'heart'), ('the-one-for-men', 'cardamomo', 'heart'), ('the-one-for-men', 'flor-de-laranjeira', 'heart'),
  ('the-one-for-men', 'ambar', 'base'), ('the-one-for-men', 'tabaco', 'base'), ('the-one-for-men', 'cedro', 'base'),
  -- Bleu de Chanel
  ('bleu-de-chanel', 'toranja', 'top'), ('bleu-de-chanel', 'limao', 'top'), ('bleu-de-chanel', 'menta', 'top'),
  ('bleu-de-chanel', 'gengibre', 'heart'), ('bleu-de-chanel', 'noz-moscada', 'heart'), ('bleu-de-chanel', 'jasmim', 'heart'),
  ('bleu-de-chanel', 'incenso', 'base'), ('bleu-de-chanel', 'vetiver', 'base'), ('bleu-de-chanel', 'cedro', 'base'), ('bleu-de-chanel', 'sandalo', 'base'), ('bleu-de-chanel', 'patchouli', 'base'),
  -- Aventus
  ('aventus', 'abacaxi', 'top'), ('aventus', 'bergamota', 'top'), ('aventus', 'groselha-negra', 'top'), ('aventus', 'maca-verde', 'top'),
  ('aventus', 'betula', 'heart'), ('aventus', 'patchouli', 'heart'), ('aventus', 'jasmim', 'heart'), ('aventus', 'rosa', 'heart'),
  ('aventus', 'almiscar', 'base'), ('aventus', 'musgo', 'base'), ('aventus', 'ambar-cinzento', 'base'), ('aventus', 'baunilha', 'base'),
  -- Eros
  ('eros', 'menta', 'top'), ('eros', 'maca-verde', 'top'), ('eros', 'limao', 'top'),
  ('eros', 'fava-tonka', 'heart'), ('eros', 'ambroxan', 'heart'), ('eros', 'geranio', 'heart'),
  ('eros', 'baunilha', 'base'), ('eros', 'cedro', 'base'), ('eros', 'musgo', 'base'), ('eros', 'vetiver', 'base'), ('eros', 'sandalo', 'base'),
  -- Invictus (confirmar)
  ('invictus', 'toranja', 'top'), ('invictus', 'notas-marinhas', 'top'), ('invictus', 'tangerina', 'top'),
  ('invictus', 'jasmim', 'heart'),
  ('invictus', 'guaiaco', 'base'), ('invictus', 'musgo', 'base'), ('invictus', 'ambar-cinzento', 'base'), ('invictus', 'patchouli', 'base'),
  -- Sauvage
  ('sauvage', 'bergamota', 'top'), ('sauvage', 'pimenta', 'top'),
  ('sauvage', 'lavanda', 'heart'), ('sauvage', 'geranio', 'heart'), ('sauvage', 'patchouli', 'heart'),
  ('sauvage', 'ambroxan', 'base'), ('sauvage', 'cedro', 'base'),
  -- Ultra Male (confirmar)
  ('ultra-male', 'pera', 'top'), ('ultra-male', 'bergamota', 'top'), ('ultra-male', 'menta', 'top'),
  ('ultra-male', 'lavanda', 'heart'), ('ultra-male', 'canela', 'heart'),
  ('ultra-male', 'baunilha', 'base'), ('ultra-male', 'ambar', 'base'), ('ultra-male', 'patchouli', 'base')
on conflict (perfume_id, note_id, type) do nothing;