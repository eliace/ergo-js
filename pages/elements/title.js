import {Html} from '../../src'
import {Layouts, Title} from '../../bulma'

export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      $title: {
        base: Title,
        text: 'Title',
        html: 'h1'
      },
      $subtitle: {
        base: Title.Subtitle,
        text: 'Subtitle',
        html: 'h2'
      }
    }, {
      defaultItem: {
        base: Title
      },
      items: [1,2,3,4,5,6].map(i => {return {text: 'Title '+i, html: 'h'+i, as: 'is-'+i}})
    }, {
      defaultItem: {
        base: Title.Subtitle
      },
      items: [1,2,3,4,5,6].map(i => {return {text: 'Subtitle '+i, html: 'h'+i, as: 'is-'+i}})
    }, {
      defaultItem: {
        $title: {
          base: Title,
          html: 'p'
        },
        $subtitle: {
          base: Title.Subtitle,
          html: 'p'
        },
        styles: {
          marginBottom: '1rem'
        }
      },
      items: [
        {$title: {text: 'Title 1', as: 'is-1'}, $subtitle: {text: 'Subtitle 3', as: 'is-3'}},
        {$title: {text: 'Title 2', as: 'is-2'}, $subtitle: {text: 'Subtitle 4', as: 'is-4'}},
        {$title: {text: 'Title 3', as: 'is-3'}, $subtitle: {text: 'Subtitle 5', as: 'is-5'}},
        {$title: {text: 'Title 4', as: 'is-4'}, $subtitle: {text: 'Subtitle 6', as: 'is-6'}},
      ]
    }]
  }
}
