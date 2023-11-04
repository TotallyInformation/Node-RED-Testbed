// Isolate this code
;(function () {
    'use strict'

    // RED._debug({topic: 'RED.settings', payload:RED.settings})

    const log = window['uibuilder'].log

    /** Module name must match this nodes html file @constant {string} moduleName */
    const moduleName = 'ti-dummy'
    /** Node's label @constant {string} paletteCategory */
    const nodeLabel = moduleName
    /** Node's palette category @constant {string} paletteCategory */
    const paletteCategory = window['tiTestbed'].paletteCategory
    /** Node's background color @constant {string} paletteColor */
    const paletteColor = 'var(--ti-testbed-node-colour)'

    // Standard width for typed input fields
    // const tiWidth = window['tiTestbed'].typedInputWidth

    /** Prep for edit
     * @param {*} node A node instance as seen from the Node-RED Editor
     */
    function onEditPrepare(node) {
        log.log('onEditPrepare', node)

        window['tiDoTooltips']('#ti-edit-panel') // Do this at the end
    } // ----- end of onEditPrepare() ----- //

    // @ts-ignore
    RED.nodes.registerType(moduleName, {
        category: paletteCategory,
        color: paletteColor,
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
        paletteLabel: nodeLabel,
        label: function () {
            return this.name || moduleName
        },

        /** Prepares the Editor panel */
        oneditprepare: function () { onEditPrepare(this) },

        /** Runs before save (Actually when Done button pressed) - oneditsave */
        /** Runs before cancel - oneditcancel */
        /** Handle window resizing for the editor - oneditresize */
        /** Show notification warning before allowing delete - oneditdelete */
    }) // ---- End of registerType() ---- //
}())
