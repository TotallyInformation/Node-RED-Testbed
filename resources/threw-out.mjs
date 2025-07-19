// @ts-nocheck
// Now loading as a module so no need to further Isolate this code

// @ts-ignore
const tiTestbed = window['tiTestbed']
// const log = tiTestbed.log

/** Module name must match this nodes html file @constant {string} moduleName */
// @ts-ignore
const moduleName = 'threw-out' // <== CHANGE to match the name of this file

// Standard width for typed input fields
// const tiWidth = tiTestbed.typedInputWidth

/** Prep for edit
 * @param {*} node A node instance as seen from the Node-RED Editor
 */
function onEditPrepare(node) {
    // log.log('onEditPrepare', node)

    const autoType = {
        value: 'auto',
        label: RED._('node-red:debug.autostatus'),
        hasValue: false,
    }

    const counter = {
        value: 'counter',
        label: RED._('node-red:debug.messageCount'),
        hasValue: false,
    }

    $('#node-input-typed-status').typedInput({
        default: 'counter',
        types: [counter, autoType, 'msg', 'jsonata'],
        typeField: $('#node-input-statusType'),
    })
    const none = {
        value: 'none',
        label: RED._('node-red:debug.none'),
        hasValue: false,
    }
    if (node.tosidebar === undefined) {
        node.tosidebar = true
        $('#node-input-tosidebar').prop('checked', true)
    }
    if (node.statusVal === undefined) {
        node.statusVal = (node.complete === 'false') ? 'payload' : ((node.complete === 'true') ? 'payload' : `${node.complete}`)
        $('#node-input-typed-status').typedInput('value', node.statusVal || '')
    }
    if (node.statusType === undefined) {
        node.statusType = 'counter'
        $('#node-input-typed-status').typedInput('type', node.statusType || 'counter')
    }
    if (typeof node.console === 'string') {
        node.console = (node.console == 'true')
        $('#node-input-console').prop('checked', node.console)
        $('#node-input-tosidebar').prop('checked', true)
    }
    const fullType = {
        value: 'full',
        label: RED._('node-red:debug.msgobj'),
        hasValue: false,
    }

    $('#node-input-typed-complete').typedInput({
        default: 'msg',
        types: ['msg', fullType, 'jsonata'],
        typeField: $('#node-input-targetType'),
    })
    if (node.targetType === 'jsonata') {
        const property = node.complete || ''
        $('#node-input-typed-complete').typedInput('type', 'jsonata')
        $('#node-input-typed-complete').typedInput('value', property)
    } else if ((node.targetType === 'full') || node.complete === 'true' || node.complete === true) {
        // show complete message object
        $('#node-input-typed-complete').typedInput('type', 'full')
    } else {
        const property = (!node.complete || (node.complete === 'false')) ? 'payload' : `${node.complete}`
        $('#node-input-typed-complete').typedInput('type', 'msg')
        $('#node-input-typed-complete').typedInput('value', property)
    }
    $('#node-input-typed-complete').on('change', function() {
        if ($('#node-input-typed-complete').typedInput('type') === 'msg'
            && $('#node-input-typed-complete').typedInput('value') === ''
        ) {
            $('#node-input-typed-complete').typedInput('value', 'payload')
        }
    })

    $('#node-input-tostatus').on('change', function() {
        if ($(this).is(':checked')) {
            if (node.statusType === 'counter') {
                node.statusVal = ''
            } else if (
                !Object.prototype.hasOwnProperty.call(node, 'statusVal')
                || node.statusVal === ''
            ) {
                const type = $('#node-input-typed-complete').typedInput('type')
                let comp = 'payload'
                if (type !== 'full') {
                    comp = $('#node-input-typed-complete').typedInput('value')
                }
                node.statusType = 'counter'
                node.statusVal = comp
            }
            $('#node-input-typed-status').typedInput('type', node.statusType)
            $('#node-input-typed-status').typedInput('value', node.statusVal)
            $('#node-tostatus-line').show()
        } else {
            $('#node-tostatus-line').hide()
            node.statusType = 'counter'
            node.statusVal = ''
            $('#node-input-typed-status').typedInput('type', node.statusType)
            $('#node-input-typed-status').typedInput('value', node.statusVal)
        }
    })

    tiTestbed.doTooltips('#ti-edit-panel') // Do this at the end
} // ----- end of onEditPrepare() ----- //

// @ts-ignore
RED.nodes.registerType(moduleName, {
    defaults: {
        name: { value: '_DEFAULT_', },
        active: { value: true, },
        tosidebar: { value: true, },
        console: { value: false, },
        tostatus: { value: false, },
        complete: { value: 'false', required: true, },
        targetType: { value: undefined, },
        statusVal: { value: '', },
        statusType: { value: 'counter', },
    },
    align: 'left',
    inputs: 1,
    inputLabels: 'Some Input',
    outputs: 1,
    outputLabels: ['Output 1'],
    icon: 'debug.svg', // 'font-awesome/fa-code',
    label: function () {
        const myActive = this.tosidebar || this.tostatus || this.console
        return `${myActive ? '◉' : '◎'} ${this.name || moduleName}`
    },
    category: tiTestbed.paletteCategory,
    color: '#87a980', // 'var(--ti-testbed-node-colour)',
    paletteLabel: moduleName,
    showLabel: false,

    /** Prepares the Editor panel */
    oneditprepare: function () { onEditPrepare(this) },
    /** Alternatively, bind `this` so you don't need to pass as an arg.
     *  Then use `this` instead of `node` in the onEditPrepare function.
     */
    // oneditprepare: function () { onEditPrepare.call(this) },

    onadd: function() {
        if (this.name === '_DEFAULT_') {
            this.name = ''
            RED.actions.invoke('core:generate-node-names', this, { generateHistory: false, })
        }
    },
    oneditsave: function() {
        if (!this.tosidebar && !this.tostatus && !this.console) {
            // If all outputs are disabled, then disable the node
            this.active = false
        } else {
            this.active = true
        }

        const type = $('#node-input-typed-complete').typedInput('type')
        if (type === 'full') {
            $('#node-input-complete').val('true')
        } else {
            $('#node-input-complete').val($('#node-input-typed-complete').typedInput('value'))
        }
        $('#node-input-statusVal').val($('#node-input-typed-status').typedInput('value'))

        // console.log('onEditSave', this)
        return true
    },

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
