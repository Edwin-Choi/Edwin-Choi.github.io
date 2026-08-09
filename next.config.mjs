/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce a fully static site in ./out — required for GitHub Pages.
  output: "export",

  // Pages has no image optimization server, so serve images as-is.
  images: { unoptimized: true },

  // For a USER site (Edwin-Choi.github.io) the site lives at the root, so
  // basePath must stay empty. If you ever move this to a PROJECT repo served
  // at /repo-name, set both of these to "/repo-name".
  basePath: "",
  assetPrefix: "",

  // Emit folder-style URLs (/about/ -> /about/index.html) so refreshes and
  // deep links resolve correctly on a static host.
  trailingSlash: true,
};

export default nextConfig;
