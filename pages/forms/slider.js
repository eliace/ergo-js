import {Html} from '../../src'
import {Layouts, Box, Slider} from '../../bulma'

const COLORS = ['primary', 'link', 'info', 'success', 'warning', 'danger']

export default () => {
    return {
        layout: Layouts.Rows,
        width: 400,
        items: [{
            as: Slider,
            min: 0,
            max: 100,
            step: 1,
            value: 50,
            css: 'is-fullwidth'
        }, {
            defaultItem: {
                as: Slider,
                min: 0,
                max: 100,
                step: 1,
                value: 50,
                css: 'is-fullwidth'    
            },
            items: COLORS.map(c => {
                return {color: c}
            })
        }]
    }
}