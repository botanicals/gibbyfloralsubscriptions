/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: () => 'build',
  async redirects() {
    return [
      {
        source: '/:slug',
        destination: '/',
        permanent: false,
      },
      {
        source: '/:slug/:slug*',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
