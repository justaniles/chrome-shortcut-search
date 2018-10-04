import { h, Component } from "preact";

import { SavedPage } from "../interfaces";

export interface Props {
    pages: SavedPage[];
    selectedIndex: number;
}

export interface State {}

export class SavedPagesListComponent extends Component<Props, State> {
    openNewTab(url: string): void {
        chrome.tabs.create({
            url: url,
        });
    }

    render({ pages, selectedIndex }: Props) {
        return (
            <ol class="saved-pages-list">
                {pages.map((page, index) => {
                    return (
                        <li>
                            <button
                                class={
                                    "saved-pages-item " +
                                    (index === selectedIndex
                                        ? "saved-pages-item--isSelected"
                                        : "")
                                }
                                onClick={() => {
                                    this.openNewTab(page.url);
                                }}
                            >
                                <h3 class="saved-pages-item__title">
                                    {page.title}
                                </h3>
                                <p
                                    class="saved-pages-item__url"
                                    title={page.url}
                                >
                                    {page.url}
                                </p>
                                <p class="saved-pages-item__tags">
                                    Tags: {page.tags.join(", ")}
                                </p>
                            </button>
                        </li>
                    );
                })}
            </ol>
        );
    }
}
