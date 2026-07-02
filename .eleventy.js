// ===========================================================================
// .eleventy.js — Eleventy configuration
// ===========================================================================
// What this file does:
//   1. Tells Eleventy that source files live in `src/` and output goes
//      to `_site/`.
//   2. Passes through `src/assets/` and `src/styles/` unchanged to output.
//   3. Adds a couple of small filters we use in templates.
//   4. Tells Markdown files to be processed by Nunjucks too, so the
//      `{% extends %}` in our page Markdown files resolves correctly.
// ===========================================================================

const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {

  // ---- YAML data files ----------------------------------------------------
  // Eleventy reads JSON/JS in _data/ by default; this enables .yml/.yaml too.
  eleventyConfig.addDataExtension("yml,yaml", contents => yaml.load(contents));

  // ---- Static asset passthrough -------------------------------------------
  // Anything in these folders is copied verbatim to _site/. No processing.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/styles": "styles" });

  // ---- Carried over from the previous (Jekyll) site -----------------------
  // files/ — paper PDFs linked from publications.yml (rcphysics.com/files/…)
  // CNAME  — the custom domain (www.rcphysics.com); keeps the domain on deploy.
  eleventyConfig.addPassthroughCopy("files");
  eleventyConfig.addPassthroughCopy("CNAME");

  // ---- Watch targets ------------------------------------------------------
  // Rebuild on CSS edits during `npm run dev`.
  eleventyConfig.addWatchTarget("src/styles/");

  // ---- Small filter: format a number with thousands separators -----------
  // Used for things like "1.3M+" displays if you want them computed.
  eleventyConfig.addFilter("commas", n =>
    typeof n === "number" ? n.toLocaleString("en-US") : n
  );

  // ---- Small filter: ISO date for the footer / "updated" labels ----------
  eleventyConfig.addFilter("isoDate", d => {
    const date = d instanceof Date ? d : new Date(d || Date.now());
    return date.toISOString().slice(0, 10);
  });

  // ---- Return the config --------------------------------------------------
  return {
    dir: {
      input:    "src",
      output:   "_site",
      includes: "_includes",
      data:     "_data",
    },
    // Process .md files with Nunjucks first, then Markdown.
    // This lets us use {% extends %} in page front matter.
    markdownTemplateEngine: "njk",
    htmlTemplateEngine:     "njk",
    dataTemplateEngine:     "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
