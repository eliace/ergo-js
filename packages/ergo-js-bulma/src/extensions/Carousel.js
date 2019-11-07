import { Html, Domain } from 'chorda-core'


export default class Carousel extends Html {
    config () {
        return {
            scope: {
                view: () => {
                    return new Domain({
                        index: 0,
                        images: []
                    }, {
                        properties: {
                            index: {},
                            images: {}
                        },
                        actions: {
                            next: function () {
                                this.index = this.index < this.images.length-1 ? this.index + 1 : 0
                            },
                            prev: function () {

                            }
                        },
                        watch: {
                            images: function (v) {
                                this.index = v.length ? Math.min(this.index, v.length-1) : 0
                            }
                        }
                    })
                }
            },
            css: 'carousel fade',
//            width: 512,
            $indicators: {
                scope: {
                    data: (ctx) => ctx.view.$entry('images')
                },
                html: 'ol',
                css: 'carousel-indicators',
                styles: {
                    marginBottom: '1rem'
                },
                defaultItem: {
                    html: 'li',
                    viewChanged: function (v) {
                        this.opt('classes', {'active': v.index == this.opt('key')})
                    },
                    dataChanged: function (v, img) {
                        this.opt('key', img.$id)
                    }
                },
                dataChanged: function (v, s, k) {
                    this.opt('items', s.$iterator(k))
                }
            },
            $content: {
                scope: {
                    data: (ctx) => ctx.view.$entry('images')
                },
                css: 'carousel-inner',
                onClick: function (e, {view}) {
                    view.next()
                },
                defaultItem: {
                    css: 'carousel-item',
                    $image: {
                        html: 'img',
                        css: 'd-block w-100',
                    },
                    viewChanged: function (v) {
                        this.opt('classes', {'active': v.index == this.opt('key')})
                    },
                    dataChanged: function (v, img) {
                        this.opt('key', img.$id)
                        this.$image.opt('src', v)
                    }
                },
                dataChanged: function (v, s, k) {
                    this.opt('items', s.$iterator(k))
                }
            }
        }
    }

    properties () {
        return {
            images: {
                set: function (v) {
                    this.scope.view.images = v
                    // const {view} = this.sources
                    // view.images = v
                    // view.index = v.length ? Math.min(view.index, v.length-1) : 0
                }
            }
        }
    }
}