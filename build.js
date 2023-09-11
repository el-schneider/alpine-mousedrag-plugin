import esbuild from "esbuild";

const scriptName = "alpine-mousedrag-plugin";
const watching = process.argv.includes("--watch");

function build(options = {}) {
  options.define || (options.define = {});
  options.define["process.env.NODE_ENV"] = watching
    ? `'development'`
    : `'production'`;

  return esbuild
    .build({
      ...options,
    })
    .catch((e) => {
      process.exit(1);
    });
}

function buildScripts() {
  // CDN
  build({
    entryPoints: ["src/index.ts"],
    outfile: `dist/${scriptName}.js`,
    bundle: true,
    platform: "browser",
  });

  if (!watching) {
    build({
      entryPoints: ["src/index.ts"],
      outfile: `dist/example.js`,
      bundle: true,
      platform: "browser",
    });
  }

  // CDN — minified
  build({
    entryPoints: ["src/index.ts"],
    outfile: `dist/${scriptName}.min.js`,
    bundle: true,
    minify: true,
    platform: "browser",
  });

  // ESM
  build({
    entryPoints: ["src/index.ts"],
    outfile: `dist/${scriptName}.esm.js`,
    bundle: true,
    platform: "neutral",
    mainFields: ["module", "main"],
  });

  // CommonJS
  build({
    entryPoints: ["src/index.ts"],
    outfile: `dist/${scriptName}.cjs.js`,
    bundle: true,
    target: ["node10.4"],
    platform: "node",
  });
}

async function watch() {
  let ctx = await esbuild.context({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outfile: "dist/example.js",
  });

  await ctx.watch();
}

if (watching) {
  console.log("🎵 Aaaaaaaa WATCH ME NOW 🎵");
  watch();
  buildScripts();
} else {
  buildScripts();
}
