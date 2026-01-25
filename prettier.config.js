//  @ts-check

/** @type {import('prettier').Config} */
const config = {
    semi: true,
    singleQuote: false,
    trailingComma: "none",
    tabWidth: 4,
    singleAttributePerLine: true,
    bracketSameLine: true,
    plugins: ["prettier-plugin-tailwindcss"],
    ignorePath: ["**/min.js", "**/min.css"]
};

export default config;
