/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qtrypzzcjebvfcihiynt.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/Home', destination: '/', permanent: true },
      { source: '/About', destination: '/about', permanent: true },
      { source: '/Projects', destination: '/projects', permanent: true },
      { source: '/Capabilities', destination: '/capabilities', permanent: true },
      { source: '/Investors', destination: '/investors', permanent: true },
      { source: '/Contact', destination: '/contact', permanent: true },
      { source: '/ManageProjects', destination: '/manage-projects', permanent: true },
      {
        source: '/ProjectDetail',
        has: [{ type: 'query', key: 'slug', value: '(?<slug>.*)' }],
        destination: '/projects/:slug',
        permanent: true,
      },
      { source: '/ProjectDetail', destination: '/projects', permanent: true },
    ];
  },
};

export default nextConfig;
