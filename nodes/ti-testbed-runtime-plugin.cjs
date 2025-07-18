/** Example Node-RED runtime plugin
 *
 * Copyright (c) 2023-2025 Julian Knight (Totally Information)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict'

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
            sampleSetting: { value: 'sample', exportable: true, },
        },
    })
}

module.exports = PluginDefinition
