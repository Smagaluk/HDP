/**
 * Build-time script: read content/projects/*.md, parse frontmatter, output public/projects.json.
 * Run before next build: npm run build:projects && next build
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'content', 'projects');
const outPath = path.join(root, 'public', 'projects.json');

function slugFromFilename(name) {
  return name.replace(/\.md$/i, '');
}

function projectFromFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);
  return {
    name: data.name ?? '',
    slug: data.slug ?? slugFromFilename(path.basename(filePath)),
    location: data.location ?? '',
    status: data.status ?? 'Planning',
    project_type: data.project_type ?? 'Mixed-Use',
    overview: data.overview ?? '',
    investment_thesis: data.investment_thesis ?? '',
    highlights: Array.isArray(data.highlights) ? data.highlights : [],
    square_feet: data.square_feet ?? '',
    units: data.units ?? '',
    featured: Boolean(data.featured),
    image_url: data.image_url ?? '',
    gallery_images: Array.isArray(data.gallery_images) ? data.gallery_images : [],
  };
}

function build() {
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(path.dirname(contentDir), { recursive: true });
    fs.mkdirSync(contentDir, { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify([], null, 2));
    console.log('content/projects missing; wrote empty public/projects.json');
    return;
  }

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
  const projects = files
    .map((f) => path.join(contentDir, f))
    .map(projectFromFile)
    .map((p, i) => ({ id: i + 1, ...p }));

  const outDir = path.dirname(outPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(projects, null, 2));
  console.log(`Wrote ${projects.length} projects to public/projects.json`);
}

build();
