-- =====================================================
-- ScentHub: adicionar coluna image_bg para cor do fundo da imagem
-- =====================================================

ALTER TABLE public.perfumes
ADD COLUMN IF NOT EXISTS image_bg TEXT
CHECK (image_bg IS NULL OR image_bg ~ '^#[0-9a-fA-F]{6}$');

COMMENT ON COLUMN public.perfumes.image_bg IS 'Cor hex do fundo da foto do perfume (para gradiente perfeito no hero)';