import { Button, Buttons } from 'chorda-bulma'

export default () => {
    return {
        as: Buttons,
        defaultItem: {
          as: Button,
        },
        items: [
          {icon: 'fas fa-bold'},
          {icon: 'fas fa-italic'},
          {icon: 'fas fa-underline'},
        ]  
    }
}