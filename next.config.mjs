/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    basePath: "",
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },

      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    })
    return config
  },
}

export default nextConfig
