const webpack = require('webpack');

module.exports = function override(config) {
  // Add fallbacks for Node.js core modules
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "util": require.resolve("util/"),
    "buffer": require.resolve("buffer/"),
    "vm": require.resolve("vm-browserify"),
    "process": require.resolve("process/browser.js") // Note the .js extension
  });
  config.resolve.fallback = fallback;

  // Add plugins
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js', // Note the .js extension
      Buffer: ['buffer', 'Buffer']
    }),
    new webpack.NormalModuleReplacementPlugin(
      /process\/browser/,
      require.resolve('process/browser.js')
    )
  ]);

  // Add this to handle ESM modules trying to import process/browser
  config.module.rules.push({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false // Disable the fully specified behavior
    }
  });

  // Ignore source map warnings
  config.ignoreWarnings = [/Failed to parse source map/];
  
  return config;
};
