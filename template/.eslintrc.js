module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "plugin:vue/essential",
    "parserOptions": {
        "parser": "babel-eslint",
        "sourceType": "module"
    },
    "plugins": [
        'vue'
    ],
    "rules": {
        "indent": [
            "error",
            4
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
            "never"
        ]
        ,
        "no-console": ["warn"]
    }
};