const path = require("path");

// Work in somehow: npx tsc -d --declarationDir types --declarationMap --emitDeclarationOnly
module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.ts",
        "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
        "json.worker": "monaco-editor/esm/vs/language/json/json.worker",
        "css.worker": "monaco-editor/esm/vs/language/css/css.worker",
        "html.worker": "monaco-editor/esm/vs/language/html/html.worker",
        "ts.worker": "monaco-editor/esm/vs/language/typescript/ts.worker"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        globalObject: "self",
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.ttf$/,
                use: ['file-loader']
            }
        ]
    }
};