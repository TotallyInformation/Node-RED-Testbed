# Node-RED-Testbed
A blank canvas to test out ideas for Node-RED custom nodes

---

Please note that this is serious overkill for simple custom nodes, it embodies my workflow for my nodes which includes a few things you might find complex until you've used them and realise the value. They really come into their own for more complex nodes.

- The node's HTML file is not edited directly, see the `src` folder where you will find 3 files for each node.

   `main.html` provides the structure. It has only 2 instead of the usual 3 sections for help, and the config panel (the JS code has been removed, see below). However, it also loads two common resources, a CSS stylesheet and a JS file containing utility functions.

   `panel.html` is the definition of the Editor configuration panel.

   `help.html` is the help panel

   To get the output html file, you firstly need to run `gulp` from a command line in the packages root folder. See `gulpfile.js`. The default gulp function is set to `watchme` which watches for file changes and runs the appropriate build that merges the files, minifies, and outputs to the correct live folder.

   While this process seems complex and does take a bit of setting up for each node, editing the Editor parts of your node become soooo much easier which reduces thinking time and errors.

   **NOTE**

   The JavaScript for the node's Editor panel is no longer built into the HTML file. It is now found in the `/resources/` folder with a name that matches the node-name but ending in `.js`. This makes it much easier to make changes to the processing of the edit panel.

   This uses an isolation IIFE and puts some common variables up front. It also demonstrates the correct way to call a separate function for things like `oneditprepare` so that you can keep your code clean and easy to parse. It also includes nicer tooltips for your config panel.


* Each node's runtime will also look a little different. That is because I've deconstructed the parts that make up the runtime component. 

   Read the code from the bottom and you will quickly see the order in which Node-RED registers and implements the node, it will also help you understand which parts of the runtime are common for all instances of your node, which parts run when Node-RED loads (`ModuleDefinition`, which relate to each individual node instance (`nodeInsance`) and which relate to handling a msg (`inputMsgHandler`).

   Another advantage is the the `RED` object is passed into a top-level constant so that you have a fully consistent way of finding it without having to pass it around.

   There is a single module-level object called `mod` which you can extend for any information you might want to make available everywhere. There is also a commented out set of code in case you want to handle Node-RED's Typed Inputs using async/await rather than horrible callbacks.

   Personally, I've found this approach to be massively beneficial in keeping straight the various aspects of how Node-RED imports a custom node and processes it. Breaking down the component parts really helps to speed up development, maintenance and reduce coding errors.

* There is also a `typedefs.js` file where you will find definitions for your nodes and some enhanced definitions for Node-RED components as well. These work along with the JSDoc definitions, particularly in the runtime code.

* A full set of eslint dev dependencies are present along with the minimal grunt dev dependencies you may want for automation. Running `npm install` will get you up and running with a decent environment and this all works well with VScode.

## Nodes

### `ti-template`

This is a blank template for building new nodes.

### `ti-dummy`

This is the main testbed node.

## Folders

* root
* `docs`
* `examples`
* `locales`
* `nodes` - Each node has its own sub-folder. There is an additional sub-folder, `libs`, that will contain any shared runtime libraries.
* `resources` - Each node's Editor JavaScript code is provided in a file with the same name as the node. There is also a common JS library and CSS file.
* `src` - Each node's Editor html source files are here. The default `gulp` process watches for changes and rebuild's the node's actual html. A separate `components` sub-folder exists to contain any web components.

## To Do

These are some experiments I'd like to try when time permits.

### Class-based runtime

Based on [this discussion in the forum](https://discourse.nodered.org/t/noisecraft-anyone-heard-of-it/79813/103?u=totallyinformation), 
it would be very interesting to try to refactor the runtime code into a parent class that could then be extended for each node.

This might greatly reduce the boilerplate that a custom node requires.
