/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_SERVER: process.env.API_SERVER,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['via.placeholder.com'],
  },
};

module.exports = nextConfig;
