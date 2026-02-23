import ProjectDetail from "@/views/ProjectDetail";

export const dynamic = 'force-dynamic';

export default async function ProjectDetailRoute({ params }) {
  const { slug } = await params;
  return <ProjectDetail slug={slug} />;
}
