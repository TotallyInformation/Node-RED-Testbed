/** Common functions and data for TI nodes
 * Load as: ./resources/@totallyinformation/node-red-testbed/ti-common.js
 */

;(function () { // eslint-disable-line sonarjs/cognitive-complexity
    'use strict'
    // Make sure we only run this once
    if (!window['tiTestbed']) {
        let _dbg = false

        /** Add a "uibuilder" object to the Node-RED Editor
         * To contain common functions, variables and constants for UIBUILDER nodes
         */
        const tiTestbed = window['tiTestbed'] = {
            paletteCategory: 'Totally Info Testbed',
            // Standard width for typed input fields
            typedInputWidth: '68.5%',
            // Are we running on local device?
            localHost: ['localhost', '127.0.0.1', '::1', ''].includes(window.location.hostname) || window.location.hostname.endsWith('.localhost'),
            // Debug output via log() - turn on/off with true/false
            get debug() { return _dbg },
            set debug(dbg) {
                if (![true, false].includes(dbg)) return
                if (dbg === null) _dbg = !_dbg
                else _dbg = dbg
                this.log = _dbg ? console.log : function() {}
            },
            log: function(...args) {},
            /** Add jQuery UI formatted tooltips
             * @param {string} baseSelector CSS Selector that is the top of the hierarchy to impact
             */
            doTooltips: function doTooltips(baseSelector) {
                // Select our page elements
                $(baseSelector).tooltip({
                    items: 'img[alt], [aria-label], [title]',
                    track: true,
                    content: function() {
                        const element = $( this )
                        if ( element.is( '[title]' ) ) {
                            return element.attr( 'title' )
                        } else if ( element.is( '[aria-label]' ) ) {
                            return element.attr( 'aria-label' )
                        } else if ( element.is( 'img[alt]' ) ) {
                            return element.attr( 'alt' )
                        } else return ''
                    },
                })
            },
            changeNodeBox: function changeNodeBox(nodeid, options) {
                const target = $(`#${nodeid}`)
                if (target) {
                    // target.find('rect.red-ui-flow-node').attr('height', '200')
                    // d3.select(`#${nodeid}> rect.red-ui-flow-node`).attr('height', '200')
                    console.log('changeNodeBox', { target, nodeid, options })
                } else {
                    console.log('changeNodeBox - Target not found', { nodeid, options })
                }
                // g#e4a48f0df31c0e90.red-ui-flow-node > rect
            },
            /** Add an event watcher to a node
             * NB: Has to define watch on higher element since actual node may not yet be defined at setup time.
             * @param {string} nodeid The node id of the watched node
             * @param {string} evTypes One or more event types to watch (space separated, add modifier tags if desired - e.g. click.myclick) @link https://api.jquery.com/on/#Event-names-and-namespaces
             * @param {function(*, *)} cb A callback function to execute. Receives the event and the target svg `g` element as its arguments.
             */
            watchNodeBox: function watchNodeBox(nodeid, evTypes, cb) {
                if (!nodeid || !evTypes || !cb) return

                $(`#${'red-ui-workspace-chart'} > svg .red-ui-workspace-chart-event-layer`)
                    .on(evTypes, function(event) {
                        try { // May fail if target is an SVG element
                            const target = event.target.closest(`#${nodeid}`)
                            if (target) { // the node was found
                                cb(event, target)
                            }
                        } catch (e) {
                            console.warn('event.target not present, an SVG element maybe?', event)
                        }
                    })
            },
        } // --- end of global tiTestbed object ---

        // Turn on debug by default if running on localhost
        tiTestbed.debug = tiTestbed.localHost
        tiTestbed.log('[tiTestbed] DEBUG ON (because running on localhost)', {window})

        //#region Track Editor changes - adds node.AddType ('load', 'new' or 'paste/import')
        // WARNING: nodes:add fires at paste - but escape will cancel and not actually add the node
        RED.events.on('nodes:add', function(node) {
            if ( node.type === 'ti-dummy') {
                // Track what type of addition this is
                if (node.changed === false && !('moved' in node)) node.addType = 'load'
                else if (!('_config' in node)) node.addType = 'new'
                else if (node.changed === true && ('_config' in node)) node.addType = 'paste/import'
                // Example of changing/deleting a property on paste or import
                if (node.addType === 'paste/import') {
                    delete node.name
                    // We have to change this if we want the display version to change (if the prop is part of the label)
                    delete node._config.name
                }
                // Inform interested functions that something was added (and why)
                RED.events.emit('ti-testbed:ti-dummy-node-added', node)
                // tiTestbed.log('[tiTestbed] ', `\n_Config? '${'_config' in node}'`, `\nl? '${node.l}'`, `\nmoved? '${node.moved}'`, `\nchanged? '${node.changed}'`, node)
            }
        })
        RED.events.on('nodes:change', function(node) {
            if ( node.type === 'ti-dummy') {
                delete node.addType
                // tiTestbed.log('[tiTestbed] dummy node changed:', node)
                RED.events.emit('ti-testbed:ti-dummy-node-changed', node)
            }
        })
        RED.events.on('nodes:remove', function(node) {
            if ( node.type === 'ti-dummy') {
                // tiTestbed.log('[tiTestbed] dummy node removed: ', node)
                RED.events.emit('ti-testbed:ti-dummy-node-removed', node)
            }
        })
        // RED.events.on('deploy', function() {
        //     tiTestbed.log('[tiTestbed] Deployed')
        // })
        // RED.events.on('workspace:dirty', function(data) {
        //     tiTestbed.log('[tiTestbed] Workspace dirty:', data)
        // })
        // RED.events.on('runtime-state', function(event) {
        //     tiTestbed.log('[tiTestbed] Runtime State:', event)
        // })
        //#endregion

        RED.events.emit('ti-testbed:ti-common-run', {'some': 'data'})

        /** If debug, dump out key information to console */
        if (tiTestbed.debug === true) {
            setTimeout( () => {
                console.groupCollapsed('[tiTestbed] RED Settings ...')
                console.log(RED)
                // console.log(RED.settings)
                console.groupEnd()
            }, 1500)
        }
    }
}())
