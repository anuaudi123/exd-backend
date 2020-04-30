module.exports = {
    "root": true,
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "overrides": [
        {
          "files": ["*.js", "**/*.js", "**/**/*.js",  "**/**/**/*.js"],
          "excludedFiles": "node_modules/*.js",
          "rules": {
            "quotes": [ 2, "single" ]
          }
        }
      ]
};