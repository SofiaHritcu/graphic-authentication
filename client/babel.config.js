module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset",
    "@babel/preset-env",
    "env",
    {
      targets: {
        browsers: ["last 2 Chrome versions"],
      },
    },
  ],
  plugins: [
    ["@babel/transform-runtime"],
    "transform-runtime",
    {
      regenerator: true,
    },
  ],
};
