const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",  
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
    buildDependencies: {
      // This makes all dependencies of this file - build dependencies
      config: [__filename],
      // By default webpack and loaders are build dependencies
    },
  },
  entry: {
    main: ["./src/index.js", "./src/styles/index.scss"],
  },
  output: {
    filename: "[name].js",
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: "swc-loader"
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
