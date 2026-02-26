/**
 * API client: projects from /api/projects (markdown in dev, static JSON in prod).
 */
async function fetchProjects() {
  const res = await fetch('/api/projects');
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

const Project = {
  async list() {
    const projects = await fetchProjects();
    return [...projects].sort((a, b) => {
      const ya = parseInt(a.year, 10) || 0;
      const yb = parseInt(b.year, 10) || 0;
      return yb - ya;
    });
  },
  async create(data = {}) {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create project');
    }
    return res.json();
  },
  filter(filters = {}, _order, limit) {
    return this.list().then((projects) => {
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
      return result;
    });
  },
  async update(id, data) {
    const res = await fetch('/api/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update project');
    }
    return res.json();
  },
};

const auth = {
  me() {
    return Promise.reject(new Error('Not authenticated'));
  },
  logout() {},
  redirectToLogin() {
    if (typeof window !== 'undefined') window.location.href = '/';
  },
};

async function uploadFileViaAPI(file, slug) {
  const form = new FormData();
  form.append('file', file);
  if (slug) form.append('slug', slug);
  const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return data.file_url || (data.file_urls && data.file_urls[0]);
}

const Core = {
  UploadFile({ file, slug }) {
    if (typeof window === 'undefined') {
      return Promise.resolve({ file_url: '' });
    }
    if (process.env.NODE_ENV === 'development') {
      return uploadFileViaAPI(file, slug).then((file_url) => ({ file_url }));
    }
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
