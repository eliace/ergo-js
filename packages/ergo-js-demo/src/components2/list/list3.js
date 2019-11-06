import { Box, ListBox, Layouts, Action, Button, Title, Image } from 'chorda-bulma'
import { USERS } from '../../constants'


export default () => {
    return {
        as: Box,
        css: 'is-paddingless',
        width: 500,
        $header: {
            layout: Layouts.Level,
            styles: {
                padding: '1rem 1em 0 1rem',
                marginBottom: '1rem'
            },
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
                    as: Button,
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
        $content: {
            as: ListBox,
            items: USERS.slice(4, 8).map(u => {
                return {
                    text: u.name.first + ' ' + u.name.last,
                    subtitle: [u.location.state, u.location.city, u.location.street.name, u.location.street.number].join(', '),
                    $avatar: {
                        as: Image,
                        src: u.picture.medium,
                        weight: -1,
                        css: 'list-box-item__avatar is-before',
                        rounded: true
                    },
                    $country: {
                        weight: 10,
                        text: u.location.country
                    }
                }
            })    
        }
}
}