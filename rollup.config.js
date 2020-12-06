import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'custom-elements.js',
    output: {
      file: 'dist/vellum-monster.js',
      format: 'cjs'
    },
    plugins: [
      resolve()
    ]
  },
  {
    input: 'custom-elements.js',
    output: {
      file: 'dist/vellum-monster.min.js',
      format: 'cjs'
    },
    plugins: [
      resolve(),
      terser()
    ]
  }
]
