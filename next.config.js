/** @type {import('next').NextConfig} */
const path = require('path');
const nextTranslate = require('next-translate-plugin');

const nextConfig = {
  reactStrictMode: false,
  env: {
    API_SERVER: process.env.API_SERVER,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['via.placeholder.com', process.env.API_SERVER, '127.0.0.1', "assets.interbloc.org", "cosmos.explorer.interbloc.org", 'raw.githubusercontent.com'],
  },
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png)',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, stale-while-revalidate'
        }
      ]
    }
  ],
  ...nextTranslate(),
};

module.exports = nextConfig;
