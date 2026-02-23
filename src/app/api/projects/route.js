import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getProjects, loadProjectsFromMarkdown } from '@/lib/projects-data';

const root = process.cwd();
const contentDir = path.join(root, 'content', 'projects');

function isProd() {
  return process.env.NODE_ENV === 'production';
}

function slugToFilename(slug) {
  return `${String(slug).replace(/[^a-zA-Z0-9-_]/g, '-')}.md`;
}

function projectToFrontmatter(p) {
  return {
    name: p.name ?? '',
    slug: p.slug ?? '',
    location: p.location ?? '',
    status: p.status ?? 'Planning',
    project_type: p.project_type ?? 'Mixed-Use',
    featured: Boolean(p.featured),
    square_feet: p.square_feet ?? '',
    units: p.units ?? '',
    image_url: p.image_url ?? '',
    gallery_images: Array.isArray(p.gallery_images) ? p.gallery_images : [],
    overview: p.overview ?? '',
    investment_thesis: p.investment_thesis ?? '',
    highlights: Array.isArray(p.highlights) ? p.highlights : [],
  };
}

export async function GET() {
  try {
    const projects = getProjects();
    return NextResponse.json(projects);
  } catch (err) {
    console.error('GET /api/projects', err);
    return NextResponse.json(
      { error: 'Failed to load projects' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  if (isProd()) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    const body = await request.json();
    const slug = body.slug || body.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || `new-project-${Date.now()}`;
    const safeSlug = String(slug).replace(/[^a-zA-Z0-9-_]/g, '-');
    const filePath = path.join(contentDir, slugToFilename(safeSlug));
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Project with this slug already exists' },
        { status: 409 }
      );
    }
    const data = projectToFrontmatter({
      ...body,
      slug: safeSlug,
      name: body.name ?? 'New project',
      location: body.location ?? '',
      status: body.status ?? 'Planning',
      project_type: body.project_type ?? 'Mixed-Use',
      overview: body.overview ?? '',
      investment_thesis: body.investment_thesis ?? '',
      highlights: body.highlights ?? [],
      square_feet: body.square_feet ?? '',
      units: body.units ?? '',
      featured: Boolean(body.featured),
      image_url: body.image_url ?? '',
      gallery_images: body.gallery_images ?? [],
    });
    const content = matter.stringify('', data);
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
    const projects = loadProjectsFromMarkdown();
    const created = projects.find((p) => p.slug === safeSlug);
    const withId = { id: projects.length, ...created };
    return NextResponse.json(withId);
  } catch (err) {
    console.error('POST /api/projects', err);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  if (isProd()) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    const body = await request.json();
    const projects = loadProjectsFromMarkdown();
    const id = body.id;
    const slug = body.slug;
    const existing = slug
      ? projects.find((p) => p.slug === slug)
      : id != null
        ? projects.find((p) => p.id === Number(id) || String(p.id) === String(id))
        : null;
    if (!existing) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    const filePath = path.join(contentDir, slugToFilename(existing.slug));
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Project file not found' }, { status: 404 });
    }
    const { content: _existingBody } = matter(fs.readFileSync(filePath, 'utf-8'));
    const merged = {
      ...existing,
      ...body,
      slug: body.slug ?? existing.slug,
      id: undefined,
    };
    delete merged.id;
    const newSlug = merged.slug;
    const data = projectToFrontmatter(merged);
    const content = matter.stringify(_existingBody || '', data);
    if (newSlug !== existing.slug) {
      const newPath = path.join(contentDir, slugToFilename(newSlug));
      fs.writeFileSync(newPath, content);
      fs.unlinkSync(filePath);
    } else {
      fs.writeFileSync(filePath, content);
    }
    const updatedList = loadProjectsFromMarkdown();
    const updated = updatedList.find((p) => p.slug === (newSlug ?? existing.slug));
    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT /api/projects', err);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}
