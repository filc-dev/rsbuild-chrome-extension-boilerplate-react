import fs from "fs";
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description || "",
  action: {
    default_popup: "./src/popup/index.html",
  },
  background: {
    service_worker: "./src/background/index.ts",
    type: "module",
  },
  devtools_page: "./src/devtools/index.html",
};

export default manifest;
