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

//#region ----- Module level variables ---- //

// Uncomment this if you want to use the promisified version of evaluateNodeProperty
// const { promisify } = require('util')
const { getSource } = require('../libs/uiblib')

/** Main (module) variables - acts as a configuration object
 *  that can easily be passed around.
 */
const mod = {
    /** @type {runtimeRED|undefined} Reference to the master RED instance */
    RED: undefined,
    /** @type {Function|undefined} Reference to a promisified version of RED.util.evaluateNodeProperty*/
    // evaluateNodeProperty: undefined,
    /** @type {string} Custom Node Name - has to match with html file and package.json `red` section */
    nodeName: 'ti-dummy', // <== CHANGE
}

//#endregion ----- Module level variables ---- //

//#region ----- Module-level support functions ----- //

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
 * @param {runtimeNode & tiDummyNode} node The node object
 */
function whatIsThis(node) {
    console.groupCollapsed('KEYs of NODE')
    Object.keys(node).forEach( key => {
        console.log(`${key}: `, Object.keys(node[key]))
    })
    console.groupEnd()
}

/** 1) Complete module definition for our Node. This is where things actually start.
 * @param {runtimeRED} RED The Node-RED runtime object
 */
function ModuleDefinition(RED) {
    // As a module-level named function, it will inherit `mod` and other module-level variables

    // Save a reference to the RED runtime for convenience
    mod.RED = RED

    // Save a ref to a promisified version to simplify async callback handling
    // mod.evaluateNodeProperty = promisify(mod.RED.util.evaluateNodeProperty)

    /** Register a new instance of the specified node type (2) */
    RED.nodes.registerType(mod.nodeName, nodeInstance)
}

/** 2) This is run when an actual instance of our node is committed to a flow
 * type {function(this:runtimeNode&senderNode, runtimeNodeConfig & senderNode):void}
 * @param {runtimeNodeConfig & tiDummyNode} config The Node-RED node instance config object
 * @this {runtimeNode & tiDummyNode}
 */
function nodeInstance(config) {
    // As a module-level named function, it will inherit `mod` and other module-level variables

    // If you need it - which you will here - or just use mod.RED if you prefer:
    const RED = mod.RED
    if (RED === null) return

    // @ts-ignore Create the node instance - `this` can only be referenced AFTER here
    RED.nodes.createNode(this, config)

    /** Transfer config items from the Editor panel to the runtime */
    this.name = config.name ?? ''
    this.topic = config.topic ?? ''

    // Example typed input fields
    this.tyiMsgSource = config.tyiMsg ?? ''
    this.tyiMsgSourceType = config.tyiMsgSourceType ?? ''
    this.tyiGlobalSource = config.tyiGlobal ?? ''
    this.tyiGlobalSourceType = config.tyiGlobalSourceType ?? ''
    this.tyiEnvSource = config.tyiEnv ?? ''
    this.tyiEnvSourceType = config.tyiEnvSourceType ?? ''
    this.tyiExprSource = config.tyiExpr ?? ''
    this.tyiExprSourceType = config.tyiExprSourceType ?? ''
    this.tyiNodeSource = config.tyiNode ?? ''
    this.tyiNodeSourceType = config.tyiNodeSourceType ?? ''

    // Any dynamic type might have changed between deployment and msg receipt
    // So we don't get them here. Though static ones could be (string, number, json, bool)

    // Include this if you want to examine the RED object's keys
    // whatIsRED(RED)

    // Include this if you want to examine the node instance object's keys
    // whatIsThis(this)

    /** Handle incoming msg's - note that the handler fn inherits `this` */
    this.on('input', inputMsgHandler)
} // ---- End of nodeInstance ---- //

//#endregion ----- Module-level support functions ----- //

/** 3) Run whenever a node instance receives a new input msg
 * NOTE: `this` context is still the parent (nodeInstance).
 * See https://nodered.org/blog/2019/09/20/node-done
 * @param {object} msg The msg object received.
 * @param {Function} send Per msg send function, node-red v1+
 * @param {Function} done Per msg finish function, node-red v1+
 * @this {runtimeNode & tiDummyNode}
 */
async function inputMsgHandler(msg, send, done) { // eslint-disable-line no-unused-vars

    const RED = mod.RED

    // Get all of the typed input values (in parallel)
    // Any dynamic type might have changed between deployment and msg receipt
    await Promise.all([
        getSource('tyiMsg', this, msg, RED),
        getSource('tyiGlobal', this, msg, RED),
        getSource('tyiEnv', this, msg, RED),
        getSource('tyiExpr', this, msg, RED), // contains core data
        getSource('tyiNode', this, msg, RED), // contains core data
    ])

    msg.tyiMsg = this.tyiMsg
    msg.tyiGlobal = this.tyiGlobal
    msg.tyiEnv = this.tyiEnv
    msg.tyiExpr = this.tyiExpr
    msg.tyiNode = this.tyiNode

    const that = this
    console.log({ that })

    // Pass straight through
    send(msg)

    // We are done - Needed because we are async
    done()
} // ----- end of inputMsgHandler ----- //

// Export the module definition (1), this is consumed by Node-RED on startup.
module.exports = ModuleDefinition

// EOF
