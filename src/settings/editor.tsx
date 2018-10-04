import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import "monaco-editor/esm/vs/language/json/monaco.contribution";
import "monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.js";
import "monaco-editor/esm/vs/editor/contrib/hover/hover.js";

import { h, Component } from "preact";

export interface Props {
    editorText: string;
    onTextUpdate: (text: string) => void;
}

export interface State {}

declare global {
    interface Window {
        MonacoEnvironment: any;
    }
}

self.MonacoEnvironment = {
    getWorker: function(moduleId, label) {
        if (label === "json") {
            return new Worker(
                "../../node_modules/monaco-editor/esm/vs/language/json/json.worker.js"
            );
        }
        return new Worker(
            "../../node_modules/monaco-editor/esm/vs/editor/editor.worker.js"
        );
    },
};

export class EditorComponent extends Component<Props, State> {
    private _editor: monaco.editor.IStandaloneCodeEditor | undefined;
    private _preventUpdates = false;
    private _hostContainer: HTMLElement | undefined;
    private _resizeDebounceHandler: number | undefined;
    private _resizeEditorFn: (() => void) | undefined;

    public componentDidMount() {
        const hostContainer = this._hostContainer;
        if (hostContainer) {
            const editor = (this._editor = monaco.editor.create(hostContainer, {
                value: this.props.editorText,
                language: "json",
                theme: "vs-dark",
            }));

            // Listen for when editor gets updated
            editor.onDidChangeModelContent(() => {
                if (!this._preventUpdates) {
                    this.props.onTextUpdate(editor.getValue());
                }
            });

            // Listen for window resizes to resize the editor
            const resizeEditor = (this._resizeEditorFn = () => {
                if (!this._resizeDebounceHandler) {
                    this._resizeDebounceHandler = setTimeout(() => {
                        const editor = this._editor;
                        editor && editor.layout();
                        this._resizeDebounceHandler = undefined;
                    }, 100);
                }
            });
            window.addEventListener("resize", resizeEditor);
        }
    }

    public componentWillUnmount() {
        const editor = this._editor;
        editor && editor.dispose();

        const resizeEditorFn = this._resizeEditorFn;
        resizeEditorFn && window.removeEventListener("resize", resizeEditorFn);
    }

    public render(props: Props) {
        // Update editor text
        const editor = this._editor;
        if (editor) {
            this._preventUpdates = true;
            editor.setValue(props.editorText);
            this._preventUpdates = false;
        }

        return (
            <div
                class="editor"
                ref={val => {
                    this._hostContainer = val;
                }}
            />
        );
    }
}
