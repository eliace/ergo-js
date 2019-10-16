import { Html, Domain } from 'ergo-js-core'


export default class Carousel extends Html {
    config () {
        return {
            sources: {
                model: () => {
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
                        }
                    })
                }
            },
            css: 'carousel fade',
//            width: 512,
            $indicators: {
                sources: {
                    data: (o, ctx) => ctx.model.$entry('images')
                },
                html: 'ol',
                css: 'carousel-indicators',
                styles: {
                    marginBottom: '1rem'
                },
                defaultItem: {
                    html: 'li',
                    modelChanged: function (v) {
                        this.opt('classes', {'active': v.index == this.opt('key')})
                    },
                    dataChanged: function (v, ind) {
                        this.opt('key', ind.$props.id)
                    }
                },
                dataChanged: function (v, s) {
                    this.opt('items', s)
                }
            },
            $content: {
                sources: {
                    data: (o, ctx) => ctx.model.$entry('images')
                },
                css: 'carousel-inner',
                onClick: function (e, {model}) {
                    model.next()
                },
                defaultItem: {
                    css: 'carousel-item',
                    $image: {
                        html: 'img',
                        css: 'd-block w-100',
                    },
                    modelChanged: function (v) {
                        this.opt('classes', {'active': v.index == this.opt('key')})
                    },
                    dataChanged: function (v, img) {
                        this.opt('key', img.$props.id)
                        this.$image.opt('src', v)
                    }
                },
                dataChanged: function (v, s) {
                    this.opt('items', s)
                }
            }
        }
    }

    options () {
        return {
            images: {
                initOrSet: function (v) {
                    const {model} = this.sources
                    model.images = v
                    model.index = v.length ? Math.min(model.index, v.length-1) : 0
                }
            }
        }
    }
}