import {Html, Source, Domain, Layout} from 'chorda-core'
import { Layouts, Box, ListBox, Action, Field, Title, ButtonWithIcon, Fields, Tools, Image } from 'chorda-bulma'
import { USERS } from '../../constants'
import { ExampleBox } from '../../extensions'

import list1 from './list1'
import list1_code from '!raw-loader!./list1'
import list2 from './list2'
import list2_code from '!raw-loader!./list2'
import list3 from './list3'
import list3_code from '!raw-loader!./list3'



export default () => {
    return {
        layout: Layouts.Rows,
        items: [{
            as: ExampleBox,
            title: 'Basic',
            example: list1,
            code: list1_code
        }, {
            as: ExampleBox,
            title: 'Actions',
            example: list2,
            code: list2_code
        }, {
            as: ExampleBox,
            title: 'Header',
            example: list3,
            code: list3_code
        }]
    }
}