import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import autoprefixer from "autoprefixer"
import dts from "rollup-plugin-dts"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import postcss from "rollup-plugin-postcss"
import tailwindcss from "tailwindcss"

import packageJson from "./package.json" with { type: "json" }
import tailwindcssConfig from "./tailwind.config.cjs"

export default [
  {
    input: "src/index.ts", // Your library's entry point
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/node_modules/**", "**/dist/**"],
      }),
      postcss({
        config: {
          path: "./postcss.config.cjs", // Create this file next
        },
        extensions: [".css"],
        minimize: true,
        inject: {
          insertAt: "top",
        },
        plugins: [
          tailwindcss(tailwindcssConfig), // Create this file next
          autoprefixer,
        ],
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: [["@babel/preset-react", { runtime: "automatic" }]],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
    ],
    external: Object.keys(packageJson.peerDependencies || {}), // Automatically externalize peerDependencies
  },
  {
    input: "src/index.ts",
    output: [{ file: packageJson.types, format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
]
