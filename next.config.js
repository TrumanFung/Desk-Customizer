/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this project so Turbopack doesn't walk up to a
  // stray lockfile in a parent directory and mis-scope content/file tracing.
  turbopack: {
    root: __dirname
  }
};

module.exports = nextConfig;

