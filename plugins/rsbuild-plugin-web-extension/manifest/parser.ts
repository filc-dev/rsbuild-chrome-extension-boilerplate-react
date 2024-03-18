type Manifest = chrome.runtime.ManifestV3;

const getOutputFile = (file: string): string => {
  return file
    .replace(/\.(pug)/g, ".html")
    .replace(/\.(scss|stylus|sass)/g, ".css")
    .replace(/\.(jsx|ts|tsx)/g, ".js");
};

class ManifestParser {
  private constructor() {}

  static convertManifestToString(manifest: Manifest): string {
    if (process.env.__FIREFOX__) {
      manifest = this.convertToFirefoxCompatibleManifest(manifest);
    }

    return getOutputFile(JSON.stringify(manifest, null, 2));
  }

  static convertToFirefoxCompatibleManifest(manifest: Manifest) {
    const manifestCopy = {
      ...manifest,
    } as { [key: string]: unknown };

    manifestCopy.background = {
      scripts: [manifest.background?.service_worker],
      type: "module",
    };
    manifestCopy.options_ui = {
      page: manifest.options_page,
      browser_style: false,
    };
    manifestCopy.content_security_policy = {
      extension_pages: "script-src 'self'; object-src 'self'",
    };
    delete manifestCopy.options_page;
    return manifestCopy as Manifest;
  }
}

export default ManifestParser;
