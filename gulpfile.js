/**
 * https://semaphoreci.com/community/tutorials/getting-started-with-gulp-js
 * https://gulpjs.com/plugins/
 * https://gulpjs.com/docs/en/api/concepts/
 * Plugins
 *  https://www.npmjs.com/package/gulp-include - source file inline replacements
 *  https://www.npmjs.com/package/gulp-uglify  - Minify
 *  https://www.npmjs.com/package/gulp-rename  - Rename source filename on output
 *  https://www.npmjs.com/package/gulp-once    - Only do things if files have changed
 *  https://www.npmjs.com/package/gulp-replace - String replacer
 *  https://www.npmjs.com/package/gulp-json-editor - Change data in a JSON file
 *  https://www.npmjs.com/package/gulp-debug
 *  https://github.com/jonschlinkert/gulp-htmlmin
 *  https://www.npmjs.com/package/gulp-esbuild - supports modern es modules
 *
 *  https://www.npmjs.com/package/gulp-concat
 *  https://www.npmjs.com/package/gulp-sourcemaps
 *  https://www.npmjs.com/package/gulp-prompt  - get input from user
 *  https://www.npmjs.com/package/gulp-if-else
 *  https://www.npmjs.com/package/gulp-minify-inline
 *  https://www.npmjs.com/package/gulp-tap - Easily tap into a pipeline. Could replace gulp-replace
 *  https://www.npmjs.com/package/webpack-stream - Use WebPack with gulp
 *  https://www.npmjs.com/package/tinyify - runs various optimizations
 *
 *  ❌https://www.npmjs.com/package/gulp-changed - Does not work as expected
 */

'use strict'

const { src, dest, series, watch, parallel, } = require('gulp')
const include = require('gulp-include')
const once = require('gulp-once')
const rename = require('gulp-rename')
const htmlmin = require('gulp-htmlmin')

if (!process.cwd().startsWith('D:')) {
    throw new Error('NOT RUNNING FROM THE D: DRIVE')
}

// @ts-ignore Find the module version in the package.json
// const { version } = JSON.parse(fs.readFileSync('package.json'))
// Desired release version
// const release = '6.6.0'
// Wanted node.js version - used for ESBUILD
// const nodeVersion = 'node14.14'

// console.log(`Current Version: ${version}. Requested Version: ${release}. Node.js Build Version: ${nodeVersion}`)

// const readline = require('readline')
/** Create a new node from the template */
// function createNewNode(cb) {
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     })
//     rl.question('Enter the name of the new node to create: ', async function (nodeName) {
//         console.log(`\nNew node will be called '${nodeName}'`)
//         try {
//             fs.copy('new-node-template/nodes/node-name', `nodes/${nodeName}`)
//             console.log(`Template runtime copied to 'nodes/${nodeName}'`)
//         } catch (e) {
//             cb(e)
//         }
//         try {
//             fs.copy('new-node-template/src/nodes-html/node-name', `src/editor/${nodeName}`)
//             console.log(`Template Editor source copied to 'src/editor/${nodeName}'`)
//         } catch (e) {
//             cb(e)
//         }

//         rl.close()
//     })
//     rl.on('close', function () {
//         console.log('New node created.\n')
//         // setName(cb)
//         cb()
//     })
// }

//#region ---- Build node panels ----

/** Combine the parts of ti-template.html
 * @param {Function} cb callback
 */
// function buildTiTemplate(cb) {
//     try {
//         src('src/ti-template/main.html')
//             .pipe(include())
//             .pipe(once())
//             .pipe(rename('customNode.html'))
//             .pipe(htmlmin({ collapseWhitespace: true, removeComments: true, minifyJS: true }))
//             .pipe(dest('nodes/ti-template'))
//     } catch (e) {
//         console.error('buildTiTemplate failed', e)
//     }

//     cb()
// }

/** Combine the parts of ti-dummy.html
 * @param {Function} cb callback
 */
// function buildTiDummy(cb) {
//     try {
//         src('src/ti-dummy/main.html')
//             .pipe(include())
//             .pipe(once())
//             .pipe(rename('customNode.html'))
//             .pipe(htmlmin({ collapseWhitespace: true, removeComments: true, minifyJS: true }))
//             .pipe(dest('nodes/ti-dummy'))
//     } catch (e) {
//         console.error('buildTiDummy failed', e)
//     }

//     cb()
// }

//#endregion ---- ---- ----

/**
 * Watch for changes during development, rebuild as needed
 * @param {Function} cb callback
 */
function watchme(cb) {
    // Re-pack uibuilderfe if it changes
    // watch('src/ti-template/*', buildTiTemplate)
    // watch('src/ti-dummy/*', buildTiDummy)

    cb()
}

exports.default = watchme
exports.watch   = watchme
