# Changelog

## 2.0.2 - 2026-09-10

Remove the Electron GUI `package.json` / `package-lock.json` that 2.0.1 added to `master`. Those files were not on the default branch; adding them exposed a large unused electron-forge 5 tree to Dependabot. The C++ NumCuts sources are unchanged.

## 2.0.1 - 2026-09-10

Attempted security floors for electron/lodash/postcss/tar. Reverted the newly added GUI lockfile in 2.0.2 because it was not previously on `master`.

