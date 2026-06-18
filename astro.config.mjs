import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [
    icon({
      include: {
        lucide: ["hard-hat", "cog", "pencil-ruler", "hammer", "home"],
      },
    }),
    sitemap({
      filter: (page) => !page.includes("/404") && !page.includes("/500"),
    }),
  ],
  site: "https://solidcalc.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  server: {
    port: 4321,
  },
});
