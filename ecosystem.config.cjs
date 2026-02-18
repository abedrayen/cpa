/**
 * PM2 ecosystem file. Run from repo root: pm2 start ecosystem.config.cjs
 *
 * Before first run:
 * - API: cd apps/api && npm run build && mkdir -p uploads
 * - Web: cd apps/web && npm run build
 *
 * Set UPLOAD_DIR to a writable path. Below uses "uploads" (relative to apps/api);
 * for an absolute path use e.g. /home/sirayen/cpa/apps/api/uploads.
 */
module.exports = {
  apps: [
    {
      name: 'cpa-api',
      cwd: './apps/api',
      script: 'dist/src/main.js',
      env: {
        UPLOAD_DIR: 'uploads',
        // API_PUBLIC_URL: 'https://api.comptoirpro.shop',  // set in production so image URLs use HTTPS
      },
      // Override on server if needed, e.g.:
      // env_production: { UPLOAD_DIR: '/home/sirayen/cpa/apps/api/uploads', API_PUBLIC_URL: 'https://api.comptoirpro.shop' },
    },
    {
      name: 'next-frontend',
      cwd: './apps/web',
      script: 'node_modules/.bin/next',
      args: 'start',
      env: { NODE_ENV: 'production' },
      // If next is hoisted to root, use: script: '../../node_modules/.bin/next'
    },
  ],
};
