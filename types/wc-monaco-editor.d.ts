export declare class WCMonacoEditor extends HTMLElement {
    __initialized: any;
    editor: any;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string | number, oldValue: any, newValue: any): void;
    get src(): string | null;
    set src(value: string | null);
    get value(): any;
    set value(value: any);
    get tabSize(): any;
    set tabSize(value: any);
    constructor();
    connectedCallback(): Promise<void>;
    setSrc(): Promise<void>;
    fetchSrc(src: string | Request | null): Promise<string>;
    fetchConfig(config: string | Request | null): Promise<any>;
}
