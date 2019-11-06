import { Box, ListBox } from 'chorda-bulma'
import { USERS } from '../../constants'


export default () => {
    return {
        as: Box,
        css: 'is-paddingless',
        width: 500,
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
    }
}