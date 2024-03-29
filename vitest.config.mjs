/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: true,
  test: {
    exclude: ["./data", "node_modules"],
  },
});
