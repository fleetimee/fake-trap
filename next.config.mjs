/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    basePath: "",
  },
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  // output: "standalone",
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  webpack: (config, options) => {
    config.resolve.alias.canvas = false

    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    })
    return config
  },
  // webpack: (config) => {
  //   config.resolve.alias.canvas = false

  //   return config
  // },
}

export default nextConfig
