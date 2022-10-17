/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: () => 'build',
  webpack: cfg => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: 'frontmatter-markdown-loader',
      options: { mode: ['body'] },
    });
    return cfg;
  },
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
