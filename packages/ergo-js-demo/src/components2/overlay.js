import {Layouts, Box, Button, Card, Overlay, LoaderBox} from 'chorda-bulma'
import { Html } from 'chorda-core'
import { LOREM_IPSUM, YOSEMITE_TEXT } from '../constants'

import imageUrl from '../img/Yosemite 3.jpg'

export default () => {
    return {
        layout: Layouts.Rows,
        items: [{
            as: Box,
            css: 'has-overlay',
            $content: {
                text: LOREM_IPSUM
            },
            $overlay: {
                as: Overlay,
                $content: {
                    as: Button,
                    text: 'Overlay',
                    css: 'is-primary'
                }
            }
        }, {
            as: Box,
            css: 'has-overlay',
            $content: {
                text: LOREM_IPSUM
            },
            $overlay: {
                as: Overlay,
                $content: {
                    as: LoaderBox,
                    text: 'Loading'
                }
            }
        }, {
            as: Box,
            css: 'has-overlay',
            $content: {
                text: LOREM_IPSUM
            },
            $overlay: {
                as: Overlay,
                css: 'is-inverted',
                $content: {
                    as: LoaderBox,
                    text: 'Loading'
                }
            }
        }, {
            styles: {
                padding: '2rem',
                display: 'flex',
                justifyContent: 'center'
            },
            $card: {
                as: Card,
                width: 500,
                image: imageUrl,
                css: 'has-overlay has-overlay-on-hover',
                $content: {
                    $title: {
                        text: 'Yosemite',
                        css: 'title is-5'
                    },
                    $desc: {
                        text: YOSEMITE_TEXT
                    }
                },
                $overlay: {
                    as: Overlay,
                    $content: {
                        as: Button,
                        text: 'Wikipedia',
                        css: 'is-link is-medium',
                        icon: 'fas fa-link',
                        styles: {
                            marginTop: -220
                        }                        
                    }
                }
            }
        }]
    }
}