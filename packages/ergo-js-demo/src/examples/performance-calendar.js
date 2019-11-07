import { Html, Layout, Domain } from 'chorda-core'
import _ from 'lodash'
//import './performance-calendar.scss'

const DAYS = _.range(1, 32).map((day) => ("Oct " + day));

function randomMilliseconds () {
  return Math.floor(Math.random() * 500);
}

const service = {
    cells: [],
    addCell(cell) {
      this.cells.push(cell);
    },
    searchAllCells() {
      for (let i = 0; i < this.cells.length; i++) {
        this.cells[i].search();
      }
    }  
}


class CellModel extends Domain {
    config () {
        return {
            properties: {
                isSearching: {},
                searchResults: {},
                hour: {}
            },
            actions: {
                search: function () {
                    this.isSearching = true
                    this.searchResults = {options: null}

                    setTimeout(() => {
                        this.isSearching = false
                        this.searchResults = {options: Math.floor(Math.random() * 5)}
                    }, randomMilliseconds())
                }
            }
        }
    }
}


class Cell extends Html {
    config () {
        return {
            sources: {
                view: () => new CellModel({})
//                data: ctx => ctx.data
            },
            layout: Layout.passthru,
            components: false,
            viewJoined: function (joint) {
                service.addCell(joint)
            },
            viewChanged: function (v) {
                this.opt('components', {
                    searching: v.isSearching,
                    searchResults: v.searchResults && !v.isSearching,
                    other: !v.isSearching && !v.searchResults
                })
            },
            $searching: {
                html: 'td',
                css: 'hour-cell',
                $content: {
                    css: 'searching',
                    text: '...'
                }
            },
            $searchResults: {
                html: 'td',
                css: 'hour-cell',
                $content: {
                    viewId: 'searchResults',
                    $content: {
                        viewChanged: function (v) {
                            const options = v.options
                            return {
                                classes: {
                                    'good-results': options > 3,
                                    'weak-results': options > 1 && options <= 3,
                                    'bad-results': options >= 0 && options <= 1    
                                },
                                text: options
                            }
                            // this.opt('classes', {
                            //     'good-results': options > 3,
                            //     'weak-results': options > 1 && options <= 3,
                            //     'bad-results': options >= 0 && options <= 1
                            // })
                            // this.opt('text', options)
                        }
                    },
                    $label: {
                        css: 'result-label',
                        text: 'results',
                    }
                },
                onClick: function (e, {data, view}) {
                    view.search()
                }
            },
            $other: {
                html: 'td',
                css: 'hour-cell',
                $content: {
                    css: 'time',
                    dataId: 'hour',
                    dataChanged: function (v) {
                        this.opt('text', v + ':00')
                    }
                },
                onClick: function (e, {data, view}) {
                    view.search()
                }
            }
        }
    }
}




export default () => {
    const html = {
        sources: {
            isLoaded: () => false,
            // app: () => {},
            // dropdown: () => {},
            // modals: () => {},
            // page: () => {},
            // portal: () => {},
            // tabs: () => {},
            // toasts: () => {},
            data: () => new Domain({
                isLoaded: false,
//                days: [...DAYS],
                hours: _.range(24).map((hour, index) => {
                    return DAYS.map(day => {
                        return {
                            day,
                            hour
                        }
                    })
                })
            }, {
                properties: {
                    isLoaded: {},
                    hours: {
                        type: Domain,
                        entryOfType: {
                            type: Domain,
                            entryOfType: {
                                type: CellModel
                            }
                        }
                    }
                },
                // actions: {
                //     searchAll: function () {
                //         const hours = this.hours
                //         for (let j = 0; j < hours.$size; j++) {
                //             const cells = hours.$entry(j)
                //             for (let i = 0; i < cells.$size; i++) {
                //                 cells.$entry(i).search();
                //             }                        
                //         }
                //     }
                // }
            })
        },
        css: 'performance-calendar',
        $loadBtn: {
            html: 'button',
            css: 'btn',
            text: 'Load',
            onClick: function (e, {data, isLoaded}) {
                isLoaded.$value = true
            }
        },
        $searchBtn: {
            html: 'button',
            css: 'btn',
            text: 'Search all month',
            onClick: function (e, {data}) {
                service.searchAllCells()
            }
        },
        components: false,
        isLoadedChanged: function (v) {
            v = {isLoaded: v}
//            console.count('update loaded')
            this.opt('components', {
                loadBtn: !v.isLoaded,
                searchBtn: v.isLoaded,
                table: v.isLoaded
            })
        },
        $table: {
            html: 'table',
            $body: {
                html: 'tbody',
                $header: {
                    html: 'tr',
                    items: DAYS.map((day, index) => {
                        return {
                            html: 'th',
                            css: 'day-header',
                            text: day,
                            key: 'th'+index
                        }
                    })
                },
                defaultItem: {
                    html: 'tr',
                    defaultItem: {
                        as: Cell,
                    },
                    dataChanged: function (v, s, k) {
//                        console.count('update cells')
                        this.opt('items', s.$iterator(k))
                    }
                },
                dataId: 'hours',
                dataChanged: function (v, s, k) {
                    this.opt('items', s.$iterator(k))
                }
            }
        }
    }
    return html
}