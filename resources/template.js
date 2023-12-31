// Isolate this code
;(function () {
    'use strict'

    const tiTestbed = window['tiTestbed']
    // const log = tiTestbed.log

    /** Module name must match this nodes html file @constant {string} moduleName */
    const moduleName = 'ti-template'

    // Standard width for typed input fields
    // const tiWidth = tiTestbed.typedInputWidth

    /** Prep for edit
     * @param {*} node A node instance as seen from the Node-RED Editor
     */
    function onEditPrepare(node) {
        // log.log('onEditPrepare', node)

        tiTestbed.doTooltips('#ti-edit-panel') // Do this at the end
    } // ----- end of onEditPrepare() ----- //

    // @ts-ignore
    RED.nodes.registerType(moduleName, {
        defaults: {
            name: { value: '' },
            topic: { value: '' },
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
        /** Alternatively, bind `this` so you don't need to pass as an arg.
         *  Then use `this` instead of `node` in the onEditPrepare function.
         */
        // oneditprepare: function () { onEditPrepare.call(this) },

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
