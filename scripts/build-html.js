#!/usr/bin/env node
// Assembles the root index.html from src/layout/index.html (the page shell:
// <head>, skip link, #page-shell/#footer-spacer wrapper, script tag) and the
// per-section partials in src/components/*.html.
//
// Edit the layout or the component files, then run `npm run build:html`
// (or `npm run build`) to regenerate index.html — never edit index.html by
// hand, your changes will be overwritten on the next build.
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const layoutPath = path.join(root, "src/layout/index.html");
const componentsDir = path.join(root, "src/components");
const outputPath = path.join(root, "index.html");

// Matches a whole "@include name" line, leading indentation included, so the
// replacement isn't double-indented on top of the component's own markup.
const includePattern = /^[ \t]*<!--\s*@include\s+([\w-]+)\s*-->\n?/gm;

const layout = fs.readFileSync(layoutPath, "utf8");

const html = layout.replace(includePattern, (match, name) => {
  const componentPath = path.join(componentsDir, `${name}.html`);
  if (!fs.existsSync(componentPath)) {
    throw new Error(`Unknown component "${name}" — expected ${path.relative(root, componentPath)}`);
  }
  return fs.readFileSync(componentPath, "utf8").replace(/\n+$/, "") + "\n";
});

fs.writeFileSync(outputPath, html);
console.log(`Built index.html from src/layout/index.html + src/components/*.html`);
