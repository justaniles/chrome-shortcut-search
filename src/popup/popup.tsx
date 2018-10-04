import { h, Component, render } from "preact";

import "./popup.scss";
import { SavedPagesListComponent } from "./saved-pages-list";
import { SavedPage } from "../interfaces";
import savedPages from "../saved-pages";

export interface Props {}

export interface State {
    selectedIndex: number;
    searchText: string;
    shownItems: SavedPage[];
}

export class PopUpComponent extends Component<Props, State> {
    private _searchBox: HTMLElement | undefined;

    constructor() {
        super();

        this.setState({
            selectedIndex: 0,
            shownItems: savedPages,
            searchText: "",
        });

        document.addEventListener("keydown", (e: KeyboardEvent) => {
            this._handleNavigationKeys(e);
        });
    }

    public componentDidMount() {
        const searchBox = this._searchBox;
        searchBox && searchBox.focus();
    }

    public render() {
        const state = this.state;
        return (
            <div class="app">
                <input
                    class="searchbox"
                    type="text"
                    placeholder="Search"
                    value={state.searchText}
                    onInput={this._searchEvent.bind(this)}
                    ref={(input: HTMLElement) => {
                        this._searchBox = input;
                    }}
                />
                <SavedPagesListComponent
                    pages={state.shownItems}
                    selectedIndex={state.selectedIndex}
                />
            </div>
        );
    }

    private _searchEvent(e: Event): void {
        const searchText = (e.target as any).value;
        let filteredItems: SavedPage[] = savedPages;

        if (searchText) {
            const searchWords = searchText.toLowerCase().split(" ");
            const numSearchWords = searchWords.length;
            const matchingItems: {
                searchScore: number;
                savedPage: SavedPage;
            }[] = [];
            savedPages.forEach(item => {
                // Determine search score based on number of hits
                let searchScore = 0;
                let wordsMatch = 0;
                searchWords.forEach(searchWord => {
                    const matchCount =
                        +item.title.toLowerCase().includes(searchWord) +
                        +item.url.toLowerCase().includes(searchWord) +
                        +item.tags.some(tag =>
                            tag.toLowerCase().includes(searchWord)
                        );
                    searchScore += matchCount;

                    if (matchCount) {
                        wordsMatch++;
                    }
                });

                if (wordsMatch >= numSearchWords) {
                    matchingItems.push({
                        searchScore: searchScore,
                        savedPage: item,
                    });
                }
            });

            filteredItems = matchingItems
                .sort((item1, item2) => {
                    const comparison = item2.searchScore - item1.searchScore;
                    return comparison && comparison < 0 ? -1 : 1;
                })
                .map(item => item.savedPage);
        }

        this.setState({
            shownItems: filteredItems,
            searchText: searchText,
            selectedIndex: 0,
        });
    }

    private _handleNavigationKeys(e: KeyboardEvent): void {
        const key = e.key;
        const { selectedIndex, shownItems } = this.state;
        const shownItemsLength = shownItems.length;

        if (key === "ArrowDown") {
            this.setState({
                selectedIndex: (selectedIndex + 1) % shownItemsLength,
            });
            e.preventDefault();
        } else if (key === "ArrowUp") {
            const newIndex = selectedIndex - 1;
            this.setState({
                selectedIndex: newIndex < 0 ? shownItemsLength - 1 : newIndex,
            });
            e.preventDefault();
        } else if (key === "Enter") {
            const selectedItem = shownItems[selectedIndex];
            if (selectedItem) {
                chrome.tabs.create({
                    url: selectedItem.url,
                });
            }
        }
    }
}

render(<PopUpComponent />, document.body as Element);
