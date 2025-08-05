module.exports = function override(config, env) {
  // Add Tailwind CSS support
  const tailwindRules = {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              require('tailwindcss'),
              require('autoprefixer'),
            ],
          },
        },
      },
    ],
  };

  // Find the existing CSS rule and replace it
  const rules = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
  const cssRuleIndex = rules.findIndex(rule => rule.test && rule.test.toString().includes('css'));
  
  rules.splice(cssRuleIndex, 1, tailwindRules);

  return config;
};