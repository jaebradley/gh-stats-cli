import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
import filesize from 'rollup-plugin-filesize';
import minify from 'rollup-plugin-babel-minify';
import { terser } from 'rollup-plugin-terser';
import shebang from 'rollup-plugin-shebang';
import includePaths from 'rollup-plugin-includepaths';
import cleaner from 'rollup-plugin-cleaner';
import { plugin as analyze } from 'rollup-plugin-analyzer';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

import pkg from './package.json';

const config = {
  input: './src/index.js',
  output: {
    file: pkg.main,
    format: 'cjs',
    name: pkg.name,
    globals: [
      '@babel/runtime/helpers/asyncToGenerator',
      '@babel/runtime/regenerator',
      'axios',
    ],
  },
  external: [
    '@babel/runtime/helpers/asyncToGenerator',
    '@babel/runtime/regenerator',
    'axios',
  ],
  plugins: [
    cleaner({
      targets: ['./build'],
    }),
    includePaths({
      paths: [
        'src/',
      ],
      exclude: [
        '@babel/runtime/helpers/asyncToGenerator',
        '@babel/runtime/regenerator',
        'axios',
      ],
    }),
    json({
      exclude: ['node_modules/**'],
      preferConst: true,
      indent: '  ',
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    localResolve(),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      preferBuiltins: true,
      browser: true,
      modulesOnly: true,
    }),
    minify(),
    terser(),
    commonjs(),
    shebang(),
    filesize(),
    analyze(),
  ],
};

export default config;
