module.exports = {
  'plugins': [
    'stylelint-no-unsupported-browser-features',
  ],
  "extends": "stylelint-config-standard",
  'rules': {
    'at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': ['global-import']
      }
    ]
  }
};
