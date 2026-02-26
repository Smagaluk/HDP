/**
 * Server-only: load projects from content/projects/*.md (dev) or public/projects.json (prod).
 * Used by app/api/projects/route.js
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const contentDir = path.join(root, 'content', 'projects');
const jsonPath = path.join(root, 'public', 'projects.json');

function projectFromFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);
  const slug = data.slug ?? path.basename(filePath, '.md');
  return {
    name: data.name ?? '',
    slug,
    location: data.location ?? '',
    status: data.status ?? 'Planning',
    project_type: data.project_type ?? 'Mixed-Use',
    overview: data.overview ?? '',
    investment_thesis: data.investment_thesis ?? '',
    highlights: Array.isArray(data.highlights) ? data.highlights : [],
    square_feet: data.square_feet ?? '',
    units: data.units ?? '',
    year: data.year ?? '',
    featured: Boolean(data.featured),
    image_url: data.image_url ?? '',
    gallery_images: Array.isArray(data.gallery_images) ? data.gallery_images : [],
  };
}

export function loadProjectsFromMarkdown() {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
  return files
    .map((f) => path.join(contentDir, f))
    .map(projectFromFile)
    .map((p, i) => ({ id: i + 1, ...p }));
}

export function loadProjectsFromJson() {
  const raw = fs.readFileSync(jsonPath, 'utf-8');
  return JSON.parse(raw);
}

function sortByYear(projects) {
  return [...projects].sort((a, b) => {
    const ya = parseInt(a.year, 10) || 0;
    const yb = parseInt(b.year, 10) || 0;
    return yb - ya;
  });
}

export function getProjects() {
  const projects =
    process.env.NODE_ENV === 'development' && fs.existsSync(contentDir)
      ? loadProjectsFromMarkdown()
      : loadProjectsFromJson();
  return sortByYear(projects);
}
