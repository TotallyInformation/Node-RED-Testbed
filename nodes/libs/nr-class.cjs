/* eslint-disable jsdoc/valid-types */
/** A parent class for node runtime code.
 * An experiment to try and reduce boilerplate for custom nodes.
 *
 * Copyright (c) 2024-2025 Julian Knight (Totally Information)
 * https://it.knightnet.org.uk, https://github.com/TotallyInformation/node-red-contrib-uibuilder
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
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

class NrNode {
    // #region ---- Class Variables ----
    /** Reference to the master RED instance */
    RED
    /** Custom Node Name - has to match with html file and package.json `red` section */
    nodeName = 'dummy-do-not-use'
    // #endregion ---- ---- ----

    constructor() {
        console.log('>> NrNode:constructor >>', this.nodeName)
    }

    /** 1) Complete module definition for our Node. This is where things actually start.
     * @param {runtimeRED} RED The Node-RED runtime object
     */
    start(RED) {
        console.log('>> NrNode:start >>', this.nodeName)
        // Save a reference to the RED runtime for convenience
        try {
            this.RED = RED || arguments[0]
        } catch (e) {
            console.error('Could not access `this`. Make sure you bind the start fn to the class instance.')
        }
        // This is required to give nodeInstance the correct prototype. https://discourse.nodered.org/t/options-for-simplifying-custom-node-runtime-code/84576/19?u=totallyinformation
        this.nodeInstance.prototype = Object.getPrototypeOf(this.nodeInstance)
        try {
            /** Register a new instance of the specified node type (2) */
            this.RED.nodes.registerType(this.nodeName, this.nodeInstance)
        } catch (e) {
            console.trace(`constructor error. ${e.message}`)
        }
    }

    /** 2) This is run when an actual instance of our node is committed to a flow
     * type {function(this:runtimeNode&senderNode, runtimeNodeConfig & senderNode):void}
     * @param {runtimeNodeConfig & tiDummyNode} config The Node-RED node instance config object
     * this {runtimeNode & tiDummyNode}
     */
    nodeInstance(config) {
        console.log('>> NrNode:nodeInstance >>')
        console.log('>> NrNode:nodeInstance `this` 1 >>', Object.keys(this))
        // There is nothing in here because this is never reached, failure is higher up
        try {
            this.RED.nodes.createNode(this, config)
        } catch (e) {
            console.trace(`nodeInstance - ${e.message}`, e)
        }
        console.log('>> NrNode:nodeInstance `this` 2 >>', Object.keys(this))
    } // ---- End of nodeInstance ---- //
}

module.exports = NrNode
