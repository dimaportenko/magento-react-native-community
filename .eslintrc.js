module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'object-curly-spacing': ["error", "always"],
    "flowtype/require-valid-file-annotation": [
      2,
      "always", {
        "annotationStyle": "block",
      }
    ]
  }
};
