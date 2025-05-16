import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";

export default [
  {
    input: "src/bundle.ts",
    output: {
      dir: "dist",
      format: "cjs",
      sourcemap: false,
    },
    plugins: [
      replace({
        "/* @__PURE__ */ getDirname()": `/* @__PURE__ */ getDirname() + '/unplugin/dist';`,
      }),
      resolve(),
      commonjs({ include: ["node_modules/**"] }),
      typescript({
        tsconfig: "./tsconfig.json",
        sourceMap: false,
        exclude: "./src/index.ts",
      }),
      json(),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "cjs",
      sourcemap: false,
      esModule: true,
      exports: "named",
    },
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        sourceMap: false,
        exclude: "./src/bundle.ts",
      }),
    ],
  },
  // 解决 unplugin 引用问题
  {
    input: "unplugin/dist/webpack/loaders/transform.js",
    output: {
      dir: "dist/unplugin/dist/webpack/loaders",
      format: "cjs",
      sourcemap: false,
      esModule: true,
      exports: "named",
    },
    plugins: [resolve(), commonjs({ include: ["node_modules/**"] }), json()],
  },
  {
    input: "unplugin/dist/webpack/loaders/load.js",
    output: {
      dir: "dist/unplugin/dist/webpack/loaders",
      format: "cjs",
      sourcemap: false,
      esModule: true,
      exports: "named",
    },
    plugins: [resolve(), commonjs({ include: ["node_modules/**"] }), json()],
  },
  {
    input: "unplugin/dist/rspack/loaders/transform.js",
    output: {
      dir: "dist/unplugin/dist/rspack/loaders",
      format: "cjs",
      sourcemap: false,
      esModule: true,
      exports: "named",
    },
    plugins: [resolve(), commonjs({ include: ["node_modules/**"] }), json()],
  },
  {
    input: "unplugin/dist/rspack/loaders/load.js",
    output: {
      dir: "dist/unplugin/dist/rspack/loaders",
      format: "cjs",
      sourcemap: false,
      esModule: true,
      exports: "named",
    },
    plugins: [resolve(), commonjs({ include: ["node_modules/**"] }), json()],
  },
];
