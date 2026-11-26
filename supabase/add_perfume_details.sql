-- =====================================================
-- ScentHub: Adicionar detalhes dos novos perfumes
-- Pirâmide olfativa, ano de lançamento, perfumista, descrição
-- =====================================================

-- =====================================================
-- 1. ATUALIZAR PERFUMES EXISTENTES COM DADOS COMPLETOS
-- =====================================================

-- Tom Ford
UPDATE public.perfumes SET
  release_year = 2007,
  perfumer = 'Tom Ford',
  description = 'Ícone da perfumaria moderna, Tobacco Vanille abre com notas de tabaco e especiarias, evoluindo para um coração de baunilha, cacau e frutas secas. Um perfume quente, luxuoso e inconfundível.'
WHERE id = 'tobacco-vanille';

UPDATE public.perfumes SET
  release_year = 2007,
  perfumer = 'Jacques Cavallier',
  description = 'Uma obra-prima minimalista. Oud Wood destaca a madeira de oud rara, suavizada por sândalo, vetiver e cardamomo. Elegante, misterioso e atemporal.'
WHERE id = 'oud-wood';

UPDATE public.perfumes SET
  release_year = 2018,
  perfumer = 'Jacques Cavallier',
  description = 'Uma interpretação moderna do couro. Ombre Leather abre com cardamomo e couro, revelando um coração de jasmim sambac e flores brancas, sobre base de âmbar e musgo.'
WHERE id = 'ombre-leather';

UPDATE public.perfumes SET
  release_year = 2015,
  perfumer = 'Olivier Gillotin',
  description = 'Uma versão mais intensa e noturna do Noir clássico. Abre com mandarina e açafrão, coração de kulfi (doce indiano) e rosa, fundo de baunilha e madeiras.'
WHERE id = 'noir-extreme';

UPDATE public.perfumes SET
  release_year = 2006,
  perfumer = 'David Apel, Pierre Negrin',
  description = 'Um clássico moderno. Black Orchid abre com trufa negra e ylang-ylang, coração de orquídea negra e especiarias, fundo de patchouli, incenso e baunilha. Misterioso e sedutor.'
WHERE id = 'black-orchid';

-- Yves Saint Laurent
UPDATE public.perfumes SET
  release_year = 2017,
  perfumer = 'Dominique Ropion',
  description = 'A versão intensa do Y moderno. Abre com maçã, gengibre e bergamota, coração de sálvia e gerânio, fundo de âmbar, madeira de âmbar e musgo. Jovem e vibrante.'
WHERE id = 'ysl-y';

UPDATE public.perfumes SET
  release_year = 2009,
  perfumer = 'Anne Flipo, Pierre Wargnye, Dominique Ropion',
  description = 'Um clássico sedutor. La Nuit de L'Homme abre com cardamomo, bergamota e lavanda, coração de cominho e cedro, fundo de vetiver e cumarina. Elegante e sedutor.'
WHERE id = 'la-nuit-de-lhomme';

UPDATE public.perfumes SET
  release_year = 2006,
  perfumer = 'Dominique Ropion, Pierre Wargnye',
  description = 'O clássico masculino da YSL. L'Homme abre com gengibre, bergamota e limão, coração de pimenta branca, manjericão e violeta, fundo de cedro, vetiver e fava tonka.'
WHERE id = 'l-homme';

UPDATE public.perfumes SET
  release_year = 2022,
  perfumer = 'Dominique Ropion, Quentin Bisch',
  description = 'Uma fragrância floral amadeirada. Myslf abre com bergamota e limão, coração de flor de laranjeira, fundo de âmbar, musgo e patchouli. Moderno e autêntico.'
WHERE id = 'myslf';

UPDATE public.perfumes SET
  release_year = 1981,
  perfumer = 'Pierre Bourdon',
  description = 'Um clássico atemporal. Kouros abre com coentro, artemísia e bergamota, coração de jasmim, canela e cravo, fundo de âmbar, musgo de carvalho, couro e civeta. Poderoso e viril.'
WHERE id = 'kouros';

-- Prada
UPDATE public.perfumes SET
  release_year = 2017,
  perfumer = 'Daniela Andrier',
  description = 'Moderno e elegante. Luna Rossa Carbon abre com bergamota e pimenta, coração de lavanda, água e notas metálicas, fundo de âmbar e patchouli. Esportivo e refinado.'
WHERE id = 'luna-rossa-carbon';

UPDATE public.perfumes SET
  release_year = 2019,
  perfumer = 'Daniela Andrier',
  description = 'Inspirado no oceano. Luna Rossa Ocean abre com bergamota, pimenta rosa e notas aquáticas, coração de íris, sálvia e incenso, fundo de vetiver, patchouli e almíscar.'
WHERE id = 'luna-rossa-ocean';

UPDATE public.perfumes SET
  release_year = 2015,
  perfumer = 'Daniela Andrier',
  description = 'Versão esportiva. Luna Rossa Sport abre com gengibre e zimbro, coração de lavanda e fava tonka, fundo de baunilha e madeiras. Energético e fresco.'
WHERE id = 'luna-rossa-sport';

UPDATE public.perfumes SET
  release_year = 2016,
  perfumer = 'Daniela Andrier',
  description = 'A assinatura masculina da Prada. L'Homme abre com neroli, pimenta preta e cardamomo, coração de íris e gerânio, fundo de âmbar, cedro e patchouli. Clássico contemporâneo.'
WHERE id = 'prada-lhomme';

UPDATE public.perfumes SET
  release_year = 2020,
  perfumer = 'Daniela Andrier',
  description = 'Uma nova visão masculina. Paradigme abre com bergamota e pimenta rosa, coração de sálvia e gerânio, fundo de vetiver, patchouli e âmbar. Paradigma da masculinidade moderna.'
WHERE id = 'paradigme';

-- Givenchy
UPDATE public.perfumes SET
  release_year = 2017,
  perfumer = 'Nathalie Lorson, Olivier Cresp',
  description = 'Elegante e moderno. Gentleman abre com pêra, cardamomo e abacaxi, coração de íris, jasmim e gerânio, fundo de couro, patchouli e baunilha. Sofisticado.'
WHERE id = 'gentleman-givenchy';

UPDATE public.perfumes SET
  release_year = 2022,
  perfumer = 'Nathalie Lorson',
  description = 'A versão mais luxuosa. Gentleman Réserve Privée abre com whisky, bergamota e castanha, coração de íris e castanha, fundo de baunilha, castanheiro e madeiras. Luxuoso.'
WHERE id = 'gentleman-reserve-privee';

UPDATE public.perfumes SET
  release_year = 2021,
  perfumer = 'Nathalie Lorson',
  description = 'Versão mais vibrante. Gentleman Society abre com sálvia, cardamomo e bergamota, coração de narciso e flor de laranjeira, fundo de vetiver, cedro e fava tonka. Contemporâneo.'
WHERE id = 'gentleman-society';

UPDATE public.perfumes SET
  release_year = 1998,
  perfumer = 'Alberto Morillas',
  description = 'Um clássico dos anos 90. Pi abre com mandarina, alecrim e manjericão, coração de neroli, jasmim e guaiaco, fundo de baunilha, fava tonka, benjoim e madeira de ferro. Icônico.'
WHERE id = 'pi';

UPDATE public.perfumes SET
  release_year = 2020,
  perfumer = 'Nathalie Lorson',
  description = 'Versão amadeirada. Gentleman Boisée abre com pimenta preta, noz-moscada e bergamota, coração de íris e cedro, fundo de sândalo, patchouli e âmbar. Amadeirado elegante.'
WHERE id = 'gentleman-boisee';

-- Valentino
UPDATE public.perfumes SET
  release_year = 2019,
  perfumer = 'Antoine Maisondieu, Olivier Cresp',
  description = 'Moderno e cool. Born in Roma Uomo abre com sal, gengibre e zimbro, coração de sálvia e lavanda, fundo de couro, vetiver e fava tonka. Rebelde e romano.'
WHERE id = 'born-in-roma-uomo';

UPDATE public.perfumes SET
  release_year = 2021,
  perfumer = 'Antoine Maisondieu, Olivier Cresp',
  description = 'Versão intensa. Born in Roma Intense abre com baunilha, gengibre e sal, coração de sálvia e lavanda, fundo de couro, benjoim e fava tonka. Mais profundo.'
WHERE id = 'born-in-roma-intense';

UPDATE public.perfumes SET
  release_year = 2014,
  perfumer = 'Olivier Cresp, Antoine Maisondieu',
  description = 'Clássico moderno. Valentino Uomo abre com bergamota e mirra, coração de café, couro e avelã, fundo de couro, cedro e baunilha. Elegante.'
WHERE id = 'valentino-uomo';

UPDATE public.perfumes SET
  release_year = 2022,
  perfumer = 'Antoine Maisondieu, Olivier Cresp',
  description = 'Versão noir. Valentino Uomo Noir Absolu abre com couro, baunilha e especiarias, coração de couro e íris, fundo de âmbar, madeiras e patchouli. Intenso.'
WHERE id = 'valentino-uomo-noir';

-- Gucci
UPDATE public.perfumes SET
  release_year = 2015,
  perfumer = 'Alberto Morillas',
  description = 'Sedutor e moderno. Guilty Pour Homme abre com lavanda e limão, coração de flor de laranjeira e neroli, fundo de patchouli, cedro e baunilha. Jovem e sedutor.'
WHERE id = 'gucci-guilty';

UPDATE public.perfumes SET
  release_year = 2023,
  perfumer = 'Alberto Morillas',
  description = 'Versão elixir. Guilty Elixir abre com cardamomo e noz-moscada, coração de lavanda e couro, fundo de patchouli, âmbar e baunilha. Intenso e luxuoso.'
WHERE id = 'gucci-guilty-elixir';

UPDATE public.perfumes SET
  release_year = 2016,
  perfumer = 'Alberto Morillas',
  description = 'Versão oud. Intense Oud abre com incenso e couro, coração de rosa e oud, fundo de âmbar, madeira de agar e patchouli. Oriental luxuoso.'
WHERE id = 'gucci-intense-oud';

UPDATE public.perfumes SET
  release_year = 2017,
  perfumer = 'Alberto Morillas',
  description = 'Versão dark. Guilty Black abre com lavanda e pimenta rosa, coração de flor de laranjeira e neroli, fundo de patchouli, cedro e musgo. Noturno.'
WHERE id = 'gucci-guilty-black';

UPDATE public.perfumes SET
  release_year = 2017,
  perfumer = 'Alberto Morillas',
  description = 'Clássico moderno. Gucci by Gucci abre com bergamota, cipreste e lavanda, coração de jasmim e tabaco, fundo de patchouli, âmbar e elemi. Elegante.'
WHERE id = 'gucci-by-gucci';

-- Versace
UPDATE public.perfumes SET
  release_year = 2018,
  perfumer = 'Alberto Morillas',
  description = 'Moderno e carismático. Dylan Blue abre com bergamota, figo e folhas de violeta, coração de pimenta preta, papiro e patchouli, fundo de incenso, fava tonka e almíscar. Carismático.'
WHERE id = 'dylan-blue';

UPDATE public.perfumes SET
  release_year = 2008,
  perfumer = 'Alberto Morillas',
  description = 'Clássico mediterrâneo. Pour Homme abre com limão, bergamota e neroli, coração de jacinto, sálvia e gerânio, fundo de âmbar, musgo e cedro. Clássico mediterrâneo.'
WHERE id = 'pour-homme-versace';

UPDATE public.perfumes SET
  release_year = 2013,
  perfumer = 'Alberto Morillas',
  description = 'Misterioso e oriental. Oud Noir abre com pimenta preta, cardamomo e couro, coração de oud, rosa e patchouli, fundo de âmbar, baunilha e musgo. Noturno.'
WHERE id = 'oud-noir';

UPDATE public.perfumes SET
  release_year = 1996,
  perfumer = 'Jean-Pierre Bethouart',
  description = 'Romântico e sonhador. The Dreamer abre com junípero, artemísia e mandarina, coração de íris, linho e gerânio, fundo de tabaco, fava tonka e cedro. Poético.'
WHERE id = 'dreamer';

UPDATE public.perfumes SET
  release_year = 2006,
  perfumer = 'Alberto Morillas',
  description = 'Frescor mediterrâneo. Man Eau Fraîche abre com limão, bergamota e carambola, coração de sálvia, cedro e tarrago, fundo de almíscar, sândalo e almíscar branco. Refrescante.'
WHERE id = 'eau-fraiche';

-- Viktor & Rolf
UPDATE public.perfumes SET
  release_year = 2012,
  perfumer = 'Olivier Polge',
  description = 'Explosivo e viciante. Spicebomb abre com bergamota, pimenta rosa e elemi, coração de canela, pimenta e papiro, fundo de tabaco, couro e baunilha. Explosivo.'
WHERE id = 'spicebomb';

UPDATE public.perfumes SET
  release_year = 2015,
  perfumer = 'Olivier Polge',
  description = 'Mais intenso. Spicebomb Extreme abre com pimenta preta e grapefruit, coração de canela, lavanda e cominho, fundo de tabaco, baunilha e âmbar negro. Intenso.'
WHERE id = 'spicebomb-extreme';

UPDATE public.perfumes SET
  release_year = 2019,
  perfumer = 'Olivier Polge',
  description = 'Versão noturna. Night Vision abre com cardamomo e gengibre, coração de gerânio e sálvia, fundo de couro, vetiver e patchouli. Noturno e misterioso.'
WHERE id = 'nightvision';

-- Creed
UPDATE public.perfumes SET
  release_year = 1985,
  perfumer = 'Olivier Creed, Pierre Bourdon',
  description = 'Clássico atemporal. Green Irish Tweed abre com limão, verbena e íris, coração de violeta e folhas de violeta, fundo de âmbar, sândalo e musgo. Clássico aristocrático.'
WHERE id = 'green-irish-tweed';

UPDATE public.perfumes SET
  release_year = 1995,
  perfumer = 'Olivier Creed',
  description = 'Fresco e metálico. Silver Mountain Water abre com bergamota, mandarina e chá verde, coração de petitgrain e groselha negra, fundo de almíscar, sândalo e chá. Refrescante e elegante.'
WHERE id = 'silver-mountain-water';

-- Parfums de Marly
UPDATE public.perfumes SET
  release_year = 2020,
  perfumer = 'Julien Sprecher',
  description = 'Fresco e verde. Greenley abre com maçã verde, bergamota e mandarina, coração de petitgrain, cedro e violeta, fundo de âmbar, musgo e almíscar. Fresco e elegante.'
WHERE id = 'greenley';

UPDATE public.perfumes SET
  release_year = 2016,
  perfumer = 'Hamid Merati-Kashani',
  description = 'Luxuoso e gourmand. Layton abre com bergamota, lavanda e maçã, coração de gerânio, violeta e jasmim, fundo de baunilha, cardamomo, guaiaco e patchouli. Luxuoso.'
WHERE id = 'layton';

UPDATE public.perfumes SET
  release_year = 2011,
  perfumer = 'Hamid Merati-Kashani',
  description = 'Frutado e amadeirado. Pegasus abre com bergamota, cominho e cardamomo, coração de amêndoa, jasmim e heliotrópio, fundo de baunilha, âmbar e sândalo. Elegante.'
WHERE id = 'pegasus';

UPDATE public.perfumes SET
  release_year = 2012,
  perfumer = 'Hamid Merati-Kashani',
  description = 'Tabaco e baunilha. Herod abre com canela e pimenta, coração de tabaco, incenso e osmanthus, fundo de baunilha, cedro e patchouli. Tabaco luxuoso.'
WHERE id = 'herod';

UPDATE public.perfumes SET
  release_year = 2018,
  perfumer = 'Julien Sprecher',
  description = 'Cítrico e aromático. Percival abre com bergamota, lavanda e tangerina, coração de gerânio, hedione e notas aromáticas, fundo de almíscar, âmbar e madeiras. Fresco e refinado.'
WHERE id = 'percival';

-- Hermès
UPDATE public.perfumes SET
  release_year = 2021,
  perfumer = 'Christine Nagel',
  description = 'Minimalista e moderno. H24 abre com clary sálvia e narciso, coração de madeira de rosa e notas metálicas, fundo de vetiver, musgo e sândalo. Contemporâneo.'
WHERE id = 'h24';

UPDATE public.perfumes SET
  release_year = 2010,
  perfumer = 'Jean-Claude Ellena',
  description = 'Viagem olfativa. Voyage d'Hermès abre com limão, cardamomo e especiarias, coração de flor de gengibre e hedione, fundo de madeiras, almíscar e musgo. Viagem.'
WHERE id = 'voyage-dhermes';

UPDATE public.perfumes SET
  release_year = 2005,
  perfumer = 'Jean-Claude Ellena',
  description = 'Jardim verde. Un Jardin sur le Nil abre com manga verde, tomate e cenoura, coração de lótus, jacinto e íris, fundo de incenso, musgo e madeira de sicômoro. Verde.'
WHERE id = 'un-jardin-sur-le-nil';

-- Acqua di Parma
UPDATE public.perfumes SET
  release_year = 1916,
  perfumer = 'Carlo Monza',
  description = 'Clássico italiano. Colonia abre com limão, bergamota e laranja, coração de lavanda, rosa e verbena, fundo de vetiver, sândalo e âmbar. Clássico atemporal.'
WHERE id = 'colonia';

-- Tom Ford (adicionais)
UPDATE public.perfumes SET
  release_year = 2021,
  perfumer = 'Jacques Cavallier',
  description = 'Versão intensa. Oud Wood Intense abre com cardamomo e pimenta, coração de oud, sândalo e vetiver, fundo de âmbar, baunilha e couro. Mais profundo.'
WHERE id = 'oud-wood-intense';

-- Dior
UPDATE public.perfumes SET
  release_year = 2024,
  perfumer = 'Francis Kurkdjian',
  description = 'Versão parfum. Fahrenheit Le Parfum abre com mandarina e bergamota, coração de couro e violeta, fundo de benjoim, âmbar e baunilha. Mais rico e profundo.'
WHERE id = 'fahrenheit-le-parfum';

-- =====================================================
-- VERIFICAR
-- =====================================================
SELECT id, name, brand_id, release_year, perfumer, description
FROM public.perfumes
WHERE id IN (
  'tobacco-vanille','oud-wood','ombre-leather','noir-extreme','black-orchid',
  'ysl-y','la-nuit-de-lhomme','l-homme','myslf','kouros',
  'luna-rossa-carbon','luna-rossa-ocean','luna-rossa-sport','prada-lhomme','paradigme',
  'gentleman-givenchy','gentleman-reserve-privee','gentleman-society','pi','gentleman-boisee',
  'born-in-roma-uomo','born-in-roma-intense','valentino-uomo','valentino-uomo-noir',
  'gucci-guilty','gucci-guilty-elixir','gucci-intense-oud','gucci-guilty-black','gucci-by-gucci',
  'dylan-blue','pour-homme-versace','oud-noir','dreamer','eau-fraiche',
  'spicebomb','spicebomb-extreme','nightvision',
  'green-irish-tweed','silver-mountain-water',
  'greenley','layton','pegasus','herod','percival',
  'h24','voyage-dhermes','un-jardin-sur-le-nil',
  'colonia',
  'oud-wood-intense',
  'fahrenheit-le-parfum'
)
ORDER BY name;