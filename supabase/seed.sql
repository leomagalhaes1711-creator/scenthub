-- =====================================================
-- ScentHub: dados de exemplo (fictícios)
-- =====================================================

-- 1. Marcas ---------------------------------------------

insert into public.brands (id, name, country) values
  ('maison-aurelle', 'Maison Aurelle', 'França'),
  ('casa-mares', 'Casa Marés', 'Portugal'),
  ('flora-nova', 'Flora Nova', 'Itália'),
  ('atelier-noir', 'Atelier Noir', 'França')
on conflict (id) do nothing;

-- 2. Perfumes -------------------------------------------

insert into public.perfumes
  (id, name, brand_id, release_year, perfumer, description) values
  ('noite-de-ambar', 'Noite de Âmbar', 'maison-aurelle', 2019, 'Claire Dumont',
   'Um oriental quente e envolvente, pensado para as noites de inverno.'),
  ('brisa-atlantica', 'Brisa Atlântica', 'casa-mares', 2021, 'Tiago Ferraz',
   'Fresco e salgado, com a sensação de uma manhã junto ao mar.'),
  ('jardim-secreto', 'Jardim Secreto', 'flora-nova', 2018, null,
   'Floral delicado com um coração de rosa e peónia.'),
  ('madeira-negra', 'Madeira Negra', 'atelier-noir', 2022, 'Luca Bellini',
   'Amadeirado profundo e intenso, com fundo de cedro e vetiver.'),
  ('citrico-solar', 'Cítrico Solar', 'casa-mares', 2020, 'Tiago Ferraz',
   'Uma explosão de bergamota e limão para os dias quentes.'),
  ('veludo-doce', 'Veludo Doce', 'maison-aurelle', 2023, 'Claire Dumont',
   'Gourmand cremoso, com baunilha e um toque de caramelo.'),
  ('folha-de-chuva', 'Folha de Chuva', 'flora-nova', 2017, 'Inês Valadares',
   'Verde e húmido, lembra um jardim depois da chuva.'),
  ('couro-e-fumo', 'Couro e Fumo', 'atelier-noir', 2016, 'Luca Bellini',
   'Um perfume marcante, com couro, incenso e notas fumadas.')
on conflict (id) do nothing;

-- 3. Notas olfativas ------------------------------------

insert into public.notes (id, name, category) values
  ('bergamota', 'Bergamota', 'Cítrico'),
  ('limao', 'Limão', 'Cítrico'),
  ('pimenta', 'Pimenta', 'Especiado'),
  ('cardamomo', 'Cardamomo', 'Especiado'),
  ('lavanda', 'Lavanda', 'Aromático'),
  ('salva', 'Salva', 'Aromático'),
  ('rosa', 'Rosa', 'Floral'),
  ('peonia', 'Peónia', 'Floral'),
  ('jasmim', 'Jasmim', 'Floral'),
  ('geranio', 'Gerânio', 'Floral'),
  ('cedro', 'Cedro', 'Amadeirado'),
  ('vetiver', 'Vetiver', 'Amadeirado'),
  ('sandalo', 'Sândalo', 'Amadeirado'),
  ('baunilha', 'Baunilha', 'Doce'),
  ('caramelo', 'Caramelo', 'Doce'),
  ('ambar', 'Âmbar', 'Âmbar'),
  ('ambroxan', 'Ambroxan', 'Âmbar'),
  ('incenso', 'Incenso', 'Fumado'),
  ('couro', 'Couro', 'Fumado'),
  ('sal-marinho', 'Sal marinho', 'Aquático'),
  ('algas', 'Algas', 'Aquático'),
  ('folha-verde', 'Folha verde', 'Verde'),
  ('musgo', 'Musgo', 'Verde')
on conflict (id) do nothing;

-- 4. Pirâmide olfativa de cada perfume ------------------

insert into public.perfume_notes (perfume_id, note_id, type) values
  -- Noite de Âmbar
  ('noite-de-ambar', 'cardamomo', 'top'),
  ('noite-de-ambar', 'bergamota', 'top'),
  ('noite-de-ambar', 'rosa', 'heart'),
  ('noite-de-ambar', 'incenso', 'heart'),
  ('noite-de-ambar', 'ambar', 'base'),
  ('noite-de-ambar', 'baunilha', 'base'),
  ('noite-de-ambar', 'sandalo', 'base'),
  -- Brisa Atlântica
  ('brisa-atlantica', 'limao', 'top'),
  ('brisa-atlantica', 'sal-marinho', 'top'),
  ('brisa-atlantica', 'algas', 'heart'),
  ('brisa-atlantica', 'salva', 'heart'),
  ('brisa-atlantica', 'ambroxan', 'base'),
  ('brisa-atlantica', 'cedro', 'base'),
  -- Jardim Secreto
  ('jardim-secreto', 'bergamota', 'top'),
  ('jardim-secreto', 'rosa', 'heart'),
  ('jardim-secreto', 'peonia', 'heart'),
  ('jardim-secreto', 'jasmim', 'heart'),
  ('jardim-secreto', 'sandalo', 'base'),
  ('jardim-secreto', 'musgo', 'base'),
  -- Madeira Negra
  ('madeira-negra', 'pimenta', 'top'),
  ('madeira-negra', 'cardamomo', 'top'),
  ('madeira-negra', 'geranio', 'heart'),
  ('madeira-negra', 'lavanda', 'heart'),
  ('madeira-negra', 'cedro', 'base'),
  ('madeira-negra', 'vetiver', 'base'),
  ('madeira-negra', 'ambroxan', 'base'),
  -- Cítrico Solar
  ('citrico-solar', 'limao', 'top'),
  ('citrico-solar', 'bergamota', 'top'),
  ('citrico-solar', 'lavanda', 'heart'),
  ('citrico-solar', 'salva', 'heart'),
  ('citrico-solar', 'cedro', 'base'),
  ('citrico-solar', 'vetiver', 'base'),
  -- Veludo Doce
  ('veludo-doce', 'bergamota', 'top'),
  ('veludo-doce', 'jasmim', 'heart'),
  ('veludo-doce', 'caramelo', 'heart'),
  ('veludo-doce', 'baunilha', 'base'),
  ('veludo-doce', 'sandalo', 'base'),
  -- Folha de Chuva
  ('folha-de-chuva', 'folha-verde', 'top'),
  ('folha-de-chuva', 'bergamota', 'top'),
  ('folha-de-chuva', 'geranio', 'heart'),
  ('folha-de-chuva', 'peonia', 'heart'),
  ('folha-de-chuva', 'musgo', 'base'),
  ('folha-de-chuva', 'vetiver', 'base'),
  -- Couro e Fumo
  ('couro-e-fumo', 'pimenta', 'top'),
  ('couro-e-fumo', 'incenso', 'heart'),
  ('couro-e-fumo', 'lavanda', 'heart'),
  ('couro-e-fumo', 'couro', 'base'),
  ('couro-e-fumo', 'ambar', 'base'),
  ('couro-e-fumo', 'cedro', 'base')
on conflict (perfume_id, note_id, type) do nothing;