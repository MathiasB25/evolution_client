/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['s3.us-east-2.amazonaws.com', 's2.coinmarketcap.com']
  }
}

module.exports = nextConfig
