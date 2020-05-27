// @ts-ignore
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js'

// @ts-ignore
self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId: any, label: string) {

    if (label === 'json') {
      return './json.worker.js';
    }
    if (label === 'css') {
      return './css.worker.js';
    }
    if (label === 'html') {
      return './html.worker.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.js';
    }
    return './editor.worker.js';
  },
};

export class WCMonacoEditor extends HTMLElement {
  __initialized: any;
  editor: any;
  static get observedAttributes() {
    return ['src', 'value'];
  }

  attributeChangedCallback(name: string | number, oldValue: any, newValue: any) {
    if (!this.__initialized) { return; }
    if (oldValue !== newValue) {
      // @ts-ignore
      this[name] = newValue;
    }
  }

  get src() { return this.getAttribute('src'); }
  set src(value) {
    // @ts-ignore
    this.setAttribute('src', value);
    this.setSrc();
  }

  get value() { return this.editor.getValue(); }
  set value(value) {
    this.editor.setValue(value);
  }

  get tabSize() { return this.editor.getModel()._options.tabSize; }
  set tabSize(value) {
    this.editor.getModel().updateOptions({ tabSize: value });
  }

  constructor() {
    super();
    this.__initialized = false;
    this.editor = null;
  }

  async connectedCallback() {
    this.style.display = 'block';
    if (!this.id) { this.id = 'editor'; }
    if (!this.style.width) { this.style.width = '100%'; }
    if (!this.style.height) { this.style.height = '100%'; }

    if (this.hasAttribute('config')) {
      const config = await this.fetchConfig(this.getAttribute('config'));
      // @ts-ignore
      this.editor = monaco.editor.create(document.getElementById(this.id), config);
    } else {
      // @ts-ignore
      this.editor = monaco.editor.create(document.getElementById(this.id), {
        language: this.getAttribute('language'),
        theme: 'vs-dark',
        automaticLayout: true,
        lineNumbersMinChars: 3,
        mouseWheelZoom: true,
        fontSize: this.getAttribute('font-size'),
        minimap: { enabled: !this.hasAttribute('no-minimap') },
        wordWrap: this.hasAttribute('word-wrap'),
        wrappingIndent: this.getAttribute('wrap-indent')
      });
    }

    if (this.hasAttribute('tab-size')) {
      this.tabSize = this.getAttribute('tab-size');
    }

    if (this.hasAttribute('src')) {
      this.setSrc();
    }
    this.__initialized = true;
  }

  async setSrc() {
    const src = this.getAttribute('src');
    const contents = await this.fetchSrc(src);
    this.editor.setValue(contents);
  }

  async fetchSrc(src: string | Request | null) {
    // @ts-ignore
    const response = await fetch(src);
    return response.text();
  }

  async fetchConfig(config: string | Request | null) {
    // @ts-ignore
    const response = await fetch(config);
    return response.json();
  }
}

customElements.define('wc-monaco-editor', WCMonacoEditor);