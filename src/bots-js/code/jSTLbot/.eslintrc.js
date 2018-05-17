module.exports = {
  "extends": "airbnb-base",
  "env": {
      "mocha": true
  },
  "rules": {
      "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
      "no-param-reassign": ["warn", { "props": false }],
      "no-underscore-dangle": "off",
      "max-len": "off",
      "linebreak-style": "off"
  }
};