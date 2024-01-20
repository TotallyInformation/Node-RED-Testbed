/** A zero dependency experimental web component to simplify Node-RED Editor config panels.
 *
 * Version: 0.0.1 2023-11-28
 *
 * ToDo:
 * -
 */
/*
  Copyright (c) 2023-2024 Julian Knight (Totally Information)

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

// Moved template to static class var & wrapped definitions to prevent duplication errors in node-red
if (!globalThis.NrEditInput) {
    class NrEditInput extends HTMLElement { // eslint-disable-line no-undef
        //#region --- Class Properties ---
        /** Holds a count of how many instances of this component are on the page */
        static _iCount = 0
        /** @type {Array<string>} List of all of the html attribs (props) listened to */
        static observedAttributes = ['name', 'type', 'label']
        /** @type {string[]} Allowed input types */
        types = ['', 'text']

        static template = document.createElement('template')
        //#endregion --- Class Properties ---

        // Cannot control the normal DOM here, use connectedCallback
        constructor() {
            super()

            NrEditInput.template.innerHTML = /** @type {HTMLTemplateElement} */ /*html*/`
                <!-- <style>
                    /* @import url("../uibuilder/uib-brand.min.css"); */
                    @import url("vendor/jquery/css/base/jquery-ui.min.css?v=");
                    @import url("vendor/font-awesome/css/font-awesome.min.css?v=");
                    @import url(" red/style.min.css?v=");
                    @import url("vendor/monaco/style.css?v=");
                </style> -->
                <div id="XXXX" aria-label="" class="form-row">
                    <label for="node-input-XXXX"><i class=""></i> <slot></slot></label>
                    <input type="text" id="node-input-XXXX"  placeholder="">
                </div>
            `
        }

        /** NOTE: On initial startup, this is called for each watched attrib set in HTML - BEFORE connectedCallback is called  */
        attributeChangedCallback(attrib, oldVal, newVal) {
            if ( oldVal === newVal ) return
            console.log('attributeChangedCallback', attrib, oldVal, newVal)

            switch (attrib) {
                case 'type': {
                    if (!this.types.includes(newVal.toLowerCase())) this.type = ''
                    else this.type = newVal
                    break
                }

                case 'label': {
                    if (!this.types.includes(newVal.toLowerCase())) this.type = ''
                    else this.type = newVal
                    break
                }

                default: {
                    this[attrib] = newVal
                    break
                }
            }
        } // --- end of attributeChangedCallback --- //

        // Runs when an instance is added to the DOM
        connectedCallback() {
            // Make sure instance has an ID. Create an id from name or calculation if needed
            if (!this.id) {
                if (!this.name) this.name = this.getAttribute('name')
                if (this.name) this.id = this.name.toLowerCase().replace(/\s/g, '_')
                else this.id = `uib-var-${++NrEditInput._iCount}`
            }

            const t = NrEditInput.template.content.cloneNode(true)
            const tf = t.firstElementChild
            tf.setAttribute('id', this.id)
            console.log(tf.children[0].lastChild, Object.keys(tf.children[0]))
            tf.children[0].setAttribute('for', `node-input-${this.id}`)
            tf.children[0].innerHTML = `${this.dataset.label}`
            tf.children[1].setAttribute('id', `node-input-${this.id}`)
            tf.children[1].setAttribute('placeholder', `node-input-${this.id}`)
            this.appendChild(t)

            console.log('NrEditInput class ', this)
        }  // ---- end of connectedCallback ---- //

        // Runs when an instance is removed from the DOM
        // disconnectedCallback() {} // ---- end of disconnectedCallback ---- //
    }

    // Add the class as a new Custom Element to the window object 
    if (!customElements.get('nr-edit-input')) customElements.define('nr-edit-input', NrEditInput)
}
