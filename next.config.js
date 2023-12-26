/** @type {import('next').NextConfig} */
const IS_OUTPUT_STANDALONE = process.env.IS_OUTPUT_STANDALONE === '1';

const nextConfig = {
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sgp1.digitaloceanspaces.com",
        pathname: '/nami-dev/**',
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: '/wikipedia/commons/thumb/0/01/**',
      },
    ],
    // domains: ['https://']
  },
  // output: 'standalone',
  typescript: {
    // ignoreBuildErrors: true,
  },
  reactStrictMode: false
};

if (IS_OUTPUT_STANDALONE) {
  nextConfig.output = 'standalone';
}

module.exports = nextConfig;