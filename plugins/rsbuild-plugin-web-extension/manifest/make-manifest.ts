import * as fs from "fs";
import { resolve } from "path";
import ManifestParser from "./parser";
import { RsbuildPluginAPI, logger } from "@rsbuild/core";

export const makeManifest = async (
  manifest: chrome.runtime.ManifestV3,
  to: string
) => {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to);
  }

  const toManifest = resolve(to, "manifest.json");

  fs.writeFileSync(
    toManifest,
    ManifestParser.convertManifestToString(manifest.default)
  );

  logger.log("Manifest file created");
};
