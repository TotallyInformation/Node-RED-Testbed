/** Example Node-RED runtime plugin */

/** Define and register the plugin
 * @param {object} RED Node-RED Editor global
 */
function PluginDefinition(RED) {
    // ...
    RED.plugins.registerPlugin('ti-testbed-runtime-plugin', {
        type: 'ti-testbed-runtime-plugin', // optional
        onadd: function() {
            // Runs when a plug-in is registered
            console.log('[ti-dummy-runtime-plugin] Runtime plugin added')

            // RED.events.on('node-red-contrib-uibuilder/runtimeSetupComplete', (data) => {
            //     console.log('node-red-contrib-uibuilder/runtimeSetupComplete', data)
            // })
        },
        onremove: function() {
            // Runs when a plug-in is unregistered
            console.log('[ti-dummy-runtime-plugin] Runtime plugin removed')
        },
        settings: {
            // $HOME/.node-red/settings.js Flags to read and publish to the editor
            sampleSetting: { value: 'sample', exportable: true }
        }
    })
}

module.exports = PluginDefinition
