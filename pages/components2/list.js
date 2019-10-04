import {Html, Source, Domain, Layout} from '../../src'
import { Layouts, Box, ListBox, Action, Field, Title, ButtonWithIcon, Fields, Tools, Image } from '../../bulma'
import { USERS } from '../constants'

const DIRS = [{
    path: '/User/123/Work/test.txt',
    size: 243
}, {
    path: '/User/123/Work/README.md',
    size: 1
}, {
    path: '/User/123/Database/log',
    size: 875445
}]


export default () => {
    return {
        layout: Layouts.Rows,
        items: [{
            as: Box,
            css: 'is-paddingless',
            $content: {
                as: ListBox,
                items: USERS.slice(0, 4).map(u => {
                    return {
                        text: u.name.first + ' ' + u.name.last,
                        subtitle: u.email,
                        image: u.picture.medium,
                        icon: {
                            icon: 'fa-star',
                            css: 'has-text-warning'
                        },
                        check: true,
                        switch: {
                            value: u.id.value
                        }
                    }
                })    
            }
        }, {
            as: Box,
            css: 'is-paddingless',
            $content: {
                as: ListBox,
                defaultItem: {
                    $actions: {
                        defaultItem: {
                            as: Action,
                            css: 'is-muted'
                        },
                        items: [{icon: 'fas fa-edit'}, {icon: 'fas fa-info-circle'}, {icon: 'fas fa-ban'}]
                    }
                },
                items: DIRS.map(d => {
                    return {
                        text: d.path,
                        subtitle: d.size+'B',
                        icon: {
                            icon: 'fa-file-alt',
                            css: 'is-large has-background-info has-text-white',
                            styles: {
                                fontSize: '1.2em',
                                borderRadius: '50%',
                                height: '2.5rem',
                                width: '2.5rem'
                            }
                        }
                    }
                })    
            }
        }, {
            as: Box,
            css: 'is-paddingless',
            $header: {
                layout: Layouts.Level,
                styles: {
                    padding: '1rem 1em 0 1rem',
                    marginBottom: '1rem'
                },
//                 $left: {
//                     level: Layouts.Level.LEFT,
//                     $title: {
//                         as: Title,
//                         text: 'Users',
//                         css: 'is-6',
//                         styles: {
// //                            textTransform: 'uppercase',
//                             color: '#ccc'
//                         }
//                     }
//                 },
                $title: {
                    level: Layouts.Level.LEFT,
                    as: Title,
                    text: 'Users',
                    css: 'is-6',
                    styles: {
//                            textTransform: 'uppercase',
                        color: '#ccc'
                    }
                },
//                $right: {
//                    level: Layouts.Level.RIGHT,
                    items: [{
                        level: Layouts.Level.RIGHT,
                        as: ButtonWithIcon,
                        icon: 'fas fa-cat',
                        color: 'danger',
                        text: 'Catify',
                    }, {
                        level: Layouts.Level.RIGHT,
                        as: Action,
                        text: 'Send',
                        icon: 'fas fa-paper-plane',
                        css: 'is-link is-muted'
                    }, {
                        level: Layouts.Level.RIGHT,
                        as: Action,
                        text: 'Share',
                        icon: 'fas fa-share',
                        css: 'is-link is-muted'
                    }]
                    // as: Tools,
                    // tools: {
                    //     $btn: {
                    //         as: Tools.Button,
                    //         icon: 'fas fa-cat',
                    //         color: 'danger',
                    //         text: 'Catify',
                    //     },
                    //     $hello: {
                    //         as: Tools.Action,
                    //         text: 'Hello',
                    //         icon: 'fas fa-edit',
                    //         $control: {
                    //             css: 'is-link'
                    //         }
                    //     },
                    //     $share: {
                    //         as: Tools.Action,
                    //         text: 'Share',
                    //         icon: 'fas fa-share',
                    //         $control: {
                    //             css: 'is-link'
                    //         }
                    //     }
                    // }
//                }
            },
            $list: {
                as: ListBox,
                items: USERS.slice(4, 8).map(u => {
                    return {
                        text: u.name.first + ' ' + u.name.last,
                        subtitle: [u.location.state, u.location.city, u.location.street.name, u.location.street.number].join(', '),
                        $prependImage: {
                            as: Image,
                            src: u.picture.medium,
                            weight: -1,
                            css: 'is-before',
                            rounded: true
                        },
                        $country: {
                            weight: 10,
                            text: u.location.country
                        }
                    }
                })    
            }
        }]
    }
}