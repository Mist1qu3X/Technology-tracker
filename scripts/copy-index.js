// Скрипт для копирования index.html в 404.html для GitHub Pages SPA
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distPath = join(__dirname, '../dist');
const indexPath = join(distPath, 'index.html');
const notFoundPath = join(distPath, '404.html');

try {
  // Читаем index.html
  const indexContent = readFileSync(indexPath, 'utf-8');
  
  // Сохраняем как 404.html
  writeFileSync(notFoundPath, indexContent, 'utf-8');
  
  console.log('✅ index.html успешно скопирован в 404.html');
} catch (error) {
  console.error('❌ Ошибка при копировании файла:', error.message);
  process.exit(1);
}

