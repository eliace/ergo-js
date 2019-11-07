import { Layouts } from "chorda-bulma";



export default () => {
    return {
        layout: Layouts.Rows,
        items: [{
            css: 'spinner',
        }, {
            styles: {
                display: 'flex'
            },
            $loader: {
                $spinner: {
                    css: 'spinner',
                    styles: {
                        fontSize: '3em',
                        display: 'block',
                        height: '3rem'
                    }
                },
                $content: {
                    text: 'Loading...'
                }    
            }
        }, {
            styles: {
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.4)',
                padding: '1rem'
            },
            $loader: {
                $spinner: {
                    css: 'spinner is-inverted',
                    styles: {
                        fontSize: '3em',
                        display: 'block',
                        height: '3rem'
                    }
                },
                $content: {
                    text: 'Loading...',
                    css: 'has-text-white-bis'
                }    
            }
        }]
    }
}