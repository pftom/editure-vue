const path = require("path");
const MonacoEditorPlugin = require("monaco-editor-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts"],
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": resolve("src"),
        components: resolve("src/components"),
        extensions: resolve("src/extensions"),
        menus: resolve("src/menus"),
        nodes: resolve("src/nodes"),
        marks: resolve("src/marks"),
        plugins: resolve("src/plugins"),
        queries: resolve("src/queries"),
        assets: resolve("src/assets"),
        commands: resolve("src/commands"),
        utils: resolve("src/utils"),

        "@editure": resolve("src"),
      },
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: "~",
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
      new MonacoEditorPlugin({
        languages: ["javascript", "html", "css", "typescript"],
      }),
    ],
  },
};
