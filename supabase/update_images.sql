-- =====================================================
-- ScentHub: Atualizar image_url e image_bg para TODOS os perfumes com fotos
-- Rode no SQL Editor do Supabase
-- =====================================================

-- Perfumes com fotos em public/perfumes/
-- image_url aponta para /perfumes/{id}.png (ou nome do arquivo exato)
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

-- ===== PERFUMES ADICIONAIS COM FOTOS =====

-- 1 Million (Paco Rabanne) - fundo dourado/metal
UPDATE public.perfumes
SET image_url = '/perfumes/1-million.png',
    image_bg = '#c5a03a'
WHERE id = '1-million';

-- Allure Homme Sport (Chanel) - fundo azul/prateado
-- Nota: arquivo é Allure-homme.png mas ID é allure-homme-sport
UPDATE public.perfumes
SET image_url = '/perfumes/Allure-homme.png',
    image_bg = '#1a3a5c'
WHERE id = 'allure-homme-sport';

-- Armani Code (Giorgio Armani) - fundo preto/cinza escuro
UPDATE public.perfumes
SET image_url = '/perfumes/Armani-code.png',
    image_bg = '#15151a'
WHERE id = 'armani-code';

-- ===== NOVOS PERFUMES ADICIONADOS =====

-- Eau Sauvage (Dior) - fundo verde/âmbar clássico
UPDATE public.perfumes
SET image_url = '/perfumes/eau-sauvage.png',
    image_bg = '#2a3d2a'
WHERE id = 'eau-sauvage';

-- Dior Homme (Dior) - fundo cinza grafite
UPDATE public.perfumes
SET image_url = '/perfumes/dior-homme.png',
    image_bg = '#25252a'
WHERE id = 'dior-homme';

-- Invictus (Paco Rabanne) - fundo azul metálico
UPDATE public.perfumes
SET image_url = '/perfumes/invictus.png',
    image_bg = '#1a3a5c'
WHERE id = 'invictus';

-- Terre d'Hermès (Hermès) - fundo laranja terroso/âmbar
UPDATE public.perfumes
SET image_url = '/perfumes/terre-de-hermes.png',
    image_bg = '#3d2a1a'
WHERE id = 'terre-d-hermes';

-- The One for Men (Dolce & Gabbana) - fundo âmbar/tabaco
-- Nota: arquivo é the-one.png mas ID é the-one-for-men
UPDATE public.perfumes
SET image_url = '/perfumes/the-one.png',
    image_bg = '#2d1a0a'
WHERE id = 'the-one-for-men';

-- Ultra Male (Jean Paul Gaultier) - fundo roxo/baunilha escuro
UPDATE public.perfumes
SET image_url = '/perfumes/ultra-male.png',
    image_bg = '#2a1a3a'
WHERE id = 'ultra-male';

-- Eros (Versace) - fundo azul/turquesa vibrante
-- Nota: arquivo é versace-eros.png mas ID é eros
UPDATE public.perfumes
SET image_url = '/perfumes/versace-eros.png',
    image_bg = '#0d2a4a'
WHERE id = 'eros';

-- =====================================================
-- Verificar resultado
-- =====================================================
SELECT id, name, image_url, image_bg
FROM public.perfumes
WHERE image_url IS NOT NULL
ORDER BY name;