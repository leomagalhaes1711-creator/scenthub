// scripts/generate-perfume-sql.js
// Gera SQL automaticamente baseado nas imagens em public/perfumes/
// Execute: node scripts/generate-perfume-sql.js

const fs = require('fs');
const path = require('path');

// Mapeamento completo: arquivo -> { id no banco, cor de fundo estimada }
const PERFUME_COLORS = {
  // Originais
  'sauvage.png': { id: 'sauvage', bg: '#1a2332', name: 'Sauvage' },
  'le-male.png': { id: 'le-male', bg: '#0d1421', name: 'Le Male' },
  'a-men.png': { id: 'a-men', bg: '#0f0f12', name: 'A*Men' },
  'boss-bottled.png': { id: 'boss-bottled', bg: '#2d2f36', name: 'Boss Bottled' },
  'cool-water.png': { id: 'cool-water', bg: '#1e4d6b', name: 'Cool Water' },
  'bleu-de-chanel.png': { id: 'bleu-de-chanel', bg: '#0f1b2e', name: 'Bleu de Chanel' },
  'aventus.png': { id: 'aventus', bg: '#1c1c1c', name: 'Aventus' },
  'fahrenheit.png': { id: 'fahrenheit', bg: '#3d1a1a', name: 'Fahrenheit' },
  'habit-rouge.png': { id: 'habit-rouge', bg: '#3d2a0a', name: 'Habit Rouge' },
  'acqua-di-gio.png': { id: 'acqua-di-gio', bg: '#1e4a6e', name: 'Acqua di Giò' },

  // Adicionais anteriores
  '1-million.png': { id: '1-million', bg: '#c5a03a', name: '1 Million' },
  'Allure-homme.png': { id: 'allure-homme-sport', bg: '#1a3a5c', name: 'Allure Homme Sport' },
  'Armani-code.png': { id: 'armani-code', bg: '#15151a', name: 'Armani Code' },
  'eau-sauvage.png': { id: 'eau-sauvage', bg: '#2a3d2a', name: 'Eau Sauvage' },
  'dior-homme.png': { id: 'dior-homme', bg: '#25252a', name: 'Dior Homme' },
  'invictus.png': { id: 'invictus', bg: '#1a3a5c', name: 'Invictus' },
  'terre-de-hermes.png': { id: 'terre-d-hermes', bg: '#3d2a1a', name: "Terre d'Hermès" },
  'the-one.png': { id: 'the-one-for-men', bg: '#2d1a0a', name: 'The One for Men' },
  'ultra-male.png': { id: 'ultra-male', bg: '#2a1a3a', name: 'Ultra Male' },
  'versace-eros.png': { id: 'eros', bg: '#0d2a4a', name: 'Eros' },

  // ===== NOVOS PERFUMES - Adicione quantos quiser aqui =====
  // Exemplo de como adicionar mais:
  // 'nome-arquivo.png': { id: 'id-no-banco', bg: '#hexcolor', name: 'Nome Exibido' },

  // Novos sugeridos (adicione os arquivos em public/perfumes/):
  'acqua-di-gio-profumo.png': { id: 'acqua-di-gio-profumo', bg: '#0f1b2e', name: 'Acqua di Giò Profumo' },
  'aventus-creed.png': { id: 'aventus-creed', bg: '#1c1c1c', name: 'Aventus Creed' },
  'bleu-de-chanel-edp.png': { id: 'bleu-de-chanel-edp', bg: '#0f1b2e', name: 'Bleu de Chanel EDP' },
  'boss-bottled-parfum.png': { id: 'boss-bottled-parfum', bg: '#1a1a2e', name: 'Boss Bottled Parfum' },
  'dior-homme-2020.png': { id: 'dior-homme-2020', bg: '#25252a', name: 'Dior Homme 2020' },
  'dior-homme-parfum.png': { id: 'dior-homme-parfum', bg: '#1a1a2e', name: 'Dior Homme Parfum' },
  'eros-flame.png': { id: 'eros-flame', bg: '#3d1a1a', name: 'Eros Flame' },
  'h24.png': { id: 'h24', bg: '#1a3a5c', name: 'H24' },
  'la-nuit-homme.png': { id: 'la-nuit-homme', bg: '#1a1a2e', name: 'La Nuit de l\'Homme' },
  'le-male-elixir.png': { id: 'le-male-elixir', bg: '#0d1421', name: 'Le Male Elixir' },
  'le-male-le-parfum.png': { id: 'le-male-le-parfum', bg: '#0a0a1a', name: 'Le Male Le Parfum' },
  'sauvage-elixir.png': { id: 'sauvage-elixir', bg: '#0a0a1a', name: 'Sauvage Elixir' },
  'sauvage-parfum.png': { id: 'sauvage-parfum', bg: '#0a0a1a', name: 'Sauvage Parfum' },
  'terre-dhermes-eau-givree.png': { id: 'terre-d-hermes-eau-givree', bg: '#2a3d2a', name: "Terre d'Hermès Eau Givrée" },
  'yl-m.png': { id: 'yl-m', bg: '#1a1a2e', name: 'Y Le Parfum' },
  'yl-ede.png': { id: 'yl-ede', bg: '#1a3a5c', name: 'Y Eau de Parfum' },
};

const perfumesDir = path.join(__dirname, '../public/perfumes');
const outputPath = path.join(__dirname, '../supabase/update_images_generated.sql');

function generateSQL() {
  // Lê arquivos existentes na pasta
  const files = fs.readdirSync(perfumesDir)
    .filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.webp'));

  console.log(`📁 Encontrados ${files.length} arquivos em public/perfumes/`);

  let sql = `-- =====================================================\n`;
  sql += `-- ScentHub: Atualização em lote - ${new Date().toISOString()}\n`;
  sql += `-- Gerado automaticamente a partir de public/perfumes/\n`;
  sql += `-- =====================================================\n\n`;

  sql += `ALTER TABLE public.perfumes\n`;
  sql += `ADD COLUMN IF NOT EXISTS image_bg TEXT\n`;
  sql += `CHECK (image_bg IS NULL OR image_bg ~ '^#[0-9a-fA-F]{6}$');\n\n`;

  let found = 0;
  let missing = 0;

  files.forEach(file => {
    const info = PERFUME_COLORS[file];
    if (info) {
      // Usa o nome do arquivo exato (case-sensitive)
      sql += `UPDATE public.perfumes\n`;
      sql += `SET image_url = '/perfumes/${file}',\n`;
      sql += `    image_bg = '${info.bg}'\n`;
      sql += `WHERE id = '${info.id}';\n\n`;
      found++;
      console.log(`  ✅ ${file} -> ${info.id} (${info.bg})`);
    } else {
      console.log(`  ⚠️  ${file} -> SEM CONFIGURAÇÃO (adicione em PERFUME_COLORS)`);
      missing++;
    }
  });

  sql += `-- =====================================================\n`;
  sql += `-- Verificar resultado\n`;
  sql += `-- =====================================================\n`;
  sql += `SELECT id, name, image_url, image_bg \n`;
  sql += `FROM public.perfumes \n`;
  sql += `WHERE image_url IS NOT NULL \n`;
  sql += `ORDER BY name;\n`;

  fs.writeFileSync(outputPath, sql);

  console.log(`\n✅ SQL gerado em: ${outputPath}`);
  console.log(`   ${found} perfumes configurados`);
  if (missing > 0) console.log(`   ${missing} arquivos sem configuração (adicione em PERFUME_COLORS)`);
}

generateSQL();