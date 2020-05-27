//import { fusebox } from 'fuse-box'
let fusebox = require('fuse-box').fusebox

let jsonWorkerFB = fusebox({
    target: 'web-worker',
    entry: 'node_modules/monaco-editor/esm/vs/language/json/json.worker.js',
    watcher: false
})

let cssFB = fusebox({
    target: 'web-worker',
    entry: 'node_modules/monaco-editor/esm/vs/language/css/css.worker.js',
    watcher: false
})

let css = {
    bundles: {
        distRoot: 'dist',
        app: { path: 'css.worker.js' }
    }
}

let htmlFB = fusebox({
    target: 'web-worker',
    entry: 'node_modules/monaco-editor/esm/vs/language/html/html.worker.js',
    watcher: false
})

let html = {
    bundles: {
        distRoot: 'dist',
        app: { path: 'html.worker.js' }
    }
}

let tsFB = fusebox({
    target: 'web-worker',
    entry: 'node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js',
    watcher: false
})

let ts = {
    bundles: {
        distRoot: 'dist',
        app: { path: 'ts.worker.js' }
    }
}

let indexFB = fusebox({
    target: 'server',
    entry: 'src/wc-monaco-editor.ts',
    watcher: false
})

let index = {
    bundles: {
        distRoot: 'dist',
        app: { path: 'wc-monaco-editor.js' }
    }
}


indexFB.runDev(index)
jsonWorkerFB.runDev(index)
cssFB.runDev(css)
htmlFB.runDev(html)
tsFB.runDev(ts)