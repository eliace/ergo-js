import {Html, Source, Domain, Layout} from '../../src'
import { Layouts, Box, ListBox, Action } from '../../bulma'
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
                        subtitle: d.size+'b',
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
        }]
    }
}