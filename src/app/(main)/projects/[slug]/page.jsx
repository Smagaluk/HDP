import ProjectDetail from "@/views/ProjectDetail";
import { getProjects } from "@/lib/projects-data";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const projects = getProjects();
    return (projects || []).map((p) => ({ slug: String(p.slug ?? '').trim() })).filter((p) => p.slug);
  } catch {
    return [];
  }
}

export default async function ProjectDetailRoute({ params }) {
  const resolved = typeof params?.then === 'function' ? await params : params;
  const slug = resolved?.slug ?? '';
  return <ProjectDetail slug={slug} />;
}
