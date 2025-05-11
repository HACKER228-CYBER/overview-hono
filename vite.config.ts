import { defineConfig } from "vite";
import build from "@hono/vite-build/bun";
// import build from '@hono/vite-build/cloudflare-pages'
// import build from '@hono/vite-build/cloudflare-workers'
// import build from '@hono/vite-build/node'
// import build from '@hono/vite-build/netlify-functions'
// import build from '@hono/vite-build/vercel'

export default defineConfig({
  plugins: [
    build({
      // Defaults are `src/index.ts`,`./src/index.tsx`,`./app/server.ts`
      entry: "./src/index.tsx",
      // port option is only for Node.js adapter. Default is 3000
      port: 3001,
    }),
  ],
});
