/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['s3.us-east-2.amazonaws.com', 'nomics-api.s3.us-east-2.amazonaws.com']
  }
}

module.exports = nextConfig
