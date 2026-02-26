/**
 * Returns the Next.js path for a page name or project detail slug.
 */
const ROUTE_MAP = {
  Home: "/",
  About: "/about",
  Team: "/about/team",
  InvestmentStrategy: "/about/investment-strategy",
  Contact: "/contact",
  Projects: "/projects",
  Capabilities: "/capabilities",
  Investors: "/investors",
  ManageProjects: "/projects/manage",
};

export function createPageUrl(pageName: string) {
  const trimmed = pageName.trim();
  if (trimmed.startsWith("ProjectDetail?")) {
    const match = trimmed.match(/slug=([^&]+)/);
    return match ? `/projects/${encodeURIComponent(match[1])}` : "/projects";
  }
  if (ROUTE_MAP[trimmed] !== undefined) return ROUTE_MAP[trimmed];
  // Fallback: lowercase and replace spaces with hyphen
  return "/" + trimmed.replace(/\s+/g, "-").toLowerCase();
}
