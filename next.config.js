/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next").NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },

  // Enable compression for better performance
  compress: true,

  // Turbopack configuration (moved from experimental.turbo)
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  experimental: {
    // Enable optimized package imports for better tree shaking
    optimizePackageImports: [
      "react-icons",
      "lucide-react",
      "@radix-ui/react-icons",
      "framer-motion",
      "date-fns",
      "lodash-es",
    ],

    // Cache Server Components responses across HMR refreshes (Next.js 15.4+)
    serverComponentsHmrCache: true,
  },

  // Configure on-demand entries for better caching
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 15 * 60 * 1000, // 15 minutes (increased from default 60s)
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 8, // Increased from default 2
  },
}

export default nextConfig
