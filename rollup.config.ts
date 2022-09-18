// 导出defineConfig方法可以让编辑器（VSCode）智能提示所有的rollup的配置项，很方便
import { defineConfig } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import clear from "rollup-plugin-clear";
import path from "path";
import pkg from "./package.json";

const paths = {
  input: path.join(__dirname, "/src/index.ts"),
  output: path.join(__dirname, "/lib"),
};

export default defineConfig({
  input: paths.input,
  output: [
    // 输出 commonjs 规范的代码
    {
      file: path.join(paths.output, "index.cjs.js"),
      format: "cjs",
      name: pkg.name,
    },
    // 输出 es 规范的代码
    {
      file: path.join(paths.output, "index.esm.js"),
      format: "es",
      name: pkg.name,
    },
    {
      file: path.join(paths.output, "index.umd.js"),
      format: "umd",
      name: pkg.name,
    },
  ],
  // external: ['lodash'], // 指出应将哪些模块视为外部模块，如 Peer dependencies 中的依赖

  // plugins 需要注意引用顺序
  plugins: [
    clear({
      targets: ["lib"],
    }),

    // 解析第三方依赖
    resolve(),

    // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
    commonjs(),

    typescript({ useTsconfigDeclarationDir: true }),
  ],
});
