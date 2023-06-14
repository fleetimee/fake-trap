/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "placehold.co",
      "placeholdit.imgix.net",
      "res.cloudinary.com",
      "pbs.twimg.com",
    ],
  },
}

export default nextConfig
