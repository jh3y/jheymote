import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), preact(), react()]
});