-- =====================================================
-- ScentHub: Fix duplicate perfumes and cleanup
-- Execute no Supabase SQL Editor
-- =====================================================

-- =====================================================
-- 1. REMOVER VERSACE EROS DUPLICADO (manter o que tem imagem)
-- =====================================================
-- Primeiro, ver quantos Eros existem
-- SELECT id, name, image_url, image_bg FROM public.perfumes WHERE name ILIKE '%eros%' OR id ILIKE '%eros%';

-- Deletar o Eros duplicado SEM imagem (manter o que tem image_url)
DELETE FROM public.perfumes
WHERE id IN (
    SELECT id FROM public.perfumes
    WHERE (name ILIKE '%eros%' OR id ILIKE '%eros%')
    AND image_url IS NULL
);

-- Se ainda houver duplicados, manter apenas o que tem image_url
DELETE FROM public.perfumes
WHERE id IN (
    SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY id ORDER BY image_url DESC NULLS LAST) as rn
        FROM public.perfumes
        WHERE id = 'eros' OR name ILIKE '%eros%'
    ) t WHERE rn > 1
);

-- =====================================================
-- 2. REMOVER PERFUMES DUPLICADOS EM GERAL (mesmo ID)
-- =====================================================
DELETE FROM public.perfumes
WHERE id IN (
    SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY id ORDER BY image_url DESC NULLS LAST) as rn
        FROM public.perfumes
    ) t WHERE rn > 1
);

-- =====================================================
-- 3. GARANTIR QUE ALLURE HOMME SPORT TENHA COR CORAL (não azul)
-- =====================================================
UPDATE public.perfumes
SET image_bg = '#e86c5a'
WHERE id = 'allure-homme-sport';

-- =====================================================
-- 4. REMOVER PERFUMES SEM IMAGEM QUE NÃO DEVEM APARECER
-- =====================================================
-- Opcional: remover perfumes fictícios sem imagem que não devem aparecer no hero
-- DELETE FROM public.perfumes WHERE image_url IS NULL AND id IN ('noite-de-ambar', 'brisa-atlantica', 'jardim-secreto', 'madeira-negra', 'citrico-solar', 'veludo-doce', 'folha-de-chuva', 'couro-e-fumo');

-- =====================================================
-- 5. VERIFICAR RESULTADO
-- =====================================================
SELECT id, name, image_url, image_bg
FROM public.perfumes
WHERE image_url IS NOT NULL
ORDER BY name;

-- Verificar duplicados restantes
SELECT id, name, COUNT(*) as count
FROM public.perfumes
GROUP BY id, name
HAVING COUNT(*) > 1;