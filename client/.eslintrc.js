module.exports = {
    parserOptions: {
        sourceType: "module",
        allowImportExportEverywhere: true,
        ecmaVersion: 13
    },
    plugins: ["import"],
    ignorePatterns: [
        ".git/",
        ".idea/",
        "node_modules/",
        "dist/",
    ],
    rules: {
        "max-len": ["warn", 150],
        "max-statements-per-line": ["warn", {max: 1}],
        semi: ["error", "always"],
        "comma-dangle": ["off"],
        "no-multiple-empty-lines": "off",
        indent: ["warn", 4, {SwitchCase: 1}],

        /* variables */
        "no-var": "error",
        "prefer-const": "warn",
        "no-const-assign": "error",
        "no-unused-vars": ["warn", {vars: "local", args: "none"}],

        /* literals */
        "prefer-regex-literals": "warn",
        "quotes": ["warn", "double", {allowTemplateLiterals: true}],

        /* imports */
        "import/no-relative-parent-imports": "error",
        "no-duplicate-imports": ["error"],

        /* if else */
        "no-else-return": ["warn", {allowElseIf: false}],
        "no-lonely-if": ["warn"],

        /* function */
        "prefer-arrow-callback": "warn",
        "arrow-parens": ["off"],
        "arrow-spacing": ["warn", {before: true, after: true}],
        "func-call-spacing": ["warn", "never"],

        /* object */
        "key-spacing": ["warn", {beforeColon: false, afterColon: true}],
        "object-curly-spacing": ["warn", "never"],

        /* other spacing */
        "keyword-spacing": ["warn"],
        "array-bracket-spacing": ["warn", "never"],
        "comma-spacing": ["warn", {after: true}]
    }
};