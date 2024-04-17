import globals from "globals";
import pluginJs from "@eslint/js";
// import plugin from es-plugin-jest




export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
];