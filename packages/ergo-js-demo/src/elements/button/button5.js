import { Button, Buttons } from 'ergo-js-bulma'

export default () => {
    return {
        as: Buttons,
        defaultItem: {
          as: Button,
        },
        items: [
          {icon: 'fab fa-github', text: 'GitHub'},
          {icon: 'fab fa-twitter', text: 'Twitter', css: 'is-primary'},
          {icon: 'fas fa-check', text: 'Save', css: 'is-success'},
          {icon: 'fas fa-times', text: 'Delete', css: 'is-danger is-outlined'},
        ]  
    }
}