-- =====================================================
-- ScentHub: Atualização em lote - 2026-11-26T11:37:33.254Z
-- Gerado automaticamente a partir de public/perfumes/
-- =====================================================

ALTER TABLE public.perfumes
ADD COLUMN IF NOT EXISTS image_bg TEXT
CHECK (image_bg IS NULL OR image_bg ~ '^#[0-9a-fA-F]{6}$');

UPDATE public.perfumes
SET image_url = '/perfumes/1-million.png',
    image_bg = '#c5a03a'
WHERE id = '1-million';

UPDATE public.perfumes
SET image_url = '/perfumes/a-men.png',
    image_bg = '#0f0f12'
WHERE id = 'a-men';

UPDATE public.perfumes
SET image_url = '/perfumes/acqua-di-gio.png',
    image_bg = '#1e4a6e'
WHERE id = 'acqua-di-gio';

UPDATE public.perfumes
SET image_url = '/perfumes/Allure-homme.png',
    image_bg = '#e86c5a'
WHERE id = 'allure-homme-sport';

UPDATE public.perfumes
SET image_url = '/perfumes/Armani-code.png',
    image_bg = '#15151a'
WHERE id = 'armani-code';

UPDATE public.perfumes
SET image_url = '/perfumes/aventus.png',
    image_bg = '#1c1c1c'
WHERE id = 'aventus';

UPDATE public.perfumes
SET image_url = '/perfumes/black-orchid.jpeg',
    image_bg = '#1a0a1a'
WHERE id = 'black-orchid';

UPDATE public.perfumes
SET image_url = '/perfumes/bleu-de-chanel.png',
    image_bg = '#0f1b2e'
WHERE id = 'bleu-de-chanel';

UPDATE public.perfumes
SET image_url = '/perfumes/boss-bottled.png',
    image_bg = '#2d2f36'
WHERE id = 'boss-bottled';

UPDATE public.perfumes
SET image_url = '/perfumes/cool-water.png',
    image_bg = '#1e4d6b'
WHERE id = 'cool-water';

UPDATE public.perfumes
SET image_url = '/perfumes/dior-homme.png',
    image_bg = '#25252a'
WHERE id = 'dior-homme';

UPDATE public.perfumes
SET image_url = '/perfumes/eau-sauvage.png',
    image_bg = '#2a3d2a'
WHERE id = 'eau-sauvage';

UPDATE public.perfumes
SET image_url = '/perfumes/fahrenheit.png',
    image_bg = '#3d1a1a'
WHERE id = 'fahrenheit';

UPDATE public.perfumes
SET image_url = '/perfumes/gentleman-boisee.jpeg',
    image_bg = '#2d1a0a'
WHERE id = 'gentleman-boisee';

UPDATE public.perfumes
SET image_url = '/perfumes/gentleman-givenchi.jpeg',
    image_bg = '#1a1a2e'
WHERE id = 'gentleman-givenchy';

UPDATE public.perfumes
SET image_url = '/perfumes/gentleman-reserve-privee.jpeg',
    image_bg = '#1a0a1a'
WHERE id = 'gentleman-reserve-privee';

UPDATE public.perfumes
SET image_url = '/perfumes/gentleman-society.jpeg',
    image_bg = '#1a1a2e'
WHERE id = 'gentleman-society';

UPDATE public.perfumes
SET image_url = '/perfumes/habit-rouge.png',
    image_bg = '#3d2a0a'
WHERE id = 'habit-rouge';

UPDATE public.perfumes
SET image_url = '/perfumes/invictus.png',
    image_bg = '#1a3a5c'
WHERE id = 'invictus';

UPDATE public.perfumes
SET image_url = '/perfumes/kouros.jpeg',
    image_bg = '#2d2f36'
WHERE id = 'kouros';

UPDATE public.perfumes
SET image_url = '/perfumes/l-homme.jpeg',
    image_bg = '#1a3a5c'
WHERE id = 'l-homme';

UPDATE public.perfumes
SET image_url = '/perfumes/la-nuit-de-lhomme.jpeg',
    image_bg = '#1a1a2e'
WHERE id = 'la-nuit-de-lhomme';

UPDATE public.perfumes
SET image_url = '/perfumes/le-male.png',
    image_bg = '#0d1421'
WHERE id = 'le-male';

UPDATE public.perfumes
SET image_url = '/perfumes/luna-rossa-carbon.jpeg',
    image_bg = '#1a1a2e'
WHERE id = 'luna-rossa-carbon';

UPDATE public.perfumes
SET image_url = '/perfumes/luna-rossa-ocean.jpeg',
    image_bg = '#0d2a4a'
WHERE id = 'luna-rossa-ocean';

UPDATE public.perfumes
SET image_url = '/perfumes/luna-rossa-sport.jpeg',
    image_bg = '#1a3a5c'
WHERE id = 'luna-rossa-sport';

UPDATE public.perfumes
SET image_url = '/perfumes/myslf.jpeg',
    image_bg = '#1a3a5c'
WHERE id = 'myslf';

UPDATE public.perfumes
SET image_url = '/perfumes/noir-extreme.jpeg',
    image_bg = '#1a1a2e'
WHERE id = 'noir-extreme';

UPDATE public.perfumes
SET image_url = '/perfumes/ombre-leather.jpeg',
    image_bg = '#3d1a1a'
WHERE id = 'ombre-leather';

UPDATE public.perfumes
SET image_url = '/perfumes/oud-wood-intense.jpeg',
    image_bg = '#1a1a2e'
WHERE id = 'oud-wood-intense';

UPDATE public.perfumes
SET image_url = '/perfumes/oud-wood.jpeg',
    image_bg = '#1a1a2e'
WHERE id = 'oud-wood';

UPDATE public.perfumes
SET image_url = '/perfumes/paradigme.jpeg',
    image_bg = '#1a1a2e'
WHERE id = 'paradigme';

UPDATE public.perfumes
SET image_url = '/perfumes/pi.jpeg',
    image_bg = '#c5a03a'
WHERE id = 'pi';

UPDATE public.perfumes
SET image_url = '/perfumes/prada-lhomme.jpeg',
    image_bg = '#1a1a2e'
WHERE id = 'prada-lhomme';

UPDATE public.perfumes
SET image_url = '/perfumes/sauvage.png',
    image_bg = '#1a2332'
WHERE id = 'sauvage';

UPDATE public.perfumes
SET image_url = '/perfumes/terre-de-hermes.png',
    image_bg = '#3d2a1a'
WHERE id = 'terre-d-hermes';

UPDATE public.perfumes
SET image_url = '/perfumes/the-one.png',
    image_bg = '#2d1a0a'
WHERE id = 'the-one-for-men';

UPDATE public.perfumes
SET image_url = '/perfumes/tobacco-vanille.jpeg',
    image_bg = '#2d1a0a'
WHERE id = 'tobacco-vanille';

UPDATE public.perfumes
SET image_url = '/perfumes/ultra-male.png',
    image_bg = '#2a1a3a'
WHERE id = 'ultra-male';

UPDATE public.perfumes
SET image_url = '/perfumes/versace-eros.png',
    image_bg = '#0d2a4a'
WHERE id = 'eros';

UPDATE public.perfumes
SET image_url = '/perfumes/ysl-y.jpeg',
    image_bg = '#1a3a5c'
WHERE id = 'ysl-y';

-- =====================================================
-- Verificar resultado
-- =====================================================
SELECT id, name, image_url, image_bg 
FROM public.perfumes 
WHERE image_url IS NOT NULL 
ORDER BY name;
