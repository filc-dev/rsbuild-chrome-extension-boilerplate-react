# Chrome Extension Boilerplate with React + Rsbuild + TypeScript

## Features

- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Rsbuild](https://rsbuild.dev/)
- [Chrome Extension Manifest Version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)

## Installing and Running

### Procedures:

1. Clone this repository.
2. Change the package's name and description in package.json.
3. Run `pnpm install` to install the dependencies.

## And next, depending on the needs:

### For Chrome:

1. Run:
   - Dev: `pnpm dev` or `npm run dev`
   - Prod: `pnpm build` or `npm run build`
2. Open in browser - `chrome://extensions`
3. Check - `Developer mode`
4. Click - `Load unpacked extension`
5. Select - `dist` folder

### For Firefox:

1. Run:
   - Dev: `pnpm dev:firefox` or `npm run dev:firefox`
   - Prod: `pnpm build:firefox` or `npm run build:firefox`
2. Open in browser - `about:debugging#/runtime/this-firefox`
3. Click - `Load Temporary Add-on...`
4. Select - `dist` folder
