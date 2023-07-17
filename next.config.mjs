/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  publicRuntimeConfig: {
    basePath: "",
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
  webpack: (config, options) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    })
    return config
  },
}

export default nextConfig
