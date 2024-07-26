/** @type {import('next').NextConfig} */

const cspHeader = `
    default-src 'self';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
  
`

const nextConfig = {
  poweredByHeader: false,
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
  webpack: (config) => {
    /**
     * Critical: prevents " ⨯ ./node_modules/canvas/build/Release/canvas.node
     * Module parse failed: Unexpected character '�' (1:0)" error
     */
    config.resolve.alias.canvas = false

    return config
  },
  // webpack: (config) => {
  //   config.resolve.alias.canvas = false

  //   return config
  // },
}

export default nextConfig
