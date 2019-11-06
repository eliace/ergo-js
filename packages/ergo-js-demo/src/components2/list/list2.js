import { Box, ListBox, Action } from 'chorda-bulma'
import { DIRS } from '../../constants'


export default () => {
    return {
        as: Box,
        css: 'is-paddingless',
        width: 500,
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
                        css: 'list-box-item__avatar is-large has-background-info has-text-white',
                    }
                }
            })    
    }
    }
}