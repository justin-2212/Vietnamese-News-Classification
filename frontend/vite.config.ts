// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
// import viteReactStart from "@tanstack/react-start/router";
// import tsConfigPaths from "vite-tsconfig-paths";

// export default defineConfig({
//   plugins: [
//     TanStackRouterVite(),
//     viteReactStart(),
//     react(),
//     tailwindcss(),
//     tsConfigPaths(),
//   ],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tanstackStart(),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});