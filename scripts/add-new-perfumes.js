// scripts/add-new-perfumes.js
// Processa lista de novos perfumes e gera SQL automaticamente
// Execute: node scripts/add-new-perfumes.js

const fs = require('fs');
const path = require('path');

// =====================================================
// LISTA DE NOVOS PERFUMES (baseado na lista fornecida)
// =====================================================
const NEW_PERFUMES = [
  // Tom Ford
  { id: 'tobacco-vanille', name: 'Tobacco Vanille', brand: 'tom-ford', bg: '#2d1a0a' },
  { id: 'oud-wood', name: 'Oud Wood', brand: 'tom-ford', bg: '#1a1a2e' },
  { id: 'ombre-leather', name: 'Ombre Leather', brand: 'tom-ford', bg: '#3d1a1a' },
  { id: 'noir-extreme', name: 'Noir Extreme', brand: 'tom-ford', bg: '#1a1a2e' },
  { id: 'black-orchid', name: 'Black Orchid', brand: 'tom-ford', bg: '#1a0a1a' },

  // Yves Saint Laurent
  { id: 'ysl-y', name: 'Y Eau de Parfum', brand: 'ysl', bg: '#1a3a5c' },
  { id: 'la-nuit-de-lhomme', name: 'La Nuit de L\'Homme', brand: 'ysl', bg: '#1a1a2e' },
  { id: 'l-homme', name: 'L\'Homme', brand: 'ysl', bg: '#1a3a5c' },
  { id: 'myslf', name: 'MYSLF', brand: 'ysl', bg: '#1a3a5c' },
  { id: 'kouros', name: 'Kouros', brand: 'ysl', bg: '#2d2f36' },

  // Prada
  { id: 'luna-rossa-carbon', name: 'Luna Rossa Carbon', brand: 'prada', bg: '#1a1a2e' },
  { id: 'luna-rossa-ocean', name: 'Luna Rossa Ocean', brand: 'prada', bg: '#0d2a4a' },
  { id: 'luna-rossa-sport', name: 'Luna Rossa Sport', brand: 'prada', bg: '#1a3a5c' },
  { id: 'prada-lhomme', name: 'Prada L\'Homme', brand: 'prada', bg: '#1a1a2e' },
  { id: 'paradigme', name: 'Paradigme', brand: 'prada', bg: '#1a1a2e' },

  // Givenchy
  { id: 'gentleman-givenchy', name: 'Gentleman', brand: 'givenchy', bg: '#1a1a2e' },
  { id: 'gentleman-reserve-privee', name: 'Gentleman Réserve Privée', brand: 'givenchy', bg: '#1a0a1a' },
  { id: 'gentleman-society', name: 'Gentleman Society', brand: 'givenchy', bg: '#1a1a2e' },
  { id: 'pi', name: 'Pi', brand: 'givenchy', bg: '#c5a03a' },
  { id: 'gentleman-boisee', name: 'Gentleman Boisée', brand: 'givenchy', bg: '#2d1a0a' },

  // Valentino
  { id: 'born-in-roma-uomo', name: 'Born in Roma Uomo', brand: 'valentino', bg: '#1a1a2e' },
  { id: 'born-in-roma-intense', name: 'Born in Roma Intense', brand: 'valentino', bg: '#1a0a1a' },
  { id: 'valentino-uomo', name: 'Valentino Uomo', brand: 'valentino', bg: '#1a1a2e' },
  { id: 'valentino-uomo-noir', name: 'Valentino Uomo Noir Absolu', brand: 'valentino', bg: '#0a0a0a' },

  // Gucci
  { id: 'gucci-guilty', name: 'Guilty Pour Homme', brand: 'gucci', bg: '#1a1a2e' },
  { id: 'gucci-guilty-elixir', name: 'Guilty Elixir de Parfum', brand: 'gucci', bg: '#1a0a1a' },
  { id: 'gucci-intense-oud', name: 'Intense Oud', brand: 'gucci', bg: '#1a0a1a' },
  { id: 'gucci-guilty-black', name: 'Guilty Black', brand: 'gucci', bg: '#0a0a0a' },
  { id: 'gucci-by-gucci', name: 'Gucci by Gucci Pour Homme', brand: 'gucci', bg: '#1a1a2e' },

  // Versace
  { id: 'dylan-blue', name: 'Dylan Blue', brand: 'versace', bg: '#0d2a4a' },
  { id: 'pour-homme-versace', name: 'Versace Pour Homme', brand: 'versace', bg: '#0d2a4a' },
  { id: 'oud-noir', name: 'Oud Noir', brand: 'versace', bg: '#0a0a0a' },
  { id: 'dreamer', name: 'The Dreamer', brand: 'versace', bg: '#1a3a5c' },
  { id: 'eau-fraiche', name: 'Man Eau Fraîche', brand: 'versace', bg: '#1a3a5c' },

  // Viktor & Rolf
  { id: 'spicebomb', name: 'Spicebomb', brand: 'viktor-rolf', bg: '#3d1a1a' },
  { id: 'spicebomb-extreme', name: 'Spicebomb Extreme', brand: 'viktor-rolf', bg: '#2d1a0a' },
  { id: 'nightvision', name: 'Spicebomb Night Vision', brand: 'viktor-rolf', bg: '#0a0a0a' },

  // Creed
  { id: 'green-irish-tweed', name: 'Green Irish Tweed', brand: 'creed', bg: '#2a3d2a' },
  { id: 'silver-mountain-water', name: 'Silver Mountain Water', brand: 'creed', bg: '#1a3a5c' },

  // Parfums de Marly
  { id: 'greenley', name: 'Greenley', brand: 'parfums-de-marly', bg: '#2a3d2a' },
  { id: 'layton', name: 'Layton', brand: 'parfums-de-marly', bg: '#2d1a0a' },
  { id: 'pegasus', name: 'Pegasus', brand: 'parfums-de-marly', bg: '#c5a03a' },
  { id: 'herod', name: 'Herod', brand: 'parfums-de-marly', bg: '#3d1a1a' },
  { id: 'percival', name: 'Percival', brand: 'parfums-de-marly', bg: '#1e4a6e' },

  // Hermès
  { id: 'h24', name: 'H24', brand: 'hermes', bg: '#1a3a5c' },
  { id: 'voyage-dhermes', name: 'Voyage d\'Hermès', brand: 'hermes', bg: '#1a3a5c' },
  { id: 'un-jardin-sur-le-nil', name: 'Un Jardin sur le Nil', brand: 'hermes', bg: '#2a3d2a' },

  // Acqua di Parma
  { id: 'colonia', name: 'Colonia', brand: 'acqua-di-parma', bg: '#f2c230' },

  // Tom Ford (adicionais)
  { id: 'oud-wood-intense', name: 'Oud Wood Intense', brand: 'tom-ford', bg: '#1a1a2e' },

  // Dior
  { id: 'fahrenheit-le-parfum', name: 'Fahrenheit Le Parfum', brand: 'dior', bg: '#3d1a1a' },
];

// =====================================================
// MAPA DE MARCAS (brand_id -> nome)
// =====================================================
const BRANDS = {
  'tom-ford': 'Tom Ford',
  'ysl': 'Yves Saint Laurent',
  'prada': 'Prada',
  'givenchy': 'Givenchy',
  'valentino': 'Valentino',
  'gucci': 'Gucci',
  'versace': 'Versace',
  'viktor-rolf': 'Viktor & Rolf',
  'creed': 'Creed',
  'parfums-de-marly': 'Parfums de Marly',
  'hermes': 'Hermès',
  'acqua-di-parma': 'Acqua di Parma',
  'dior': 'Dior',
};

// =====================================================
// GERAR SQL
// =====================================================
function generateSQL() {
  let sql = `-- =====================================================\n`;
  sql += `-- ScentHub: Novos perfumes - ${new Date().toISOString()}\n`;
  sql += `-- Total: ${NEW_PERFUMES.length} novos perfumes\n`;
  sql += `-- =====================================================\n\n`;

  // 1. INSERTS de novas marcas (se não existirem)
  const brandsToAdd = [...new Set(NEW_PERFUMES.map(p => p.brand))];
  sql += `-- ===== MARCAS =====\n`;
  brandsToAdd.forEach(brandId => {
    const brandName = BRANDS[brandId];
    if (brandName) {
      sql += `INSERT INTO public.brands (id, name) VALUES ('${brandId}', '${brandName}')\n`;
      sql += `ON CONFLICT (id) DO NOTHING;\n\n`;
    }
  });

  // 2. INSERTS de perfumes
  sql += `-- ===== PERFUMES =====\n`;
  NEW_PERFUMES.forEach(p => {
    const brandName = BRANDS[p.brand];
    const desc = `${p.name} - ${brandName}`;
    const safeName = p.name.replace(/'/g, "''");
    sql += `INSERT INTO public.perfumes (id, name, brand_id, description) VALUES\n`;
    sql += `('${p.id}', '${safeName}', '${p.brand}', '${desc}')\n`;
    sql += `ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, brand_id = EXCLUDED.brand_id, description = EXCLUDED.description;\n\n`;
  });

  // 3. UPDATEs de imagens
  sql += `-- ===== IMAGENS (rode após colocar arquivos em public/perfumes/) =====\n`;
  NEW_PERFUMES.forEach(p => {
    const filename = `${p.id}.png`;
    sql += `UPDATE public.perfumes\n`;
    sql += `SET image_url = '/perfumes/${filename}',\n`;
    sql += `    image_bg = '${p.bg}'\n`;
    sql += `WHERE id = '${p.id}';\n\n`;
  });

  // 4. PERFUME_COLORS para o script gerador
  sql += `\n-- ===== PARA ADICIONAR EM scripts/generate-perfume-sql.js (PERFUME_COLORS) =====\n`;
  NEW_PERFUMES.forEach(p => {
    const filename = `${p.id}.png`;
    const safeName = p.name.replace(/'/g, "\\'");
    sql += `'${filename}': { id: '${p.id}', bg: '${p.bg}', name: '${safeName}' },\n`;
  });

  // 5. Verificação
  sql += `\n-- ===== VERIFICAR =====\n`;
  sql += `SELECT id, name, brand_id, image_url, image_bg FROM public.perfumes WHERE id IN (\n`;
  sql += `  '${NEW_PERFUMES.map(p => p.id).join("',\n  '")}'\n`;
  sql += `) ORDER BY name;\n`;

  return sql;
}

// =====================================================
// EXECUTAR E SALVAR
// =====================================================
const sql = generateSQL();
const outputPath = path.join(__dirname, '../supabase/new_perfumes_generated.sql');
fs.writeFileSync(outputPath, sql);

console.log(`✅ SQL gerado para ${NEW_PERFUMES.length} novos perfumes`);
console.log(`📁 Salvo em: ${outputPath}`);
console.log(`\n📋 Próximos passos:`);
console.log(`1. Copie o conteúdo de supabase/new_perfumes_generated.sql`);
console.log(`2. Rode no Supabase SQL Editor`);
console.log(`3. Baixe as imagens e coloque em public/perfumes/{id}.png`);
console.log(`4. Copie a seção PERFUME_COLORS do SQL para scripts/generate-perfume-sql.js`);
console.log(`5. Rode: node scripts/generate-perfume-sql.js`);
console.log(`6. rd /s /q .next && npm run dev`);