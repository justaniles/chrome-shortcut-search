import { h, Component, render } from "preact";

import { EditorComponent } from "./editor";

export interface Props {}

export interface State {
    settingsJson: string;
}

const startingSettings = {
    test: "prop1",
    test2: {
        prop2: "p",
        prop3: "a",
    },
};

export class SettingsComponent extends Component<Props, State> {
    private _textarea: HTMLElement | undefined;

    constructor() {
        super();

        this.setState({
            settingsJson: JSON.stringify(startingSettings, null, 4),
        });
    }

    public componentDidMount() {
        const textarea = this._textarea;
        textarea && textarea.focus();
    }

    public render() {
        const state = this.state;
        return (
            <div class="settings-page">
                <EditorComponent
                    editorText={state.settingsJson}
                    onTextUpdate={this._updateSettings.bind(this)}
                />
                <div class="footer">
                    <div class="footer__inner">
                        <button class="button">Cancel</button>
                        <button class="button">Accept</button>
                    </div>
                </div>
            </div>
        );
    }

    private _updateSettings(settingsJson: string): void {
        console.log(settingsJson);
    }
}

render(<SettingsComponent />, document.body as Element);
