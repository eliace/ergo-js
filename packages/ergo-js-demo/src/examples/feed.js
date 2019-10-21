import { Domain } from 'ergo-js-core'

function fetchUserPosts(id) {
    return fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    ).then(res => res.json())
}


class Posts extends Domain {
    config () {
        return {
            properties: {
                userId: {},
                isLoading: {},
                posts: {
                    key: v => v.id
                },
                count: {
                    calc: (v) => v.posts ? v.posts.length : 0
                }
            },
            actions: {
                load: async function () {
                    this.isLoading = true
                    this.posts = await fetchUserPosts(this.userId)
                    this.isLoading = false
                }
            }
        }
    }
}


function onScroll (el) {
    const f = (e) => this.notify('onScroll', e)
    el.addEventListener('scroll', f)
    return () => {
        el.removeEventListener('scroll', f)
    }
}


function domScroll (mixer) {
    mixer.mix({
        sources: {
            dom: (ctx) => ctx.dom || new Domain({}, {
                properties: {
                    pageOffset: {}
                }
            })
        },
        dom: { onScroll },
        onScroll: function (e, {dom}) {
            dom.pageOffset = e.target.scrollTop
        }
    })
}



export default () => {
    return {
        sources: {
            data: () => new Posts({userId: 1}),
            dom: () => new Domain({}, {
                properties: {
                    pageOffset: {}
                }
            })
        },
        allJoined: function ({data}) {
            data.load()
        },
        css: 'feed-example',
        styles: {
            backgroundColor: '#f0f0f0',
            position: 'relative'
        },
        $topbar: {
            domChanged: function (v) {
                this.opt('classes', {open: v.pageOffset > 120})
            },
            css: 'topbar',
            styles: {
                position: 'absolute',
                zIndex: 100
            },
            $content: {
                css: 'container content',
                $title: {
                    html: 'h3',
                    dataId: 'userId',
                    dataChanged: function (v) {
                        this.opt('text', 'User #'+v+' posts')
                    }
                },
                $count: {
                    html: 'span',
                    css: 'count',
                    dataId: 'count',
                    dataChanged: function (v) {
                        this.opt('text', v+' items')
                    }
                }
            }
        },
        $container: {
            mix: { domScroll },
            styles: {
                maxHeight: 500,
                overflow: 'auto',                    
            },
            css: 'container',
            dataChanged: function (v) {
                this.opt('components', {
                    loadIndicator: v.isLoading,
                    topbar: !v.isLoading,
                    title: !v.isLoading,
                    count: !v.isLoading,
                    posts: !v.isLoading,
                })
            },
            $loadIndicator: {
                html: 'p',
                css: 'loading',
                text: 'Posts loading...'
            },
            $title: {
                html: 'h1',
                dataId: 'userId',
                dataChanged: function (v) {
                    this.opt('text', 'User #'+v+' posts')
                }
            },
            $count: {
                html: 'span',
                css: 'count',
                dataId: 'count',
                dataChanged: function (v) {
                    this.opt('text', v + ' items')
                }
            },
            $posts: {
                dataId: 'posts',
                dataChanged: function (v, s, k) {
                    this.opt('items', s.$iterator(k))
                },
                defaultItem: {
                    css: 'box',
                    $title: {
                        html: 'h3',
                        dataId: 'title',
                        dataChanged: function (v) {
                            this.opt('text', v)
                        }
                    },
                    $body: {
                        html: 'p',
                        dataId: 'body',
                        dataChanged: function (v) {
                            this.opt('text', v)
                        }
                    }
                }
            }    
        }
    }
}