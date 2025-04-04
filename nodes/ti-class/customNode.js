/** A dummy node for experimentation
 *
 * Copyright (c) 2023-2023 Julian Knight (Totally Information)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict'

/** --- Type Defs - should help with coding ---
 * @typedef {import('../../typedefs').runtimeRED} runtimeRED
 * @typedef {import('../../typedefs').runtimeNodeConfig} runtimeNodeConfig
 * @typedef {import('../../typedefs').runtimeNode} runtimeNode
 * @typedef {import('../../typedefs').tiDummyNode} tiDummyNode <= Change this to be specific to this node
 */

const NrClass = require('../libs/nr-class')


//#region ---- Utility functions ----

/**
 * Examine the RED object's top-2 levels of properties
 * @param {object} RED The RED global object
 */
function whatIsRED(RED) {
    console.groupCollapsed('KEYs of RED')
    Object.keys(RED).forEach( key => {
        console.log(`${key}: `, Object.keys(RED[key]))
    })
    console.groupEnd()
}

/**
 * Examine the node instance object's top-2 levels of properties
 * @param {runtimeNode} node The node object
 */
function whatIsThis(node) {
    console.groupCollapsed('KEYs of NODE')
    Object.keys(node).forEach( key => {
        console.log(`${key}: `, Object.keys(node[key]))
    })
    console.groupEnd()
}

//#endregion ---- ---- ----

class TiClassNode extends NrClass {
    nodeName = 'ti-class'

    constructor() {
        super()
        console.log('>> TiClassNode:constructor >>', this.nodeName)
    }
}

const nrClass = new TiClassNode()

// Export the module definition (1), this is consumed by Node-RED on startup.
module.exports = nrClass.start.bind(nrClass)
// module.exports = function(RED) {
//     const nrClass = new NrClass()
// }

// EOF
