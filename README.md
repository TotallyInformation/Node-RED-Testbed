# Node-RED-Testbed
A blank canvas to test out ideas for Node-RED custom nodes

---

Please note that this is serious overkill for simple custom nodes, it embodies my workflow for my nodes which includes a few things you might find complex until you've used them and realise the value. They really come into their own for more complex nodes.

- The node's HTML file is not edited directly, see the `src` folder where you will find 5 files for each node.

   `main.html` provides the structure. It has the usual 3 sections for help, the config panel and the JS code. However, it also loads two common resources, a CSS stylesheet and a JS file containing utility functions.

   `template.html` is the definition of the Editor configuration panel.

   `help.html` is the help panel

   `editor.js` is obviously the script. This uses an isolation IIFE and puts some common variables up front. It also demonstrates the correct way to call a separate function for things like `oneditprepare` so that you can keep your code clean and easy to parse. It also includes nicer tooltips for your config panel.

   `.eslintrc.js` is purely there to have a good baseline for LINTing your code to get standard formatted code and to help eliminate trivial errors. 

   To get the output html file, you firstly need to run `gulp` from a command line in the packages root folder. See `gulpfile.js`. The default gulp function is set to `watchme` which watches for file changes and runs the appropriate build that merges the files, minifies, and outputs to the correct live folder.

   While this process seems complex and does take a bit of setting up for each node, editing the Editor parts of your node become soooo much easier which reduces thinking time and errors.

* Each node's runtime will also look a little different. That is because I've deconstructed the parts that make up the runtime component. 

   Read the code from the bottom and you will quickly see the order in which Node-RED registers and implements the node, it will also help you understand which parts of the runtime are common for all instances of your node, which parts run when Node-RED loads (`ModuleDefinition`, which relate to each individual node instance (`nodeInsance`) and which relate to handling a msg (`inputMsgHandler`).

   Another advantage is the the `RED` object is passed into a top-level constant so that you have a fully consistent way of finding it without having to pass it around.

   There is a single module-level object called `mod` which you can extend for any information you might want to make available everywhere. There is also a commented out set of code in case you want to handle Node-RED's Typed Inputs using async/await rather than horrible callbacks.

   Personally, I've found this approach to be massively beneficial in keeping straight the various aspects of how Node-RED imports a custom node and processes it. Breaking down the component parts really helps to speed up development, maintenance and reduce coding errors.

* There is also a `typedefs.js` file where you will find definitions for your nodes and some enhanced definitions for Node-RED components as well. These work along with the JSDoc definitions, particularly in the runtime code.

* A full set of eslint dev dependencies are present along with the minimal grunt dev dependencies you may want for automation. Running `npm install` will get you up and running with a decent environment and this all works well with VScode.
