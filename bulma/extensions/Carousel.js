import { Html, Domain } from '../../src'


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
                                const {$props} = this
                                $props.index = $props.index < $props.images.length-1 ? $props.index + 1 : 0
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
                    dataChanged: function (v, $props) {
                        this.opt('key', $props.source.id)
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
                        this.opt('key', img.source.id)
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
                    const {$props} = this.sources.model
                    $props.images = v
                    $props.index = v.length ? Math.min($props.index, v.length-1) : 0
                }
            }
        }
    }
}