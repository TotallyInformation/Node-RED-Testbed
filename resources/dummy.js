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

    /** Prep for edit
     * @param {*} node A node instance as seen from the Node-RED Editor
     */
    function onEditPrepare(node) {
        // log.log('onEditPrepare', node)

        window['tiDoTooltips']('#ti-edit-panel') // Do this at the end
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

        /** Runs before save (Actually when Done button pressed) - oneditsave */
        /** Runs before cancel - oneditcancel */
        /** Handle window resizing for the editor - oneditresize */
        /** Show notification warning before allowing delete - oneditdelete */
    }) // ---- End of registerType() ---- //
}())
