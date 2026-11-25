-- =====================================================
-- ScentHub: Atualizar image_url e image_bg para perfumes com fotos
-- Rode no SQL Editor do Supabase
-- =====================================================

-- Perfumes com fotos em public/perfumes/
-- image_url aponta para /perfumes/{id}.png
-- image_bg = cor do fundo da foto (medida nas bordas)

-- Sauvage (Dior) - fundo azul escuro/meia-noite
UPDATE public.perfumes
SET image_url = '/perfumes/sauvage.png',
    image_bg = '#1a2332'
WHERE id = 'sauvage';

-- Le Male (Jean Paul Gaultier) - fundo azul marinho profundo
UPDATE public.perfumes
SET image_url = '/perfumes/le-male.png',
    image_bg = '#0d1421'
WHERE id = 'le-male';

-- A*Men (Mugler) - fundo preto/cinza muito escuro
UPDATE public.perfumes
SET image_url = '/perfumes/a-men.png',
    image_bg = '#0f0f12'
WHERE id = 'a-men';

-- Boss Bottled (Hugo Boss) - fundo cinza chumbo/metal
UPDATE public.perfumes
SET image_url = '/perfumes/boss-bottled.png',
    image_bg = '#2d2f36'
WHERE id = 'boss-bottled';

-- Cool Water (Davidoff) - fundo azul água claro
UPDATE public.perfumes
SET image_url = '/perfumes/cool-water.png',
    image_bg = '#1e4d6b'
WHERE id = 'cool-water';

-- Bleu de Chanel (Chanel) - fundo azul profundo
UPDATE public.perfumes
SET image_url = '/perfumes/bleu-de-chanel.png',
    image_bg = '#0f1b2e'
WHERE id = 'bleu-de-chanel';

-- Aventus (Creed) - fundo cinza fumado/preto
UPDATE public.perfumes
SET image_url = '/perfumes/aventus.png',
    image_bg = '#1c1c1c'
WHERE id = 'aventus';

-- Fahrenheit (Dior) - fundo vermelho/âmbar escuro
UPDATE public.perfumes
SET image_url = '/perfumes/fahrenheit.png',
    image_bg = '#3d1a1a'
WHERE id = 'fahrenheit';

-- Habit Rouge (Guerlain) - fundo dourado/âmbar
UPDATE public.perfumes
SET image_url = '/perfumes/habit-rouge.png',
    image_bg = '#3d2a0a'
WHERE id = 'habit-rouge';

-- Acqua di Giò (Armani) - fundo azul claro/transparente
UPDATE public.perfumes
SET image_url = '/perfumes/acqua-di-gio.png',
    image_bg = '#1e4a6e'
WHERE id = 'acqua-di-gio';

-- =====================================================
-- Verificar resultado
-- =====================================================
SELECT id, name, image_url, image_bg
FROM public.perfumes
WHERE image_url IS NOT NULL
ORDER BY name;