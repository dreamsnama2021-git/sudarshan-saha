/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Fully static site: `next build` writes plain HTML/CSS/JS to ./out, which Cloudflare serves as static assets.
  output: "export",
  // No image-optimisation server on a static host; images are served as-is.
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
