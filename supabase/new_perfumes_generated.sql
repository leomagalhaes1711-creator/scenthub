-- =====================================================
-- ScentHub: Novos perfumes - 2026-11-25T22:38:22.585Z
-- Total: 50 novos perfumes
-- =====================================================

-- ===== MARCAS =====
INSERT INTO public.brands (id, name) VALUES ('tom-ford', 'Tom Ford')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.brands (id, name) VALUES ('ysl', 'Yves Saint Laurent')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.brands (id, name) VALUES ('prada', 'Prada')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.brands (id, name) VALUES ('givenchy', 'Givenchy')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.brands (id, name) VALUES ('valentino', 'Valentino')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.brands (id, name) VALUES ('gucci', 'Gucci')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.brands (id, name) VALUES ('versace', 'Versace')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.brands (id, name) VALUES ('viktor-rolf', 'Viktor & Rolf')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.brands (id, name) VALUES ('creed', 'Creed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.brands (id, name) VALUES ('parfums-de-marly', 'Parfums de Marly')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.brands (id, name) VALUES ('hermes', 'Hermès')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.brands (id, name) VALUES ('acqua-di-parma', 'Acqua di Parma')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.brands (id, name) VALUES ('dior', 'Dior')
ON CONFLICT (id) DO NOTHING;

-- ===== PERFUMES =====
INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('tobacco-vanille', 'Tobacco Vanille', 'tom-ford', 'Tobacco Vanille - Tom Ford')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('oud-wood', 'Oud Wood', 'tom-ford', 'Oud Wood - Tom Ford')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('ombre-leather', 'Ombre Leather', 'tom-ford', 'Ombre Leather - Tom Ford')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('noir-extreme', 'Noir Extreme', 'tom-ford', 'Noir Extreme - Tom Ford')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('black-orchid', 'Black Orchid', 'tom-ford', 'Black Orchid - Tom Ford')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('ysl-y', 'Y Eau de Parfum', 'ysl', 'Y Eau de Parfum - Yves Saint Laurent')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('la-nuit-de-lhomme', 'La Nuit de L''Homme', 'ysl', 'La Nuit de L'Homme - Yves Saint Laurent')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('l-homme', 'L''Homme', 'ysl', 'L'Homme - Yves Saint Laurent')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('myslf', 'MYSLF', 'ysl', 'MYSLF - Yves Saint Laurent')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('kouros', 'Kouros', 'ysl', 'Kouros - Yves Saint Laurent')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('luna-rossa-carbon', 'Luna Rossa Carbon', 'prada', 'Luna Rossa Carbon - Prada')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('luna-rossa-ocean', 'Luna Rossa Ocean', 'prada', 'Luna Rossa Ocean - Prada')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('luna-rossa-sport', 'Luna Rossa Sport', 'prada', 'Luna Rossa Sport - Prada')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('prada-lhomme', 'Prada L''Homme', 'prada', 'Prada L'Homme - Prada')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('paradigme', 'Paradigme', 'prada', 'Paradigme - Prada')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('gentleman-givenchy', 'Gentleman', 'givenchy', 'Gentleman - Givenchy')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('gentleman-reserve-privee', 'Gentleman Réserve Privée', 'givenchy', 'Gentleman Réserve Privée - Givenchy')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('gentleman-society', 'Gentleman Society', 'givenchy', 'Gentleman Society - Givenchy')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('pi', 'Pi', 'givenchy', 'Pi - Givenchy')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('gentleman-boisee', 'Gentleman Boisée', 'givenchy', 'Gentleman Boisée - Givenchy')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('born-in-roma-uomo', 'Born in Roma Uomo', 'valentino', 'Born in Roma Uomo - Valentino')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('born-in-roma-intense', 'Born in Roma Intense', 'valentino', 'Born in Roma Intense - Valentino')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('valentino-uomo', 'Valentino Uomo', 'valentino', 'Valentino Uomo - Valentino')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('valentino-uomo-noir', 'Valentino Uomo Noir Absolu', 'valentino', 'Valentino Uomo Noir Absolu - Valentino')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('gucci-guilty', 'Guilty Pour Homme', 'gucci', 'Guilty Pour Homme - Gucci')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('gucci-guilty-elixir', 'Guilty Elixir de Parfum', 'gucci', 'Guilty Elixir de Parfum - Gucci')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('gucci-intense-oud', 'Intense Oud', 'gucci', 'Intense Oud - Gucci')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('gucci-guilty-black', 'Guilty Black', 'gucci', 'Guilty Black - Gucci')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('gucci-by-gucci', 'Gucci by Gucci Pour Homme', 'gucci', 'Gucci by Gucci Pour Homme - Gucci')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('dylan-blue', 'Dylan Blue', 'versace', 'Dylan Blue - Versace')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('pour-homme-versace', 'Versace Pour Homme', 'versace', 'Versace Pour Homme - Versace')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('oud-noir', 'Oud Noir', 'versace', 'Oud Noir - Versace')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('dreamer', 'The Dreamer', 'versace', 'The Dreamer - Versace')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('eau-fraiche', 'Man Eau Fraîche', 'versace', 'Man Eau Fraîche - Versace')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('spicebomb', 'Spicebomb', 'viktor-rolf', 'Spicebomb - Viktor & Rolf')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('spicebomb-extreme', 'Spicebomb Extreme', 'viktor-rolf', 'Spicebomb Extreme - Viktor & Rolf')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('nightvision', 'Spicebomb Night Vision', 'viktor-rolf', 'Spicebomb Night Vision - Viktor & Rolf')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('green-irish-tweed', 'Green Irish Tweed', 'creed', 'Green Irish Tweed - Creed')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('silver-mountain-water', 'Silver Mountain Water', 'creed', 'Silver Mountain Water - Creed')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('greenley', 'Greenley', 'parfums-de-marly', 'Greenley - Parfums de Marly')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('layton', 'Layton', 'parfums-de-marly', 'Layton - Parfums de Marly')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('pegasus', 'Pegasus', 'parfums-de-marly', 'Pegasus - Parfums de Marly')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('herod', 'Herod', 'parfums-de-marly', 'Herod - Parfums de Marly')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('percival', 'Percival', 'parfums-de-marly', 'Percival - Parfums de Marly')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('h24', 'H24', 'hermes', 'H24 - Hermès')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('voyage-dhermes', 'Voyage d''Hermès', 'hermes', 'Voyage d'Hermès - Hermès')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('un-jardin-sur-le-nil', 'Un Jardin sur le Nil', 'hermes', 'Un Jardin sur le Nil - Hermès')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('colonia', 'Colonia', 'acqua-di-parma', 'Colonia - Acqua di Parma')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('oud-wood-intense', 'Oud Wood Intense', 'tom-ford', 'Oud Wood Intense - Tom Ford')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

INSERT INTO public.perfumes (id, name, brand_id, description) VALUES
('fahrenheit-le-parfum', 'Fahrenheit Le Parfum', 'dior', 'Fahrenheit Le Parfum - Dior')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;

-- ===== IMAGENS (rode após colocar arquivos em public/perfumes/) =====
UPDATE public.perfumes
SET image_url = '/perfumes/tobacco-vanille.png',
    image_bg = '#2d1a0a'
WHERE id = 'tobacco-vanille';

UPDATE public.perfumes
SET image_url = '/perfumes/oud-wood.png',
    image_bg = '#1a1a2e'
WHERE id = 'oud-wood';

UPDATE public.perfumes
SET image_url = '/perfumes/ombre-leather.png',
    image_bg = '#3d1a1a'
WHERE id = 'ombre-leather';

UPDATE public.perfumes
SET image_url = '/perfumes/noir-extreme.png',
    image_bg = '#1a1a2e'
WHERE id = 'noir-extreme';

UPDATE public.perfumes
SET image_url = '/perfumes/black-orchid.png',
    image_bg = '#1a0a1a'
WHERE id = 'black-orchid';

UPDATE public.perfumes
SET image_url = '/perfumes/ysl-y.png',
    image_bg = '#1a3a5c'
WHERE id = 'ysl-y';

UPDATE public.perfumes
SET image_url = '/perfumes/la-nuit-de-lhomme.png',
    image_bg = '#1a1a2e'
WHERE id = 'la-nuit-de-lhomme';

UPDATE public.perfumes
SET image_url = '/perfumes/l-homme.png',
    image_bg = '#1a3a5c'
WHERE id = 'l-homme';

UPDATE public.perfumes
SET image_url = '/perfumes/myslf.png',
    image_bg = '#1a3a5c'
WHERE id = 'myslf';

UPDATE public.perfumes
SET image_url = '/perfumes/kouros.png',
    image_bg = '#2d2f36'
WHERE id = 'kouros';

UPDATE public.perfumes
SET image_url = '/perfumes/luna-rossa-carbon.png',
    image_bg = '#1a1a2e'
WHERE id = 'luna-rossa-carbon';

UPDATE public.perfumes
SET image_url = '/perfumes/luna-rossa-ocean.png',
    image_bg = '#0d2a4a'
WHERE id = 'luna-rossa-ocean';

UPDATE public.perfumes
SET image_url = '/perfumes/luna-rossa-sport.png',
    image_bg = '#1a3a5c'
WHERE id = 'luna-rossa-sport';

UPDATE public.perfumes
SET image_url = '/perfumes/prada-lhomme.png',
    image_bg = '#1a1a2e'
WHERE id = 'prada-lhomme';

UPDATE public.perfumes
SET image_url = '/perfumes/paradigme.png',
    image_bg = '#1a1a2e'
WHERE id = 'paradigme';

UPDATE public.perfumes
SET image_url = '/perfumes/gentleman-givenchy.png',
    image_bg = '#1a1a2e'
WHERE id = 'gentleman-givenchy';

UPDATE public.perfumes
SET image_url = '/perfumes/gentleman-reserve-privee.png',
    image_bg = '#1a0a1a'
WHERE id = 'gentleman-reserve-privee';

UPDATE public.perfumes
SET image_url = '/perfumes/gentleman-society.png',
    image_bg = '#1a1a2e'
WHERE id = 'gentleman-society';

UPDATE public.perfumes
SET image_url = '/perfumes/pi.png',
    image_bg = '#c5a03a'
WHERE id = 'pi';

UPDATE public.perfumes
SET image_url = '/perfumes/gentleman-boisee.png',
    image_bg = '#2d1a0a'
WHERE id = 'gentleman-boisee';

UPDATE public.perfumes
SET image_url = '/perfumes/born-in-roma-uomo.png',
    image_bg = '#1a1a2e'
WHERE id = 'born-in-roma-uomo';

UPDATE public.perfumes
SET image_url = '/perfumes/born-in-roma-intense.png',
    image_bg = '#1a0a1a'
WHERE id = 'born-in-roma-intense';

UPDATE public.perfumes
SET image_url = '/perfumes/valentino-uomo.png',
    image_bg = '#1a1a2e'
WHERE id = 'valentino-uomo';

UPDATE public.perfumes
SET image_url = '/perfumes/valentino-uomo-noir.png',
    image_bg = '#0a0a0a'
WHERE id = 'valentino-uomo-noir';

UPDATE public.perfumes
SET image_url = '/perfumes/gucci-guilty.png',
    image_bg = '#1a1a2e'
WHERE id = 'gucci-guilty';

UPDATE public.perfumes
SET image_url = '/perfumes/gucci-guilty-elixir.png',
    image_bg = '#1a0a1a'
WHERE id = 'gucci-guilty-elixir';

UPDATE public.perfumes
SET image_url = '/perfumes/gucci-intense-oud.png',
    image_bg = '#1a0a1a'
WHERE id = 'gucci-intense-oud';

UPDATE public.perfumes
SET image_url = '/perfumes/gucci-guilty-black.png',
    image_bg = '#0a0a0a'
WHERE id = 'gucci-guilty-black';

UPDATE public.perfumes
SET image_url = '/perfumes/gucci-by-gucci.png',
    image_bg = '#1a1a2e'
WHERE id = 'gucci-by-gucci';

UPDATE public.perfumes
SET image_url = '/perfumes/dylan-blue.png',
    image_bg = '#0d2a4a'
WHERE id = 'dylan-blue';

UPDATE public.perfumes
SET image_url = '/perfumes/pour-homme-versace.png',
    image_bg = '#0d2a4a'
WHERE id = 'pour-homme-versace';

UPDATE public.perfumes
SET image_url = '/perfumes/oud-noir.png',
    image_bg = '#0a0a0a'
WHERE id = 'oud-noir';

UPDATE public.perfumes
SET image_url = '/perfumes/dreamer.png',
    image_bg = '#1a3a5c'
WHERE id = 'dreamer';

UPDATE public.perfumes
SET image_url = '/perfumes/eau-fraiche.png',
    image_bg = '#1a3a5c'
WHERE id = 'eau-fraiche';

UPDATE public.perfumes
SET image_url = '/perfumes/spicebomb.png',
    image_bg = '#3d1a1a'
WHERE id = 'spicebomb';

UPDATE public.perfumes
SET image_url = '/perfumes/spicebomb-extreme.png',
    image_bg = '#2d1a0a'
WHERE id = 'spicebomb-extreme';

UPDATE public.perfumes
SET image_url = '/perfumes/nightvision.png',
    image_bg = '#0a0a0a'
WHERE id = 'nightvision';

UPDATE public.perfumes
SET image_url = '/perfumes/green-irish-tweed.png',
    image_bg = '#2a3d2a'
WHERE id = 'green-irish-tweed';

UPDATE public.perfumes
SET image_url = '/perfumes/silver-mountain-water.png',
    image_bg = '#1a3a5c'
WHERE id = 'silver-mountain-water';

UPDATE public.perfumes
SET image_url = '/perfumes/greenley.png',
    image_bg = '#2a3d2a'
WHERE id = 'greenley';

UPDATE public.perfumes
SET image_url = '/perfumes/layton.png',
    image_bg = '#2d1a0a'
WHERE id = 'layton';

UPDATE public.perfumes
SET image_url = '/perfumes/pegasus.png',
    image_bg = '#c5a03a'
WHERE id = 'pegasus';

UPDATE public.perfumes
SET image_url = '/perfumes/herod.png',
    image_bg = '#3d1a1a'
WHERE id = 'herod';

UPDATE public.perfumes
SET image_url = '/perfumes/percival.png',
    image_bg = '#1e4a6e'
WHERE id = 'percival';

UPDATE public.perfumes
SET image_url = '/perfumes/h24.png',
    image_bg = '#1a3a5c'
WHERE id = 'h24';

UPDATE public.perfumes
SET image_url = '/perfumes/voyage-dhermes.png',
    image_bg = '#1a3a5c'
WHERE id = 'voyage-dhermes';

UPDATE public.perfumes
SET image_url = '/perfumes/un-jardin-sur-le-nil.png',
    image_bg = '#2a3d2a'
WHERE id = 'un-jardin-sur-le-nil';

UPDATE public.perfumes
SET image_url = '/perfumes/colonia.png',
    image_bg = '#f2c230'
WHERE id = 'colonia';

UPDATE public.perfumes
SET image_url = '/perfumes/oud-wood-intense.png',
    image_bg = '#1a1a2e'
WHERE id = 'oud-wood-intense';

UPDATE public.perfumes
SET image_url = '/perfumes/fahrenheit-le-parfum.png',
    image_bg = '#3d1a1a'
WHERE id = 'fahrenheit-le-parfum';


-- ===== PARA ADICIONAR EM scripts/generate-perfume-sql.js (PERFUME_COLORS) =====
'tobacco-vanille.png': { id: 'tobacco-vanille', bg: '#2d1a0a', name: 'Tobacco Vanille' },
'oud-wood.png': { id: 'oud-wood', bg: '#1a1a2e', name: 'Oud Wood' },
'ombre-leather.png': { id: 'ombre-leather', bg: '#3d1a1a', name: 'Ombre Leather' },
'noir-extreme.png': { id: 'noir-extreme', bg: '#1a1a2e', name: 'Noir Extreme' },
'black-orchid.png': { id: 'black-orchid', bg: '#1a0a1a', name: 'Black Orchid' },
'ysl-y.png': { id: 'ysl-y', bg: '#1a3a5c', name: 'Y Eau de Parfum' },
'la-nuit-de-lhomme.png': { id: 'la-nuit-de-lhomme', bg: '#1a1a2e', name: 'La Nuit de L\'Homme' },
'l-homme.png': { id: 'l-homme', bg: '#1a3a5c', name: 'L\'Homme' },
'myslf.png': { id: 'myslf', bg: '#1a3a5c', name: 'MYSLF' },
'kouros.png': { id: 'kouros', bg: '#2d2f36', name: 'Kouros' },
'luna-rossa-carbon.png': { id: 'luna-rossa-carbon', bg: '#1a1a2e', name: 'Luna Rossa Carbon' },
'luna-rossa-ocean.png': { id: 'luna-rossa-ocean', bg: '#0d2a4a', name: 'Luna Rossa Ocean' },
'luna-rossa-sport.png': { id: 'luna-rossa-sport', bg: '#1a3a5c', name: 'Luna Rossa Sport' },
'prada-lhomme.png': { id: 'prada-lhomme', bg: '#1a1a2e', name: 'Prada L\'Homme' },
'paradigme.png': { id: 'paradigme', bg: '#1a1a2e', name: 'Paradigme' },
'gentleman-givenchy.png': { id: 'gentleman-givenchy', bg: '#1a1a2e', name: 'Gentleman' },
'gentleman-reserve-privee.png': { id: 'gentleman-reserve-privee', bg: '#1a0a1a', name: 'Gentleman Réserve Privée' },
'gentleman-society.png': { id: 'gentleman-society', bg: '#1a1a2e', name: 'Gentleman Society' },
'pi.png': { id: 'pi', bg: '#c5a03a', name: 'Pi' },
'gentleman-boisee.png': { id: 'gentleman-boisee', bg: '#2d1a0a', name: 'Gentleman Boisée' },
'born-in-roma-uomo.png': { id: 'born-in-roma-uomo', bg: '#1a1a2e', name: 'Born in Roma Uomo' },
'born-in-roma-intense.png': { id: 'born-in-roma-intense', bg: '#1a0a1a', name: 'Born in Roma Intense' },
'valentino-uomo.png': { id: 'valentino-uomo', bg: '#1a1a2e', name: 'Valentino Uomo' },
'valentino-uomo-noir.png': { id: 'valentino-uomo-noir', bg: '#0a0a0a', name: 'Valentino Uomo Noir Absolu' },
'gucci-guilty.png': { id: 'gucci-guilty', bg: '#1a1a2e', name: 'Guilty Pour Homme' },
'gucci-guilty-elixir.png': { id: 'gucci-guilty-elixir', bg: '#1a0a1a', name: 'Guilty Elixir de Parfum' },
'gucci-intense-oud.png': { id: 'gucci-intense-oud', bg: '#1a0a1a', name: 'Intense Oud' },
'gucci-guilty-black.png': { id: 'gucci-guilty-black', bg: '#0a0a0a', name: 'Guilty Black' },
'gucci-by-gucci.png': { id: 'gucci-by-gucci', bg: '#1a1a2e', name: 'Gucci by Gucci Pour Homme' },
'dylan-blue.png': { id: 'dylan-blue', bg: '#0d2a4a', name: 'Dylan Blue' },
'pour-homme-versace.png': { id: 'pour-homme-versace', bg: '#0d2a4a', name: 'Versace Pour Homme' },
'oud-noir.png': { id: 'oud-noir', bg: '#0a0a0a', name: 'Oud Noir' },
'dreamer.png': { id: 'dreamer', bg: '#1a3a5c', name: 'The Dreamer' },
'eau-fraiche.png': { id: 'eau-fraiche', bg: '#1a3a5c', name: 'Man Eau Fraîche' },
'spicebomb.png': { id: 'spicebomb', bg: '#3d1a1a', name: 'Spicebomb' },
'spicebomb-extreme.png': { id: 'spicebomb-extreme', bg: '#2d1a0a', name: 'Spicebomb Extreme' },
'nightvision.png': { id: 'nightvision', bg: '#0a0a0a', name: 'Spicebomb Night Vision' },
'green-irish-tweed.png': { id: 'green-irish-tweed', bg: '#2a3d2a', name: 'Green Irish Tweed' },
'silver-mountain-water.png': { id: 'silver-mountain-water', bg: '#1a3a5c', name: 'Silver Mountain Water' },
'greenley.png': { id: 'greenley', bg: '#2a3d2a', name: 'Greenley' },
'layton.png': { id: 'layton', bg: '#2d1a0a', name: 'Layton' },
'pegasus.png': { id: 'pegasus', bg: '#c5a03a', name: 'Pegasus' },
'herod.png': { id: 'herod', bg: '#3d1a1a', name: 'Herod' },
'percival.png': { id: 'percival', bg: '#1e4a6e', name: 'Percival' },
'h24.png': { id: 'h24', bg: '#1a3a5c', name: 'H24' },
'voyage-dhermes.png': { id: 'voyage-dhermes', bg: '#1a3a5c', name: 'Voyage d\'Hermès' },
'un-jardin-sur-le-nil.png': { id: 'un-jardin-sur-le-nil', bg: '#2a3d2a', name: 'Un Jardin sur le Nil' },
'colonia.png': { id: 'colonia', bg: '#f2c230', name: 'Colonia' },
'oud-wood-intense.png': { id: 'oud-wood-intense', bg: '#1a1a2e', name: 'Oud Wood Intense' },
'fahrenheit-le-parfum.png': { id: 'fahrenheit-le-parfum', bg: '#3d1a1a', name: 'Fahrenheit Le Parfum' },

-- ===== VERIFICAR =====
SELECT id, name, brand_id, image_url, image_bg FROM public.perfumes WHERE id IN (
  'tobacco-vanille',
  'oud-wood',
  'ombre-leather',
  'noir-extreme',
  'black-orchid',
  'ysl-y',
  'la-nuit-de-lhomme',
  'l-homme',
  'myslf',
  'kouros',
  'luna-rossa-carbon',
  'luna-rossa-ocean',
  'luna-rossa-sport',
  'prada-lhomme',
  'paradigme',
  'gentleman-givenchy',
  'gentleman-reserve-privee',
  'gentleman-society',
  'pi',
  'gentleman-boisee',
  'born-in-roma-uomo',
  'born-in-roma-intense',
  'valentino-uomo',
  'valentino-uomo-noir',
  'gucci-guilty',
  'gucci-guilty-elixir',
  'gucci-intense-oud',
  'gucci-guilty-black',
  'gucci-by-gucci',
  'dylan-blue',
  'pour-homme-versace',
  'oud-noir',
  'dreamer',
  'eau-fraiche',
  'spicebomb',
  'spicebomb-extreme',
  'nightvision',
  'green-irish-tweed',
  'silver-mountain-water',
  'greenley',
  'layton',
  'pegasus',
  'herod',
  'percival',
  'h24',
  'voyage-dhermes',
  'un-jardin-sur-le-nil',
  'colonia',
  'oud-wood-intense',
  'fahrenheit-le-parfum'
) ORDER BY name;
