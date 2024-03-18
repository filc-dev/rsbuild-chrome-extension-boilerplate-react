import fs from "node:fs";
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  default_locale: "en",
  name: "rsbuild-chrome-extension-boilerplate-react",
  version: packageJson.version,
  description:
    "A boilerplate for building Chrome extensions with rsbuild and React",
  action: {
    default_popup: "src/popup/index.html",
  },
  background: {
    service_worker: "src/background.ts",
    type: "module",
  },
  devtools_page: "src/devtools/index.html",
};

export default manifest;
