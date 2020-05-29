//import { fusebox } from 'fuse-box'
let fusebox = require('fuse-box').fusebox
let exec = require('child_process').exec;

var NODE_MODULES = ""
Promise.all([exec('npm root', function callback(error, stdout, stderr) {
    if (error) {
        console.error(error)
        process.exit(error.code)
    }
    NODE_MODULES = stdout.trim()
})])


let jsonFB = fusebox({
    target: 'web-worker',
    entry: NODE_MODULES + '/monaco-editor/esm/vs/language/json/json.worker.js',
    watcher: false
})

let json = {
    bundles: {
        distRoot: 'dist',
        app: { path: 'json.worker.js' }
    }
}

let cssFB = fusebox({
    target: 'web-worker',
    entry: NODE_MODULES + '/monaco-editor/esm/vs/language/css/css.worker.js',
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
    entry: NODE_MODULES + '/monaco-editor/esm/vs/language/html/html.worker.js',
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
    entry: NODE_MODULES + '/monaco-editor/esm/vs/language/typescript/ts.worker.js',
    watcher: false
})

let ts = {
    bundles: {
        distRoot: 'dist',
        app: { path: 'ts.worker.js' }
    }
}

let editorFB = fusebox({
    target: 'web-worker',
    entry: NODE_MODULES + '/monaco-editor/esm/vs/editor/editor.worker.js',
    watcher: false
})

let editor = {
    bundles: {
        distRoot: 'dist',
        app: { path: 'editor.worker.js' }
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
jsonFB.runDev(json)
cssFB.runDev(css)
htmlFB.runDev(html)
tsFB.runDev(ts)
editorFB.runDev(editor)