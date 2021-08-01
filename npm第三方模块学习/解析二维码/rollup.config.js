import typescript from "@rollup/plugin-typescript"
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: "src/main.js",
  output: {
    file: "dist/main.js",
    format: "esm",
    name: "qrcode"
  },
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: "./tsconfig.json"
    })
  ]
}