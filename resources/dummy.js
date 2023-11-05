// Isolate this code
;(function () {
    'use strict'

    // RED._debug({topic: 'RED.settings', payload:RED.settings})

    const tiTestbed = window['tiTestbed']
    // const log = tiTestbed.log

    /** Module name must match this nodes html file @constant {string} moduleName */
    const moduleName = 'ti-dummy'

    // Standard width for typed input fields
    // const tiWidth = tiTestbed.typedInputWidth

    // Note that a cancelled or undone paste will trigger and add followed by a delete
    RED.events.on('ti-testbed:ti-dummy-node-added', (node) => {
        console.log('[dummy] ti-testbed:ti-dummy-node-added was fired', node, this)
    })
    RED.events.on('ti-testbed:ti-dummy-node-changed', (node) => {
        console.log('[dummy] ti-testbed:ti-dummy-node-changed was fired', node)
    })
    RED.events.on('ti-testbed:ti-common-node-deleted', (node) => {
        console.log('[dummy] ti-testbed:ti-dummy-node-deleted was fired', node)
    })

    /** Validate the topic input - this is called on Editor load as well as on change
     * @param {*} value The input value to be validated
     * @returns {boolean} True if valid
     */
    function validateTopic(value) {
        // log('validateTopic function called')
        return true
    }

    /** Prep for edit
     * @param {*} node A node instance as seen from the Node-RED Editor
     */
    function onEditPrepare(node) {
        // log.log('onEditPrepare', node)

        tiTestbed.doTooltips('#ti-edit-panel') // Do this at the end
    } // ----- end of onEditPrepare() ----- //

    // @ts-ignore
    RED.nodes.registerType(moduleName, {
        // NOTE: Validations are called on Editor load, not just on change
        defaults: {
            name: { value: '' },
            topic: { value: '', validate: validateTopic },
        },
        align: 'left',
        inputs: 1,
        inputLabels: 'Some Input',
        outputs: 1,
        outputLabels: ['Output 1'],
        icon: 'font-awesome/fa-code',
        label: function () {
            return this.name || moduleName
        },
        category: tiTestbed.paletteCategory,
        color: 'var(--ti-testbed-node-colour)',
        paletteLabel: moduleName,

        /** Prepares the Editor panel */
        oneditprepare: function () { onEditPrepare(this) },

        /** Available methods:
         * oneditprepare: (function) called when the edit dialog is being built.
         * oneditsave:   (function) called when the edit Done button pressed - before save happens.
         * oneditcancel: (function) called when the edit Cancel button pressed - before cancel happens.
         * oneditdelete: (function) called when the delete button in a configuration node’s edit dialog is pressed - before delete.
         * oneditresize: (function) called when the edit dialog is resized.
         * onpaletteadd: (function) called when the node type is added to the palette.
         * onpaletteremove: (function) called when the node type is removed from the palette.
         */
    }) // ---- End of registerType() ---- //
}())
