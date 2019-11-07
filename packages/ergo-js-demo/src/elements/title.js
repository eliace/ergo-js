import {Html} from 'chorda-core'
import {Layouts, Title} from 'chorda-bulma'

export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      $title: {
        as: Title,
        text: 'Title',
        html: 'h1'
      },
      $subtitle: {
        as: Title.Subtitle,
        text: 'Subtitle',
        html: 'h2'
      }
    }, {
      defaultItem: {
        as: Title
      },
      items: [1,2,3,4,5,6].map(i => {return {text: 'Title '+i, html: 'h'+i, css: 'is-'+i}})
    }, {
      defaultItem: {
        as: Title.Subtitle
      },
      items: [1,2,3,4,5,6].map(i => {return {text: 'Subtitle '+i, html: 'h'+i, css: 'is-'+i}})
    }, {
      defaultItem: {
        $title: {
          as: Title,
          html: 'p'
        },
        $subtitle: {
          as: Title.Subtitle,
          html: 'p'
        },
        styles: {
          marginBottom: '1rem'
        }
      },
      items: [
        {$title: {text: 'Title 1', css: 'is-1'}, $subtitle: {text: 'Subtitle 3', css: 'is-3'}},
        {$title: {text: 'Title 2', css: 'is-2'}, $subtitle: {text: 'Subtitle 4', css: 'is-4'}},
        {$title: {text: 'Title 3', css: 'is-3'}, $subtitle: {text: 'Subtitle 5', css: 'is-5'}},
        {$title: {text: 'Title 4', css: 'is-4'}, $subtitle: {text: 'Subtitle 6', css: 'is-6'}},
      ]
    }]
  }
}
