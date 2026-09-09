# Changelog

## 2.0.1 - 2026-09-10

Security dependency floors for remediable high/medium Dependabot alerts:

- electron 22.3.27 (GHSA-qqvq-6xgj-jw8g, GHSA-7m48-wc93-9g85, GHSA-7x97-j373-85x5)
- lodash 4.18.1
- postcss 8.5.28 (GHSA-7fh5-64p2-3v2j)
- tar 4.4.19 (GHSA-qq89-hq3f-393p, GHSA-9r2w-394v-53qc)

Left unchanged (no published patched release): babel-traverse, hoek, lodash.template, vue-template-compiler, xmldom.

The nested `cmake-build-release/Numcuts-gui` lockfile is a packaged Electron build artifact and is not on `master`; it was not restored.
