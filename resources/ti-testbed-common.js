/** Common functions and data for TI nodes
 * Load as: ./resources/@totallyinformation/node-red-testbed/ti-common.js
 */

/** TODO
 * Now this is loaded as a plugin, should really use
 *   RED.plugins.registerPlugin('ti-dummy-edit-plugin', { onadd: function() { ... } } )
 * to register and run.
 * https://github.com/node-red/nrlint/blob/bb60347c4a11e5e0bbc77ea20e75535677c5bddd/src/nrlint-core.html#L344
 * Also note that RED is available here
 */

;(function (RED) { // eslint-disable-line sonarjs/cognitive-complexity
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

        // Don't seem to work - see dummy customNode.js
        RED.events.emit('ti-testbed:ti-common-run', {'some': 'data'})
        RED.comms.on('ti-testbed:test', (data) => {
            console.log('on ti-testbed:test', data)
        })
        RED.events.on('ti-testbed:test2', (data) => {
            console.log('on ti-testbed:test2', data)
        })

        /** If debug, dump out key information to console */
        if (tiTestbed.debug === true) {
            setTimeout( () => {
                console.groupCollapsed('[tiTestbed] RED Settings ...')
                console.log(RED)
                // console.log(RED.settings)
                console.groupEnd()
            }, 1500)
        }

        // https://discourse.nodered.org/t/special-indication-on-nodes-with-description/78646/76
        // RED.view.node_width and RED.view.node_height
        // RED.events.on( 'editor:close', function(data) {
        //     let x = 0
        //     let y = 0
        //     RED.nodes.eachNode( n => {
        //         y++
        //         $(`#${n.id}`).find('.red-ui-info-available-indicator').remove()
        //         if ( n.info ) {
        //             x++
        //             // $(`#${n.id}`).append('<g class="red-ui-flow-node-available-indicator" transform="translate(5,5)"><circle cx="5" cy="5" r="5"></circle></g>')
        //             // // NB: You have to re-render the container (ref: https://stackoverflow.com/a/36305466/1309986):
        //             // $(`#${n.id}`).html($(`#${n.id}`).html())
        //         }
        //     })
        //     console.log(x, y)
        // })
    }

    RED.plugins.registerPlugin('ti-testbed-common-edit-plugin', {
        // type: 'ti-testbed-common-edit-plugin', // optional
        onadd: function() {
            console.log('[ti-dummy-edit-plugin] ti-testbed-common.js loaded, onadd called')

            if (window['uibuilder']) console.log('>> ti-testbed-common found uibuilder >> ', window['uibuilder'])
        },
        // onremove: function() {},
    } )

// @ts-ignore
}(RED))
