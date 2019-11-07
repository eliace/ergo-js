import { Action } from 'chorda-bulma'

export default () => {
    return {
        as: Action,
        text: 'Click to action',
        css: 'is-link is-muted',
        icon: 'fas fa-star'  
    }
}