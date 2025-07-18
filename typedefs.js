/* eslint-disable jsdoc/valid-types */
/* eslint-disable jsdoc/no-undefined-types */
// @ts-nocheck
/* eslint-disable no-irregular-whitespace */
/** Define typedefs for linting and JSDoc/ts checks - does not actually contain live code
 *
 * Copyright (c) 2023 Julian Knight (Totally Information)
 * https://it.knightnet.org.uk, https://github.com/TotallyInformation
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict'

/** editorRED
 * typedef {object} editorRED The Node-RED core object available to a custom node's .html file
 *
 */

/** Node-RED runtimeSettings - See settings.js for static settings.
 * @typedef {object} runtimeSettings Static and Dynamic settings for Node-RED runtime
 *
 * @property {string} uiPort The port used by Node-RED (default=1880)
 * @property {string} uiHost The host IP used by Node-RED (default=0.0.0.0)
 * @property {string} userDir The userDir folder
 * @property {string} httpNodeRoot Optional base URL. All user url's will be under this. Default empty string.
 * @property {object} FunctionGlobalContext Add values, Functions, packages to the Global context variable store.
 * @property {Function} mqttReconnectTime : [Getter/Setter],
 * @property {Function} serialReconnectTime : [Getter/Setter],
 * @property {number} debugMaxLength : [Getter/Setter],
 * @property {number} debugStatusLength : [Getter/Setter],
 * @property {Function} debugUseColors : [Getter/Setter],
 * @property {string} flowFile : [Getter/Setter],
 * @property {Function} flowFilePretty : [Getter/Setter],
 * @property {string} credentialSecret : [Getter/Setter],
 * @property {string} httpAdminRoot : [Getter/Setter],
 * @property {string} httpStatic : [Getter/Setter],
 * @property {Function} adminAuth : [Getter/Setter],
 * @property {Function} httpNodeMiddleware : [Getter/Setter],
 * @property {Function} httpAdminMiddleware : [Getter/Setter],
 * @property {Function} httpServerOptions : [Getter/Setter],
 * @property {Function} webSocketNodeVerifyClient : [Getter/Setter],
 * @property {Function} exportGlobalContextKeys : [Getter/Setter],
 * @property {Function} contextStorage : [Getter/Setter],
 * @property {Function} editorTheme : [Getter/Setter],
 * @property {string} settingsFile : [Getter/Setter],
 * @property {string} httpRoot : [Getter/Setter],
 * @property {Function} disableEditor : [Getter/Setter],
 * @property {Function} httpAdminAuth : [Getter/Setter],
 * @property {Function} httpNodeAuth : [Getter/Setter],
 * @property {object|Function} [https] If present, https will be used for ExpressJS servers.
 *
 * @property {object} [uibuilder] Optional uibuilder specific Node-RED settings
 * @property {number} [uibuilder.port] Port number if uib is using its own ExpressJS instance
 * @property {string} [uibuilder.uibRoot] Folder name that will hold all uib runtime and instance folders
 * @property {('http'|'https')} [uibuilder.customType] Connection type - only if using custom ExpressJS instance
 * @property {object|Function} [uibuilder.https] Override https server settings (key/cert) - if not specified, uses main NR https prop
 * @property {object} [uibuilder.serverOptions] Optional ExpressJS server options for uib custom server
 * @property {object} [uibuilder.socketOptions] Override Socket.IO options if desired. See https://socket.io/docs/v4/server-options/
 * @property {boolean} [uibuilder.instanceApiAllowed] Allow instance-level custom API's to be loaded. Could be a security issue so it is controlled in settings.js
 * @property {Function} [uibuilder.hooks] Provide hook functions
 *
 * @property {string} coreNodesDir Folder containing Node-RED core nodes
 * @property {string} version Node-RED version
 *
 * @property {object} logging Controls the type and amount of logging output
 * @property {object} logging.console Controls output levels and types to the console log
 * @property {string} logging.console.level What level of output? (fatal, error, warn, info, debug, trace)
 * @property {boolean} logging.console.metrics Should metrics also be shown?
 * @property {boolean} logging.console.audit Should audit also be shown?
 *
 * @property {Function} get Get dynamic settings. NB: entries in settings.js are read-only and shouldn't be read using RED.settings.get, that is only for settings that can change in-flight.
 * @property {Function} set Set dynamic settings
 * @property {Function} delete .
 * @property {Function} available .
 *
 * @property {Function} registerNodeSettings : [Function: registerNodeSettings],
 * @property {Function} exportNodeSettings : [Function: exportNodeSettings],
 * @property {Function} enableNodeSettings : [Function: enableNodeSettings],
 * @property {Function} disableNodeSettings : [Function: disableNodeSettings],
 *
 * @property {Function} getUserSettings : [Function: getUserSettings],
 * @property {Function} setUserSettings : [Function: setUserSettings],
 */

/** Node-RED runtimeLogging
 * @typedef {object} runtimeLogging Logging. Levels that are output to the Node-RED log are controlled by the logging.console.level setting in settings.js
 * @property {Function} fatal Lvel 0. Lowest level, things that have broken Node-RED only.
 * @property {Function} error Level 1. Copy is sent to Editor debug panel as well as error log.
 * @property {Function} warn Level 2.
 * @property {Function} info Level 3.
 * @property {Function} debug Level 4.
 * @property {Function} trace Level 5. Very verbose output. Should tell the operator everything that is going on.
 * @property {Function} metric Log metrics (timings)
 * @property {Function} audit Audit log
 * @property {Function} addHandler Adds a log handler
 * @property {Function} removeHandler Removes a log handler
 * @property {10} FATAL : 10,
 * @property {20} ERROR : 20,
 * @property {30} WARN  : 30,
 * @property {40} INFO  : 40,
 * @property {50} DEBUG : 50,
 * @property {60} TRACE : 60,
 * @property {98} AUDIT : 98,
 * @property {99} METRIC: 99,
 */

/** Node-RED runtimeNodes: RED.nodes
 * obsidian://open?vault=Obsidian%20Vault&file=Programming%2FNode-RED%2FRuntime%20API's%2FRED.nodes
 * @typedef {object} runtimeNodes Gives access to other active nodes in the flows.
 * @property {Function} registerType Register a new type of node to Node-RED.
 * @property {Function} registerSubflow .
 * @property {Function} createNode Create a node instance (called from within registerType Function).
 * @property {Function} getNode Get a reference to another node instance in the current flows. Can then access its properties.
 * @property {Function} eachNode Walk through each node
 * @property {Function} addCredentials .
 * @property {Function} getCredentials .
 * @property {Function} deleteCredentials .
 */

/** runtimeRED
 * @typedef {object} runtimeRED The core Node-RED runtime object
 * @property {expressApp} httpAdmin Reference to the ExpressJS app for Node-RED Admin including the Editor
 * @property {expressApp} httpNode Reference to the ExpressJS app for Node-RED user-facing nodes including http-in/-out and Dashboard
 * @property {Server} server Node.js http(s) Server object
 * @property {runtimeLogging} log Logging.
 * @property {runtimeNodes} nodes Gives access to other active nodes in the flows.
 * @property {runtimeSettings} settings Static and Dynamic settings for Node-RED runtime
 *
 * @property {Function} version Get the Node-RED version [Function: getVersion],
 * @property {Function} require : [Function: requireModule],
 * @property {Function} import : [Function: importModule],
 * @property {Function} _ Locale translation function. Use with `RED._('key')`
 *
 * @property {object} auth :
 * @property {Function} auth.needsPermission : [Function: needsPermission]
 *
 * @property {object} library :
 * @property {Function} library.register : [Function: register],
 *
 * @property {object} comms Communicate with admin pages
 * @property {Function} comms.publish : [Function: publish],
 *
 * @property {EventEmitter} events Event handler object
 * @property {Function} events.on Event Listener Function. Types: 'nodes-started', 'nodes-stopped'
 * @property {Function} events.once .
 * @property {Function} events.addListener .
 * @property {((name:string, opts:object)=>void)} events.emit Emit a new event
 *
 * @property {object} hooks .
 * @property {Function} hooks.has .
 * @property {Function} hooks.clear .
 * @property {Function} hooks.add .
 * @property {Function} hooks.remove .
 * @property {Function} hooks.trigger .
 *
 * @property {object} util .
 * @property {Function} util.encodeObject : [Function: encodeobject],
 * @property {Function} util.ensureString : [Function: ensurestring],
 * @property {Function} util.ensureBuffer : [Function: ensureBuffer],
 * @property {Function} util.cloneMessage : [Function: cloneMessage],
 * @property {Function} util.compareObjects : [Function: compareobjects],
 * @property {Function} util.generateId : [Function: generateId],
 * @property {Function} util.getMessageProperty : [Function: getMessageProperty],
 * @property {Function} util.setMessageProperty : [Function: setMessageProperty],
 * @property {Function} util.getObjectProperty : [Function: getobjectProperty],
 * @property {Function} util.setObjectProperty : [Function: setobjectProperty],
 * @property {Function} util.evaluateNodeProperty : [Function: evaluateNodeProperty],
 * @property {Function} util.normalisePropertyExpression : [Function: normalisePropertyExpression],
 * @property {Function} util.normaliseNodeTypeName : [Function: normaliseNodeTypeName],
 * @property {Function} util.prepareJSONataExpression : [Function: prepareJSONataExpression],
 * @property {Function} util.evaluateJSONataExpression : [Function: evaluateJSONataExpression],
 * @property {Function} util.parseContextStore : [Function: parseContextStore]
 * @property {Function} util.getSetting ??
 *
 * @property {object} util.uib : Added by uibuilder.js - utility functions made available to function nodes
 * @property {Function} util.uib.deepObjFind : Recursive object deep find - https://totallyinformation.github.io/node-red-contrib-uibuilder/#/client-docs/config-driven-ui?id=manipulating-msg_ui
 * @property {Function} util.uib.listAllApps : Return a list of all uibuilder instances
 * @property {Function} util.uib.dp : Return a formatted number using a specified locale and number of decimal places
 * @property {Function} util.uib.send : Send a message to a client via a uibuilder instance
 * @property {Function} util.uib.truthy : Returns true/false or a default value for truthy/falsy and other values
 *
 * @property {object} plugins Node-RED plugins
 * @property {Function} plugins.registerPlugin : [Function: registerPlugin],
 * @property {Function} plugins.get: [Function: get],
 * @property {Function} plugins.getByType: [Function: getByType]
 */

/** runtimeNode
 * @typedef {object} runtimeNode Local copy of the node instance config + other info
 * @property {Function} send Send a Node-RED msg to an output port
 * @property {Function} receive Sends the node an input message (e.g. a msg to itself)
 * @property {Function} done Dummy done Function for pre-Node-RED 1.0 servers
 * @property {Function} context get/set context data. Also .flow and .global contexts
 * @property {Function} on Event listeners for the node instance ('input', 'close')
 * @property {Function} removeListener Event handling
 * @property {Function} log General log output, Does not show in the Editor's debug panel
 * @property {Function} warn Warning log output, also logs to the Editor's debug panel
 * @property {Function} error Error log output, also logs to the Editor's debug panel
 * @property {Function} trace Trace level log output
 * @property {Function} debug Debug level log output
 * @property {Function} status Show a status message under the node in the Editor
 * @property {Function} _ Locale translation function. Use with `node._('key')`
 *
 * @property {object=} credentials Optional secured credentials
 * @property {string=} name name of the node
 * @property {string=} id id of the node
 * @property {string=} type Internal. Type of node instance.
 * @property {string=} z Internal. uid of ???
 * @property {string=} g Internal. uid of ???
 * @property {[Array<string>]=} wires Internal. Array of Array of strings. The wires attached to this node instance (uid's)
 * @property {string=} path Internal. The path to the node instance
 *
 * @property {number=} _wireCount Count of connected wires
 * @property {string=} _wire ID of connected wire
 * @property {[Array<Function>]=} _closeCallbacks ??
 * @property {[Array<Function>]=} _inputCallback Input callback fn
 * @property {[Array<Function>]=} _inputCallbacks ??
 * @property {number=} _expectedDoneCount ??
 * @property {Flow=} _flow Full definition of this node's containing flow
 * @property {*=} _alias ??
 */

/** runtimeNodeConfig
 * @typedef {object} runtimeNodeConfig Configuration of node instance. Will also have Editor panel's defined variables as properties.
 * @property {object=} id Internal. uid of node instance.
 * @property {object=} type Internal. Type of node instance.
 * @property {object=} x Internal
 * @property {object=} y Internal
 * @property {object=} z Internal. ID of the flow the node belongs to.
 * @property {object=} wires Internal. The wires attached to this node instance (uid's)
 */

/** uibuilderEditorVars
 * @typedef {object} uibuilderEditorVars The node instance variables accessible from the Editor config panel
 *
 * @property {string} name Descriptive name, only used by Editor
 * @property {string} topic msg.topic overrides incoming msg.topic
 * @property {string} url The url path (and folder path) to be used by this instance
 * @property {boolean} okToGo Is the url valid for this node or not? Not passed into the node, only used to stop processing.
 * @property {string} oldUrl The PREVIOUS url path (and folder path) after a url rename
 * @property {boolean} fwdInMessages Forward input msgs to output #1?
 * @property {boolean} allowScripts Allow scripts to be sent to front-end via msg? WARNING: can be a security issue.
 * @property {boolean} allowStyles Allow CSS to be sent to the front-end via msg? WARNING: can be a security issue.
 * @property {boolean} copyIndex DEPRECATED Copy index.(html|js|css) files from templates if they don't exist?
 * @property {string}  templateFolder Folder name for the source of the chosen template
 * @property {string}  extTemplate Degit url reference for an external template (e.g. from GitHub)
 * @property {boolean} showfolder Provide a folder index web page?
 * @property {boolean} reload If true, notify all clients to reload on a change to any source file
 * @property {string} sourceFolder (src or dist) the instance FE code folder to be served by ExpressJS
 * @property {string} deployedVersion The version of uibuilder when this node was last deployed
 * @property {boolean} showMsgUib Whether to include msg._uib (clientId/real IP/page name) in std output msgs
 *
 * @property {string} customFolder Name of the fs path used to hold custom files & folders for THIS INSTANCE
 * @property {number} ioClientsCount How many Socket clients connected to this instance?
 * @property {number} rcvMsgCount How many msg's received since last reset or redeploy?
 * @property {object} ioChannels The channel names for Socket.IO
 * @property {string} ioChannels.control SIO Control channel name 'uiBuilderControl'
 * @property {string} ioChannels.client SIO Client channel name 'uiBuilderClient'
 * @property {string} ioChannels.server SIO Server channel name 'uiBuilder'
 * @property {string} ioNamespace Make sure each node instance uses a separate Socket.IO namespace
 * @property {string} title Short descriptive title for the instance
 * @property {string} descr Longer description for the instance
 * @property {string} editurl Shortcut URL that will open a code editor at the node instance folder
 */

/** tiTemplateNode
 * @typedef {object} tiTemplateNode An example template for custom nodes
 *
 * @property {string} name Descriptive name, only used by Editor
 * @property {string} topic msg.topic overrides incoming msg.topic
 */

/** tiThrewOutNode
 * @typedef {object} tiThrewOutNode An example template for custom nodes
 *
 * @property {string} name Descriptive name, only used by Editor
 * @property {boolean} active Is debug output active? If not, passthrough only
 * @property {boolean} tosidebar Is output to the Editor's debug sidebar active? If not, passthrough only
 * @property {boolean} console Is console output active? If not, passthrough only
 * @property {boolean} tostatus Is output to the Editor's status bar active? If not, passthrough only
 * @property {string} complete The type of output to send to the Editor's debug sidebar
 * @property {string} targetType The type of output to send to the Editor's debug sidebar
 * @property {string} statusVal The value to send to the Editor's status bar
 * @property {string} statusType The type of value to send to the Editor's status
 * @property {string} editExpression The JSONata expression to apply to the incoming message
 * @property {number} counter - Tracks the count for the node instance
 * @property {number} lastTime - Timestamp of last update
 * @property {NodeJS.Timeout|null} timeout - Timeout handler
 * @property {string} [oldState] - Previous state for status
 * @property {any=} preparedEditExpression Prepared JSONata expression for editor (optional)
 * @property {any=} preparedStatExpression Prepared JSONata expression for status (optional)
 * @property {boolean=} isDebugging Whether the node is currently debugging or not (optional)
 */

/** runtimeDebugOutput
 * @typedef {object} runtimeDebugOutput Extra props for debug output
 *
 * @property {string=} topic The topic to override the incoming msg.topic to send to debug only
 * @property {object=} msg Copy of the incoming msg object to send to debug only
 */


/** tiDummyNode
 * @typedef {object} tiDummyNode A dummy custom node to play with
 *
 * @property {string} name Descriptive name, only used by Editor
 * @property {string} topic msg.topic overrides incoming msg.topic
 * @property {string} tyiMsg Set by call to getSource
 * @property {string} tyiMsgSource = config.tyiMsg ?? ''
 * @property {string} tyiMsgSourceType = config.tyiMsgSourceType ?? ''
 * @property {string} tyiGlobal Set by call to getSource
 * @property {string} tyiGlobalSource = config.tyiGlobal ?? ''
 * @property {string} tyiGlobalSourceType = config.tyiGlobalSourceType ?? ''
 * @property {string} tyiEnv Set by call to getSource
 * @property {string} tyiEnvSource = config.tyiEnv ?? ''
 * @property {string} tyiEnvSourceType = config.tyiEnvSourceType ?? ''
 * @property {string} tyiExpr Set by call to getSource
 * @property {string} tyiExprSource = config.tyiExpr ?? ''
 * @property {string} tyiExprSourceType = config.tyiExprSourceType ?? ''
 * @property {string} tyiNode Set by call to getSource
 * @property {string} tyiNodeSource = config.tyiExpr ?? ''
 * @property {string} tyiNodeSourceType = config.tyiExprSourceType ?? ''
 */

/** NrNodeInstance
 * @typedef {object} NrNodeInstance Master class to define custom nodes
 *
 * @property {string} name Descriptive name, only used by Editor
 * @property {string} topic msg.topic overrides incoming msg.topic
 */

/** Props define attributes on a virtual node.
 * @typedef {Object<string, any> | {}} Props
 * @property {object} Props .
 * @property {Children} Props.children .
 */
/** The vnode children of a virtual node.
 * @typedef {VNode[]} Children
 */
/** Define a custom type for virtual nodes:
 * @typedef {string | number | Function} Type
 */
/** Define a custom type for virtual nodes:
 * @typedef {Object<string, any>} VNode
 * @property {Object<string, any>} VNode .
 * @property {Type} VNode.type .
 * @property {Props} VNode.props .
 * @property {Children} VNode.children .
 * @property {string} [VNode.key] .
 */

// ==== vvv These need some work vvv ==== //

/** ExpressJS App
 * @typedef {object} expressApp ExpessJS `app` object
 * @property {object} _events : [object: null prototype] { mount: [Function: onmount] },
 * @property {number} _eventsCount : 1,
 * @property {number} _maxListeners : undefined,
 * @property {Function} setMaxListeners : [Function: setMaxListeners],
 * @property {Function} getMaxListeners : [Function: getMaxListeners],
 * @property {Function} emit : [Function: emit],
 * @property {Function} addListener : [Function: addListener],
 * @property {Function} on : [Function: addListener],
 * @property {Function} prependListener : [Function: prependListener],
 * @property {Function} once : [Function: once],
 * @property {Function} prependOnceListener : [Function: prependOnceListener],
 * @property {Function} removeListener : [Function: removeListener],
 * @property {Function} off : [Function: removeListener],
 * @property {Function} removeAllListeners : [Function: removeAllListeners],
 * @property {Function} listeners : [Function: listeners],
 * @property {Function} rawListeners : [Function: rawListeners],
 * @property {Function} listenerCount : [Function: listenerCount],
 * @property {Function} eventNames : [Function: eventNames],
 * @property {Function} init : [Function: init],
 * @property {Function} defaultConfiguration : [Function: defaultConfiguration],
 * @property {Function} lazyrouter : [Function: lazyrouter],
 * @property {Function} handle : [Function: handle],
 * @property {Function} use : [Function: use],
 * @property {Function} route : [Function: route],
 * @property {Function} engine : [Function: engine],
 * @property {Function} param : [Function: param],
 * @property {Function} set : [Function: set],
 * @property {Function} path : [Function: path],
 * @property {Function} enabled : [Function: enabled],
 * @property {Function} disabled : [Function: disabled],
 * @property {Function} enable : [Function: enable],
 * @property {Function} disable : [Function: disable],
 * @property {Function} acl : [Function (anonymous)],
 * @property {Function} bind : [Function (anonymous)],
 * @property {Function} checkout : [Function (anonymous)],
 * @property {Function} connect : [Function (anonymous)],
 * @property {Function} copy : [Function (anonymous)],
 * @property {Function} delete : [Function (anonymous)],
 * @property {Function} get : [Function (anonymous)],
 * @property {Function} head : [Function (anonymous)],
 * @property {Function} link : [Function (anonymous)],
 * @property {Function} lock : [Function (anonymous)],
 * @property {Function} "m-search" : [Function (anonymous)],
 * @property {Function} merge : [Function (anonymous)],
 * @property {Function} mkactivity : [Function (anonymous)],
 * @property {Function} mkcalendar : [Function (anonymous)],
 * @property {Function} mkcol : [Function (anonymous)],
 * @property {Function} move : [Function (anonymous)],
 * @property {Function} notify : [Function (anonymous)],
 * @property {Function} options : [Function (anonymous)],
 * @property {Function} patch : [Function (anonymous)],
 * @property {Function} post : [Function (anonymous)],
 * @property {Function} pri : [Function (anonymous)],
 * @property {Function} propfind : [Function (anonymous)],
 * @property {Function} proppatch : [Function (anonymous)],
 * @property {Function} purge : [Function (anonymous)],
 * @property {Function} put : [Function (anonymous)],
 * @property {Function} rebind : [Function (anonymous)],
 * @property {Function} report : [Function (anonymous)],
 * @property {Function} search : [Function (anonymous)],
 * @property {Function} source : [Function (anonymous)],
 * @property {Function} subscribe : [Function (anonymous)],
 * @property {Function} trace : [Function (anonymous)],
 * @property {Function} unbind : [Function (anonymous)],
 * @property {Function} unlink : [Function (anonymous)],
 * @property {Function} unlock : [Function (anonymous)],
 * @property {Function} unsubscribe : [Function (anonymous)],
 * @property {Function} all : [Function: all],
 * @property {Function} del : [Function (anonymous)],
 * @property {Function} render : [Function: render],
 * @property {Function} listen : [Function: listen],
 * @property {Function} request : IncomingMessage { app: [Circular *1] },
 * @property {Function} response : ServerResponse { app: [Circular *1] },
 *
 * @property {object} cache : {},
 * @property {object} engines : {},
 *
 * @property {{
 *   'x-powered-by': boolean,
 *   etag: string,
 *   "etag fn": Function,
 *   env: string,
 *   'query parser' : string,
 *   'query parser fn' : Function,
 *   'subdomain offset': number,
 *   view: Function,
 *   views: string,
 *   'jsonp callback name' : string
 * }} settings ExpressJS App Settings
 *
 * property {boolean}  settings.'x-powered-by' : true,
 * property {string}   settings.etag : 'weak',
 * property {Function} settings."etag fn" : [Function: generateETag],
 * property {string}   settings.env : 'development',
 * property {string}   settings.'query parser' : 'extended',
 * property {Function} settings.'query parser fn' : [Function: parseExtendedQuerystring],
 * property {number}   settings.'subdomain offset' : 2,
 * property {Function} settings.view : [Function: View],
 * property {string}   settings.views : 'C:\\src\\nr2\\views',
 * property {string}   settings.'jsonp callback name' : 'callback'
 *
 * @property {object} locals : [object: null prototype] { settings: [object] },
 * @property {string} mountpath : '/nr/',
 *
 * @property {Function} parent : [Function: app] {
 * @property {Function}   parent._events : [object: null prototype],
 * @property {Function}   parent._eventsCount : 1,
 * @property {Function}   parent._maxListeners : undefined,
 * @property {Function}   parent.setMaxListeners : [Function: setMaxListeners],
 * @property {Function}   parent.getMaxListeners : [Function: getMaxListeners],
 * @property {Function}   parent.emit : [Function: emit],
 * @property {Function}   parent.addListener : [Function: addListener],
 * @property {Function}   parent.on : [Function: addListener],
 * @property {Function}   parent.prependListener : [Function: prependListener],
 * @property {Function}   parent.once : [Function: once],
 * @property {Function}   parent.prependOnceListener : [Function: prependOnceListener],
 * @property {Function}   parent.removeListener : [Function: removeListener],
 * @property {Function}   parent.off : [Function: removeListener],
 * @property {Function}   parent.removeAllListeners : [Function: removeAllListeners],
 * @property {Function}   parent.listeners : [Function: listeners],
 * @property {Function}   parent.rawListeners : [Function: rawListeners],
 * @property {Function}   parent.listenerCount : [Function: listenerCount],
 * @property {Function}   parent.eventNames : [Function: eventNames],
 * @property {Function}   parent.init : [Function: init],
 * @property {Function}   parent.defaultConfiguration : [Function: defaultConfiguration],
 * @property {Function}   parent.lazyrouter : [Function: lazyrouter],
 * @property {Function}   parent.handle : [Function: handle],
 * @property {Function}   parent.use : [Function: use],
 * @property {Function}   parent.route : [Function: route],
 * @property {Function}   parent.engine : [Function: engine],
 * @property {Function}   parent.param : [Function: param],
 * @property {Function}   parent.set : [Function: set],
 * @property {Function}   parent.path : [Function: path],
 * @property {Function}   parent.enabled : [Function: enabled],
 * @property {Function}   parent.disabled : [Function: disabled],
 * @property {Function}   parent.enable : [Function: enable],
 * @property {Function}   parent.disable : [Function: disable],
 * @property {Function}   parent.acl : [Function (anonymous)],
 * @property {Function}   parent.bind : [Function (anonymous)],
 * @property {Function}   parent.checkout : [Function (anonymous)],
 * @property {Function}   parent.connect : [Function (anonymous)],
 * @property {Function}   parent.copy : [Function (anonymous)],
 * @property {Function}   parent.delete : [Function (anonymous)],
 * @property {Function}   parent.get : [Function (anonymous)],
 * @property {Function}   parent.head : [Function (anonymous)],
 * @property {Function}   parent.link : [Function (anonymous)],
 * @property {Function}   parent.lock : [Function (anonymous)],
 * @property {Function}   parent.'m-search' : [Function (anonymous)],
 * @property {Function}   parent.merge : [Function (anonymous)],
 * @property {Function}   parent.mkactivity : [Function (anonymous)],
 *
 * @property {Function}   _router :  [Function]
 */

module.exports = {}

/* RED
 {
    "loader": {},
    "events": {},
    "i18n": {},
    "settings": {
        "apiRootUrl": "",
        "httpNodeRoot": "/nr/",
        "version": "1.2.7",
        "user": {
            "anonymous": true,
            "permissions": "*"
        },
        "context": {
            "default": "default",
            "stores": [
                "default",
                "file"
            ]
        },
        "flowFilePretty": true,
        "flowEncryptionType": "user",
        "tlsConfigDisableLocalFiles": false,
        "uibuilderNodeEnv": "development", // === CUSTOM ===
        "uibuilderTemplates": {}, // === CUSTOM ===
        "uibuilderPort": 3000, // === CUSTOM ===
        "editorTheme": {},

        "get": Function,
        init: Function,
        load: Function,
        loadUserSettings: Function,
        remove: Function,
        set: Function,
        theme: Function,
    "user": {},
    "comms": {},
    "text": {},
    "state": {},
    "nodes": {},
    "history": {},
    "validators": {},
    "utils": {},
    "menu": {},
    "panels": {},
    "popover": {},
    "tabs": {},
    "stack": {},
    "colorPicker": {},
    "actions": {},
    "deploy": {},
    "diff": {},
    "keyboard": {},
    "workspaces": {},
    "statusBar": {},
    "view": {
        "navigator": {},
        "tools": {}
    },
    "sidebar": {},
    "palette": {},
    "editor": {},
    "eventLog": {},
    "tray": {},
    "clipboard": {},
    "library": {},
    "notifications": {},
    "search": {},
    "actionList": {},
    "typeSearch": {},
    "subflow": {},
    "group": {},
    "userSettings": {},
    "projects": {},
    "touch": {},
    "debug": {}
}
 */
/* this
{
    name: ""
    topic: ""
    //... other vars ...//

    credentials: { has_jwtSecret: false, _: { … } }

    changed: false
    dirty: false
    icon: undefined
    id: "b18a50dd.f7e5c"
    info: undefined
    infoEditor: w { $toDestroy: Array(46), container: div.red - ui - editor - text - container.ace_editor.ace_hidpi.red - ui - editor - text - container - toolbar.ace - tomo…, renderer: y, id: "editor2", commands: o, … }
    inputLabels: ""
    inputs: 1
    outputLabels: ['','']
    outputs: 2
    resize: false
    selected: true
    status: { text: "Node Initialised", fill: "blue", shape: "dot" }
    type: "uibuilder"
    valid: true
    validationErrors: []

    g: "c49c82f3.7e716"
    h: 30
    l: true
    w: 120
    x: 530
    y: 120
    z: "18cb249f.38bafb"

    _: ƒ()
    __outputs: 2
    _config: { name: """", topic: """", url: ""vue - file"", fwdInMessages: "false", allowScripts: "false", … }
    _def: { category: "uibuilder", color: "#E6E0F8", defaults: { … }, credentials: { … }, inputs: 1, … }
}
 */
