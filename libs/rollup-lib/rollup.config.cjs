const { withNx } = require('@nx/rollup/with-nx');
const { execSync } = require('node:child_process');

module.exports = withNx(
  {
    main: './src/index.ts',
    outputPath: './dist',
    tsConfig: './tsconfig.lib.json',
    compiler: 'swc',
    format: ['esm', 'cjs'],
    buildLibsFromSource: true,
  },
  {
    // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
    // e.g.
    // output: { sourcemap: true },
    plugins: [
      {
        name: 'fix-cjs-filename',
        generateBundle(_options, bundle) {
          for (const [fileName, output] of Object.entries(bundle)) {
            if (
              fileName.endsWith('.cjs.js') &&
              output &&
              output.type === 'chunk'
            ) {
              const newName = fileName.replace(/\.cjs\.js$/, '.cjs');
              output.fileName = newName;
              delete bundle[fileName];
              bundle[newName] = output;
            }
          }
        },
      },
      {
        name: 'emit-package-json',
        writeBundle() {
          // Run the shared emitter from the lib root
          execSync('node ../../tools/emit-package-json.mjs .', {
            stdio: 'inherit',
            cwd: __dirname,
          });
        },
      },
    ],
  },
);
