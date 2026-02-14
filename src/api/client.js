/**
 * Local API client (replaces Base44). Uses in-memory project data with localStorage persistence.
 * Replace with your own backend when ready.
 */
import projectList from './projectData';

const STORAGE_KEY = 'heritage_build_value_projects';

function loadProjects() {
  if (typeof window === 'undefined') return [...projectList];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [...projectList];
    }
  } catch (_) {}
  return [...projectList];
}

function saveProjects(projectsToSave) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projectsToSave));
  } catch (_) {}
}

let projects = loadProjects();

const Project = {
  list() {
    return Promise.resolve([...projects].sort((a, b) => (a.id || 0) - (b.id || 0)));
  },
  create(data = {}) {
    const maxId = projects.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0);
    const newProject = {
      id: maxId + 1,
      name: data.name ?? 'New project',
      slug: data.slug ?? `new-project-${maxId + 1}`,
      location: data.location ?? '',
      status: data.status ?? 'Planning',
      project_type: data.project_type ?? 'Mixed-Use',
      overview: data.overview ?? '',
      investment_thesis: data.investment_thesis ?? '',
      highlights: Array.isArray(data.highlights) ? data.highlights : [],
      square_feet: data.square_feet ?? '',
      units: data.units ?? '',
      featured: !!data.featured,
      image_url: data.image_url ?? '',
      gallery_images: Array.isArray(data.gallery_images) ? data.gallery_images : [],
    };
    projects.push(newProject);
    saveProjects(projects);
    return Promise.resolve(newProject);
  },
  filter(filters = {}, _order, limit) {
    let result = [...projects];
    if (filters.featured !== undefined) {
      result = result.filter((p) => p.featured === filters.featured);
    }
    if (filters.slug !== undefined) {
      result = result.filter((p) => p.slug === filters.slug);
    }
    if (typeof limit === 'number') {
      result = result.slice(0, limit);
    }
    return Promise.resolve(result);
  },
  update(id, data) {
    const index = projects.findIndex((p) => p.id === id || String(p.id) === String(id));
    if (index >= 0) {
      projects[index] = { ...projects[index], ...data };
      saveProjects(projects);
    }
    return Promise.resolve();
  },
};

const auth = {
  me() {
    return Promise.reject(new Error('Not authenticated'));
  },
  logout() {},
  redirectToLogin() {
    window.location.href = '/';
  },
};

const Core = {
  UploadFile({ file }) {
    const url = URL.createObjectURL(file);
    return Promise.resolve({ file_url: url });
  },
};

const appLogs = {
  logUserInApp() {
    return Promise.resolve();
  },
};

export const api = {
  entities: { Project },
  auth,
  integrations: { Core },
  appLogs,
};
