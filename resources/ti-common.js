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
        } // --- end of global tiTestbed object ---

        // Turn on debug by default if running on localhost
        tiTestbed.debug = tiTestbed.localHost
        tiTestbed.log('[tiTestbed] DEBUG ON (because running on localhost)')

        //#region Track Editor changes
        RED.events.on('nodes:add', function(node) {
            if ( node.type === 'ti-dummy') {
                tiTestbed.log('[tiTestbed] dummy node added:', node)
            }
        })
        RED.events.on('nodes:change', function(node) {
            if ( node.type === 'ti-dummy') {
                tiTestbed.log('[tiTestbed] dummy node changed:', node)
            }
        })
        // RED.events.on('nodes:remove', function(node) {
        //     if ( node.type === 'dummy') {
        //         tiTestbed.log('[tiTestbed] dummy node removed: ', node)
        //     }
        // })
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
