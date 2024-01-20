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

    //#region --- custom events for this node type
    // Note that a cancelled or undone paste will trigger an add followed by a delete
    RED.events.on('ti-testbed:ti-dummy-node-added', (node) => {
        console.log('[dummy] ti-testbed:ti-dummy-node-added was fired', node, this)
        tiTestbed.watchNodeBox(node.id, 'click', function(event, target) {
            console.log(`watchNodeBox:${event.type}:${node.id}`, { event, target })
            tiTestbed.changeNodeBox(node.id, {})
        })
    })
    RED.events.on('ti-testbed:ti-dummy-node-changed', (node) => {
        console.log('[dummy] ti-testbed:ti-dummy-node-changed was fired', node)
    })
    RED.events.on('ti-testbed:ti-common-node-deleted', (node) => {
        console.log('[dummy] ti-testbed:ti-dummy-node-deleted was fired', node)
    })
    //#endregion ---

    /** Validate the topic input - this is called on Editor load, panel open, as well as on change
     * @param {*} value The input value to be validated
     * @returns {boolean} True if valid
     */
    function validateTopic(value) {
        /** Notes:
         *  1) `this` is the node instance configuration as at last press of Done.
         *  2) Validation fns are run:
         *      a) On every node instance when the Editor is loaded (e.g. panel not visible) - value is populated but jQ val is undefined.
         *      b) When a new node instance added - value & jq value both `undefined`.
         *      c) When the config panel is opened for an instance.
         *      d) When ANY field value has changed (on keypress) - value & jq value are the same.
         *      e) When ANY field value has changed (on blur) - value & jq value are the same.
         *      f) When ANYTHING happens to ANY field (e.g. copy, paste, changing to a different window, ...)
         *      f) When "Done" is clicked (even if no data changed).
         *  4) jq values are undefined when this is called on load (e.g. panel not open).
         *  5) value and jq value both undefined when a new instance added to flow. Validation is fired at that point.
         *
         * Because of the number of calls - KEEP THIS SHORT AND SIMPLE
         * Use jQuery change functions by preference and maybe reserve this for cases where another process
         * might change the value.
         *
         * This table shows how to differentiate different call executions (NB: value 🟰 jQ always)
         *                          | Visible | this.changed |
         * On page load             |   ❌   |    ❌        | value !== this.[propName]
         * On panel open            |   ✔️   |    ❌/✔️     | value 🟰 this.[propName]
         * On other field change    |   ✔️   |    ❌/✔️     | value 🟰 this.[propName]
         * On other panel trigger   |   ✔️   |    ❌/✔️     | value 🟰 this.[propName]
         * On propName field change |   ✔️   |    ❌/✔️     | value !== this.[propName]
         * On "Done"                |   ✔️   |    ❌/✔️     | value 🟰 this.[propName]
         */

        // As this is called on Editor load, when panel opened AND when a change made
        // you may want to do things only when the panel is open (visible)
        if ($('#node-input-topic').is(':visible')) {
            console.log('[ti-dummy] #node-input-topic IS VISIBLE. ', `Changed? '${this.changed}'.`, `Value: '${value}'.`, `this.topic: '${this.topic}'.`, `jQ value: ${$('#node-input-topic').val()}.`)
        } else {
            console.log('[ti-dummy] #node-input-topic IS NOT VISIBLE. ', `Changed? '${this.changed}'.`, `Value: '${value}'.`, `this.topic: '${this.topic}'.`, `jQ value: ${$('#node-input-topic').val()}.`)
        }

        return true
    }

    const x = [
        'msg', 'flow', 'global',
        'str', 'env', 'jsonata', 're',
    ]

    /** Prep for edit
     * @param {*} node A node instance as seen from the Node-RED Editor
     */
    function onEditPrepare(node) {
        // console.log('onEditPrepare', node)

        // REF: https://nodered.org/docs/api/ui/typedInput/, 
        $('#node-input-tyiMsg')
            .typedInput({
                types: ['msg', 'str'],
                default: 'msg',
                typeField: $('#node-input-tyiMsgSourceType'),
            }).typedInput('width', tiTestbed.typedInputWidth)

        $('#node-input-tyiGlobal')
            .typedInput({
                types: ['global', 'str'],
                default: 'global',
                typeField: $('#node-input-tyiGlobalSourceType'),
            }).typedInput('width', tiTestbed.typedInputWidth)

        $('#node-input-tyiEnv')
            .typedInput({
                types: ['env', 'str'],
                default: 'env',
                typeField: $('#node-input-tyiEnvSourceType'),
            }).typedInput('width', tiTestbed.typedInputWidth)

        $('#node-input-tyiExpr')
            .typedInput({
                types: ['jsonata', 'str'],
                default: 'jsonata',
                typeField: $('#node-input-tyiExprSourceType'),
            }).typedInput('width', tiTestbed.typedInputWidth)

        $('#node-input-tyiNode')
            .typedInput({
                types: ['node', 'str'],
                default: 'node',
                typeField: $('#node-input-tyiNodeSourceType'),
            }).typedInput('width', tiTestbed.typedInputWidth)

        tiTestbed.doTooltips('#ti-edit-panel') // Do this at the end
    } // ----- end of onEditPrepare() ----- //

    // @ts-ignore
    RED.nodes.registerType(moduleName, {
        // NOTE: Validations are called on Editor load, not just on change
        defaults: {
            name: { value: '' },
            topic: { value: '', validate: validateTopic },
            tyiMsg: { value: '' },
            tyiMsgSourceType: { value: '' },
            tyiGlobal: { value: '' },
            tyiGlobalSourceType: { value: '' },
            tyiEnv: { value: '' },
            tyiEnvSourceType: { value: '' },
            tyiExpr: { value: '' },
            tyiExprSourceType: { value: '' },
            tyiNode: { value: '' },
            tyiNodeSourceType: { value: '' },
        },
        align: 'left',
        inputs: 1,
        inputLabels: 'Some Input',
        outputs: 1,
        outputLabels: ['Output 1'],
        icon: 'font-awesome/fa-microchip',
        label: function () {
            return this.name || moduleName
        },
        paletteLabel: moduleName,
        category: tiTestbed.paletteCategory,
        color: 'var(--ti-testbed-node-colour)',

        /** Prepares the Editor panel */
        oneditprepare: function () { onEditPrepare(this) },
        /** Alternatively, bind `this` so you don't need to pass as an arg.
         *  Then use `this` instead of `node` in the onEditPrepare function.
         */
        // oneditprepare: function () { onEditPrepare.call(this) },

        /** Available methods:
         * onadd: (function) Called when added to a flow (drag from palette, copy/paste, import) - WARN: If paste/import cancelled this has still fired.
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
