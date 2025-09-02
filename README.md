# NXPackaging
Repository shows different packaging options in NX - how to make CJS and ESM regardless of bundler


## Cration of native js libs

```cmd
nx g @nx/js:library libs/diagnostics-core --publishable --importPath=@adaskothebeast/diagnostics-core --strict --setParserOptionsProject=true --useProjectJson
```