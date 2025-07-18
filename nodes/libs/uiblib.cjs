/* eslint-disable max-params */
/* eslint-env node es2017 */
/**
 * Utility library for uibuilder
 *
 * Copyright (c) 2017-2023 Julian Knight (Totally Information)
 * https://it.knightnet.org.uk
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
 **/
'use strict'

/** --- Type Defs ---
 * @typedef {import('../../typedefs.js').runtimeRED} runtimeRED
 * @typedef {import('../../typedefs').runtimeNodeConfig} runtimeNodeConfig
 * @typedef {import('../../typedefs').runtimeNode} runtimeNode
 * typedef {import('../typedefs.js')}
 * @typedef {import('node-red')} Red
 */

const { promisify } = require('util')

module.exports = {

    /**  Get property values from an Object.
     * Can list multiple properties, the first found (or the default return) will be returned
     * Makes use of RED.util.getMessageProperty
     * @param {object} RED - RED
     * @param {object} myObj - the parent object to search for the props
     * @param {string|string[]} props - one or a list of property names to retrieve.
     *                               Can be nested, e.g. 'prop1.prop1a'
     *                               Stops searching when the first property is found
     * @param {any} defaultAnswer - if the prop can't be found, this is returned
     * @returns {any} The first found property value or the default answer
     */
    getProps: function(RED, myObj, props, defaultAnswer = []) {
        if ( (typeof props) === 'string' ) {
            // @ts-ignore
            props = [props]
        }
        if ( !Array.isArray(props) ) {
            return undefined
        }
        let ans
        for (let i = 0; i < props.length; i++) {
            try { // errors if an intermediate property doesn't exist
                ans = RED.util.getMessageProperty(myObj, props[i])
                if ( typeof ans !== 'undefined' ) {
                    break
                }
            } catch (e) {
                // do nothing
            }
        }
        return ans || defaultAnswer
    }, // ---- End of getProps ---- //

    /** Simple fn to set a node status in the admin interface
     * fill: red, green, yellow, blue or grey
     * shape: ring, dot
     * @param {object} node _
     */
    setNodeStatus: function( node ) {
        node.status(node.statusDisplay)
    }, // ---- End of setNodeStatus ---- //

    /** Get an individual value for a typed input field and save to supplied node object - REQUIRES standardised node property names
     * Use propnameSource and propnameSourceType as standard input field names
     * @param {string} propName Name of the node property to check
     * @param {runtimeNode} node reference to node instance
     * @param {*} msg incoming msg
     * @param {runtimeRED} RED Reference to runtime RED library
     * @param {string} [src] Name of the typed input field (defaults to `${propName}Source`)
     * @param {string} [srcType] Name of the field holding the typed input field type (defaults to `${propName}SourceType`)
     */
    getSource: async function getSource(propName, node, msg, RED, src, srcType) {
        if (!propName) throw new Error('[uiblib:getSource] No propName provided, cannot continue')
        if (!node) throw new Error('[uiblib:getSource] No node object provided, cannot continue')
        if (!RED) throw new Error('[uiblib:getSource] No RED reference provided, cannot continue')

        if (!src) src = `${propName}Source`
        if (!srcType) srcType = `${propName}SourceType`

        if (!msg && srcType === 'msg') throw new Error('[uiblib:getSource] Type is msg but no msg object provided, cannot continue')

        if (!(src in node)) throw Error(`[uiblib:getSource] Property ${src} does not exist in supplied node object`)
        if (!(srcType in node)) throw Error(`[uiblib:getSource] Property ${srcType} does not exist in supplied node object`)

        const evaluateNodeProperty = promisify(RED.util.evaluateNodeProperty)

        if (node[src] !== '') {
            try {
                if (msg) node[propName] = await evaluateNodeProperty(node[src], node[srcType], node, msg)
                else node[propName] = await evaluateNodeProperty(node[src], node[srcType], node)
            } catch (e) {
                node.warn(`Cannot evaluate source for ${propName}. ${e.message} (${srcType})`)
            }
        }
    },

} // ---- End of module.exports ---- //

// EOF
