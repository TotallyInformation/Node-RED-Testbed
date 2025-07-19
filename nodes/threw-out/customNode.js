/* eslint-disable jsdoc/valid-types */
/** An inline output (debug) node
 *
 * Copyright (c) 2025-2025 Julian Knight (Totally Information)
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
 * @typedef {import('../../typedefs').runtimeDebugOutput} runtimeDebugOutput
 * @typedef {import('../../typedefs').tiThrewOutNode} tiThrewOutNode <= Change this to be specific to this node
 */

// #region ----- Module level variables ---- //

// Uncomment this if you want to use the promisified version of evaluateNodeProperty
// const { promisify } = require('node:util')

const util = require('node:util')

/** Main (module) variables - acts as a configuration object
 *  that can easily be passed around.
 */
const mod = {
    /** @type {runtimeRED|undefined} Reference to the master RED instance */
    RED: undefined,
    /** @type {Function|undefined} Reference to a promisified version of RED.util.evaluateNodeProperty*/
    // evaluateNodeProperty: undefined,
    /** @type {string} Custom Node Name - has to match with html file and package.json `red` section */
    nodeName: 'threw-out', // <== CHANGE
    /** @type {number} Max length of debug output */
    debuglength: 1000, // Max length of debug output
}

// #endregion ----- Module level variables ---- //

// #region ----- Module-level support functions ----- //

/** Send somthing to the Editor's debug sidebar
 * @param {object} commsMsg A comms msg object to output to debug (not the original msg)
 */
function sendDebug(commsMsg) {
    const newmsg = mod.RED.util.encodeObject(commsMsg, { maxLength: mod.debuglength, })
    mod.RED.comms.publish('debug', newmsg)
}

/** Prepare the value to send to the Editor's debug sidebar
 * @param {runtimeNode & tiThrewOutNode} node The node instance
 * @param {object} msg The message object
 * @param {Function} done The callback function to call when done
 */
function prepareValue(node, msg, done) {
    const RED = mod.RED

    // Either apply the jsonata expression or...
    if (node.preparedEditExpression) {
        RED.util.evaluateJSONataExpression(node.preparedEditExpression, msg, (err, value) => {
            if (err) {
                done(RED._('debug.invalid-exp', { error: node.editExpression, }))
            } else {
                done(null, {
                    id: node.id, z: node.z, _alias: node._alias,
                    path: node._flow.path, name: node.name,
                    topic: msg.topic, msg: value,
                })
            }
        })
    } else {
        // Extract the required message property
        let property = 'payload'
        let output = msg[property]
        if (node.complete !== 'false' && typeof node.complete !== 'undefined') {
            property = node.complete
            try {
                output = RED.util.getMessageProperty(msg, node.complete)
            } catch(err) {
                output = undefined
            }
        }
        done(null, {
            id: node.id, z: node.z, _alias: node._alias,
            path: node._flow.path, name: node.name,
            topic: msg.topic, property: property, msg: output,
        })
    }
}

/** Prepare the value to send to the Editor's status bar
 * @param {runtimeNode & tiThrewOutNode} node The node instance
 * @param {object} msg The message object
 * @param {Function} done The callback function to call when done
 */
function prepareStatus(node, msg, done) {
    const RED = mod.RED

    if (node.statusType === 'auto') {
        if (node.complete === 'true') {
            done(null, { msg: msg.payload, })
        } else {
            prepareValue(node, msg, (err, debugMsg) => {
                if (err) {
                    node.error(err)
                    return
                }
                done(null, { msg: debugMsg.msg, })
            })
        }
    } else {
        // Either apply the jsonata expression or...
        if (node.preparedStatExpression) {
            RED.util.evaluateJSONataExpression(node.preparedStatExpression, msg, (err, value) => {
                if (err) {
                    done(node._('debug.invalid-exp', { error: node.editExpression, }))
                } else {
                    done(null, { msg: value, })
                }
            })
        } else {
            // Extract the required message property
            let output
            try {
                output = RED.util.getMessageProperty(msg, this.statusVal)
            } catch(err) {
                output = undefined
            }
            done(null, { msg: output, })
        }
    }
}

/** 1) Complete module definition for our Node. This is where things actually start.
 * @param {runtimeRED} RED The Node-RED runtime object
 */
function ModuleDefinition(RED) {
    // As a module-level named function, it will inherit `mod` and other module-level variables

    // Save a reference to the RED runtime for convenience
    mod.RED = RED

    mod.debuglength = RED.settings.debugMaxLength || 1000
    mod.statuslength = RED.settings.debugStatusLength || 32
    mod.useColors = RED.settings.debugUseColors || false
    util.inspect.styles.boolean = 'red'

    // Save a ref to a promisified version to simplify async callback handling
    // mod.evaluateNodeProperty = promisify(mod.RED.util.evaluateNodeProperty)

    /** Register a new instance of the specified node type (2) */
    RED.nodes.registerType(mod.nodeName, nodeInstance)
}

/** 2) This is run when an actual instance of our node is committed to a flow
 * type {function(this:runtimeNode&senderNode, runtimeNodeConfig & senderNode):void}
 * @param {runtimeNodeConfig & tiThrewOutNode} config The Node-RED node instance config object
 * @this {runtimeNode & tiThrewOutNode}
 */
function nodeInstance(config) {
    // As a module-level named function, it will inherit `mod` and other module-level variables

    // If you need it - which you will here - or just use mod.RED if you prefer:
    const RED = mod.RED
    if (RED === null) return

    const hasEditExpression = config.targetType === 'jsonata'

    // @ts-ignore Create the node instance - `this` can only be referenced AFTER here
    RED.nodes.createNode(this, config)

    this.isDebugging = config.tosidebar || config.tostatus || config.console

    /** Transfer config items from the Editor panel to the runtime */
    this.name = config.name ?? ''
    this.active = config.active ?? true
    this.tosidebar = config.tosidebar ?? true
    this.console = config.console ?? false
    this.tostatus = config.tostatus ?? false
    this.complete = hasEditExpression ? null : (config.complete || 'payload').toString() // config.complete ?? 'false'
    this.targetType = config.targetType ?? undefined
    this.statusVal = config.statusVal ?? this.complete
    this.statusType = config.statusType ?? 'counter'

    if (this.complete === 'false') this.complete = 'payload'

    this.counter = 0
    this.lastTime = new Date().getTime()
    this.timeout = null
    if (this.tosidebar === undefined) {
        this.tosidebar = true
    }
    this.active = (config.active === null || typeof config.active === 'undefined') || config.active
    if (this.tostatus) {
        this.status({ fill: 'grey', shape: 'ring', })
        this.oldState = '{}'
    }
    this.editExpression = hasEditExpression ? config.complete : null

    const hasStatExpression = (config.statusType === 'jsonata')
    const statExpression = hasStatExpression ? config.statusVal : null

    if ( this.statusType === 'counter' ) {
        this.status({ fill: 'blue', shape: 'ring', text: this.counter, })
    } else {
        this.status({ fill: '', shape: '', text: '', })
    }
    this.preparedEditExpression = null
    this.preparedStatExpression = null
    if (this.editExpression) {
        try {
            this.preparedEditExpression = RED.util.prepareJSONataExpression(this.editExpression, this)
        } catch (e) {
            this.error(RED._('debug.invalid-exp', { error: this.editExpression, }))
            return
        }
    }
    if (statExpression) {
        try {
            this.preparedStatExpression = RED.util.prepareJSONataExpression(statExpression, this)
        } catch (e) {
            this.error(RED._('debug.invalid-exp', { error: this.editExpression, }))
            return
        }
    }

    this.on('close', function() {
        if (this.oldState) {
            this.status({})
        }
        if (this.timeout) {
            clearTimeout(this.timeout)
        }
    })

    /** Handle incoming msg's - note that the handler fn inherits `this` */
    this.on('input', inputMsgHandler)
} // ---- End of nodeInstance ---- //

/** 3) Run whenever a node instance receives a new input msg
 * NOTE: `this` context is still the parent (nodeInstance).
 * See https://nodered.org/blog/2019/09/20/node-done
 * @param {object} msg The msg object received.
 * @param {Function} send Per msg send function, node-red v1+
 * @param {Function} done Per msg finish function, node-red v1+
 * @this {runtimeNode & tiThrewOutNode}
 */
async function inputMsgHandler(msg, send, done) {
    // const RED = mod.RED

    // if (this.active && this.tosidebar) {
    //     sendDebug(this, msg)
    // }

    if (this.isDebugging) {
        if (
            Object.hasOwnProperty.call(msg, 'status')
            && Object.hasOwnProperty.call(msg.status, 'source')
            && Object.hasOwnProperty.call(msg.status.source, 'id')
            && (msg.status.source.id === this.id)
        ) {
            done()
            return
        }
        if (this.tostatus === true) {
            if ( this.statusType === 'counter' ) {
                const differenceOfTime = (new Date().getTime() - this.lastTime)
                this.lastTime = new Date().getTime()
                this.counter++
                if ( differenceOfTime > 100 ) {
                    this.status({ fill: 'blue', shape: 'ring', text: this.counter, })
                } else {
                    if (this.timeout) {
                        clearTimeout(this.timeout)
                    }
                    this.timeout = setTimeout(() => {
                        this.status({ fill: 'blue', shape: 'ring', text: this.counter, })
                    }, 200)
                }
            } else {
                prepareStatus(this, msg, (err, debugMsg) => {
                    if (err) {
                        this.error(err)
                        return
                    }
                    const output = debugMsg.msg
                    let st = (typeof output === 'string') ? output : util.inspect(output)
                    let fill = 'grey'
                    let shape = 'dot'
                    if (typeof output === 'object' && output?.fill && output?.shape && output?.text) {
                        fill = output.fill
                        shape = output.shape
                        st = output.text
                    }
                    if (this.statusType === 'auto') {
                        if (Object.hasOwnProperty.call(msg, 'error')) {
                            fill = 'red'
                            st = msg.error.message
                        }
                        if (Object.hasOwnProperty.call(msg, 'status')) {
                            fill = msg.status.fill || 'grey'
                            shape = msg.status.shape || 'ring'
                            st = msg.status.text || ''
                        }
                    }

                    if (st.length > mod.statuslength) {
                        st = `${st.slice(0, mod.statuslength)}}...`
                    }

                    const newStatus = { fill: fill, shape: shape, text: st, }
                    if (JSON.stringify(newStatus) !== this.oldState) { // only send if we have to
                        this.status(newStatus)
                        this.oldState = JSON.stringify(newStatus)
                    }
                })
            }
        }

        if (this.complete === 'true') {
            // debug complete msg object
            if (this.console === true) {
                this.log(`\n${util.inspect(msg, { colors: mod.useColors, depth: 10, })}`)
            }
            if (this.active && this.tosidebar) {
                // @ts-ignore
                sendDebug({
                    id: this.id, z: this.z, _alias: this._alias,
                    path: this._flow.path, name: this.name,
                    topic: msg.topic, msg: msg,
                })
            }
            done()
        } else {
            prepareValue(this, msg, (err, debugMsg) => {
                if (err) {
                    this.error(err)
                    return
                }
                const output = debugMsg.msg
                if (this.console === true) {
                    if (typeof output === 'string') {
                        this.log((output.indexOf('\n') !== -1 ? '\n' : '') + output)
                    } else if (typeof output === 'object') {
                        this.log(`\n${util.inspect(output, { colors: mod.useColors, depth: 10, })}`)
                    } else {
                        this.log(util.inspect(output, { colors: mod.useColors, }))
                    }
                }
                if (this.active) {
                    if (this.tosidebar == true) {
                        sendDebug(debugMsg)
                    }
                }
                done()
            })
        }
    }

    // Pass through
    send(msg)

    // We are done - not really needed probably
    done()
} // ----- end of inputMsgHandler ----- //

// #endregion ----- Module-level support functions ----- //

// Export the module definition (1), this is consumed by Node-RED on startup.
module.exports = ModuleDefinition

// EOF
